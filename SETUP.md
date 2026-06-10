# Aseen Power - Production Setup Guide

This guide covers the final configuration needed to make your application production-ready.

## Table of Contents
1. [Quick Start](#quick-start)
2. [EmailJS Setup](#emailjs-setup)
3. [Protected Documents Configuration](#protected-documents-configuration)
4. [Supabase Security](#supabase-security)
5. [Production Deployment Checklist](#production-deployment-checklist)

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the example file and fill in your credentials:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values.

### 3. Test Locally
```bash
npm run dev
```

---

## EmailJS Setup

EmailJS handles all form submissions (quote requests and contact forms). Follow these steps:

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select your email provider (Gmail, Outlook, etc.) or use EmailJS SMTP
4. Copy your **Service ID** (e.g., `service_xxxxx`)

### Step 3: Create Email Templates

#### Template 1: Quote Request Email
1. Go to **Email Templates** → **Create New Template**
2. Name: `Quote Request`
3. Subject: `New Quote Request from {{from_name}}`
4. Template content:
```
Hello,

You have received a new quote request:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Project Scope: {{project_scope}}
Details: {{message}}

Reply To: {{reply_to}}

Best regards,
Aseen Power System
```
5. Copy the **Template ID** (e.g., `template_xxxxx`)

#### Template 2: Contact Form Email
1. Create another template named `Contact Form`
2. Subject: `New Contact Inquiry from {{from_name}}`
3. Template content:
```
Hello,

You have received a new contact inquiry:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}
Category: {{category}}
Urgency: {{urgency}}
Message: {{message}}

Reply To: {{reply_to}}

Best regards,
Aseen Power System
```
4. Copy the **Template ID**

### Step 4: Get Your Public Key
1. In EmailJS dashboard, go to **Account** → **API Keys**
2. Copy your **Public Key**

### Step 5: Update .env.local
```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL=your-email@aseenpower.com
```

### Step 6: Test the Forms
1. Go to http://localhost:3000
2. Click "Request Quote" button
3. Fill in the form and submit
4. Check your email (specified in NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL)

---

## Protected Documents Configuration

### Overview
Documents are password-protected. The password is managed through the CMS Settings panel and is fetched dynamically.

### Setting the Document Access Password

#### Via CMS Admin Panel
1. Navigate to http://yoursite.com/admin
2. Login with admin credentials
3. Click the **Settings** tab
4. Find the **Document Access Password** field
5. Enter your desired password
6. Click **Save Settings**
7. Password changes take effect immediately

#### Default Password
- The default password is: `aseenpower2026`
- Change this immediately in production

### How Users Access Documents
1. User visits `/documents`
2. They see a password entry screen
3. After entering the correct password, they can:
   - View the document library
   - Download/view individual documents
4. Password is stored in localStorage (cleared when browser closes)

### Security Notes
- ✅ Passwords are verified against Supabase CMS settings
- ✅ No hardcoded passwords in frontend code
- ✅ Password can be updated anytime from CMS
- ✅ Each download request validates the password
- ⚠️ Store passwords securely in your .env for admin
- ⚠️ Change default passwords before going live

---

## Supabase Security

### Database Structure
Ensure your Supabase database has these tables:
- `services` - Services information
- `projects` - Project portfolio
- `gallery` - Gallery images
- `documents` - Document metadata
- `settings` - Site settings including document password

### Required Settings Fields
The `settings` table should have these fields:
```
- id (uuid, primary key)
- site_title (text)
- site_tagline (text)
- site_description (text)
- contact_email (text)
- contact_phone (text)
- contact_address (text)
- business_registration (text)
- document_access_password (text) ← IMPORTANT
- social_linkedin (text)
- social_twitter (text)
- social_facebook (text)
- footer_description (text)
- footer_year_founded (integer)
- footer_copyright (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Security Rules (Row Level Security)
For production, enable RLS policies:

#### Services Table (Public Read)
```sql
-- Allow anyone to read
CREATE POLICY "Enable read access for all users" ON services
  FOR SELECT USING (true);

-- Allow authenticated users to create/update (for CMS)
CREATE POLICY "Enable insert/update for authenticated users" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

#### Settings Table (Controlled Access)
```sql
-- Read allowed for everyone (public settings only)
CREATE POLICY "Enable read for all" ON settings
  FOR SELECT USING (true);

-- Write only for admin (via service role)
CREATE POLICY "Enable write for service role" ON settings
  FOR UPDATE USING (auth.role() = 'service_role');
```

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key (safe to expose)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (NEVER expose client-side)

---

## Production Deployment Checklist

### Before Going Live

- [ ] Update all hardcoded passwords in `.env`
- [ ] Configure EmailJS with valid credentials
- [ ] Test all form submissions
- [ ] Set document access password via CMS
- [ ] Verify Supabase RLS policies are enabled
- [ ] Test document download with correct password
- [ ] Verify all Supabase tables are populated
- [ ] Test responsive layouts on mobile devices
- [ ] Enable CORS in Supabase for your domain
- [ ] Setup SSL certificate
- [ ] Configure backup strategy for Supabase
- [ ] Review error handling and logging
- [ ] Test admin login on production domain
- [ ] Disable dev mode logging
- [ ] Setup error tracking (Sentry, etc.)
- [ ] Configure CDN for static assets

### Error Handling

The application includes error handling for:
- ✅ Form validation errors
- ✅ Network failures
- ✅ Invalid passwords
- ✅ Missing documents
- ✅ Database connection issues
- ✅ EmailJS failures

### Form Validation

All forms include:
- ✅ Client-side validation
- ✅ Server-side validation
- ✅ Email format validation
- ✅ Required field checking
- ✅ Message length validation
- ✅ Error messages for users

### Loading States

Visual feedback for:
- ✅ Form submission loading spinners
- ✅ Document download loading
- ✅ Password verification loading
- ✅ Button disable during submission
- ✅ Disabled form fields during submission

### Empty States

Handled for:
- ✅ No documents available
- ✅ No services available
- ✅ No projects available
- ✅ No gallery images

---

## Troubleshooting

### Forms Not Sending
1. Check EmailJS credentials in `.env.local`
2. Verify EmailJS templates exist and IDs match
3. Check browser console for errors
4. Verify email service is active in EmailJS dashboard

### Documents Can't Be Accessed
1. Verify document password is set in CMS Settings
2. Ensure documents exist in Supabase database
3. Check password matches exactly (case-sensitive)
4. Verify document files are in Supabase Storage

### Admin Login Not Working
1. Check `ADMIN_PASSWORD` in `.env.local`
2. Verify password matches exactly
3. Clear browser localStorage if stuck
4. Check browser console for errors

### Supabase Connection Issues
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` format
3. Ensure Supabase project is active
4. Check network tab in browser for failed requests

---

## Next Steps

1. **Configure Email Templates** - Set up your email templates in EmailJS
2. **Import Settings** - Add your company settings to CMS
3. **Upload Documents** - Upload documents through the CMS
4. **Test Everything** - Test all forms and features
5. **Deploy** - Deploy to production
6. **Monitor** - Setup monitoring and error tracking

---

## Support

For issues or questions:
- Check the console for error messages
- Review Supabase logs
- Check EmailJS activity log
- Verify all environment variables are set

