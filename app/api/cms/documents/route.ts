import { NextRequest, NextResponse } from 'next/server';
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  uploadDocument,
  Document
} from '@/lib/supabase-client';

/**
 * GET /api/cms/documents
 * Fetch all documents
 */
export async function GET() {
  try {
    const documents = await getDocuments();
    return NextResponse.json({ documents });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cms/documents
 * Create a new document with PDF upload
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const pdfFile = formData.get('document') as File;
    const order = parseInt(formData.get('order') as string) || 0;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    let documentUrl = '';
    let documentPath = '';

    // Upload PDF if provided
    if (pdfFile && pdfFile.size > 0) {
      const uploadResult = await uploadDocument(pdfFile);
      if (!uploadResult) {
        return NextResponse.json(
          { error: 'Failed to upload document' },
          { status: 500 }
        );
      }
      documentUrl = uploadResult.url;
      documentPath = uploadResult.path;
    }

    const docData: Omit<Document, 'id' | 'created_at' | 'updated_at'> = {
      title,
      description,
      file_url: documentUrl,
      file_path: documentPath,
      order,
    };

    const document = await createDocument(docData);

    if (!document) {
      return NextResponse.json(
        { error: 'Failed to create document' },
        { status: 500 }
      );
    }

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/documents
 * Update a document
 */
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    if (!id) {
      return NextResponse.json(
        { error: 'Document ID required' },
        { status: 400 }
      );
    }

    const updates: any = {};

    // Handle text fields
    if (formData.has('title')) updates.title = formData.get('title');
    if (formData.has('description')) updates.description = formData.get('description');
    if (formData.has('order')) updates.order = parseInt(formData.get('order') as string);

    // Handle PDF upload
    const pdfFile = formData.get('document') as File;
    if (pdfFile && pdfFile.size > 0) {
      const uploadResult = await uploadDocument(pdfFile);
      if (!uploadResult) {
        return NextResponse.json(
          { error: 'Failed to upload document' },
          { status: 500 }
        );
      }
      updates.file_url = uploadResult.url;
      updates.file_path = uploadResult.path;
    }

    const document = await updateDocument(id, updates);

    if (!document) {
      return NextResponse.json(
        { error: 'Failed to update document' },
        { status: 500 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cms/documents?id=xxx
 * Delete a document
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Document ID required' },
        { status: 400 }
      );
    }

    const success = await deleteDocument(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete document' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
