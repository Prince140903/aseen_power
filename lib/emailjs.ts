/**
 * EmailJS Integration
 * Handles all email sending functionality
 */

// Initialize EmailJS from CDN when client loads
export const initializeEmailJS = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      (window as any).emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    };
  }
};

export interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  projectScope: string;
  details: string;
}

export interface ContactFormData {
  fullName: string;
  company: string;
  emailAddress: string;
  phone: string;
  projectCategory: string;
  urgency: string;
  message: string;
}

/**
 * Send quote request email
 */
export const sendQuoteEmail = async (formData: QuoteFormData): Promise<boolean> => {
  try {
    if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS public key not configured');
      return false;
    }

    const templateParams = {
      to_email: process.env.NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL || 'contact@aseenpower.com',
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not provided',
      project_scope: formData.projectScope,
      message: formData.details,
      reply_to: formData.email,
    };

    const response = await (window as any).emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending quote email:', error);
    return false;
  }
};

/**
 * Send contact form email
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS public key not configured');
      return false;
    }

    const templateParams = {
      to_email: process.env.NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL || 'contact@aseenpower.com',
      from_name: formData.fullName,
      from_email: formData.emailAddress,
      company: formData.company || 'Not provided',
      phone: formData.phone || 'Not provided',
      category: formData.projectCategory,
      urgency: formData.urgency,
      message: formData.message,
      reply_to: formData.emailAddress,
    };

    const response = await (window as any).emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate form data
 */
export const validateFormData = (data: Partial<QuoteFormData | ContactFormData>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const email = (data as any).email || (data as any).emailAddress;
  if (!email) {
    errors.push('Email address is required');
  } else if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }

  const nameField = (data as any).name || (data as any).fullName;
  if (!nameField || nameField.trim().length < 2) {
    errors.push('Please enter a valid name');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
