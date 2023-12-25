---
layout: post
title:  "Setup Prettier and ESLint with Typescript"
description: "Learn how to leverage ESLint, Prettier with Typescript to reduce
bugs and nitpicky reviews. I'll walk you through setup, explain the differences"
last_modified_at: 2023-12-20
---

Learn how to setup ESLint and Prettier with Typescript to free your team from
standards, formatting, and type checking discussions. Each of these tools
aren't hard to configure independently, but getting the type checker, linter,
and style formatter to work together is tricky. Let's go through each of the
tools I personally use, how I set them up, and how they work. Use the
quickstart to get going if you don't have time for the longer explanation.

<!--break-->

* Do not remove this line (it will not be displayed)
{:toc}

## Quickstart

Install the depdencies listed below and add the configuration file at the root
of your project.

### Install dependencies

```bash
$ npm install --save-dev eslint prettier @typscript-eslint/parser
@typscript-eslint/plugin eslint-config-prettier
```

### Create an `.eslintrc.json` configuration file
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

## Explanation

### Enforce code quality with ESLint
The TSLint project recently announced that they would migrate the project to
ESLint to streamline the Javascript and Typescript development experience. I
generally use the recommended ESLint and TS rules, some of these
recommendations come with formatting (less so in eslint, more so in
typescript-eslint rules).

```bash
$ npm install --save-dev eslint @typscript-eslint/parser
@typescript-eslint/plugin
```

The interesting part of this installation is the namespaced parser. Why do we
need to install a parser? The Typescript ESLint parser is the engine that
creates the Abstract Syntax Tree (AST) to recursively analyze your code base
and provide feedback based on the rules provided by our plugin. It's important
to note that you cannot use the plugin without the parser. With our Typescript
specific parser, we can leverage our tsconfig.json file in `parserOptions` to
check rules by type information.

Your `.eslintrc` file should look like the following

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

### Formatting with Prettier 💅
Now that we have ESLint checking for code quality, how do we make sure that the
number of line breaks or use of semicolons doesn't come up in code reviews?
With Prettier, we can format code through the CLI or we can integrate it with
our favorite code editor to format on save! There's one small issue. Some of
the rules in your ESLint configuration may conflict with the rules you set in
Prettier. The result is one tool overriding the other in a loop. Luckily the
team at Prettier has solved this problem. There are a few options, but we'll go
with my choice; turn off ESLint format rules.

```bash
$ npm install --save-dev prettier eslint-config-prettier
```

We've now installed Prettier and an ESLint config specifically to integrate
with Prettier. This config has a set list of rules to turn off on the ESLint
side of things to allow Prettier to do its thing. In contrast to the endless
amount of rules you can enforce in ESLint, Prettier has a very specific list of
formatting options. Let's get it working.

Our `.eslintrc.json` file should now look like the following:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

<div class="callout warning-callout">
  <p>
    <strong>Note that the prettier configurations come last in the
    array</strong>. It's required that you place prettier last to override the
    other configurations.
  </p>
</div>

Here's what our `.prettierrc.json` file will look like:
```json
{
   "printWidth": 80,
   "tabWidth": 2,
   "useTabs": false,
   "semi": true,
   "singleQuote": true,
   "trailingComma": "es5",
   "bracketSpacing": false,
   "arrowParens": "always"
}
```

I'm opting to keep the two separate, there's a way to instruct ESLint to run
Prettier but I ended up dealing with serious performance issues. To test it
out, let's try giving it a run.

```bash
$ ./node_modules/.bin/eslint . --ext .ts
```

```bash
$ ./node_modules/prettier/bin-prettier.js -c "src/**/*.ts
```

That's it! You should now see output from both linters to let you know if your
code does not meet standards. In your package.json, you can put it together
with the Typescript compiler to also check for any type errors.

```json
{
  "scripts": {
    "lint": "npm run lint.eslint && npm run lint.prettier && npm run lint.types",
    "lint.eslint": "eslint . --ext ts",
    "lint.prettier": "prettier -c src/**/*.ts",
    "lint.types": "tsc --noEmit"
  }
}
```

## FAQs
### Isn't type checking enough?
Yes! You don't need these additional tools. However, these tools offer some
additional linting and fixing that Typescript doesn't provide. ESLint and
Prettier offer support for code quality and formatting respectively.

### What's the difference between code quality and formatting?
Code quality ensures that your code won't fail on minor errors and bugs.
Accidentally misspelling a variable, letting case/switch statements fall
through, or other silly mistakes that will potentially break your application.
In contrast, Prettier is concerned with **_a e s t h e t i c s_** ✨; things like
semicolons, dangling commas, and spacing.

## References
* [Prettier: Integrating with
  Linters](https://prettier.io/docs/en/integrating-with-linters.html)
* [prettier/eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

## Update notes

* December 20, 2023: `prettier/@typescript-eslint` has been removed in
  `eslint-config-prettier`
  [v8.0.0](https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21)
