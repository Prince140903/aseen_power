import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/forms/contact
 * Accepts contact form data
 * 
 * This is a backend placeholder. In production, you would:
 * 1. Log the request to database for CRM integration
 * 2. Send confirmation email to user
 * 3. Send admin notification with all details
 * 4. Implement rate limiting
 * 5. Add CSRF protection
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, emailAddress, company, phone, projectCategory, urgency, message } = body;

    // Validate required fields
    if (!fullName || !emailAddress || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, emailAddress, message' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // In production, implement:
    // 1. Rate limiting (check client IP)
    // 2. Spam detection (akismet, etc.)
    // 3. Database logging for CRM
    // 4. Send confirmation email to user
    // 5. Send admin notification
    // 6. Optionally integrate with support ticket system

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        submittedAt: new Date().toISOString(),
        name: fullName,
        email: emailAddress,
        category: projectCategory
      }
    });

  } catch (error) {
    console.error('Error processing contact request:', error);
    return NextResponse.json(
      { error: 'Failed to process contact request' },
      { status: 500 }
    );
  }
}
