module.exports = {
  content: [
    './_site/**/*.html',
    './_site/**/*.js'
  ],
  css: [
    './_site/css/master.css'
  ],
  output: './css-analysis/',
  rejected: true,
  rejectedCss: true,
  variables: true,
  keyframes: true,
  fontFace: true,
  safelist: [
    // Jekyll dynamic classes
    /^page-/,
    /^post-/,
    /^blog/,
    /^about/,
    /^resume/,
    /^work/,
    // Common utility patterns
    /^grid/,
    /^container/,
    /^max-width/,
    // Print styles
    /@media print/,
    // Pseudo-classes and states
    /:hover/,
    /:focus/,
    /:active/,
    /:visited/
  ]
}