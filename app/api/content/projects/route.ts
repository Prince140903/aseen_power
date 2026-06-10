import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PROJECTS_FILE = path.join(CONTENT_DIR, 'projects.json');

export async function GET() {
  try {
    const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    const newProject = {
      id: `proj-${Date.now()}`,
      order: Math.max(...data.projects.map((p: any) => p.order), 0) + 1,
      featured: false,
      ...body
    };
    
    data.projects.push(newProject);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    const index = data.projects.findIndex((p: any) => p.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    data.projects[index] = { ...data.projects[index], ...body };
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json(data.projects[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    data.projects = data.projects.filter((p: any) => p.id !== id);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
