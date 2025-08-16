# Phase 2: Content Migration

## Overview

Migrate blog posts and content from Jekyll's `_posts/` directory to Astro's content collections format. This phase focuses on content structure while preserving URLs and SEO.

## Tasks and Deliverables

### 1. Create src/content/blog/ directory

**Deliverable:** Content collections directory structure

```
src/content/
├── blog/
│   ├── 2014-04-17-hello-world.md
│   ├── 2014-04-20-create-a-responsive-form-for-static-websites.md
│   ├── ...
│   └── 2025-03-25-building-a-transaction-dashboard-on-compass.md
└── config.ts
```

**Acceptance Criteria:**

- [ ] Content directory structure created
- [ ] Follows Astro content collections pattern
- [ ] Maintains chronological organization

### 2. Migrate sample posts to test content collections

**Deliverable:** 3-5 migrated posts for testing

**Test posts to migrate:**

- Latest post: `2025-03-25-building-a-transaction-dashboard-on-compass.md`
- Featured post: `2025-02-10-introducing-compass-one.md`
- Technical post: `2024-06-03-how-to-test-react-router-components.md`
- Legacy post: `2014-04-17-hello-world.markdown`

**Acceptance Criteria:**

- [ ] Posts copied to src/content/blog/
- [ ] File extensions standardized (.md)
- [ ] Content intact and readable
- [ ] Images and links functional

### 3. Update frontmatter format for Astro compatibility

**Deliverable:** Standardized frontmatter schema

**Current Jekyll frontmatter:**

```yaml
---
layout: post
title: "Post Title"
description: "Post description"
date: 2025-02-10
redirect_from:
  - /old-url
---
```

**Target Astro frontmatter:**

```yaml
---
title: "Post Title"
description: "Post description"
publishedDate: 2025-02-10
tags: ["category1", "category2"]
draft: false
slug: "post-title"
redirectFrom:
  - /old-url
---
```

**Acceptance Criteria:**

- [ ] All posts use consistent frontmatter
- [ ] Date format compatible with Astro
- [ ] Redirect information preserved
- [ ] Tags/categories added where applicable
- [ ] Slug field added for URL control

### 4. Create content collection schema

**Deliverable:** TypeScript schema for blog posts

**File:** `src/content/config.ts`

**Schema requirements:**

- Title (required, string)
- Description (required, string)
- Published date (required, date)
- Tags (optional, array of strings)
- Draft status (optional, boolean)
- Slug (optional, string)
- Redirect from (optional, array of strings)

**Acceptance Criteria:**

- [ ] Schema validates all existing posts
- [ ] Type safety for content queries
- [ ] Compatible with Astro's content collections API
- [ ] Supports future content expansion

### 5. Create dynamic routing for blog posts

**Deliverable:** Astro pages for blog content

**Files to create:**

- `src/pages/blog/[slug].astro` - Individual post pages
- `src/pages/blog/index.astro` - Blog listing page
- `src/pages/index.astro` - Homepage with latest posts

**Acceptance Criteria:**

- [ ] Dynamic routing matches Jekyll URLs
- [ ] Post content renders correctly
- [ ] Navigation between posts works
- [ ] Blog listing shows all posts
- [ ] Homepage displays latest post

### 6. Preserve existing URL structure

**Deliverable:** URL compatibility with current Jekyll site

**Current Jekyll URLs:**

- `/blog/post-title` (from permalink: /blog/:title:output_ext)
- Homepage latest post display
- Blog archive page

**Target Astro URLs:**

- Same URL structure maintained
- Redirects for any URL changes
- SEO-friendly slugs

**Acceptance Criteria:**

- [ ] URLs match current structure exactly
- [ ] No broken internal links
- [ ] Redirects configured for any changes
- [ ] Canonical URLs preserved

### 7. Migrate content assets and images

**Deliverable:** Content-related images properly referenced

**Current image structure:**

```
assets/img/
├── compass-one/
├── compass-one-launch/
└── [other post images]
```

**Target structure:**

```
public/img/
├── compass-one/
├── compass-one-launch/
└── [other post images]
```

**Acceptance Criteria:**

- [ ] All content images moved to public/
- [ ] Markdown image references updated
- [ ] Image optimization maintained (.webp files)
- [ ] Alt text preserved for accessibility

## Testing Strategy

- [ ] Content collections API queries work
- [ ] All posts render without errors
- [ ] Image loading and display correct
- [ ] Internal links function properly
- [ ] SEO meta tags generated correctly
- [ ] RSS feed compatibility maintained

## Performance Considerations

- [ ] Image optimization preserved
- [ ] Lazy loading for post images
- [ ] Content chunking for large archives
- [ ] Build time optimization

## SEO Preservation

- [ ] Meta descriptions maintained
- [ ] Open Graph tags preserved
- [ ] Structured data (JSON-LD) intact
- [ ] Sitemap generation configured
- [ ] RSS feed maintained

## Migration Scripts

**Deliverable:** Automation for bulk content migration

**Script requirements:**

- Convert frontmatter format
- Standardize file extensions
- Update image paths
- Validate content integrity

**Acceptance Criteria:**

- [ ] Script handles all 15 existing posts
- [ ] Error handling for malformed content
- [ ] Backup creation before migration
- [ ] Rollback capability

## Success Criteria

- All blog posts migrated to Astro content collections
- URL structure preserved exactly
- SEO elements maintained
- Content displays correctly in Astro
- No functionality regression from Jekyll

