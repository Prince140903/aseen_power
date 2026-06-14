# Corporate Website with CMS — Next.js + Supabase

A full-stack, production-ready corporate/business website featuring a custom Content Management System, protected document portal, and modern UI with smooth animations.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database & Storage:** Supabase
- **Animations:** Motion (formerly Framer Motion)
- **Forms:** EmailJS integration
- **Icons:** Lucide React

## Features

- **🏢 Public Website** — Multi-section corporate site with Home, About, Services, Projects, Gallery, Clients, and Contact pages
- **🔐 Admin CMS Panel** (`/admin`) — Password-protected dashboard for non-technical users to manage all site content
- **📄 Protected Document Portal** (`/documents`) — Password-gated document library for secure file sharing with clients
- **📝 Dynamic Content Management** — Add, edit, and delete Services, Projects, Gallery images, and Documents via the admin interface
- **⚙️ Site Settings Manager** — Update contact info, social links, footer content, and security passwords without code changes
- **📬 Contact & Quote Forms** — EmailJS-powered form submissions with instant notifications
- **✨ Smooth Animations** — Scroll-triggered reveals, staggered entrances, premium cursor effects, and scroll progress indicator
- **📱 Fully Responsive** — Optimized for desktop, tablet, and mobile

## Project Structure

```
├── app/
│   ├── admin/          # CMS admin panel (password-protected)
│   ├── documents/      # Protected document portal
│   ├── api/
│   │   ├── cms/        # CRUD APIs for services, projects, gallery, documents, settings
│   │   ├── content/    # Public content APIs
│   │   ├── documents/  # Document download with password verification
│   │   └── forms/      # EmailJS form submission handlers
│   └── page.tsx        # Homepage
├── components/
│   ├── admin/          # Admin tab components (Services, Projects, Gallery, Documents, Settings)
│   ├── animations/     # ScrollReveal, StaggerContainer
│   └── interactions/   # PremiumCursor, ScrollProgress, BackToTop
├── lib/
│   ├── cms.ts          # Server-side CMS data loaders
│   ├── supabase-client.ts  # Supabase client & DB operations
│   ├── emailjs.ts      # EmailJS configuration
│   └── utils.ts        # Utility helpers
└── public/assets/      # Static assets, logos, client images
```

## Default Access Points

| Page | URL | Purpose |
|------|-----|---------|
| Admin Panel | `/admin` | CMS for managing all content |
| Documents Portal | `/documents` | Protected file downloads for clients |

## License

Proprietary — All rights reserved.
