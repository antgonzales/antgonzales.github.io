# Jekyll Baseline Documentation

*Captured: November 28, 2024*

## Current Architecture

### Build System
- **Platform**: Jekyll (Ruby-based static site generator)
- **CSS**: SCSS with 13 modular files
- **Deployment**: GitHub Pages
- **Build Time**: ~0.5 seconds (small site)

### CSS Architecture
```
_sass/
├── _variables.scss    (1,330 bytes) - Design tokens
├── _base.scss         (428 bytes)   - Reset & base styles  
├── _utilities.scss    (177 bytes)   - Utility classes
├── _typography.scss   (936 bytes)   - Text styles
├── _style.scss        (431 bytes)   - Layout utilities
├── _header.scss       (733 bytes)   - Header component
├── _footer.scss       (347 bytes)   - Footer component
├── _home.scss         (625 bytes)   - Homepage styles
├── _blog.scss         (90 bytes)    - Blog listing
├── _post.scss         (1,821 bytes) - Post content
├── _page.scss         (134 bytes)   - Static pages
├── _resume.scss       (63 bytes)    - Resume (minimal)
└── _about.scss        (650 bytes)   - About page
```

**Total SCSS**: 7,765 bytes (after cleanup from 10,422 bytes)

### Bundle Sizes
- **CSS Output**: 6,304 bytes (master.css)
- **Additional CSS**: 8 syntax highlighting files (~25KB total)
- **HTML Pages**: ~15 pages generated

### Content Structure
- **Posts**: 13 blog posts (2014-2025)
- **Pages**: About, Blog listing, Home
- **Data**: Resume data in YAML
- **Assets**: Images, favicons

## Pain Points Identified

### CSS Maintenance
- **13 separate SCSS files** for a simple blog
- **Manual dependency management** via @use statements
- **No automatic unused CSS removal** (required manual PurgeCSS audit)
- **Global namespace** - potential for conflicts

### Build Complexity
- **Ruby dependency** for Jekyll
- **SCSS compilation** separate from main build
- **Manual optimization** required for performance
- **Limited TypeScript support**

### Developer Experience
- **No hot reload** for CSS changes
- **Manual asset optimization**
- **Limited component reusability**
- **Verbose template syntax** (Liquid)

## Performance Baseline

### Current Metrics
- **CSS Bundle**: 6.3KB (after cleanup)
- **Build Time**: 0.5s
- **Pages Generated**: 15
- **Total Assets**: ~200KB (including images)

### Optimization Opportunities
- **CSS-in-JS** or **Tailwind** could reduce bundle size further
- **Component-based architecture** would improve maintainability
- **TypeScript** would improve developer experience
- **Modern build tools** could optimize assets automatically

## Migration Readiness

### Content Migration
✅ **Markdown posts** - Easily portable  
✅ **YAML frontmatter** - Standard format  
✅ **Static assets** - Direct copy  
✅ **Data files** - JSON/YAML compatible  

### Styling Migration
⚠️ **SCSS modules** - Need conversion to CSS-in-JS or Tailwind  
⚠️ **Global styles** - Need component scoping  
⚠️ **Utility classes** - Could map to Tailwind  

### Functionality Migration
✅ **Static pages** - Direct port  
✅ **Blog listing** - Standard functionality  
✅ **RSS feed** - Built-in support in modern tools  
⚠️ **Jekyll plugins** - Need alternatives  

## Success Metrics for Migration

### Performance Goals
- **Smaller CSS bundle** (target: <4KB with Tailwind)
- **Faster build times** (target: <1s)
- **Better Core Web Vitals**

### Developer Experience Goals
- **TypeScript support**
- **Hot reload for all changes**
- **Component-based architecture**
- **Automatic optimization**

### Maintenance Goals
- **Fewer configuration files**
- **No manual CSS auditing**
- **Better IDE support**
- **Simpler deployment**

---

*This baseline serves as the starting point for evaluating migration to modern static site generators like Astro, Next.js, or Nuxt.*