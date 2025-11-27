---
layout: post
title: Is this simple or easy?
description: I moved to New York, I bought a HHKB Pro2, and I now do everything from the command line. I've picked up some new habits, but I want to take the time to reflect how I can refine my skills in 2018.
date: 2018-1-4

redirect_to: https://anthonygonzal.es
---

It's been a long time since I last wrote a technical post and a long time since
I've given an update. Now is a good time to discuss my thoughts after
spending two years at a startup. I've learned so much not just as a front-end
developer, but as an engineer with better habits and stronger opinions on the
state of web development. I've got a long ways to go, but I'm hoping 2018
can be the year I take my skills to the next level.

<!--break-->

## Working with a living code base

I recently had the opportunity to work on an existing Ruby on Rails e-commerce
application by building new features, creating best practices, and refactoring
existing work. I rubbed elbows with talented engineers who asked tough
questions about the way I write code and the way I change code over time.

Most of the decisions boiled down to one discussion. Is this decision making
things simpler or "easier". Simple is small, maintainable, manageable, and
focused. In contrast, easy is complex, difficult to change, opaque, convenient
in the moment, and familiar. "Easy" is the classic Rich Hickey
`gem install hairball`, or in my case, `npm install hairball`. I highly
recommend his talk from Rails Conf 2012
[Simplicity Matters](https://youtu.be/rI8tNMsozo0), it's made a huge
impact on the way I think about the code I write. Rather than accepting the
"easiest" approach that does the work for me, it's far better to write
maintainable code that interfaces with external dependencies in simple ways.

"But what does that mean?", you might ask. For our team, it meant putting
Angular where it belonged. The front-end of the application was originally
created headless with Rails in back but the separation of concerns was
never clearly defined in the MVP. Some logic was on the client, some was on the
server. Routes were defined on the server but some hash routes were managed by
Angular. Some calls were made with AJAX, others with Angular's $http service.
Having that separation without clear objectives created tension and messiness.
As I tried to make changes, those "easy" to use features became unruly and
difficult to manage.

## The game plan

I started slowly dismantling the Angular bits into smaller, managed components.
These rewritten components would be tested, do one thing well, and would be have
limited dependencies. In the process of testing, I would remove any unnecessary
dependencies and limit the scope of the component to specific interactions. This
meant communicating with stake holders and designers to ensure the designs would
meet some of these technical decisions.

I immediately started seeing problems with this approach due to Angular.
In order to test Angular, you need a DOM which meant Karma and at the time,
Phantom. Next we needed a testing framework and an assertion library which meant
Mocha and Chai. Lastly, we had to bundle the code so that Karma could behave
like a web page which meant browserify, and later webpack. Lastly, we needed a
way to handle dependency injection and this is where I made the mistake of
adding ngDescribe because it was "easy".

ngDescribe does an amazing job of reducing the cognitive load that Angular
creates, but it's really a band-aid for some underlying issues. Angular knows
about the DOM, it knows about other external libraries, it maintains state and
accepts state from parent elements, it requires angular-mocks to test, and it
has funny lifecycle hooks that are specific to Angular. It also doesn't keep
track of state changes, it just lets you change controller variables anywhere
you please (requiring you to kick over those lifecycle hooks manually).

I installed a ridiculous amount of dependencies in order to run tests that did
not run in isolation, yet this is the norm in front-end development. The testing
stack I just described has been the prescribed solution. We've luckily seen a
great deal of interest in better testing practices with React and
a move towards functional programming with frameworks like Elm, but refactoring
out of Angular became much more difficult with all of these issues.

## Game plan 2.0

After successfully launching a few components, Angular 1.6 was released.
Updating broke existing code, forcing me to rewrite or migrate to the
next iterations of Angular. Feeling the cognitive load of the current testing
setup, I made a decision to move away from Angular and continue rewriting
the front-end with React. The main concern was that the team would be making the
same mistakes but with a new framework. Instead of moving everything to React
wholesale, I suggested we write as much vanilla js as possible until it
was necessary to introduce external dependencies.

What I learned was that we had far more external libraries than we needed. The
consensus I often hear when people use third-party code is that features are
built faster. It's "easier" to utilize other people's code than it is to write
your own. "Easier" comes with massive tradeoffs and loss of control. It also
doesn't empower the engineer to learn to make their own decisions. I also find
that the use case of a project changes. The library we installed is then tweaked
to fulfill new features but ends up not matching the intended use. We
wanted a single page app, no problem! `npm install angular`. It does routes,
state changes, DOM updates, promise HTTP calls, etc. Now that our entire front-
end relies on Angular, we're stuck. We can't move because of past decisions and
change requires a major re-write.

## External dependencies as a crutch

This isn't a rant against frameworks or external tools. This is a reflection on
how to start thinking about using third-party code intelligently. Here are some
questions I ask when I think about integrating new code into the stack:

- What am I trying to accomplish?
- Can I accomplish my goals using the native language?
- Is the third party library tested?
- When was it last updated or is it actively maintained?
- How am I going to interface with this library so I can make changes later?

None of us, as engineers, want to make life difficult for ourselves or other
engineers on the team. Deadlines come fast and hard, managers want to put
numbers on the boards to show productivity, we get stuck on hard problems and
it's tempting to install an NPM package that appears to solve everything
immediately and conveniently. I want to push myself and my fellow engineers to
think hard about our choices. We owe it not just to ourselves as developers, but
to stakeholders paying for our choices.

## 🎉🎊🍻 My 2018 resolution

I know this isn't novel or new territory. My goal for 2018 isn't to learn the
latest front-end framework or take part in the war for which one is the "best".
I want to be a better engineer that utilizes these tools well. I want to build
products that can respond to the demands of immediate change.

Here's my reading list to help with my goals:

- Robert Martin's The Clean Coder
- Robert Martin's Clean Code
- Robert Martin's Clean Architecture

Lot's of Uncle Bob, I know. His books appear to address the question of what
qualifies for simple instead of "easy". I want to take the question seriously
to improve my work and bring value to engineers and stakeholders.

Here's to the new year and to cleaner code!
