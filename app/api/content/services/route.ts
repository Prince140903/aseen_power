import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const SERVICES_FILE = path.join(CONTENT_DIR, 'services.json');

export async function GET() {
  try {
    const content = fs.readFileSync(SERVICES_FILE, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(SERVICES_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    // Add new service
    const newService = {
      id: `service-${Date.now()}`,
      order: Math.max(...data.services.map((s: any) => s.order), 0) + 1,
      ...body
    };
    
    data.services.push(newService);
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(SERVICES_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    // Update service
    const index = data.services.findIndex((s: any) => s.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    data.services[index] = { ...data.services[index], ...body };
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(data.services[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    const content = fs.readFileSync(SERVICES_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    data.services = data.services.filter((s: any) => s.id !== id);
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
