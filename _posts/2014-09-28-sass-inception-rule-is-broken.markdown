---
layout: post
title:  The SASS Inception Rule is broken
description: SASS nesting is used to quickly make styles but comes at a cost. Learn how to develop a long term strategy for maintainable style sheets, reduce pain
date: 2014-09-28
categories: 
- Best Practices
tags: 
- SASS
- Mixins
- The Inception Rule
---

As a front-end developer, my job is not only to create usable and beautiful websites, but also to design mantainable and reusable code. If you've ever worked with SASS or a team that uses a preprocessor, you've probably come across nesting in all of it's beautiful, ugly glory. It's a way to quickly scope for page specific styles or grab selectors that may not have classes assigned. 

To help maintain nesting, the [Inception Rule](http://thesassway.com/beginner/the-inception-rule) has been the de facto answer to the problem. In this post, we'll look at how the rule is broken and how we can fix it. 

<!--break-->

<div class="center buffer">
  <img src="/build/img/leo-strut.jpeg" alt="Leo after using the SASS Inception Rule" />
</div>


## Case study example

Here is some real code I found on a recent project with the class names altered. It highlights the kind of problems I want to illustrate and the kind of poor nesting that results from the Inception Rule. 

**Some crappy SCSS**

{% highlight css %}
.cat-product {
  .panel-col-first {
    .expanded {
      ul {
        display: none;
      }
    }
    .active-trail {
      .menu {
        display: block;
      }
    }
    li {
      list-style-type: none;
      list-style-image: none;
      padding: 0;
      margin: 0;
      border-top: solid 1px $yaso-gray;
      &.last {
        border-bottom: solid 1px $yaso-gray;
      }
      ul {
        li {
          border-top:none;
          border-bottom:none;
          a {
            height: 30px;
            line-height: 30px;
            padding: 0 10px 0 30px;
            text-decoration: none;
          }
        }
        li.active-trail {
        background: $off-gray;
        }
        li.last {
          border-top:none;
          border-bottom:none;
        }
      }
      a {
        display: block;
        padding: 0 10px;
        height:50px;
        line-height:50px;
        color: $dark-gray;
      }
      a:hover {
        background-color: #ededed;
      }
      .active-trail {
        background: $off-gray;
      }
    }
  }
}
{% endhighlight %}

**Evaluates to crappy CSS**

{% highlight css %}
.cat-product .panel-col-first .expanded ul {
  display: none;
}
.cat-product .panel-col-first .active-trail .menu {
  display: block;
}
.cat-product .panel-col-first li {
  list-style-type: none;
  list-style-image: none;
  padding: 0;
  margin: 0;
  border-top: solid 1px #ddd;
}
.cat-product .panel-col-first li.last {
  border-bottom: solid 1px #ddd;
}
.cat-product .panel-col-first li ul li {
  border-top: none;
  border-bottom: none;
}
.cat-product .panel-col-first li ul li a {
  height: 30px;
  line-height: 30px;
  padding: 0 10px 0 30px;
  text-decoration: none;
}
.cat-product .panel-col-first li ul li.active-trail {
  background: #ddd;
}
.cat-product .panel-col-first li ul li.last {
  border-top: none;
  border-bottom: none;
}
.cat-product .panel-col-first li a {
  display: block;
  padding: 0 10px;
  height: 50px;
  line-height: 50px;
  color: #333;
}
.cat-product .panel-col-first li a:hover {
  background-color: #ededed;
}
.cat-product .panel-col-first li .active-trail {
  background: #dddy;
}
{% endhighlight %}



### Communication breakdown

There's several problems with the code listed above. Let's start with the amount of nesting taking place within the .cat-product object. For all but one or two instances, this bit of code follows the Inception Rule by going no more than four levels deep. The rule doesn't protect us from runaway code and doesn't provide a framework for legibility or maintainability. Instead, we get large blocks of code we'll later have to untangle or explain to teammates. 

### Tie me up, untie me

Instead, we should have the "Inception-wasn't-that-clever-of-a-movie-rule". Anything more than a single level deep really just causes more pain and suffering, as in "My brain hurts from having Christopher Nolan explain half of his damn movie to me" pain. There's a kind of sadistic joy involved when you force your audience to pay attention to your character explain five or six, tangled stories and scenarios. Untangling deeply nested SASS is bit like untangling Inception, you need graphs, diagrams, a lengthy explanation to get through it. 

<div class="center buffer">
  <img src="/build/img/inderption-poster.jpg" alt="Using the SASS Inception Rule will lead to Inderption" />
</div>

<div class="callout warning-callout">
  <p>Warning: Christopher Nolan actually makes amazing movies and I wish I had just a sliver of his talent. I would be honored to bring him his coffee on set.</p>
</div> 

## Me code pretty one day

The second issue is that the code uses almost no classes on the elements. Obviously, this is some kind of menu system but we're left with rules that apply to *all* anchor tags or *all* list items. Say we want to expand on this menu system by creating child elements with their own set of rules. Our code now requires us to nest even deeper to create our styles. 

<div class="callout warning-callout">
  <p>Warning: Nesting is for rats and birds, not your style sheets</p>
</div>

Let's take our example and clean up some of the rules with new classes and some vanilla CSS. I'll start by creating a class name for the menu. Let's go with .cat-menu. Hipsters and grandmas give 10 out of 10 cat paws for my naming conventions.

{% highlight css %}
.active-trail .menu {
	display: block;
}

.cat-menu.expanded {
	display: none;
}

.cat-menu__list-item {
	list-style-type: none;
  list-style-image: none;
  padding: 0;
  margin: 0;
  border-top: solid 1px $yaso-gray;
}

.cat-menu__list-item.last {
	border-bottom: solid 1px $yaso-gray;
}
{% endhighlight %}

We've now made it far more clear what exactly is going on with our menu using vanilla CSS and some BEM. It's a menu about cats, with list item styles and classes to toggle states. I have to now spent 0 hours explaining the code to my teammates. Meeting adjourned!

## Mix it, mix it real good

SASS offers so much more than just nesting, yet most people decide to use the nesting feature exclusively. SASS's mixins and variables allow you to create excellent reusable snippets of code. 

In my `_mixins.scss` file, I'll use [8 Sass mixins you must have in your toolbox](http://zerosixthree.se/8-sass-mixins-you-must-have-in-your-toolbox/) and the [better OSX font rendering mixin](http://maximilianhoffmann.com/posts/better-font-rendering-on-osx) to handle some issues like:

- Animation keyframes
- Vendor prefixes
- Clearfixing
- Breakpoints
- Cross-browser opacity
- Hiding elements visually
- Font smoothing

I use these mixins across all projects in addition to the ones provided by Compass. However, mixins have their limits. Don't use mixins in an attempt to reuse code or create auto-magic CSS. Mixins should be used to rewrite small snippets, like a clearfix or vendor prefixes, not entire styles. 

**How not to use a mixin**

{% highlight scss %}
@mixin cat-form-mixin() {
  .form-item {
    margin-top: 0;
    overflow: hidden;
    clear: both;
    label {
      float: left;
      margin-right: 10px;
      color: #787878;
    }
    .form-text {
      float: right;
      width: 50%;
      margin-bottom: 10px;
    }
    .description {
      clear: both;
    }
  }
}
{% endhighlight %}

<div class="callout danger-callout">
  <p>Danger: If you create abominations like the code I found above, you will be cursed with The Keyboard Cat playing on loop. Forever.</p>
</div>

## Variables

Variables provide an excellent way to reuse even more granular bits of code for consistency and clarity, including:

- Colors
- Shadow styles
- Font sizes
- Typography
- Margins
- Borders

A lot of the ways I've structured my variables has been shamelessly stolen from Bootstrap and the Skeleton front-end frameworks, but I think they illustrate the kinds of things you can reuse throughout your style sheets. 

{% highlight scss %}
//  Variables

// Colors

	$black: #000;
	$grey: #333;
	$white: #fff;
	$blue: #379ad3;
	$dark-blue: #226f9b;
	$orange: #ff9900;

	$link-color: $white;
	$body-link-color: #0b5c86;

// Typography
	
	// Fonts
	@include font-face("Montserrat", font-files(
		"Montserrat-Regular-webfont.woff", 
		"Montserrat-Regular-webfont.ttf", 
		"Montserrat-Regular-webfont.svg"), "Montserrat-Regular-webfont.eot", normal, normal);

	@include font-face("Montserrat", font-files(
		"Montserrat-Bold-webfont.woff", 
		"Montserrat-Bold-webfont.ttf", 
		"Montserrat-Bold-webfont.svg"), "Montserrat-Bold-webfont.eot", bold, normal);

	@include font-face("Arvo", font-files(
		"arvo-regular-webfont.woff", 
		"arvo-regular-webfont.ttf", 
		"arvo-regular-webfont.svg"), "arvo-regular-webfont.eot", normal, normal);
	
	@include font-face("Droid Serif", font-files(
		"DroidSerif-webfont.woff", 
		"DroidSerif-webfont.ttf", 
		"DroidSerif-webfont.svg"), "DroidSerif-webfont.eot", normal, normal);

	// Font Families
	$sans-serif-font-family: "Montserrat", Helvetica, Arial, sans-serif;
	$serif-font-family: "Droid Serif", "Times New Roman", Times, serif;
	$slab-serif-font-family: "Arvo", "Courier Bold", Courier, serif;

	// Font Sizes
	$base-font-size: 16px;
	$xs-font-size: $base-font-size * 0.625;
	$sm-font-size: $base-font-size * 0.75;
	$md-font-size: $base-font-size * 0.825;
	$lg-font-size: $base-font-size * 3.75;
	$base-font-weight: normal;
	$base-line-height: 1.5;
	$line-height-computed: $base-font-size * $base-line-height;
	$line-height-computed-half: ceil($line-height-computed / 2);

	// Heading Fonts
	$h1-font-size: ceil(2.074 * $base-font-size);
	$h2-font-size: ceil(1.728 * $base-font-size);
	$h3-font-size: ceil(1.44 * $base-font-size);
	$h4-font-size: ceil(1.2 * $base-font-size);
	$h5-font-size: $base-font-size;
	$h6-font-size: ceil(.833 * $base-font-size);
	$headings-line-height: 1.45;
	$headings-font-weight: bold;

// Bleed 
	$right-content-bleed: 23px; 
	$right-content-inner-bleed: 49px;

// Box Shadow
	$inset-shadow: rgba(0,0,0,0.15) 0 -25px 12px -15px inset;
	$box-shadow: rgba(0,0,0,0.15) 3px 3px 15px 3px;

// Transitions
	$ease-in-out: all .25s ease-in-out;
	$ease: all .5s ease;

// Animations
	$animation-duration: 1s;
	$animation-delay: 2s;

// Misc

	$border-black: 1px solid $black;
	$border-grey: 1px solid $grey;
	$border-white: 1px solid $white;
{% endhighlight %}

Front end development has a lot of challenges and working with teams makes the job even more challenging. Why create more problems by nesting? Do your future-self and your teammates a favor by cutting out nesting. Nesting may seem like a way to quickly write some CSS, but quickly adds more time later to your work. Also, I stand by my word that Inception kind of sucked. 

**Recommended reading:**

- Hugo Hugo Giraudel's [Beware of Selector Nesting in Sassh](http://www.sitepoint.com/beware-selector-nesting-sass/)