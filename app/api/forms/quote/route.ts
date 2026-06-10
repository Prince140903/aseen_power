import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/forms/quote
 * Accepts quote request form data and sends email via EmailJS
 * 
 * This is a backend placeholder. In production, you would:
 * 1. Log the request to database for CRM integration
 * 2. Send confirmation email to user
 * 3. Send admin notification
 * 4. Implement rate limiting
 * 5. Add CSRF protection
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, projectScope, details } = body;

    // Validate required fields
    if (!name || !email || !projectScope) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, projectScope' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // In production, implement:
    // 1. Rate limiting (check client IP)
    // 2. Spam detection
    // 3. Database logging
    // 4. Confirmation email to user
    // 5. Admin notification

    // For now, just return success
    // The actual email sending happens client-side via EmailJS
    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      data: {
        submittedAt: new Date().toISOString(),
        name,
        email,
        company
      }
    });

  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
