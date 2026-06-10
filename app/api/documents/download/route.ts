import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getDocuments, getSettings } from '@/lib/cms';

/**
 * Secure document download endpoint
 * 
 * This endpoint serves documents securely without exposing them publicly.
 * Documents are stored in a non-public directory and served through this API.
 * 
 * Usage: POST /api/documents/download
 * Body: {
 *   documentId: string,
 *   password: string
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, password } = body;

    if (!documentId || !password) {
      return NextResponse.json(
        { error: 'Document ID and password required' },
        { status: 400 }
      );
    }

    // Verify password
    const settings = await getSettings();
    if (password !== settings.document_access_password) {
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

    // Extract filename from file_url (should be just the filename)
    // Security: Only allow downloads from a specific documents directory
    const fileName = path.basename(document.file_url);
    
    // Prevent directory traversal attacks
    if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    // Store documents in a private directory (not in public)
    const documentsDir = path.join(process.cwd(), 'private-documents');
    const filePath = path.join(documentsDir, fileName);

    // Verify the file exists and is within the documents directory
    const realPath = path.resolve(filePath);
    const realDocsDir = path.resolve(documentsDir);

    if (!realPath.startsWith(realDocsDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);

    // Return as PDF with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
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
