# Phase 1: Directory Reorganization (SEO-safe)

## Overview
Create Astro-compatible directory structure while maintaining Jekyll functionality. This phase focuses on setting up the foundation without breaking the current site.

## Tasks and Deliverables

### 1. Create src/ directory structure
**Deliverable:** Basic Astro directory layout
```
src/
├── layouts/
├── components/
├── styles/
├── pages/
└── content/
```

**Acceptance Criteria:**
- [ ] Directory structure created
- [ ] Jekyll build still works
- [ ] No impact on current site functionality

### 2. Set up src/layouts/ with Astro-compatible structure
**Deliverable:** Converted layout files from Liquid to Astro format

**Current Jekyll layouts:**
- `_layouts/default.html`
- `_layouts/page.html` 
- `_layouts/post.html`
- `_layouts/work.html`

**Target Astro layouts:**
- `src/layouts/BaseLayout.astro`
- `src/layouts/PageLayout.astro`
- `src/layouts/PostLayout.astro`
- `src/layouts/WorkLayout.astro`

**Acceptance Criteria:**
- [ ] All layouts converted to .astro format
- [ ] Maintain existing HTML structure
- [ ] Preserve meta tags and SEO elements
- [ ] Keep structured data (schema.org)

### 3. Create src/components/ and migrate _includes/
**Deliverable:** Converted include files to Astro components

**Current Jekyll includes:**
- `_includes/anchor_headings.html`
- `_includes/footer.html`
- `_includes/head.html`
- `_includes/header.html`
- `_includes/mastodon_verification.html`
- `_includes/quick_about.html`
- `_includes/read_time.html`
- `_includes/twitter_card.html`

**Target Astro components:**
- `src/components/AnchorHeadings.astro`
- `src/components/Footer.astro`
- `src/components/Head.astro`
- `src/components/Header.astro`
- `src/components/MastodonVerification.astro`
- `src/components/QuickAbout.astro`
- `src/components/ReadTime.astro`
- `src/components/TwitterCard.astro`

**Acceptance Criteria:**
- [ ] All includes converted to Astro components
- [ ] Maintain existing functionality
- [ ] Use Astro component syntax
- [ ] Preserve accessibility features

### 4. Set up src/styles/ and reorganize Sass files
**Deliverable:** Organized style architecture compatible with Astro

**Current Sass structure:**
```
_sass/
├── _about.scss
├── _base.scss
├── _blog.scss
├── _footer.scss
├── _header.scss
├── _home.scss
├── _page.scss
├── _post.scss
├── _resume.scss
├── _style.scss
├── _typography.scss
├── _utilities.scss
└── _variables.scss
```

**Target structure:**
```
src/styles/
├── components/
│   ├── about.scss
│   ├── blog.scss
│   ├── footer.scss
│   ├── header.scss
│   ├── home.scss
│   ├── page.scss
│   ├── post.scss
│   └── resume.scss
├── base/
│   ├── base.scss
│   ├── typography.scss
│   └── utilities.scss
├── abstracts/
│   └── variables.scss
└── main.scss
```

**Acceptance Criteria:**
- [ ] Sass files reorganized by category
- [ ] Import paths updated
- [ ] Compilation still works
- [ ] No style regressions

### 5. Move static assets to public/ directory
**Deliverable:** Assets moved to Astro's public directory

**Current assets location:** `assets/`
**Target location:** `public/`

**Assets to move:**
- Images (`assets/img/` → `public/img/`)
- Icons (`favicon.ico`, `icon.png`, `icon.svg`)
- Static files (`robots.txt`, `humans.txt`)

**Acceptance Criteria:**
- [ ] All static assets moved to public/
- [ ] Asset references updated in templates
- [ ] Images still display correctly
- [ ] SEO files (robots.txt) accessible

## Testing Strategy
- [ ] Jekyll build passes after each change
- [ ] Visual regression testing on key pages
- [ ] Link checker validates all internal links
- [ ] Performance metrics maintained

## Risk Mitigation
- Make changes incrementally
- Test Jekyll build after each step
- Keep backup of original structure
- Document all changes for rollback

## Success Criteria
- Astro-compatible directory structure created
- Jekyll site continues to function normally
- No SEO impact or broken links
- Foundation ready for Phase 2 content migration