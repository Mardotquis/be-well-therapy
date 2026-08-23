# Be Well Therapy - High-Level Architecture

## Overview

Be Well Therapy is a **therapist business website** built as a modern, server-side rendered (SSR) web application using Next.js and Express.js. The application is designed to be deployed either as a serverless application on AWS Lambda or as a static site on Netlify.

**Live URL:** https://www.bewelltherapy.org

---

## Technology Stack

### Frontend
- **Next.js 9.3.6** - React framework with SSR and static site generation capabilities
- **React 16.13.1** - UI library for building component-based interfaces
- **Sass/SCSS** - CSS preprocessing for styling
- **next-images** - Image optimization and handling

### Backend
- **Express.js 4.17.1** - Node.js web application framework
- **Node.js 14.x** - JavaScript runtime (specified in serverless config)
- **Nodemailer** - Email sending functionality for contact forms
- **body-parser** - Parse incoming request bodies
- **express-sanitizer** - Input sanitization for security
- **CORS** - Cross-Origin Resource Sharing middleware

### Deployment & Infrastructure
- **Serverless Framework 3.18.2** - Infrastructure as Code (IaC) for AWS deployment
- **serverless-http** - Wrapper to adapt Express for AWS Lambda
- **AWS Lambda** - Serverless compute (production deployment option)
- **AWS API Gateway** - HTTP API endpoint routing
- **Netlify** - Alternative static site deployment platform

### Development Tools
- **ESLint** - JavaScript linting with Airbnb configuration
- **Nodemon** - Development server with auto-reload
- **dotenv** - Environment variable management

---

## Architecture Pattern

### Hybrid SSR/SSG Architecture

The application follows a **hybrid Server-Side Rendering (SSR) and Static Site Generation (SSG)** pattern:

1. **Development Mode**: Runs as a traditional Next.js + Express application with hot reloading
2. **Production Mode (AWS)**: Deployed as a serverless function using AWS Lambda + API Gateway
3. **Production Mode (Netlify)**: Exported as static HTML files

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              AWS API Gateway / Netlify CDN                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js Application                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware Layer                                    │   │
│  │  - CORS                                              │   │
│  │  - Body Parser                                       │   │
│  │  - Sanitizer                                         │   │
│  │  - Custom Logger                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                       │                                      │
│       ┌───────────────┴────────────────┐                    │
│       ▼                                 ▼                    │
│  ┌─────────────┐              ┌──────────────────┐          │
│  │   API Routes │              │  Next.js Handler │          │
│  │  /api/*      │              │   (SSR Pages)    │          │
│  └─────────────┘              └──────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Nodemailer    │
              │  (Email SMTP)  │
              └────────────────┘
```

---

## Application Structure

### Directory Organization

```
be-well-therapy/
├── components/          # Reusable React components
│   ├── aboutUs/        # About Us page components
│   ├── forms/          # Form components (contact form)
│   ├── home/           # Home page components (hero, cards)
│   ├── nav/            # Navigation components
│   ├── ourServices/    # Services page components
│   ├── ourStaff/       # Staff page components
│   ├── footer.js
│   ├── header.js
│   └── modal/
│
├── layouts/            # Page layout templates
│   ├── default.js      # Default layout wrapper (Navbar + Footer)
│   └── meta.js         # SEO meta tags component
│
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.js         # Custom App component
│   ├── _error.js       # Custom error page
│   ├── index.js        # Home page
│   ├── about-us/
│   ├── forms/
│   ├── our-services/
│   └── our-staff/
│
├── server/             # Express.js backend
│   ├── index.js        # Main Express server setup
│   ├── serverRouter.js # API route definitions
│   ├── clientRoutes.js # Client-side route mappings
│   ├── helpers.js      # Utility functions
│   └── contact/        # Contact form email handler
│       └── index.js
│
├── public/             # Static assets
│   └── assets/         # SCSS stylesheets
│
├── index.js            # Serverless Lambda handler wrapper
├── next.config.js      # Next.js configuration
├── serverless.yml      # AWS deployment configuration
└── package.json        # Dependencies and scripts
```

---

## Core Components

### 1. Express Server (`server/index.js`)

The Express application serves as the foundation, handling:
- **Middleware configuration** (CORS, body parsing, sanitization)
- **API routing** (`/api/*` endpoints)
- **Next.js integration** (SSR for React pages)
- **Static file serving**
- **Custom logging** for production

**Key Features:**
- CORS whitelist for `bewelltherapy.org` domains
- Automatic route generation from `clientRoutes.js`
- Dual-mode operation (development vs production)

### 2. API Layer (`server/serverRouter.js`)

RESTful API endpoints:
- `GET /api/` - Health check endpoint
- `POST /api/contact` - Contact form submission handler

**Security:**
- Input sanitization middleware
- Express-sanitizer to prevent XSS attacks

### 3. Next.js Pages

**Page Routing (File-based):**
- `/` → `pages/index.js` (Home)
- `/about-us` → `pages/about-us/index.js`
- `/forms` → `pages/forms/index.js`
- `/our-services` → `pages/our-services/index.js`
- `/our-staff` → `pages/our-staff/index.js`

**Configured for static export** via `exportPathMap` in `next.config.js`.

### 4. Email Service (`server/contact/index.js`)

**Nodemailer Integration:**
- Stage-aware configuration (development vs production)
- HTML email templates
- Environment-based SMTP settings

**Email Flow:**
1. Client submits contact form
2. Express validates and sanitizes input
3. Nodemailer formats HTML email
4. SMTP transport sends to configured recipient

---

## Deployment Architecture

### Option 1: AWS Serverless (Lambda + API Gateway)

**Configuration:** `serverless.yml`

```yaml
Provider: AWS
Runtime: Node.js 14.x
Region: us-east-1
Function: server (handles all HTTP requests)
Events: 
  - ANY /
  - ANY /{proxy+}
Binary Types: */* (images, media)
```

**Deployment Process:**
1. `npm run build` - Create Next.js production build
2. `sls deploy --stage [dev|prod]` - Deploy to AWS

**Key Characteristics:**
- Lambda function wraps Express app using `serverless-http`
- API Gateway routes all traffic to Lambda
- Binary mime-type support for images
- Environment-based configuration (dev/production stages)

### Option 2: Netlify Static Hosting

**Deployment Process:**
1. `npm run build` - Create Next.js build
2. `npm run export` - Export static HTML files to `out/` directory
3. Netlify serves static files from CDN

**Status Badge:** [![Netlify Status](https://api.netlify.com/api/v1/badges/79e69b35-e146-4954-85b3-81f8931a3563/deploy-status)](https://app.netlify.com/sites/jolly-poitras-76531e/deploys)

---

## Data Flow

### Contact Form Submission

```
User fills form
     │
     ▼
React Component (components/forms/contact)
     │
     ▼
HTTP POST /api/contact
     │
     ▼
Express Router (server/serverRouter.js)
     │
     ▼
Sanitization Middleware
     │
     ▼
Contact Handler (server/contact/index.js)
     │
     ▼
Nodemailer SMTP Transport
     │
     ▼
Email Service (Gmail/Mailtrap)
     │
     ▼
Recipient Inbox
```

### Page Rendering (SSR)

```
User requests page (e.g., /about-us)
     │
     ▼
API Gateway / Netlify
     │
     ▼
Express Server
     │
     ▼
Next.js Handler
     │
     ▼
React Component Rendering
     │
     ▼
HTML sent to client
     │
     ▼
Client hydration (React takes over)
```

---

## Environment Configuration

**Environment Variables** (`.env` file):

### Development
- `DEV_HOST` - SMTP host (e.g., Mailtrap)
- `DEV_CONTACT_EMAIL` - SMTP username
- `DEV_CONTACT_PASS` - SMTP password
- `DEV_EMAIL` - From email address

### Production
- `PROD_HOST` - Production SMTP host
- `PROD_CONTACT_EMAIL` - Production SMTP username
- `PROD_CONTACT_PASS` - Production SMTP password
- `PROD_EMAIL` - Production from email
- `PROD_SERVICE` - Email service provider (e.g., Gmail)
- `PROD_RECIPIENT` - Email recipient for contact forms

**Stage Detection:**
- `CURRENT_STAGE` environment variable determines which config to use
- Set via serverless deployment or manually

---

## Security Features

1. **Input Sanitization**
   - `express-sanitizer` middleware on all `/api` routes
   - Custom `sanitizeBody` helper function

2. **CORS Configuration**
   - Whitelist of allowed origins
   - Protects against unauthorized cross-origin requests

3. **Environment Variable Protection**
   - Sensitive credentials in `.env` (gitignored)
   - `.env.example` provides template

4. **Email Validation**
   - Required field validation in contact handler
   - Error handling for missing data

---

## Build & Deployment Scripts

```json
{
  "dev": "next -p 8080",                    // Local development
  "start": "nodemon server.js",              // Local with auto-reload
  "build": "next build",                     // Production build
  "export": "next export",                   // Static export
  "netlify-deploy": "build && export",       // Netlify pipeline
  "deploy:dev": "build && sls deploy --stage development",
  "deploy:prod": "build && sls deploy --stage production"
}
```

---

## Key Design Decisions

1. **Hybrid Deployment Strategy**
   - Flexibility to deploy as serverless (AWS) or static (Netlify)
   - Same codebase supports both architectures

2. **Express + Next.js Integration**
   - Custom Express server provides API endpoints
   - Next.js handles React SSR and routing
   - Allows backend functionality without separate API service

3. **File-Based Routing**
   - Next.js convention for page creation
   - Simplified routing without explicit configuration

4. **Environment-Based Configuration**
   - Development uses Mailtrap for safe email testing
   - Production uses real SMTP service
   - Stage-aware server behavior

5. **Component-Based Architecture**
   - Reusable React components organized by page/feature
   - Default layout wrapper for consistent header/footer
   - Separation of concerns (presentation vs logic)

---

## Scalability Considerations

### Current Architecture
- **Suitable for:** Small to medium traffic websites
- **Strengths:** 
  - Serverless auto-scales with Lambda
  - Static CDN for fast global delivery (Netlify)
  - Low operational overhead

### Limitations
- No database (currently stateless)
- Email service dependency for contact forms
- Lambda cold starts on AWS deployment

### Future Enhancements
- Add database for storing contact submissions
- Implement form spam protection (reCAPTCHA)
- Add analytics tracking
- Optimize image loading with Next.js Image component
- Upgrade to latest Next.js version for modern features

---

## Maintenance & Development

**Current Maintainer:** Marquis Mitchell (sole maintainer)

**Development Workflow:**
1. Clone repository
2. Install dependencies: `npm install`
3. Configure `.env` from `.env.example`
4. Run dev server: `npm run dev`
5. Access at `http://localhost:8080`

**Code Quality:**
- ESLint with Airbnb style guide
- React best practices enforced
- Consistent file organization

---

## Summary

Be Well Therapy is a well-architected, modern web application that demonstrates best practices for:
- ✅ Server-Side Rendering (SSR) with Next.js
- ✅ RESTful API design with Express
- ✅ Serverless deployment patterns
- ✅ Security-first development (sanitization, CORS, env vars)
- ✅ Hybrid deployment flexibility (AWS Lambda + Netlify)
- ✅ Component-based UI architecture
- ✅ Environment-aware configuration

The architecture is **simple, maintainable, and production-ready** for a therapist business website with contact form functionality and informational pages.
