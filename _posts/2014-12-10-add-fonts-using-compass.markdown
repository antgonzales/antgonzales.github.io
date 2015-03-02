---
layout: post
title: Add fonts the right way with Compass
description: Compass takes the pain out of implementing web fonts to add beautiful typography. Follow these best practices to add maintainable typography styles
date: 2014-12-10
categories:
- Best Practices
tags:
- SASS
- Mixins
- Font files
---

Font files are a fantastic way to include beautiful typography locally to give your website a distinguished tone and style. Implementing the fonts to work properly across all browsers is important to ensure that your users don't miss the opportunity to experience your website the way it was intended. Luckily, Compass provides an excellent [font-face mixin](http://compass-style.org/reference/compass/css3/font_face/) to cover all your files with ease so you can add that rad Comic Sans font your client loves.

<!--break-->

##Getting off on the right file structure

Before we dive into the best practices, let's first clear up any assumptions we make before we move forward. This tutorial is intended for working with local font files rather than a service. Services have a lot of pros and cons, which you can read about on Dan Eden's article [Web Font Services: the Good, the Bad, and the Ugly](http://webdesign.tutsplus.com/articles/web-font-services-the-good-the-bad-and-the-ugly--webdesign-7774).

Secondly, your file structure and config.rb files must line up.

### File Structure

{% highlight html %}
boss-theme-2014/
|
|-- config.rb          # Compass config file
|
|-- fonts/             # All font files
|   |-- TheinhardtMedium-Regular.woff
|   |-- TheinhardtMedium-Regular.ttf
|   |-- TheinhardtMedium-Regular.eot
|   ...
|
|-- scss/             # SASS files
|
|-- images/           # Image files
|
|-- js/               # JS files
|
{% endhighlight %}

### Compass configuration file

{% highlight ruby %}
# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "fonts"
{% endhighlight %}

## Declare font files in Compass with care

Now that we have our files, Compass configured properly in our theme, and the file structure in place, we are ready to rock.

In the following example, the author created separate font names based on the font weight and style. Rather than include these attributes into the CSS, the author relied on the names to add italicized or bold fonts into the font declarations.

###Improper font naming conventions. Boo. Hiss.

{% highlight scss %}
@include font-face(
  'TheinhardtMedium-Regular',
  font-files(
    'TheinhardtMedium-Regular.woff',
    'TheinhardtMedium-Regular.ttf'
  ),
  'TheinhardtMedium-Regular.eot'
);

@include font-face(
  'TheinhardtMedium-Italic',
  font-files(
    'TheinhardtMedium-Italic.woff',
    'TheinhardtMedium-Italic.ttf'
  ),
  'TheinhardtMedium-Italic.eot'
);

@include font-face(
  'TheinhardtBold-Regular',
  font-files(
    'TheinhardtBold-Regular.woff',
    'TheinhardtBold-Regular.ttf'
  ),
  'TheinhardtBold-Regular.eot'
);

@include font-face(
  'TheinhardtBold-Italic',
  font-files(
    'TheinhardtBold-Italic.woff',
    'TheinhardtBold-Italic.ttf'
  ),
  'TheinhardtBold-Italic.eot'
);
{% endhighlight %}

This approach certainly works, but it's not intuitive as we begin implementing our typography styles to different parts of the website. It's safe to assume that using an intuitive and simple method for accessing our different typographic styles is important, it's even more poignant considering that [95% of web design is built on typography](https://ia.net/blog/the-web-is-all-about-typography-period/). Using confusing and different font names can quickly become difficult to maintain as the site grows.

###What terrible destruction will unfold if we continue implementing our font files in this way?

I'm glad you asked. One gold star for asking a great question. Below, I've grabbed an example of typography implemented on a client's website.

{% highlight scss %}
// Font variable declarations.
$sans-med: "TheinhardtMedium-Regular", Arial, sans-serif;
$sans-med-italic: "TheinhardtMedium-Italic", Arial, sans-serif;
$sans-bold: "TheinhardtBold-Regular", Arial, sans-serif;
$sans-bold-italic: "TheinhardtBold-Italic", Arial, sans-serif;

// Base styles
base {
  font-family: $sans-med;
  font-size: 14px;
  font-weight: normal;
}

strong {
  font-family: $sans-med-bold;
}

em {
  font-family: $sans-med-italic;
}

h1, h2, h3, h4, h5, h6 {
  font-family: $sans-bold;
  font-weight: normal;
}

h1 em,
h2 em,
h3 em,
h4 em,
h5 em,
h6 em {
  font-family: $sans-bold-italic;
  font-weight: normal;
}
{% endhighlight %}

We can no longer rely on the browser to implement `font-style: italic;` or `font-weight: bold;` for our base styles. If the browser can't detect the browser file for say italic or bold, the browser will just place the text twice on top of each other or skew the font in a weird way. We have to declare the typographic styles in a kind of font reset to render properly, which muddles our style sheets when we debug in the browser and adds heavier scope if we try to override the styles. Yikes.

##Bring your styles with the font files

Let's refactor our original font file declarations to make our lives easier down the road by doing the following:

- Write all the font names exactly the same way to separate font-family from weight and style.
- Declare a font-weight after the .eot file.
- Declare a font-style after the font-weight.

{% highlight scss %}
@include font-face(
  'Theinhardt',
  font-files(
    'TheinhardtMedium-Regular.woff',
    'TheinhardtMedium-Regular.ttf'
  ),
  'TheinhardtMedium-Regular.eot',
  normal,
  normal
);

@include font-face(
  'Theinhardt',
  font-files(
    'TheinhardtMedium-Italic.woff',
    'TheinhardtMedium-Italic.ttf'
  ),
  'TheinhardtMedium-Italic.eot',
  normal,
  italic
);

@include font-face(
  'Theinhardt',
  font-files(
    'TheinhardtBold-Regular.woff',
    'TheinhardtBold-Regular.ttf'
  ),
  'TheinhardtBold-Regular.eot',
  bold,
  normal
);

@include font-face(
  'Theinhardt',
  font-files(
    'TheinhardtBold-Italic.woff',
    'TheinhardtBold-Italic.ttf'
  ),
  'TheinhardtBold-Italic.eot',
  bold,
  italic
);
{% endhighlight %}

**How does this change the way we use the font files? And what do gold stars get me?**

I'm glad you asked! Two gold stars for being a good student.

We can now call on the same sans-serif font family once, regardless of the files, declare the desired weight and style OR allow the browser to generate styles based on the element (i.e. em, strong, headings).

{% highlight scss %}
// Font variable declarations.
$sans-serif-font-family: "Theinhardt", Arial, sans-serif;

// Base styles
base {
  font-family: $sans-serif-font-family;
  font-size: 14px;
  font-weight: normal;
}
{% endhighlight %}

Look at that, Jack! We cut down on our base styles and created an intuitive way to utilize the font family, weight, and style declarations. The browser will be able to inherently create beautiful typography utilizing our single font declaration rather than being forced to grab different files for each element from a stylesheet reset.

Compass is an excellent tool, but other people may not use SASS or a pre-processor at all for that matter. I highly recommend checking out Paul Irish's [Bulletproof @font-face Syntax](http://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/) for a vanilla CSS alternative to the code written in my examples.

**Other recommended reading:**

- Paul Scrivens's [One More Time: Typography Is The Foundation Of Web Design](http://www.smashingmagazine.com/2012/07/24/one-more-time-typography-is-the-foundation-of-web-design/)
