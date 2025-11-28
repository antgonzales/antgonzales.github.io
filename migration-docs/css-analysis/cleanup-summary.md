# CSS Cleanup Analysis Summary

## Audit Results

### Classes Safe to Remove:
1. **Utility Classes**: `.center`, `.list-spread` - Not used in any templates
2. **Typography**: `h4`, `h5`, `h6` styles - No h4-h6 headings found in content
3. **Text Utilities**: `.subheader`, `.italic`, `.bold` - Redundant with semantic HTML
4. **Blockquote Styles**: Complete blockquote styling - No blockquotes in current content
5. **Code Elements**: `kbd`, `samp` - Not used
6. **Blog Specific**: `.intro`, `.blog-post`, `.blog-post-title`, `.post-footer` - Not in current templates
7. **Resume Styles**: Most resume classes - No resume.html page exists
8. **Callout Variants**: `.danger-callout`, `.info-callout` - Not used

### Classes to Keep:
1. **Quick About**: `.quick-about-content` - Used in `_includes/quick_about.html`
2. **About Experience**: `.about-experience` - Used in about.md for job table

### Files to Clean:
- `_sass/_utilities.scss` - Remove `.center`, `.list-spread`
- `_sass/_typography.scss` - Remove h4-h6, blockquote, text utilities
- `_sass/_blog.scss` - Remove unused blog classes
- `_sass/_resume.scss` - Remove most/all resume styles
- `_sass/_page.scss` - Remove callout variants

## Estimated Savings:
- ~60% reduction in unused CSS
- Cleaner, more maintainable codebase
- Better performance