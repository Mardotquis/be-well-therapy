# Plan: Full Sass @use Migration + Modernization

**TL;DR:** Your Next.js 9.3.6 has **built-in Sass support** - no plugins needed. We'll remove deprecated plugins, clean up dependencies, and properly migrate all SCSS files to use the modern `@use` syntax with a shared `_index.scss` file.

## Steps

### 1. Update package.json dependencies
- Remove `@zeit/next-sass` and `@zeit/next-css` (deprecated, Next 9.3+ has built-in Sass)
- Remove `node-sass` alias (redundant)
- Keep `sass` but update to `^1.85.0` (works with Next 9.3+, supports @use)
- Remove `next-compose-plugins` and `next-images` if only used for Sass chain

### 2. Simplify next.config.js
- Remove plugin composition related to CSS/Sass
- Keep only necessary config (exportPathMap, images)

### 3. Create public/assets/partials/_index.scss
- Use `@forward` to expose variables and mixins
- This acts as a single entry point for shared dependencies

### 4. Update each SCSS partial
Files: _navbar.scss, _Hero.scss, _footer.scss, _MainContent.scss, _Modal.scss, _Header.scss, _FormsHeader.scss, _FormsCTA.scss, _FormsContent.scss, _FormsMap.scss, _FormsContactInfo.scss, _FormsContact.scss, _AboutUsHero.scss, _AboutUsMission.scss, _AboutUsBottomHero.scss, _EmployeeCards.scss, _OurServicesCards.scss, _Logo.scss

- Add `@use "./index" as *;` at the top of each file
- This gives access to all variables (`$sand`, `$teal`, etc.) and mixins (`rect`, `box`)

### 5. Update public/App.scss
- Keep `@use` syntax for all partials (already done)

## Files to modify
- package.json (dependencies cleanup)
- next.config.js (simplify)
- public/assets/partials/_index.scss (create new)
- ~15 SCSS partial files (add @use statement)

## Verification
- Run `npm install` to update dependencies
- Run `npm run build` locally to verify compilation
- Push and verify Netlify build succeeds

## Decisions
- Using `@use ... as *` in partials to avoid namespace prefixes (keeps existing code like `$sand` working)
- Sass 1.85.0 chosen as it's stable and fully compatible with Next.js 9.3+
- Built-in Sass support eliminates need for deprecated plugins
