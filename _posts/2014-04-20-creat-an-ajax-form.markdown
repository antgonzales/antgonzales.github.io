---
layout: post
title:  "Create a Responsive Form for Static Websites"
description: "Learn how to create an responsive form for static websites using Simple Forms, jQuery, AJAX"
date:   2014-04-20 21:25:29
categories: Tutorial
tags: [Contact Form, jQuery, Ajax]

---

If you’re like me, you like your contact forms to be easy to understand for users. Today we will create a contact form using jQuery Validate for your static website that doesn’t refresh the page, animates a small “Thank You” note, and sends messages to your Simple Form inbox. 

Simple Form is great if you can’t use a server side language like PHP, for instance on Github pages. I’m hosting my website on Github Pages, so this kind of service makes sense for me. There’s a plethora of tutorials covering server side contact forms so feel free to read more elsewhere. 

<!--break-->

##Getting Your Simple Form Access Tokens
In order to start, you need to create an account through Simple Form. Be sure to save any emails they send you, there is no way to login except by your private api token. You will be issued two separate tokens, one to use on your website and one to view your messages. 

**Form API Code**

{% highlight html %}
http://getsimpleform.com/messages?form_api_token=<api_token>
{% endhighlight %}

Don’t give this URL to anyone! It’s your private token to send messages to your inbox.

**Messages API Code**

{% highlight html %}
http://getsimpleform.com/messages?api_token=<api_token>
{% endhighlight %}

Bookmark this URL! You will not be able to see your messages if you don’t keep this URL. Simple Form does not currently have a login option.

##Creating the HTML5 Form
Let’s start by creating our form using HTML. Nothing new here, but let’s refresh:

{% highlight html %}
<div class=”container”>
  <form action="#" class="ajax-form">
    <input type="text" class="name" name="name" placeholder="Your name">
    <input type="text" class="email" name="email" placeholder="Your email address">
    <textarea name="message" class="message" placeholder="Enter your message"></textarea>
    <div class="form-btn">
      <input type="submit" class="submit" value="Submit">
    </div>
  </form>
</div>
{% endhighlight %}


I’ve created my form, gave the inputs names, added some classes in order to manipulate individual fields with CSS, and added placeholder text. I’ve also placed the form inside a container to add structure. The names and the classes will come in handy with the styles and jQuery Validate.

##Giving the Form Some Style
We want to make sure that the form is responsive so that it looks great on all devices so we’ll define the width as 100%. The idea is that you can put it into any container and will still look sharp across different grid systems. I’ve also added some Normalize and Reset styles.

{% highlight css %}
/* Normalize & Reset */

body {
    font-family: Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: #777;
    font-size: 18px;
    -webkit-font-smoothing: antialiased; /* Fix for webkit rendering */
    -webkit-text-size-adjust: 100%;
}

button,
input,
textarea {
    color: inherit; /* 1 */
    font: inherit; /* 2 */
    margin: 0; /* 3 */
}

*, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

/* Form Styles */

.container { width: 100%; }
.ajax-form { width: 100%; }

.ajax-form input, 
.ajax-form textarea {
  padding: 20px;
  border: 3px solid #ccc;
  border-radius: 6px;
  margin: 0 0 15px;
  background: #eee;
    outline: none;
  -webkit-transition: all .25s ease-in-out;
      -moz-transition: all .25s ease-in-out;
      -o-transition: all .25s ease-in-out;
      transition: all .25s ease-in-out; 

}

.ajax-form input:focus, 
.ajax-form textarea:focus {
  border: 3px solid #2735A7;
  color: #424651;
}

.ajax-form input[type="submit"] {
      border: 3px solid #2735A7;
  color: #2735A7;

}

.ajax-form input[type="submit"]:hover {
    background-color: #2735A7;
      border: 3px solid #2735A7;
    color: white;
}

.name, .email { width: 48%; }

.name { float: left; }
.email { float: right }

.message { width: 100%; }

.form-btn { text-align: center; }

@media (max-width: 577px) {
  .name, .email { 
    width: 100%; 
    float: none;
  }

}
{% endhighlight %}

I’ve created the basic structure and style of the form by giving the form padding, fluid widths to resize with the window, and some hover effects. I floated the first two inputs to give the form a cleaner design to separate inputs from the main message. I’ve also placed the submit button in the center inside of a div. The transitions defined on the form will dictate the way the form transitions, including hover and error message effects.

The form looks great, but it doesn’t validate with any error messages or actually send anything.

##Integrating jQuery Validate
Let’s add validation by using jQuery Validate. Right out of the box, it gives us the ability to validate any part of our contact form. jQuery Validate is a robust plugin that allows for customization but for the sake of this tutorial, we’ll stick to the basic API. 

{% highlight javascript %}
$(".ajax-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
        minlength: 5
    }
  }
});

{% endhighlight %}

This is the basic setup for the way in which Validate will check the form. Each of the names of the rules correspond with the form we created earlier. Each of the options are self-explanatory but feel free to look in the reference docs for more options. 

Although the form validates, it’s automatically adding error messages to the form and doesn’t submit information to our messages inbox. 

##Custom Error Styles
I don’t particularly want the error messages to pop-up. I think my form is straightforward enough for people to know whether or not they are inputting information correctly. Instead of the default messages, I want the form to highlight red on fields that aren’t properly utilized.

{% highlight javascript %}

$(".ajax-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
        minlength: 5
    }
  },
  errorPlacement: function(error, element) {
  }
});

{% endhighlight %}

By adding the errorPlacement attribute with empty parameters, the form no longer adds messages to the form. Validate will still add error classes to the form however, so we can add styles using that class.

{% highlight css %}
.error { border: 3px solid #ED1941 !important; }
{% endhighlight %}

Now the borders of our inputs will highlight red when the user enters bad information or click the “Submit” button without entering information.

##Sending JSON Data to Simple Form Through AJAX

Next, we need to actually send the information to our Simple Form service without refreshing the page or directing us to a new URL. By default, HTML forms will either refresh the page or allow you to redirect to a “Thank You” page. We want to stay right where we are. Simple Form luckily has AJAX and JSON integration so we can do just that.
 
{% highlight javascript %}

$(".ajax-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
        minlength: 5
    }
  },
  errorPlacement: function(error, element) {
  },
  submitHandler: function(form) {
    $.ajax({
      dataType: "jsonp",
      url: "http://getsimpleform.com/messages/ajax?form_api_token=<api-token>",
      data: $(".ajax-form").serialize()
    }).done(function() {
      //callback which can be used to show a thank you message
      //and reset the form
       alert("Thank you, for contacting us");
    });
      return false; //to stop the form from submitting
    }
  });

{% endhighlight %}

We’ve added the AJAX call into the submitHandler of our Validation code. This basically tells the AJAX call to only submit after the Validation has been cleared. You’ll also notice the AJAX call has some specific parameters. Let’s break it down:
* In the URL, you’ll want to add your form api token, which is the private key sent to you in your email
* Simple Form requires you to use  .serialize() on the data you provide through JSON
* We have a callback function that will alert the user that they’ve submitted the form
* We return false; to ensure that the page isn’t refreshed

It’s great that we can now send information to our mailbox, but I don’t particularly want an alert to annoy users when they submit the form. Let’s add a small “Thank You” note with jQuery’s animations.

##Adding a Thank You Note with Animations
We want to hide the contact form and fade in the “Thank You”. I’ve created the HTML, which will be placed underneath the form and hidden with CSS. jQuery’s .fadeIn method will remove the hidden CSS and display the note as block. 

{% highlight html %}
<div class="form-thank-you">
  <h3>Thank you for contacting me!</h3>
  <p>I'll be in touch with you shortly</p>
</div> 
{% endhighlight %}

{% highlight css %}
.form-thank-you {
  display: none;
  width: 100%;
  text-align: center;
}

.form-thank-you h3 { padding-top: 15px; }
{% endhighlight %}

{% highlight css %}
/* Add this to the AJAX callback */
 $(".ajax-form").hide();
 $(".form-thank-you").fadeIn("400");
{% endhighlight %}

##You Finished!
Easy right? Maybe not, maybe you got snagged somewhere along the way. That’s okay, check out a working demo of the form so you can reference your work against mine. Thank you for following along and leave comments below if you have any questions.

<div class="center">
  <a href="http://bit.ly/QDX9wa" class="button button-space">See the Demo</a>
</div>
