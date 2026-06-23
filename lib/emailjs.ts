/**
 * EmailJS Integration
 * Handles all email sending functionality
 */

import emailjs from '@emailjs/browser';

let emailJSInitialized = false;

// Initialize EmailJS when client loads
export const initializeEmailJS = (): boolean => {
  try {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error('EmailJS public key not configured');
      return false;
    }

    if (!emailJSInitialized) {
      emailjs.init(publicKey);
      emailJSInitialized = true;
    }

    return true;
  } catch (error) {
    console.error('Error initializing EmailJS:', error);
    return false;
  }
};

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
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

type NormalizedSubmission = {
  formType: 'Quote Request' | 'Contact Us';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  projectScope?: string;
  category?: string;
  urgency?: string;
};

const getAdminEmail = () => {
  const configuredEmail = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL?.trim();
  return configuredEmail || 'contact@aseenpower.com';
};

const getProvidedValue = (value?: string) => {
  const trimmedValue = value?.trim();
  return trimmedValue || 'Not provided';
};

const buildOptionalDetails = (details: Record<string, string | undefined>) => {
  return Object.entries(details)
    .filter(([, value]) => Boolean(value?.trim()))
    .map(([label, value]) => `${label}: ${value?.trim()}`)
    .join('\n');
};

const normalizeQuoteSubmission = (formData: QuoteFormData): NormalizedSubmission => ({
  formType: 'Quote Request',
  name: formData.name.trim(),
  email: formData.email.trim(),
  phone: formData.phone.trim(),
  company: formData.company.trim(),
  subject: formData.projectScope,
  message: formData.details.trim(),
  projectScope: formData.projectScope,
});

const normalizeContactSubmission = (formData: ContactFormData): NormalizedSubmission => ({
  formType: 'Contact Us',
  name: formData.fullName.trim(),
  email: formData.emailAddress.trim(),
  phone: formData.phone.trim(),
  company: formData.company.trim(),
  subject: formData.projectCategory,
  message: formData.message.trim(),
  category: formData.projectCategory,
  urgency: formData.urgency,
});

const buildTemplateParams = (submission: NormalizedSubmission, toEmail: string) => {
  const optionalDetails = buildOptionalDetails({
    Phone: submission.phone,
    Company: submission.company,
    'Project Scope': submission.projectScope,
    Category: submission.category,
    Urgency: submission.urgency,
  });

  return {
    to_email: toEmail,
    recipient_email: toEmail,
    admin_email: getAdminEmail(),
    user_email: submission.email,
    from_name: submission.name,
    from_email: submission.email,
    reply_to: submission.email,
    form_type: submission.formType,
    request_type: submission.formType,
    request_subject: submission.subject,
    subject: submission.subject,
    message: submission.message,
    phone: getProvidedValue(submission.phone),
    company: getProvidedValue(submission.company),
    project_scope: getProvidedValue(submission.projectScope),
    category: getProvidedValue(submission.category),
    urgency: getProvidedValue(submission.urgency),
    optional_details: optionalDetails || 'No additional details provided',
  };
};

const getEmailJSConfig = () => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const adminTemplateId = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
  const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;

  if (!serviceId || !adminTemplateId || !autoReplyTemplateId) {
    console.error('EmailJS service, shared admin template, or shared auto-reply template ID not configured');
    return null;
  }

  return { serviceId, adminTemplateId, autoReplyTemplateId };
};

const sendSubmissionEmail = async (submission: NormalizedSubmission): Promise<boolean> => {
  try {
    const emailJSConfig = getEmailJSConfig();
    if (!emailJSConfig) {
      return false;
    }

    const emailjsReady = initializeEmailJS();
    if (!emailjsReady) {
      return false;
    }

    const adminEmail = getAdminEmail();
    const [adminResponse, autoReplyResponse] = await Promise.all([
      emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.adminTemplateId,
        buildTemplateParams(submission, adminEmail)
      ),
      emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.autoReplyTemplateId,
        buildTemplateParams(submission, submission.email)
      ),
    ]);

    return adminResponse.status === 200 && autoReplyResponse.status === 200;
  } catch (error) {
    console.error(`Error sending ${submission.formType} email:`, error);
    return false;
  }
};

/**
 * Send quote request email
 */
export const sendQuoteEmail = async (formData: QuoteFormData): Promise<boolean> => {
  return sendSubmissionEmail(normalizeQuoteSubmission(formData));
};

/**
 * Send contact form email
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  return sendSubmissionEmail(normalizeContactSubmission(formData));
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
