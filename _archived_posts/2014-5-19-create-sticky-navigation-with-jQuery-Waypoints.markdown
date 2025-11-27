---
layout: post
title: Create a sticky navigation bar with jQuery, CSS
description: Check out this easy tutorial on how to add sticky animation to your navigation bar using jQuery. Learn this simple technique, add it to your site
categories:
  - Tutorial
tags:
  - Navigation
  - Animations
  - jQuery

redirect_to: https://anthonygonzal.es
---

Say you have an awesome website structure in place but it's feeling a little bland. All of your assets, content, and design is looking great but it's missing something... a little flare, pizazz, oomph. A great option is utilizing jQuery to add some custom animations to visually guide the user and smooth out the rough edges of your website.

In this tutorial, I'll be using jQuery's built in methods to create a sticky navigation bar that will catch the users eye and impress your grandma.

<!--break-->

## Making the bones of the nav bar

Let's create the basic structure of our navigation bar with some HTML5. Creating two separate navigation items might be controversial to some, it's nonetheless the method I choose to employ. Each of the separate navigation elements will behave in different ways:

- The first will stay at the top of the page and will not move from that spot (it will be punished if it chooses to move)
- The second will be hidden from view and will slide down when the user reaches a certain place on the page (unless I want it to show up in my user's dreams)

<div class="callout warning-callout">
  <p>Warning: You cannot currently use jQuery in your users' dreams. Google is working on it though. Two words: advertising money.</p>
</div>

{% highlight html %}

  <div class="fixed-nav">
    <div class="container-fluid max-width">
      <div class="nav-logo">
        <a href="/">Brand</a>
      </div>
      <nav role="navigation">
        <ul class="main-nav">
          <li><a href="/#recent-work">Work</a></li>
          <li><a href="/#skills">Skills</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="sticky-nav">
    <div class="container-fluid max-width">
      <div class="nav-logo">
        <a href="/">Brand</a>
      </div>
      <nav role="navigation">
        <ul class="main-nav">
           <li><a href="/#recent-work">Work</a></li>
          <li><a href="/#skills">Skills</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>
  </div>

{% endhighlight %}

## Add some style to our navigation

Now that we have the basic foundation of our navigation bar, let's add some styles to make it look better (y u look so fugly nav bar?). First off, I've added Bootstrap and Normalize.css to add structure to the page. I'm also using SCSS to make the process a little easier and to also show off my mad skills.

<div class="callout warning-callout">
  <p>Warning: Using SCSS on your website won't guarantee you a job, but 100% of employers agree SCSS is frigging fancy and way future. Like DJ Shadow getting kicked out of a nightclub future.</p>
</div>

{% highlight sass %}
.max-width { max-width: 1170px; }

nav {
display: block;
float: right;
font-size: 21px;
}

.nav-logo {
padding-top: 10px;
display: block;
float: left;

a {
font-family: 'Roboto Condensed', sans-serif;
font-size: 28px;
text-decoration: none;
color: #333;

     &:hover, &:focus { color: #666; }

}
}

.main-nav {
padding: 14px 0;
font-weight: bold;

li {
font-family: 'Roboto', sans-serif;
font-size: 14px;
display: inline;
margin-left: 14px;
margin-right: 14px;
}

    a { text-decoration: none; }

    a:hover {
      color: #000;
      padding-bottom: 7px;
      border-bottom: 3px solid #000;
    }

}

.fixed-nav {
position: absolute;
left: 0;  
 top: 0;
width: 100%;
}

{% endhighlight %}

We now have the outline of our navigation bar but in particular, the "fixed-nav" class. The actual term for the navigation's position is "absolute". I'm using the term "fixed-nav" because it won't move from it's position at the top of the page. I'm choosing to use a behavioral description for the element as opposed to the technical term "absolute". If anyone tries to call me out for my class naming conventions, I will drop them like third period French. For more information about positions, I recommend you read up on Chris Coyier's [explanation of absolute, relative, and fixed positioning](http://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/).

Now that have the navigation created, let's add page elements to navigate to and implement the jQuery logic.

## Adding elements on our page

In this case, I'm modeling the elements after my own home page (cuz it's mad dope). I decided to create a single-page design inspired by the likes of [One Page Love](http://onepagelove.com/). I really appreciate the idea of highlighting my experience in a minimal, simple way. I may decide to create more pages later, but for now, it looks great.

<div class="callout warning-callout">
  <p>Warning: Following the latest trendy thing that front-end developers are doing doesn't guarantee you a job but employers really like trendy designs to impress their friends and neighbors. Recruiters rely on the blood of trendiness or they dry up and shrivel.</p>
</div>

Let's create the placeholders for the rest of our page with logical sections that will contain our work along with more SCSS to add spacing between the sections. The hero image at the top of the page will be important for our jQuery code and because it's Nicolas frigging Cage.

{% highlight html %}

  <div class="hero">
    <img class="img-responsive" src="http://www.placecage.com/2000/1000" />
  </div>

  <main class="container">
    <section>
      <h2 id="work">Work</h2>
    </section>

    <section>
      <h2>Skills</h2>
    </section>
    
    <section>
      <h2>About</h2>
    </section>
    
    <section>
      <h2>Contact</h2>
    </section>
  </main>
{% endhighlight %}

At this point our site is looking pretty bad, but with a little more SCSS for our placeholders, we'll be able to create a mockup of the way the navigation will behave.

{% highlight scss %}
.max-width { max-width: 1170px; }

.main { padding-top: 200px;}

section {
padding: 60px 0;
text-align: center;
}
{% endhighlight %}

# Adding sticky navigation styles

We have the basic outline of our website now but no way to implement the sliding navigation after we scroll past our friend Nic Cage. Let's add those styles now.

{% highlight scss %}

.sticky-nav {
position: fixed;  
 left: 0;  
 top: 0;  
 z-index: 100;
width: 100%;
background-color: #ddd;
display: none;
}

{% endhighlight %}

As I mentioned previously, the name "sticky-nav" is a behavioral style name I created but the actual name of the position that dictates this behavior is "position: fixed;". This style will keep the navigation bar to the top of our page as we scroll.

## Adding jQuery to create the animation transitions

A case can be made for using [Vanilla JS](http://youmightnotneedjquery.com/) instead of jQuery for this simple transition but I will leave that debate for another blog post. For now, let's use jQuery since everyone and their mom, but not grandma, currently uses it. Grandma likes her Commodore 64, no need for jQuery.

{% highlight javascript %}
var stickyNav = function () {
var top = $(".hero").height();
var scrollTop = $(window).scrollTop();

      if (scrollTop >= top) {
          $(".sticky-nav").slideDown();
      } else if (scrollTop >= 0) {
          $(".sticky-nav").slideUp();
      }

};

$(window).scroll(function () {
stickyNav();
});

{% endhighlight %}

Let's break down some of the logic:

- The stickyNav function dictates behavior of our navigation bar
- I have created local variable that measures the height of our .hero class (Nic Cage) and the current pixel position of the user's window. The height will essentially provide the pixel number for the **bottom** of the element.
- If the user's current pixel position number is greater than the pixel position of the Nic Cage photo height, it slides down the class .sticky-nav
- However, if the user's position is less that the pixel position of the bottom of the Nic Cage photo, the .sticky-nav class slides out of view
- I then call my stickyNav function on the window

## You've got a kickass sticky nav animation

I hope this tutorial illuminates the structure necessary to implement a navigation bar with animations using a bit of jQuery and CSS. We didn't go into much detail about jQuery itself for other use case scenarious, however, I hope it provides a framework to start playing around. Feel free to see the demo if you got stuck. Leave comments to show me you love me.

<div class="center">
  <a href="http://bit.ly/1n93tpQ" class="button button-space">Check out the Demo</a>
</div>
