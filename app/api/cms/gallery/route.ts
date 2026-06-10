import { NextRequest, NextResponse } from 'next/server';
import {
  getGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  uploadImage,
  GalleryImage
} from '@/lib/supabase-client';

/**
 * GET /api/cms/gallery
 * Fetch all gallery images
 */
export async function GET() {
  try {
    const gallery = await getGallery();
    return NextResponse.json({ gallery });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cms/gallery
 * Create a new gallery image
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const category = formData.get('category') as string;
    const title = formData.get('title') as string;
    const caption = formData.get('caption') as string;
    const imageFile = formData.get('image') as File;
    const order = parseInt(formData.get('order') as string) || 0;

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { error: 'Image file required' },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(imageFile, 'gallery');
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    const imageData: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'> = {
      category,
      title,
      caption,
      image_url: imageUrl,
      order,
    };

    const image = await createGalleryImage(imageData);

    if (!image) {
      return NextResponse.json(
        { error: 'Failed to create gallery image' },
        { status: 500 }
      );
    }

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/gallery
 * Update a gallery image
 */
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    if (!id) {
      return NextResponse.json(
        { error: 'Image ID required' },
        { status: 400 }
      );
    }

    const updates: any = {};

    if (formData.has('category')) updates.category = formData.get('category');
    if (formData.has('title')) updates.title = formData.get('title');
    if (formData.has('caption')) updates.caption = formData.get('caption');
    if (formData.has('order')) updates.order = parseInt(formData.get('order') as string);

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadImage(imageFile, 'gallery');
      if (!uploadedUrl) {
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
      updates.image_url = uploadedUrl;
    }

    const image = await updateGalleryImage(id, updates);

    if (!image) {
      return NextResponse.json(
        { error: 'Failed to update gallery image' },
        { status: 500 }
      );
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cms/gallery?id=xxx
 * Delete a gallery image
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID required' },
        { status: 400 }
      );
    }

    const success = await deleteGalleryImage(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete gallery image' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
