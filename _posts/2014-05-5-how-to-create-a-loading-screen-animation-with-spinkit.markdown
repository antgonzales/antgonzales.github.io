---
layout: post
title:  Create a Loading Screen Animation with Spinkit
description: Learn how to create an simple loading screen animation using Spinkit, Modernizr for fallbacks
categories: 
- Tutorial
tags: 
- Loading Animation
- CSS Animations 
- jQuery
- Modernizr
---

Intro animations and loading screens are controversial among web developers and designers. I personally think transitions visually indicate to users that they have left the current page and are navigating to a new location. I also hate to see my website load some font, a pixelated header image, or clunky animations that look great on my local machine but terrible across the Internet. 

In this tutorial, we’ll create a loading animation using [Spinkit](http://tobiasahlin.com/spinkit/), a CSS animation plugin that offers various animated icons, and [Modernizr](http://modernizr.com/) to create fallbacks for older web browsers.

<!--break-->

<div class="callout warning-callout">
  <p>Warning: Older web browsers cannot process CSS3 animations, which means we need to be prepared for your grandparents using dial-up AOL like it’s 1998.</p>
</div>

**What you need for a loading screen animation**
* jQuery
* [Modernizr](http://modernizr.com/)
* Spinkit
* A loading screen .gif

## Basic structure of the loading screen

{% highlight html %}
<div id="loading-screen">
  <div id=”loading-spinner-container”>
    <div id="loading-spinner"></div>
  </div>
</div>
{% endhighlight %}

{% highlight css %}
body { height: 100%; overflow: hidden; }

#loading-screen {
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
}
{% endhighlight %}

Easy peasy chicken breezy. We’ve created a div that will act as the background and will contain your loading spinner. When you look at your page, you’ll have just a blank white screen. 

**Here are some key things to know about our styles:**
* The height and width cover the entire page
* The z-index allows us to tell the browser that our background appears above everything else on the page
* The position tells the browser that even if the user scrolls, the screen stays in the window

## Adding the Spinkit styles
We have a blank screen but no loading animation and the screen doesn’t go away. Let’s add the sweet Spinkit animation first. 

I’m going to go with the soft, pulsing circle… so calming. Even if my visitors never get to the page, they’ll get really comfortable in their seats and might even forget they are trying to load a website as they fall into a trance.

<div class="callout warning-callout">
  <p>Warning: Small pulsing circle animations do not guarantee visitor satisfaction if your website blows. Pulsing circles have been known to cause sudden and intense euphoria.</p>
</div>


{% highlight css %}
#pulsing-circle-container {
  width: 100px;
  height: 100px;
  position: absolute;
  margin: 0 auto;
}

#pulsing-circle {
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 100%;  
  -webkit-animation: scaleout 1.0s infinite ease-in-out;
  animation: scaleout 1.0s infinite ease-in-out;
}

@-webkit-keyframes scaleout {
  0% { -webkit-transform: scale(0.0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes scaleout {
  0% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
{% endhighlight %}

## Adding jQuery animation after browser has loaded
We are now the proud parents of a blank white screen and a pulsing black circle. Let’s add some jQuery to remove the animation first, then the blank screen after the contents of site has been loaded. 

{% highlight javascript %}
$(window).load(function() {
  $("#loading-spinner").fadeOut();
  $('#loading-screen').delay(350).fadeOut('slow'); 
  $('body').delay(350).css({'overflow':'visible'}); 
});
{% endhighlight %}

## Solving fallback issues 
Now that we have a kick-ass loading screen with sweet pulsing-circle action, we need to make sure that grandma can see the site on her Commodore 64. I’ll be using Modernizr to detect whether or not the user has specific features available on their machine and create controls based on the features available.

First, download Modernizr and add the link to your footer. Unfortunately, Modernizr cannot be used over a CDN. For the sake of this exercise, you only need to download CSS Animations from the Modernizr download package.

In the following code, I’ll be creating the logic to decide how to handle the animation when animations are not available due to older browsers.

### If the user doesn’t have JS
If the user does not have Javascript enabled or available, we won’t display the loading screen or the spinner because we won’t be able to remove those items. You know, programming all defensive-like.

{% highlight css %}
.no-js #loading-screen,
.no-js #pulsing-circle-container,
.no-js #pulsing-circle { display: none;  }
{% endhighlight %}

### Adding a fallback gif
With older browsers, namely Internet Explorer, we won’t be able to show our amazeballs animations. Instead, we have to show a .gif in it’s place like it’s 2003. Grab a free spinny gif from [Preloaders](http://preloaders.net) and save it in your img folder. 

<div class="callout danger-callout">
  <p>Danger: If you pronounce .gif like the peanut-butter brand Jif, you’ll be cursed with cats making bread on your keyboard forever.</p>
</div>

{% highlight css %}
.no-cssanimations #pulsing-circle { background-color: none; }
#loading-fallback { display: none; }
.no-cssanimations #loading-fallback { display: block; }
{% endhighlight %}

{% highlight html %}
<div id="loading-screen">
  <div id="loading-spinner-container">
    <div id="loading-spinner">
      <img src="/assets/img/pre-loader-fallback.gif" id="loading-fallback">
    </div>
 </div>
</div>
{% endhighlight %}

This is the magic of Modernizr at work. Modernizr will detect whether or not the CSS animations are available from the browser version. In our case, we only want to show the loading fallback if CSS animations aren't available but not when we want to display our ultra-awesome pulsing circle. 

## You're done! 
You are now the proud owner of a sweet pulsing-circle-loading-screen. Maybe something isn't matching up in the code you've written? Check out the demo to compare notes. 

<div class="center">
  <a href="http://jsfiddle.net/amgnz/sY25U/" class="button button-space">Check out the Demo</a>
</div>
