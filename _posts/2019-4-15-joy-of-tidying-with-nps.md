---
layout: post
title:  "The joy of tidying npm scripts with nps"
description: "npm scripts can become unruly quickly, especially when working
with an evolving code base. Learn the joy of tidying with nps ✨"
---

npm scripts have never sparked joy for me. The package.json file is meant to be
a configuration file and manifest of everything necessary to run a node module
or application. Lately, my package file was feeling a little bloated, unsightly,
and unruly. I also work in a lot of packages at my current job which means
quickly parsing the scripts from other people's work. When a project has a lot
of dependencies, `cat`ing a file to read the scripts can feel frustrating and
overwhelming. Luckily, we can leverage nps to put scripts in their place and
make package scripting maintainable.

<!--break-->

## Getting started with nps

Let's start by installing nps as a development dependency:
`npm i nps --save-dev`

We can initialize by using the locally installed script to init a file for us:
`./node_modules/.bin/nps init`

Voila!

Check your `git status` and you'll find a newly created package-scripts.json
file with your previously implemented package scripts. This is the file you'll
be using to create tasks moving forward. Not a big fan of json? nps also
provides initialization in yaml with the flag  `--type yml`.

## Show me the magic 🔮

You're now wondering "Do I now need to install nps globally on my machine to run
these scripts?". This is where the joy ✨ comes in.  Usually, when you run npm
scripts, you must use the command `npm run`. There are some specific cases that
npm does not require the use of `run`. These include:

* `test`
* `restart`
* `stop`
* `start`

nps allows you to take advantage of `npm start` by acting as a pass-through.

```json
{
  "scripts": {
    "start": "nps"
  }
}
```

We can now run all of our script commands as `npm start
${script_name_in_package-scripts.json}`.  For instance, if I have a task in
`package-scripts.json` called `dev` that starts a dev environment, I would run
`npm start dev` rather than the usual `npm run dev`.

If you are working on a node application, you will generally make use of the
start script for running the server. In that case, you can create a default
script in package-scripts.json to start your node application.

```javascript
module.exports = {
  scripts: {
    default: 'node index.js', // My default node server
    lint: 'eslint .',
    test: {
      default: 'jest',
      watch: {
        script: 'jest --watch',
        description: 'run in the amazingly intelligent Jest watch mode'
      }
    },
    build: {
      // learn more about Webpack here: https://webpack.js.org/
      default: 'webpack',
      prod: 'webpack -p',
    },
  },
}
```

## Give your teammates documentation

One of the more useful features is the ability to give documentation. You'll
notice in the example above, there's a `description` field. This field allows
your team to quickly learn about what a particular script entails. For the
example above, it might seem like overkill. If you have some complication
scripts, you may want to provide some quick documentation. By using `npm start
help`, other developers can quickly output documentation without needing
additional explanation.

If you need more information than what I've outlined, the documentation on the
[README](https://www.npmjs.com/package/nps) is far more detailed. Happy tidying!

