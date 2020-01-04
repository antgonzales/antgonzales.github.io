---
layout: page
title: About
description: A front-end developer blog devoted to application development, user experience, design. See code examples, learn from tutorials, get tips and tricks
---

Senior Software Engineer at Compass. Previously at Glossier.

I write, think, and talk about web development. I bring expertise in
front-end technology, UI design, and test driven development.

I current live in New York City and work as a tech lead at Compass. I work
primarily on the Content Management System for Compass's real estate agents.
Previously, I worked as a front-end lead developer for Glossier.

![Anthony Gonzales](/assets/img/me.jpeg)

<section id="recent-work" class="buffer container-fluid max-width">
  <h2 class="section-title">Past Projects</h2>
    <div class="row buffer">
      <div class="col-sm-6">
        <div class="portfolio-tile">
          <img class="portfolio-project-thumbnail" src="assets/img/benefit-cosmetics-screenshot.jpg" />
          <div class="portfolio-project-logo-cover">
            <img class="portfolio-project-logo" src="assets/img/BenefitLogo.png" />
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="portfolio-tile">
          <img class="portfolio-project-thumbnail" src="assets/img/intuit-mint-home-page.jpg" />
          <div class="portfolio-project-logo-cover">
            <img class="portfolio-project-logo" src="assets/img/mint-logo.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="portfolio-tile">
          <img class="portfolio-project-thumbnail" src="assets/img/quicken-homepage.jpg" />
          <div class="portfolio-project-logo-cover">
            <img class="portfolio-project-logo" src="assets/img/quicken-logo.png" />
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="portfolio-tile">
          <img class="portfolio-project-thumbnail" src="assets/img/dwell-home-page.jpg" />
          <div class="portfolio-project-logo-cover">
            <img class="portfolio-project-logo" src="assets/img/dwell-logo.png" />
          </div>
        </div>
      </div>
    </div>
</section>

<section id="contact">
  <div class="container-fluid max-width buffer">
    <h2 class="section-title">Get in touch</h2>
    <ul class="list">
    {% for contact in site.data.contacts %}
      <li>
        {{contact.title}}: <a href="{{contact.link}}" target="_blank">{{contact.username}}</a>
      </li>
    {% endfor %}
    </ul>
  </div>
</section>


