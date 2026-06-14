import { NextRequest, NextResponse } from 'next/server';
import { getDocuments, getSettings } from '@/lib/cms';

/**
 * Secure document download endpoint
 * 
 * Fetches documents from Supabase Storage and serves them securely.
 * 
 * Usage: POST /api/documents/download
 * Body: {
 *   documentId: string,
 *   password: string,
 *   mode?: 'view' | 'download'  // defaults to 'view'
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, password, mode = 'view' } = body;

    if (!documentId || !password) {
      return NextResponse.json(
        { error: 'Document ID and password required' },
        { status: 400 }
      );
    }

    // Verify password
    const settings = await getSettings();
    if (password !== settings.security_document_access_password) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Get document from CMS
    const documents = await getDocuments();
    const document = documents.find(d => d.id === documentId);

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    if (!document.file_url) {
      return NextResponse.json(
        { error: 'Document has no file attached' },
        { status: 404 }
      );
    }

    // Fetch the file from Supabase Storage (file_url is a public URL)
    const fileResponse = await fetch(document.file_url);

    if (!fileResponse.ok) {
      console.error('Failed to fetch document from storage:', fileResponse.status);
      return NextResponse.json(
        { error: 'Failed to retrieve document file' },
        { status: 502 }
      );
    }

    const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
    const contentType = fileResponse.headers.get('content-type') || 'application/pdf';
    const contentDisposition = mode === 'download'
      ? `attachment; filename="${encodeURIComponent(document.title || 'document')}.pdf"`
      : `inline; filename="${encodeURIComponent(document.title || 'document')}.pdf"`;

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error downloading document:', error);
    return NextResponse.json(
      { error: 'Error downloading document' },
      { status: 500 }
    );
  }
}
