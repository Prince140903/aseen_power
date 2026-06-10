import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DOCUMENTS_FILE = path.join(CONTENT_DIR, 'documents.json');

export async function GET() {
  try {
    const content = fs.readFileSync(DOCUMENTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read documents' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(DOCUMENTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    const newDocument = {
      id: `doc-${Date.now()}`,
      order: Math.max(...data.documents.map((d: any) => d.order), 0) + 1,
      ...body
    };
    
    data.documents.push(newDocument);
    fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add document' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(DOCUMENTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    const index = data.documents.findIndex((d: any) => d.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    data.documents[index] = { ...data.documents[index], ...body };
    fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(data.documents[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    const content = fs.readFileSync(DOCUMENTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    data.documents = data.documents.filter((d: any) => d.id !== id);
    fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
