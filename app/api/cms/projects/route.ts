import { NextRequest, NextResponse } from 'next/server';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
  deleteFile,
  Project
} from '@/lib/supabase-client';

/**
 * GET /api/cms/projects
 * Fetch all projects
 */
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cms/projects
 * Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const kVA = formData.get('kVA') as string;
    const year = formData.get('year') as string;
    const featured = formData.get('featured') === 'true';
    const imageFile = formData.get('image') as File;
    const order = parseInt(formData.get('order') as string) || 0;

    let imageUrl = '';

    // Upload image if provided
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile, 'projects');
      if (!uploadedUrl) {
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
      imageUrl = uploadedUrl;
    }

    const projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
      title,
      category: category as any,
      location,
      description,
      image_url: imageUrl,
      kVA,
      year,
      featured,
      order,
    };

    const project = await createProject(projectData);

    if (!project) {
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/projects
 * Update a project
 */
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID required' },
        { status: 400 }
      );
    }

    const updates: any = {};

    // Handle text fields
    if (formData.has('title')) updates.title = formData.get('title');
    if (formData.has('category')) updates.category = formData.get('category');
    if (formData.has('location')) updates.location = formData.get('location');
    if (formData.has('description')) updates.description = formData.get('description');
    if (formData.has('kVA')) updates.kVA = formData.get('kVA');
    if (formData.has('year')) updates.year = formData.get('year');
    if (formData.has('featured')) updates.featured = formData.get('featured') === 'true';
    if (formData.has('order')) updates.order = parseInt(formData.get('order') as string);

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile, 'projects');
      if (!uploadedUrl) {
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
      updates.image_url = uploadedUrl;
    }

    const project = await updateProject(id, updates);

    if (!project) {
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cms/projects?id=xxx
 * Delete a project
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID required' },
        { status: 400 }
      );
    }

    const success = await deleteProject(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
