# GitHub PR Preview Setup Roadmap

## Overview
Set up automated PR preview deployments to safely test migration changes before merging. This enables testing Phase 1, 2, and 3 changes in production-like environments without affecting the live site.

## Problem Statement
- Need to verify Phase 1 changes work correctly in production environment
- Want to test future phases (2 and 3) safely before going live
- Current workflow requires manual GitHub Pages source switching
- Risk of breaking live site during testing

## Solution: Deploy PR Preview Action
Use GitHub Actions to automatically deploy each PR to a unique preview URL, enabling safe testing of all migration phases.

## Implementation Roadmap

### Step 1: Create GitHub Workflow File
**Deliverable:** `.github/workflows/pr-preview.yml`

**Workflow Configuration:**
```yaml
name: Deploy PR Preview
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [master]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Build Jekyll site
        run: bundle exec jekyll build --destination _site
        
      - name: Deploy to preview
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
          destination_dir: pr-${{ github.event.number }}
          
      - name: Comment PR
        uses: thollander/actions-comment-pull-request@v2
        with:
          message: |
            ## 🚀 Preview Deployed
            
            **Preview URL:** https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/pr-${{ github.event.number }}/
            
            This preview will be automatically updated when you push new commits.
```

**Acceptance Criteria:**
- [ ] Workflow file created and committed
- [ ] Triggers on PR creation/updates to master
- [ ] Builds Jekyll site successfully
- [ ] Deploys to unique preview path
- [ ] Comments preview URL on PR

### Step 2: Configure Repository Settings
**Deliverable:** Repository configuration for GitHub Pages

**Settings Required:**
- Enable GitHub Actions in repository settings
- Ensure GitHub Pages is enabled
- Verify `gh-pages` branch permissions
- Configure Actions permissions for GITHUB_TOKEN

**Acceptance Criteria:**
- [ ] GitHub Actions enabled and functioning
- [ ] Workflow has necessary permissions
- [ ] Preview deployments accessible
- [ ] No security or permission issues

### Step 3: Test Workflow with Phase 1 Changes
**Deliverable:** Working PR preview for Phase 1

**Test Process:**
1. Create PR from `blog-migration` to `master`
2. Verify workflow triggers automatically
3. Check that Jekyll build succeeds
4. Confirm preview URL is accessible
5. Test that site functions identically to live version

**Validation Steps:**
- [ ] Homepage loads correctly
- [ ] Blog posts display properly
- [ ] Images load from correct paths
- [ ] Navigation works
- [ ] Styles apply correctly
- [ ] All existing functionality preserved

**Acceptance Criteria:**
- [ ] PR created successfully
- [ ] Workflow runs without errors
- [ ] Preview URL accessible and functional
- [ ] Site behavior identical to live version
- [ ] No broken links or missing assets

### Step 4: Document Preview Workflow
**Deliverable:** Documentation for team usage

**Documentation Requirements:**
- How to create PRs for testing
- How to access preview URLs
- How to interpret workflow results
- Troubleshooting common issues

**File:** `PREVIEW-WORKFLOW.md`

**Acceptance Criteria:**
- [ ] Clear instructions for creating test PRs
- [ ] Preview URL format documented
- [ ] Workflow status interpretation guide
- [ ] Common troubleshooting steps included

### Step 5: Establish Migration Testing Protocol
**Deliverable:** Testing protocol for remaining phases

**Protocol Elements:**
- Phase-specific testing checklists
- Preview URL validation steps
- Performance comparison guidelines
- Rollback procedures if issues found

**Testing Framework:**
- **Phase 1:** Directory structure and Jekyll compatibility
- **Phase 2:** Content migration and URL preservation
- **Phase 3:** Astro build system and final migration

**Acceptance Criteria:**
- [ ] Testing checklist for each phase
- [ ] Clear pass/fail criteria
- [ ] Performance benchmarks defined
- [ ] Rollback procedures documented

## Benefits of This Approach

### Risk Mitigation
- Test changes in production-like environment
- No impact on live site during testing
- Easy rollback if issues discovered
- Confidence before merging changes

### Improved Workflow
- Automatic preview deployments
- No manual GitHub Pages switching
- Easy sharing of preview links
- Streamlined review process

### Migration Safety
- Test each phase independently
- Validate functionality before going live
- Catch issues early in development
- Maintain site reliability throughout migration

## Timeline
- **Step 1:** Create workflow file (30 minutes)
- **Step 2:** Configure repository (15 minutes)
- **Step 3:** Test with Phase 1 (45 minutes)
- **Step 4:** Document workflow (30 minutes)
- **Step 5:** Establish protocol (30 minutes)

**Total Estimated Time:** 2.5 hours

## Success Criteria
- PR preview workflow functional and reliable
- Phase 1 changes successfully tested via preview
- Team confident in migration approach
- Foundation established for testing Phases 2 and 3
- Zero impact on live site during testing process

## Next Steps After Setup
1. Use preview to validate Phase 1 changes
2. Merge Phase 1 when confident
3. Continue with Phase 2 development using same preview workflow
4. Iterate through all phases safely
5. Final migration to Cloudflare Pages when complete