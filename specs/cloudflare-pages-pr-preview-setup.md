# Cloudflare Pages PR Preview Setup

## Overview

This specification outlines the setup of Cloudflare Pages for PR preview deployments to replace the problematic GitHub Pages approach. Cloudflare Pages will provide isolated preview URLs for each PR without interfering with the existing GitHub Pages production site.

## Background

The current GitHub Pages PR preview approach fails due to:
- GitHub's automatic redirection from `username.github.io` URLs to custom domains
- Risk of deploying preview content to the production master branch
- Complex baseurl configuration requirements
- Conflicts with existing Jekyll site structure

Cloudflare Pages solves these issues by providing completely separate preview URLs and deployment pipeline.

## Implementation Plan

### Phase 1: Cloudflare Pages Project Setup

1. **Create Cloudflare Pages Project**
   - Log into Cloudflare Dashboard
   - Navigate to Pages section
   - Create new project connected to GitHub repository `antgonzales/antgonzales.github.io`
   - Configure build settings:
     - Build command: `bundle exec jekyll build`
     - Build output directory: `_site`
     - Root directory: `/` (repository root)
     - Environment variables:
       - `JEKYLL_ENV=production`
       - `BUNDLE_WITHOUT=development:test`

2. **Configure Ruby Build Environment**
   - Set Ruby version to 3.2.x in build settings
   - Ensure Bundler is available for dependency management
   - Configure build timeout (default should be sufficient)

### Phase 2: Branch Configuration

1. **Production Branch Setup**
   - Configure `master` branch as production branch
   - This will serve as backup/alternative to GitHub Pages
   - Production URL will be: `antgonzales-github-io.pages.dev`

2. **Preview Branch Configuration**
   - Enable automatic preview deployments for all branches
   - Configure PR preview generation
   - Preview URLs will follow pattern: `[branch-name].antgonzales-github-io.pages.dev`

### Phase 3: GitHub Actions Integration

1. **Remove Current PR Preview Workflow**
   - Delete `.github/workflows/pr-preview.yml`
   - Remove GitHub Pages deployment logic
   - Clean up any baseurl-related template changes that are no longer needed

2. **Optional: Add Cloudflare Integration**
   - Consider adding GitHub Actions workflow to trigger Cloudflare builds
   - Add PR commenting with Cloudflare preview URLs
   - Use Cloudflare API for deployment status checks

### Phase 4: Template Cleanup

1. **Remove Baseurl Dependencies**
   - Revert template changes made for GitHub Pages subdirectory support
   - Remove `{{ site.baseurl }}` from templates since Cloudflare serves from root
   - Files to revert:
     - `_includes/header.html`
     - `_includes/head.html`
     - `_includes/footer.html`
     - `index.html`
     - `blog.html`

2. **Jekyll Configuration**
   - Remove or reset `baseurl` in `_config.yml`
   - Ensure clean configuration for Cloudflare deployment

## Expected Outcomes

### Immediate Benefits
- **Isolated previews**: Each PR gets unique URL like `blog-migration.antgonzales-github-io.pages.dev`
- **No production conflicts**: Previews deploy separately from main site
- **Simplified configuration**: No complex baseurl handling needed
- **Faster deployments**: Cloudflare's build process optimized for speed

### Long-term Benefits
- **Migration preparation**: Experience with Cloudflare Pages before main site migration
- **Alternative hosting**: Backup hosting option via Cloudflare
- **Performance insights**: Compare Cloudflare vs GitHub Pages performance
- **Modern workflow**: Cloudflare's deployment pipeline aligns with Astro migration goals

## Implementation Steps

1. **Setup Cloudflare Pages project** (manual via dashboard)
2. **Test initial deployment** from master branch
3. **Remove GitHub Actions PR preview workflow**
4. **Create test PR** to verify automatic preview generation
5. **Clean up template baseurl references**
6. **Document new preview URL pattern** for team

## Success Criteria

- [ ] Cloudflare Pages project successfully builds from master branch
- [ ] PR previews automatically generate with unique URLs
- [ ] Jekyll site renders correctly on Cloudflare Pages
- [ ] All assets (CSS, images, JS) load properly
- [ ] Navigation and internal links work correctly
- [ ] No conflicts with existing GitHub Pages production site
- [ ] Preview URLs are accessible and shareable

## Rollback Plan

If Cloudflare Pages setup fails:
1. Keep existing GitHub Pages as primary hosting
2. Remove Cloudflare Pages project
3. Restore original GitHub Actions workflow (without master branch deployment)
4. Continue with Phase 1 testing on local builds only

## Notes

- This approach provides clean separation between preview and production environments
- Cloudflare Pages offers better performance and modern deployment features
- Sets foundation for eventual full migration from GitHub Pages to Cloudflare Pages
- No changes needed to Jekyll site structure or content