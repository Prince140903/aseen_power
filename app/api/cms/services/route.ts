import { NextRequest, NextResponse } from 'next/server';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  uploadImage,
  Service
} from '@/lib/supabase-client';

/**
 * GET /api/cms/services
 * Fetch all services
 */
export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cms/services
 * Create a new service
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const icon = formData.get('icon') as string;
    const featuresRaw = formData.get('features') as string;
    const features = featuresRaw ? JSON.parse(featuresRaw) : [];
    const status = formData.get('status') as string;
    const certification = formData.get('certification') as string;
    const order = parseInt(formData.get('order') as string) || 0;
    const imageFile = formData.get('image') as File;

    let imageUrl = '';

    // Upload image if provided
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile, 'projects'); // Using projects bucket for simplicity
      if (!uploadedUrl) {
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
      imageUrl = uploadedUrl;
    } else {
      return NextResponse.json(
        { error: 'Service image is mandatory' },
        { status: 400 }
      );
    }

    const serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'> = {
      title,
      description,
      icon,
      features,
      status,
      certification,
      image_url: imageUrl,
      order,
    };

    const service = await createService(serviceData);

    if (!service) {
      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      );
    }

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/services
 * Update a service
 */
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    if (!id) {
      return NextResponse.json(
        { error: 'Service ID required' },
        { status: 400 }
      );
    }

    const updates: any = {};

    if (formData.has('title')) updates.title = formData.get('title');
    if (formData.has('description')) updates.description = formData.get('description');
    if (formData.has('icon')) updates.icon = formData.get('icon');
    if (formData.has('features')) updates.features = JSON.parse(formData.get('features') as string);
    if (formData.has('status')) updates.status = formData.get('status');
    if (formData.has('certification')) updates.certification = formData.get('certification');
    if (formData.has('order')) updates.order = parseInt(formData.get('order') as string);

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile, 'projects'); // Using projects bucket
      if (!uploadedUrl) {
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
      updates.image_url = uploadedUrl;
    }

    const service = await updateService(id, updates);

    if (!service) {
      return NextResponse.json(
        { error: 'Failed to update service' },
        { status: 500 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cms/services?id=xxx
 * Delete a service
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Service ID required' },
        { status: 400 }
      );
    }

    const success = await deleteService(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete service' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
