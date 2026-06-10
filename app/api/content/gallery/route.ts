import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const GALLERY_FILE = path.join(CONTENT_DIR, 'gallery.json');

export async function GET() {
  try {
    const content = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read gallery' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    const newImage = {
      id: `img-${Date.now()}`,
      order: Math.max(...data.gallery.map((g: any) => g.order), 0) + 1,
      ...body
    };
    
    data.gallery.push(newImage);
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    const index = data.gallery.findIndex((g: any) => g.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    data.gallery[index] = { ...data.gallery[index], ...body };
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(data.gallery[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    const content = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    data.gallery = data.gallery.filter((g: any) => g.id !== id);
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
