# Laravel + Inertia.js Migration Plan
## Be Well Therapy Website

### Overview
This document outlines the complete migration plan for converting the existing Next.js application to Laravel + Inertia.js while preserving all React components and adding admin functionality via Laravel Nova.

### Current Architecture Analysis
- **Frontend**: Next.js 13.5.6 with React 18.2.0
- **Backend**: Custom Express server with serverless deployment
- **Styling**: SCSS with custom partials
- **Data**: Static JavaScript files (`staffInfo.js`, `constants.js`)
- **Deployment**: AWS Lambda via Serverless Framework
- **Features**: Contact form, static pages, staff directory

### Migration Benefits
- ✅ **Preserve all React components** (zero changes needed)
- ✅ **Laravel Nova admin panel** for staff management
- ✅ **Laravel authentication** out of the box
- ✅ **Database-driven content** instead of static files
- ✅ **File upload capabilities** for staff headshots
- ✅ **Rich text editing** for staff bios
- ✅ **Role-based access control**

---

## Phase 1: Laravel Foundation Setup (Week 1)

### 1.1 Environment Setup
```bash
# Install Laravel
composer create-project laravel/laravel be-well-therapy-laravel
cd be-well-therapy-laravel

# Install required packages
composer require inertiajs/inertia-laravel
composer require laravel/sanctum
composer require laravel/nova
composer require intervention/image

# Install frontend dependencies
npm install @inertiajs/react @inertiajs/inertia-react
npm install react react-dom
npm install sass
npm install axios
npm install uuid
npm install validate
```

### 1.2 Database Setup
```bash
# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bewelltherapy
DB_USERNAME=root
DB_PASSWORD=

# Create migrations
php artisan make:migration create_employees_table
php artisan make:migration create_services_table
php artisan make:migration create_users_table
php artisan make:migration create_contact_submissions_table
```

### 1.3 Database Schema

#### Employees Migration
```php
// database/migrations/xxxx_create_employees_table.php
public function up()
{
    Schema::create('employees', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->json('certs'); // Array of certifications
        $table->string('headshot_path');
        $table->string('headshot_position')->default('center');
        $table->json('modal_info'); // Bio and additional info
        $table->integer('sort_order')->default(0);
        $table->boolean('is_active')->default(true);
        $table->timestamps();
    });
}
```

#### Services Migration
```php
// database/migrations/xxxx_create_services_table.php
public function up()
{
    Schema::create('services', function (Blueprint $table) {
        $table->id();
        $table->string('header');
        $table->string('short_name')->unique();
        $table->string('longer_header')->nullable();
        $table->string('background_img');
        $table->string('sm_background_img');
        $table->string('rectangle_background_img')->nullable();
        $table->string('sm_rectangle_background_img')->nullable();
        $table->string('subheader')->nullable();
        $table->boolean('homepage')->default(false);
        $table->text('main_sentence');
        $table->json('modal_info');
        $table->integer('sort_order')->default(0);
        $table->boolean('is_active')->default(true);
        $table->timestamps();
    });
}
```

### 1.4 Models
```php
// app/Models/Employee.php
class Employee extends Model
{
    protected $fillable = [
        'name', 'certs', 'headshot_path', 'headshot_position',
        'modal_info', 'sort_order', 'is_active'
    ];

    protected $casts = [
        'certs' => 'array',
        'modal_info' => 'array',
        'is_active' => 'boolean'
    ];
}

// app/Models/Service.php
class Service extends Model
{
    protected $fillable = [
        'header', 'short_name', 'longer_header', 'background_img',
        'sm_background_img', 'rectangle_background_img', 'sm_rectangle_background_img',
        'subheader', 'homepage', 'main_sentence', 'modal_info',
        'sort_order', 'is_active'
    ];

    protected $casts = [
        'modal_info' => 'array',
        'homepage' => 'boolean',
        'is_active' => 'boolean'
    ];
}
```

### 1.5 Inertia Setup
```php
// app/Http/Middleware/HandleInertiaRequests.php
class HandleInertiaRequests extends Middleware
{
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ]);
    }
}
```

---

## Phase 2: Frontend Migration (Week 2)

### 2.1 Directory Structure Setup
```bash
# Create React components directory
mkdir -p resources/js/Pages
mkdir -p resources/js/Components
mkdir -p resources/js/Layouts
mkdir -p resources/js/Hooks

# Copy existing components
cp -r components/* resources/js/Components/
cp -r layouts/* resources/js/Layouts/
```

### 2.2 Update React Components for Inertia

#### Update Layout Component
```jsx
// resources/js/Layouts/Default.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Meta from './Meta';
import Navbar from '../Components/nav/Navbar';
import Footer from '../Components/Footer';

export default function Default({ children, meta }) {
    return (
        <>
            <Head>
                <title>{meta?.title ? `${meta.title} | Be Well Therapy, PLLC` : 'Be Well Therapy, PLLC'}</title>
                <meta name="description" content={meta?.description || 'The home of Be Well Therapy, PLLC'} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/img/favicon.png" />
            </Head>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
```

#### Update Staff Page
```jsx
// resources/js/Pages/OurStaff.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Default from '../Layouts/Default';
import Header from '../Components/Header';
import EmployeeCards from '../Components/ourStaff/employeeCards/EmployeeCards';

export default function OurStaff({ employees }) {
    return (
        <Default meta={{ title: 'Our Staff' }}>
            <Head title="Our Staff" />
            <Header heading="Meet Our Team" backgroundHeading="Team" />
            <EmployeeCards employees={employees} />
        </Default>
    );
}
```

### 2.3 Update Employee Cards Component
```jsx
// resources/js/Components/ourStaff/employeeCards/EmployeeCards.jsx
import React, { useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import useResize from '../../useResize';

const random = require('uuid/v4');

export default function EmployeeCards({ employees }) {
    const { mobile, resizeFunc } = useResize(800);
    
    useEffect(() => {
        resizeFunc();
        window.addEventListener('resize', resizeFunc);
        return () => {
            window.removeEventListener('resize', resizeFunc);
        };
    }, []);

    const cards = employees.map((employee) => (
        <EmployeeCard
            key={random()}
            name={employee.name}
            certs={employee.certs}
            headshotPath={employee.headshot_path}
            headshotPosition={employee.headshot_position}
            modalInfo={employee.modal_info}
            mobile={mobile}
        />
    ));
    
    return <section className="employee_cards">{cards}</section>;
}
```

### 2.4 Update Navigation
```jsx
// resources/js/Components/nav/DesktopNavbar.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import ActiveLink from './ActiveLink';
import Logo from '../Logo';
import { googleMapsLink, phoneNum, fullAddress } from '../constants';

export default function DesktopNavbar() {
    return (
        <nav className="nav">
            <Link href="/">
                <div className="nav__logo"><Logo /></div>
            </Link>
            <div className="nav__content">
                <ul className="nav__content__links__list">
                    <ActiveLink href="/about-us">
                        <li className="nav__content__links__list-item">About Us</li>
                    </ActiveLink>
                    <ActiveLink href="/our-services">
                        <li className="nav__content__links__list-item">Our Services</li>
                    </ActiveLink>
                    <ActiveLink href="/our-staff">
                        <li className="nav__content__links__list-item">Our Staff</li>
                    </ActiveLink>
                    <ActiveLink href="/forms">
                        <li className="nav__content__links__list-item">Forms</li>
                    </ActiveLink>
                </ul>
                <div className="nav__content__info">
                    <a className="nav__content__info-text nav__content__info-text-phn" href={`tel:${phoneNum}`}>{phoneNum}</a>
                    <a href={googleMapsLink} className="nav__content__info-text" target="_blank" rel="noopener noreferrer">{fullAddress}</a>
                </div>
            </div>
        </nav>
    );
}
```

### 2.5 Update Contact Form
```jsx
// resources/js/Components/forms/contact/Contact.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import Form from './Form';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <section className="forms__contact">
            <div className="forms__contact__container">
                <h2 className="forms__contact__container__lgtext">Contact Us</h2>
                <form onSubmit={handleSubmit} className="forms__contact__container__form">
                    {/* Form fields */}
                </form>
            </div>
        </section>
    );
}
```

---

## Phase 3: Laravel Routes & Controllers (Week 2)

### 3.1 Routes Setup
```php
// routes/web.php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\OurServicesController;
use App\Http\Controllers\OurStaffController;
use App\Http\Controllers\FormsController;
use App\Http\Controllers\ContactController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about-us', [AboutUsController::class, 'index'])->name('about-us');
Route::get('/our-services', [OurServicesController::class, 'index'])->name('our-services');
Route::get('/our-staff', [OurStaffController::class, 'index'])->name('our-staff');
Route::get('/forms', [FormsController::class, 'index'])->name('forms');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
```

### 3.2 Controllers
```php
// app/Http/Controllers/OurStaffController.php
class OurStaffController extends Controller
{
    public function index()
    {
        $employees = Employee::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('OurStaff', [
            'employees' => $employees
        ]);
    }
}

// app/Http/Controllers/OurServicesController.php
class OurServicesController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('OurServices', [
            'services' => $services
        ]);
    }
}

// app/Http/Controllers/ContactController.php
class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:80',
            'email' => 'required|email|max:80',
            'subject' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:5000',
        ]);

        // Send email logic here
        Mail::to(config('mail.admin_email'))->send(new ContactFormMail($validated));

        return redirect()->back()->with('message', 'Thank you for your message. We will get back to you soon.');
    }
}
```

---

## Phase 4: Laravel Nova Admin Setup (Week 3)

### 4.1 Nova Installation
```bash
# Install Nova
composer require laravel/nova

# Publish Nova resources
php artisan nova:install

# Create Nova user
php artisan nova:user
```

### 4.2 Nova Resources
```php
// app/Nova/Employee.php
class Employee extends Resource
{
    public static $model = \App\Models\Employee::class;
    public static $title = 'name';
    public static $search = ['name'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            
            Text::make('Name')
                ->sortable()
                ->rules('required', 'max:255'),
            
            Trix::make('Certifications', 'certs')
                ->withFiles()
                ->rules('required'),
            
            Image::make('Headshot', 'headshot_path')
                ->disk('public')
                ->path('staff-headshots')
                ->rules('required', 'image', 'max:2048'),
            
            Select::make('Headshot Position')
                ->options([
                    'top' => 'Top',
                    'center' => 'Center',
                    'bottom' => 'Bottom'
                ])
                ->default('center'),
            
            Trix::make('Modal Info', 'modal_info')
                ->withFiles()
                ->rules('required'),
            
            Number::make('Sort Order')
                ->sortable()
                ->default(0),
            
            Boolean::make('Is Active')
                ->default(true),
            
            DateTime::make('Created At')
                ->sortable()
                ->onlyOnDetail(),
            
            DateTime::make('Updated At')
                ->sortable()
                ->onlyOnDetail(),
        ];
    }

    public function cards(Request $request)
    {
        return [
            new EmployeeStats,
        ];
    }
}

// app/Nova/Service.php
class Service extends Resource
{
    public static $model = \App\Models\Service::class;
    public static $title = 'header';
    public static $search = ['header', 'short_name'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            
            Text::make('Header')
                ->sortable()
                ->rules('required', 'max:255'),
            
            Text::make('Short Name')
                ->sortable()
                ->rules('required', 'max:255', 'unique:services,short_name,{{resourceId}}'),
            
            Text::make('Longer Header')
                ->nullable(),
            
            Image::make('Background Image', 'background_img')
                ->disk('public')
                ->path('services')
                ->rules('required', 'image', 'max:2048'),
            
            Image::make('Small Background Image', 'sm_background_img')
                ->disk('public')
                ->path('services')
                ->rules('required', 'image', 'max:2048'),
            
            Image::make('Rectangle Background Image', 'rectangle_background_img')
                ->disk('public')
                ->path('services')
                ->nullable(),
            
            Image::make('Small Rectangle Background Image', 'sm_rectangle_background_img')
                ->disk('public')
                ->path('services')
                ->nullable(),
            
            Text::make('Subheader')
                ->nullable(),
            
            Boolean::make('Show on Homepage', 'homepage')
                ->default(false),
            
            Trix::make('Main Sentence')
                ->rules('required'),
            
            Trix::make('Modal Info')
                ->withFiles()
                ->rules('required'),
            
            Number::make('Sort Order')
                ->sortable()
                ->default(0),
            
            Boolean::make('Is Active')
                ->default(true),
        ];
    }
}
```

### 4.3 Data Seeding
```php
// database/seeders/EmployeeSeeder.php
class EmployeeSeeder extends Seeder
{
    public function run()
    {
        $employees = [
            [
                'name' => 'Dr. Rolanda Gabriel, LCMHCS, LCPC',
                'certs' => [
                    'Founder and CEO',
                    'Licensed Clinical Mental Health Counselor Supervisor',
                    'Licensed Clinical Professional Counselor'
                ],
                'headshot_path' => '/img/our-staff/rolanda-gabriel.jpeg',
                'headshot_position' => 'top',
                'modal_info' => [
                    'info' => [
                        'Dr. Rolanda Gabriel earned a doctorate degree...',
                        'Dr. Gabriel has provided clinical supervision...'
                    ],
                    'long' => true
                ],
                'sort_order' => 1
            ],
            // Add all other employees from staffInfo.js
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}

// database/seeders/ServiceSeeder.php
class ServiceSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'header' => 'Kids',
                'short_name' => 'child',
                'longer_header' => 'Child and Adolescent Therapy',
                'background_img' => '/img/home/small-girl.png',
                'sm_background_img' => '/img/home/small-girl-sm.png',
                'rectangle_background_img' => '/img/our-services/small-girl-rect.png',
                'sm_rectangle_background_img' => '/img/our-services/small-girl-sm-rect.png',
                'subheader' => '(Child/Teen)',
                'homepage' => true,
                'main_sentence' => 'Licensed Counselors use a variety of techniques...',
                'modal_info' => [
                    'mainSentence' => 'Our child and adolescent therapists are trained to create solutions for:',
                    'listItems' => ['ADHD', 'Bullying', 'Child behavior problems', 'Impulse control', 'Oppositional and defiance', 'Poor self-esteem']
                ],
                'sort_order' => 1
            ],
            // Add all other services from constants.js
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
```

---

## Phase 5: Asset Migration & Styling (Week 3)

### 5.1 Asset Migration
```bash
# Copy public assets
cp -r public/* public/

# Copy SCSS files
cp -r public/assets/partials/* resources/scss/partials/

# Update main SCSS file
# resources/scss/app.scss
@import 'partials/variables';
@import 'partials/mixins';
@import 'partials/reset';
@import 'partials/fonts';
@import 'partials/navbar';
@import 'partials/header';
@import 'partials/hero';
@import 'partials/main-content';
@import 'partials/our-services-cards';
@import 'partials/employee-cards';
@import 'partials/modal';
@import 'partials/forms-header';
@import 'partials/forms-content';
@import 'partials/forms-contact';
@import 'partials/forms-contact-info';
@import 'partials/forms-cta';
@import 'partials/about-us-hero';
@import 'partials/about-us-mission';
@import 'partials/about-us-bottom-hero';
@import 'partials/footer';
@import 'partials/logo';
```

### 5.2 Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/app.scss', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
```

### 5.3 App Entry Point
```jsx
// resources/js/app.jsx
import './bootstrap';
import '../scss/app.scss';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    title: (title) => `${title} - Be Well Therapy`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
```

---

## Phase 6: Deployment & Testing (Week 4)

### 6.1 Environment Configuration
```bash
# .env
APP_NAME="Be Well Therapy"
APP_ENV=production
APP_KEY=base64:your-key-here
APP_DEBUG=false
APP_URL=https://bewelltherapy.org

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bewelltherapy
DB_USERNAME=your-username
DB_PASSWORD=your-password

MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@bewelltherapy.org"
MAIL_FROM_NAME="${APP_NAME}"

NOVA_LICENSE_KEY=your-nova-license
```

### 6.2 Production Build
```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan nova:publish
```

### 6.3 Deployment Options

#### Option A: Traditional VPS (Recommended)
```bash
# Using Laravel Forge or manual setup
# Install on Ubuntu server with Nginx + MySQL + PHP 8.1+
# Configure SSL with Let's Encrypt
# Set up automated deployments
```

#### Option B: Laravel Vapor (Serverless)
```bash
# Install Vapor CLI
composer require laravel/vapor-cli --dev

# Deploy to AWS
vapor deploy production
```

### 6.4 Testing Checklist
- [ ] All pages load correctly
- [ ] Staff data displays from database
- [ ] Services data displays from database
- [ ] Contact form sends emails
- [ ] Nova admin panel accessible
- [ ] Staff management works in Nova
- [ ] File uploads work for headshots
- [ ] Rich text editing works
- [ ] Mobile responsiveness maintained
- [ ] SEO meta tags working
- [ ] Google Analytics tracking

---

## Migration Timeline Summary

| Week | Phase | Tasks |
|------|-------|-------|
| 1 | Foundation | Laravel setup, database schema, Inertia configuration |
| 2 | Frontend | React component migration, routes & controllers |
| 3 | Admin | Nova setup, data seeding, asset migration |
| 4 | Deployment | Production setup, testing, go-live |

## Key Benefits After Migration

1. **Admin Panel**: Full CRUD interface for staff management
2. **File Uploads**: Easy headshot management with image optimization
3. **Rich Text Editing**: WYSIWYG editor for staff bios
4. **Database-Driven**: No more manual file editing
5. **User Management**: Role-based access control
6. **Backup & Recovery**: Database backups and version control
7. **Scalability**: Easy to add new features and content types

## Post-Migration Enhancements

1. **Staff Scheduling**: Add appointment booking system
2. **Blog/News**: Add content management for announcements
3. **Client Portal**: Secure client document access
4. **Analytics Dashboard**: Track website performance
5. **Multi-location Support**: Expand to multiple offices
6. **API Integration**: Connect with third-party services

---

## Troubleshooting Guide

### Common Issues

1. **Inertia not loading**: Check middleware registration
2. **Assets not loading**: Verify Vite configuration
3. **Database connection**: Check .env configuration
4. **Nova not accessible**: Verify license key and user creation
5. **File uploads failing**: Check disk configuration and permissions

### Performance Optimization

1. **Database indexing**: Add indexes on frequently queried columns
2. **Image optimization**: Use Intervention Image for resizing
3. **Caching**: Implement Redis for session and cache
4. **CDN**: Use CloudFlare for static assets
5. **Database queries**: Use eager loading to prevent N+1 queries

This migration plan provides a complete roadmap for converting your Next.js application to Laravel + Inertia.js while preserving all existing functionality and adding powerful admin capabilities through Laravel Nova. 