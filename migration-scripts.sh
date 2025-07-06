#!/bin/bash

# Laravel + Inertia.js Migration Script for Be Well Therapy
# Run this script to set up the new Laravel project with all dependencies

echo "🚀 Starting Laravel + Inertia.js Migration for Be Well Therapy"
echo "================================================================"

# Phase 1: Laravel Foundation Setup
echo ""
echo "📦 Phase 1: Installing Laravel and Dependencies"
echo "-----------------------------------------------"

# Create new Laravel project
composer create-project laravel/laravel be-well-therapy-laravel
cd be-well-therapy-laravel

# Install Laravel packages
echo "Installing Laravel packages..."
composer require inertiajs/inertia-laravel
composer require laravel/sanctum
composer require laravel/nova
composer require intervention/image
composer require laravel/vapor-cli --dev

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install @inertiajs/react @inertiajs/inertia-react
npm install react react-dom
npm install sass
npm install axios
npm install uuid
npm install validate
npm install @vitejs/plugin-react

# Phase 2: Database Setup
echo ""
echo "🗄️  Phase 2: Setting up Database"
echo "--------------------------------"

# Create migrations
php artisan make:migration create_employees_table
php artisan make:migration create_services_table
php artisan make:migration create_contact_submissions_table

# Create seeders
php artisan make:seeder EmployeeSeeder
php artisan make:seeder ServiceSeeder

# Create models
php artisan make:model Employee
php artisan make:model Service
php artisan make:model ContactSubmission

# Create controllers
php artisan make:controller HomeController
php artisan make:controller AboutUsController
php artisan make:controller OurServicesController
php artisan make:controller OurStaffController
php artisan make:controller FormsController
php artisan make:controller ContactController

# Phase 3: Directory Structure
echo ""
echo "📁 Phase 3: Creating Directory Structure"
echo "----------------------------------------"

# Create React directories
mkdir -p resources/js/Pages
mkdir -p resources/js/Components
mkdir -p resources/js/Layouts
mkdir -p resources/js/Hooks
mkdir -p resources/scss/partials

# Create Nova resources
php artisan nova:resource Employee
php artisan nova:resource Service

# Phase 4: Asset Migration
echo ""
echo "🎨 Phase 4: Migrating Assets"
echo "-----------------------------"

# Copy public assets (run this from the original project directory)
echo "Copying public assets..."
cp -r ../public/* public/

# Copy SCSS files
echo "Copying SCSS files..."
cp -r ../public/assets/partials/* resources/scss/partials/

# Phase 5: Environment Setup
echo ""
echo "⚙️  Phase 5: Environment Configuration"
echo "-------------------------------------"

# Copy environment file
cp .env.example .env

echo ""
echo "✅ Migration setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your database credentials"
echo "2. Run: php artisan key:generate"
echo "3. Run: php artisan migrate"
echo "4. Run: php artisan db:seed"
echo "5. Run: npm run dev"
echo "6. Access Nova at: http://localhost:8000/nova"
echo ""
echo "📚 See laravel-inertia-migration.md for detailed instructions" 