---
layout: post
title: "How to choose a CSS reset"
description: "Explore the significance of CSS resets and how to streamlines web
UI development for uniform, user-friendly interfaces across browsers. Discover
strategies to select the best approach for your projects."
date: 2024-02-11
---
Creating a uniform CSS baseline across browsers is essential yet challenging
for developers. This blog post explores CSS resets, offering a detailed 
overview of three strategies to establish a consistent styling foundation.
Through comparative analysis, it aims to empower you with the insights needed
to select the most effective approach for your projects. Whether experienced or
new to web development, understanding CSS resets' significance and how tools
like modern-normalize can streamline your workflow marks a pivotal step towards
developing more cohesive and user-friendly interfaces across different
browsers.

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->

## What is a CSS reset? 

A CSS reset is an open-source stylesheet used to make styles consistent across
all user agents. Web browsers include default styling through a user agent
stylesheet but vendors do not implement the same rules for things like padding,
margins, line heights, and borders across elements. The seriousness of these
inconsistencies depends on the browser version as vendors change rules over
time.

There are three potential options to address user agent stylesheet
inconsistencies:

* [resetting](#resetting)
* [normalization](#normalization)
* [opinionated normalization](#opinionated-normalization)

**The goal of a CSS reset is the following**:

* Undo opinionated browser default styles
* Correct styling errors in older browsers
* Create a consistent style base
* Address browser quirks

### Resetting 

CSS Resetting aggressively sets all element values to nothing which gives
authors the ability, and responsibility, to start from scratch. Although resets
give authors a starting point, it comes with several downsides:

* Loss of useful defaults. A reset takes away unique browser quirks but also
  strips out the potentially useful ones.
* Increased burden on developers. Developers will need to redefine styles
  across all HTML elements.
* Increased human error. By removing all element styles, developers may
  overlook styles for elements not commonly used. On a larger website with
  dynamic content, like a blog or news site, it means some elements might lack
  basic defaults.
* Decreased performance. Although minimal, a reset means that browsers will
  need to evaluate the style for every element multiple times and load a larger
  stylesheet than otherwise needed.
* Cluttered development experience. A reset will clutter the developer's
  debugging tools across all elements in the inspector before the author
  styles.

<div class="center buffer">
  <img src="/assets/img/eric-meyers-css-reset.png" alt="An example of how a CSS Reset clutters the development experience" />
</div>

[Paul Irish's box-sizing
reset](https://www.paulirish.com/2012/box-sizing-border-box-ftw/) was created
to deal with the pain of setting an element's width without dealing with the
padding and margin, especially with grid systems.

[Meyerweb’s reset](https://meyerweb.com/eric/tools/css/reset/) was created in
2007 for a CSS grid system called Blueprint.css when Internet Explorer was the
most widely used browser and a new upstart named Mozilla Firefox was quickly
gaining traction. It should be tweaked, edited, extended, and otherwise tuned
to match your specific reset baseline.

### Normalization 

CSS Normalizing retains useful and sensible default styles provided by user
agents while creating consistency across browsers. The aim is to make the
styles consistent without requiring developers to redeclare new styles across
elements. 

Normalization has several notable benefits:

* Maintains useful defaults. Developers are not required to recreate styles
  across all reset elements.
* Improves cross-browser consistency. Although modern browsers have improved
  their default user agent stylesheets drastically since the days of Internet
  Explorer, differences remain.
* Reduces browser quirks. Developers can create styles against a more
  predictable baseline with a solid foundation.
* Streamlined developer experience. Developers don't have to scroll past a ton
  of reset styles to see the styles they've implemented on features.

[Normalize.css](https://byby.dev/normalize-css) was the first popular library
to attempt a normalized approach to CSS stylesheets in 2011. It was a notable
departure from resets at the time as it didn't spam the developer's debugging
experience with overloaded style rules and corrected browser inconsistencies.

[Modern-normalize](https://github.com/sindresorhus/modern-normalize) is a port
of Normalize. Since Nicolas Gallagher unofficially [stopped maintenance in
2018](https://github.com/necolas/normalize.css/commit/fc091cce1534909334c1911709a39c22d406977b),
teams like [HTML5
Boilerplate](https://github.com/h5bp/html5-boilerplate/issues/2939) and
[Tailwind](https://github.com/tailwindlabs/tailwindcss/pull/2572) have since
made the switch. Notably, the [goal of the project is to make itself
obsolete](https://github.com/sindresorhus/modern-normalize/issues/2) by fixing
the problems directly in the browsers.

### Combining normalization and reset techniques

Some project have created a combination of a CSS reset and a normalized CSS
stylesheet. The author may include specific rules to accommodate a design
system or specialized use case. The line between "reset" and style library is
blurred since the goal isn't to create consistencies between between browsers
but to add default styling for HTML primitives.

[sanitize.css](https://github.com/csstools/sanitize.css/) is a companion reset
library to normalize.css. The library includes a detailed list of features and
also has separate stylesheets for forms, typography, and motion. It's a great
baseline but there hasn't been an update since 2021.

[Reboot.css](https://getbootstrap.com/docs/5.0/content/reboot/) is a reset file
designed for the Bootstrap CSS framework and is built on
[normalize.css](https://necolas.github.io/normalize.css/). It provides a set of
defaults specifically with Bootstrap in mind.

## Conclusion 

Tools like modern-normalize represent the culmination of efforts to bridge the
gap between diverse browser behaviors, providing developers with a powerful yet
simple solution to common styling challenges. By adopting modern-normalize, we
not only embrace a future where web interfaces are more uniform and predictable
but also ease the burden of cross-browser compatibility, allowing us to focus
on what truly matters: creating engaging and inclusive web experiences for all
users. As we've explored the nuances of resetting, normalizing, and opinionated
normalization, it's clear that the choice of strategy depends on the specific
needs of your project and team. Remember, the goal is not just to make our
lives as developers easier but to pave the way for web applications that are
accessible and reliable. 
