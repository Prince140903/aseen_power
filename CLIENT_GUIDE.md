# Website Content Management Guide

This guide explains how to manage your website's content without needing any technical skills. Everything is done through a simple admin panel in your browser.

---

## Table of Contents

1. [How to Access the Admin Panel](#how-to-access-the-admin-panel)
2. [Overview of the CMS Sections](#overview-of-the-cms-sections)
3. [Managing Services](#managing-services)
4. [Managing Projects](#managing-projects)
5. [Managing Gallery](#managing-gallery)
6. [Managing Documents](#managing-documents)
7. [Managing Settings](#managing-settings)
8. [How the Documents Page Works](#how-the-documents-page-works)
9. [Default Passwords](#default-passwords)
10. [FAQ & Troubleshooting](#faq--troubleshooting)

---

## How to Access the Admin Panel

1. Open your browser and go to your website address followed by `/admin`.
   - Example: `www.yourwebsite.com/admin`
2. You will see a login screen asking for an **Admin Password**.
3. Enter the password and click **"ACCESS ADMIN PANEL"**.
4. Once logged in, you can manage all your website content.

> **Default Password:** `admin@aseen2026`
> 
> ⚠️ **Change this password before your website goes live.** You can change it by setting an environment variable called `ADMIN_PASSWORD` on your hosting platform.

---

## Overview of the CMS Sections

After logging in, you will see a **black sidebar** on the left with five tabs:

| Tab | What It Controls |
|-----|------------------|
| **Services** | The services shown on your homepage |
| **Projects** | Your completed project portfolio |
| **Gallery** | Photo gallery displayed on the site |
| **Documents** | Files available for download by visitors |
| **Settings** | Website-wide information (contact details, social links, passwords, etc.) |

Click any tab to open its content manager.

---

## Managing Services

The **Services** tab lets you add, edit, or remove services displayed on your website.

### Adding a New Service

1. Click the **"+ Add Service"** button.
2. Fill in the form:
   - **Title** – Name of the service (e.g., "DG Synchronization")
   - **Description** – A short paragraph describing the service
   - **Icon** – Choose an icon name (e.g., Factory, Zap, Wrench)
   - **Features** – List the key features (separated by commas or add one per line)
   - **Status** – Current status (e.g., "Active", "Available")
   - **Certification** – Any relevant certification
   - **Order** – A number to control the display sequence (lower numbers appear first)
3. Click **"Save"**.

### Editing or Deleting a Service

- Click the **pencil (✎) icon** to edit an existing service.
- Click the **trash (🗑) icon** to delete a service.

---

## Managing Projects

The **Projects** tab lets you showcase your completed work.

### Adding a New Project

1. Click **"+ Add Project"**.
2. Fill in the form:
   - **Title** – Project name
   - **Category** – Choose from Industrial, Commercial, or Infrastructure
   - **Location** – Where the project was executed
   - **Description** – A brief overview of the work done
   - **kVA** – The power rating (e.g., "500 kVA")
   - **Year** – Year of completion
   - **Image** – Upload a project photo
   - **Featured** – Toggle ON to highlight this project on the homepage
   - **Order** – Display sequence number
3. Click **"Save"**.

---

## Managing Gallery

The **Gallery** tab controls the images shown in your website's gallery section.

### Adding an Image

1. Click **"+ Add Image"**.
2. Choose a **Category** (Industrial, Commercial, or Infrastructure).
3. Enter a **Title** and optional **Caption**.
4. Upload the image file.
5. Set the **Order** number.
6. Click **"Save"**.

---

## Managing Documents

The **Documents** tab lets you upload files (PDFs, brochures, datasheets, etc.) that visitors can download from the documents page.

### Adding a Document

1. Click **"+ Add Document"**.
2. Enter a **Title** and **Description**.
3. Upload the file using the file picker.
4. Set the **Order** number.
5. Click **"Save"**.

The document will now appear on the `/documents` page for visitors to download.

---

## Managing Settings

The **Settings** tab is where you configure all the site-wide information.

### What You Can Change

| Section | Fields |
|---------|--------|
| **Site** | Title, Tagline, Description |
| **Contact** | Email, Phone Number, Address, Business Registration Number |
| **Security** | Document Access Password (the password visitors need to see /documents) |
| **Social** | LinkedIn, Twitter, Facebook profile links |
| **Footer** | Company description, Year Founded, Copyright text |

### Changing the Document Access Password

1. Go to the **Settings** tab.
2. Scroll down to the **Security** section.
3. Find the **"Document Access Password"** field.
4. Type the new password.
5. Click **"Save Settings"** at the bottom.

The change takes effect immediately. All visitors will need the new password to access the documents page.

---

## How the Documents Page Works

Your website has a protected **Documents Page** at `/documents` (e.g., `www.yourwebsite.com/documents`).

### For Your Clients / Visitors

1. They visit `/documents`.
2. They see a password entry screen.
3. After entering the **correct document password**, they gain access.
4. They can then browse and download any files you have uploaded.
5. The access remains until they close their browser.

### How You Control Access

- You set the password from the **Admin → Settings → Security → Document Access Password** field.
- You add/remove documents from the **Admin → Documents** tab.
- You can change the password at any time without affecting the uploaded documents.

---

## Default Passwords

Here is a quick reference of all default passwords. **Change these before launching your site.**

| Access Point | Default Password | How to Change |
|-------------|-----------------|---------------|
| **Admin Panel** (`/admin`) | `admin@aseen2026` | Set the `ADMIN_PASSWORD` environment variable on your hosting platform |
| **Documents Page** (`/documents`) | `aseenpower2026` | Go to Admin → Settings → Security → Document Access Password |

### How to Change the Admin Password (For Developers)

The admin password can be overridden by setting an environment variable. If you are using Vercel, Netlify, or similar:

1. Go to your hosting dashboard.
2. Find **Environment Variables**.
3. Add a variable named `ADMIN_PASSWORD` with your desired value.
4. Redeploy your site.

When the environment variable is set, it will take priority over the default password.

---

## FAQ & Troubleshooting

### I forgot my Admin password. What do I do?

Contact your developer. They can reset it via the hosting environment variables.

### Changes I make in the Admin Panel are not showing on the website.

Try refreshing the website page. If the issue persists, the changes are saved in the database and may take a moment to propagate.

### Visitors cannot access the Documents page.

Make sure:
- The document access password is set in **Admin → Settings → Security**.
- You have shared the correct password with your visitors.
- Documents have been uploaded in the **Admin → Documents** tab.

### I uploaded an image but it's not appearing.

Check that:
- The upload completed successfully (you should see a success message).
- The image file is in a supported format (JPG, PNG, WEBP).
- The file size is not too large (keep images under 5 MB for best results).

---

## Quick Summary

| Task | Where to Go |
|------|-------------|
| Add a service | Admin → Services → + Add Service |
| Add a project | Admin → Projects → + Add Project |
| Add a gallery image | Admin → Gallery → + Add Image |
| Upload a document | Admin → Documents → + Add Document |
| Change document password | Admin → Settings → Security |
| Update contact info | Admin → Settings → Contact |
| Update social links | Admin → Settings → Social |

---

> **Need help?** Contact your developer for any technical support related to this website.