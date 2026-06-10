import { NextRequest, NextResponse } from 'next/server';
import {
  getSettings,
  updateSettings,
} from '@/lib/supabase-client';

/**
 * GET /api/cms/settings
 * Fetch current settings
 */
export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/settings
 * Update settings
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { ...updates } = body;

    const settings = await updateSettings(updates);

    if (!settings) {
      return NextResponse.json(
        { error: 'Failed to update settings' },
        { status: 500 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
