import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const SETTINGS_FILE = path.join(CONTENT_DIR, 'settings.json');

export async function GET() {
  try {
    const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    const data = JSON.parse(content);
    
    // Deep merge settings
    const updated = {
      ...data,
      site: { ...data.site, ...body.site },
      contact: { ...data.contact, ...body.contact },
      security: { ...data.security, ...body.security },
      social: { ...data.social, ...body.social },
      footer: { ...data.footer, ...body.footer }
    };
    
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
