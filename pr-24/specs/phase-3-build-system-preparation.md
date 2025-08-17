# Phase 3: Build System Preparation

## Overview
Introduce Node.js and Astro build tooling alongside the existing Jekyll setup. This phase creates a parallel build system for testing and validation before the final migration.

## Tasks and Deliverables

### 1. Add package.json with Astro dependencies
**Deliverable:** Node.js project configuration

**File:** `package.json`

**Required dependencies:**
```json
{
  "name": "anthonygonzales-dev",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "@astrojs/rss": "^4.0.0"
  },
  "devDependencies": {
    "sass": "^1.69.0",
    "typescript": "^5.0.0"
  }
}
```

**Acceptance Criteria:**
- [ ] Package.json created with correct dependencies
- [ ] npm/pnpm install completes successfully
- [ ] Astro CLI commands available
- [ ] Sass compilation supported

### 2. Create astro.config.mjs matching Jekyll behavior
**Deliverable:** Astro configuration file

**File:** `astro.config.mjs`

**Configuration requirements:**
- Site URL matching current Jekyll config
- Sitemap generation
- RSS feed support
- Sass preprocessing
- Content collections setup
- Build output optimization

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.anthonygonzales.dev',
  integrations: [
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: 'rose-pine-dawn'
    }
  },
  build: {
    format: 'directory'
  }
});
```

**Acceptance Criteria:**
- [ ] Site URL matches Jekyll _config.yml
- [ ] Sitemap generation configured
- [ ] Markdown processing setup
- [ ] Build output format matches expectations
- [ ] Syntax highlighting theme preserved

### 3. Set up TypeScript configuration
**Deliverable:** TypeScript project setup

**File:** `tsconfig.json`

**Configuration:**
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/layouts/*": ["src/layouts/*"],
      "@/styles/*": ["src/styles/*"]
    }
  }
}
```

**Acceptance Criteria:**
- [ ] TypeScript compilation works
- [ ] Path aliases configured
- [ ] Strict mode enabled
- [ ] Content collections type safety
- [ ] Component prop validation

### 4. Create parallel build scripts for testing
**Deliverable:** Build automation for both Jekyll and Astro

**Scripts to add to package.json:**
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "build:jekyll": "bundle exec jekyll build",
    "dev:jekyll": "bundle exec jekyll serve",
    "test:builds": "npm run build && npm run build:jekyll",
    "compare:builds": "node scripts/compare-builds.js"
  }
}
```

**Build comparison script:**
- Compare generated HTML structure
- Validate URL consistency
- Check asset generation
- Performance metrics comparison

**Acceptance Criteria:**
- [ ] Both build systems work independently
- [ ] Build comparison script validates output
- [ ] Performance benchmarks established
- [ ] No conflicts between systems

### 5. Configure URL preservation and redirects
**Deliverable:** URL routing that matches Jekyll exactly

**Current Jekyll URL structure:**
- `/blog/:title` for posts
- `/` for homepage
- `/about` for about page
- Custom redirects via jekyll-redirect-from

**Astro routing setup:**
```
src/pages/
├── index.astro (homepage)
├── about.astro
├── blog/
│   ├── index.astro (blog listing)
│   └── [slug].astro (individual posts)
└── [...redirect].astro (catch-all redirects)
```

**Redirect configuration:**
- Parse existing Jekyll redirects
- Implement in Astro routing
- Maintain redirect_from frontmatter
- Add 301 redirects for SEO

**Acceptance Criteria:**
- [ ] All current URLs work in Astro
- [ ] Redirects function correctly
- [ ] No broken internal links
- [ ] SEO redirect status codes preserved

### 6. Set up content collections API
**Deliverable:** Data layer for blog content

**Content API requirements:**
- Query all blog posts
- Filter by date/tags
- Sort chronologically
- Generate RSS feed data
- Sitemap integration

**API functions:**
```typescript
// src/lib/content.ts
export async function getAllPosts()
export async function getPostBySlug(slug: string)
export async function getLatestPost()
export async function getPostsByTag(tag: string)
```

**Acceptance Criteria:**
- [ ] Content queries return expected data
- [ ] Posts sorted by date correctly
- [ ] Tag filtering works
- [ ] RSS feed generation functional
- [ ] Type safety for all queries

### 7. Environment and deployment preparation
**Deliverable:** Cloudflare Pages deployment configuration

**Files to create:**
- `.node-version` (Node.js version specification)
- `netlify.toml` or `_headers` (deployment config)
- `.gitignore` updates for Node.js

**Build configuration:**
- Node.js version: 18+
- Build command: `npm run build`
- Output directory: `dist/`
- Environment variables setup

**Acceptance Criteria:**
- [ ] Local development server runs
- [ ] Production build completes
- [ ] Asset optimization working
- [ ] Ready for Cloudflare Pages deployment

### 8. Performance optimization setup
**Deliverable:** Build optimization matching Jekyll output

**Optimization features:**
- Image optimization (maintain .webp usage)
- CSS minification
- JavaScript bundling
- Font optimization
- Asset compression

**Performance targets:**
- Build time < 30 seconds
- Bundle size comparable to Jekyll
- Lighthouse scores maintained
- Core Web Vitals preserved

**Acceptance Criteria:**
- [ ] Build performance meets targets
- [ ] Asset sizes optimized
- [ ] Loading performance maintained
- [ ] SEO scores preserved

## Testing Strategy
- [ ] Local development environment functional
- [ ] Build processes complete without errors
- [ ] URL routing matches Jekyll exactly
- [ ] Content displays correctly
- [ ] Performance benchmarks met
- [ ] Cross-browser compatibility verified

## Rollback Plan
- [ ] Git branches for each phase
- [ ] Jekyll build remains functional
- [ ] Easy switch between systems
- [ ] Backup of all configurations

## Integration Testing
- [ ] Content collections work with layouts
- [ ] Styling applies correctly
- [ ] JavaScript functionality preserved
- [ ] RSS feed validates
- [ ] Sitemap generates correctly

## Documentation
**Deliverable:** Migration guide and troubleshooting

**Documentation to create:**
- `MIGRATION.md` - Step-by-step migration guide
- `DEVELOPMENT.md` - Local development setup
- `DEPLOYMENT.md` - Cloudflare Pages deployment
- `TROUBLESHOOTING.md` - Common issues and solutions

**Acceptance Criteria:**
- [ ] Clear migration instructions
- [ ] Local setup documented
- [ ] Deployment process outlined
- [ ] Troubleshooting guide complete

## Success Criteria
- Astro build system fully functional
- Perfect URL compatibility with Jekyll
- Performance equals or exceeds Jekyll
- Ready for final migration to Cloudflare Pages
- Development workflow improved with TypeScript and modern tooling