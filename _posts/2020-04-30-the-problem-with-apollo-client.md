---
layout: post
title: "The problem with Apollo Client"
description: "Create a safe environment to take risks, build confidence, and write legible code. Learn how to start"
image: "glass-house-at-night-compressed.jpg"
date: 2020-04-30
---

Apollo Client offers a robust tool to make querying a Graphql endpoint easier.
With caching, off the shelf hooks, and documentation, it makes it really easy to
get started. The trouble starts when you begin testing your components that rely
on Apolly Client to fetch data. The official documentation suggests using a 
I've previously written about why I think Test-Driven Development is an
important process in software development. Testing components that make API
calls is a major challenge. With functional React components, the controls are
really simple to manage. You just add a prop, hook for state, or markup to render
and you can check the results.  

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->
