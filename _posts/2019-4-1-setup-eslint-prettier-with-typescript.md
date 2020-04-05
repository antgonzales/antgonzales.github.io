---
layout: post
title:  "Setup Prettier and ESLint for Typescript"
description: "Learn how to leverage ESLint, Prettier with Typescript to reduce
bugs and nitpicky reviews. I'll walk you through setup, explain the differences"
---

Learn how to setup Typescript, ESLint, and Prettier to free your team from
standards, formatting, and type checking discussions. Each of these tools
aren't hard to configure independently, but getting them to work together is
tricky. You've maybe used some version of ESLint, Prettier, Standard, XO, or
TSLint but putting it all together again is a pain in the butt. Let's go through
each of the tools I personally use, how I set them up, and how they work. TLDR
at the bottom if you just want to get rolling.

<!--break-->

## Isn't type checking enough?
Yes! You don't need these additional tools. However, these tools offer some
additional linting and fixing that Typescript doesn't provide. ESLint and
Prettier offer support for code quality and formatting respectively.

## What's the difference between code quality and formatting?
Code quality ensures that your code won't fail on stupid errors. ESLint helps
you with things that will break your code. Accidentally misspelling a variable,
letting case/switch statements fall through, or other silly mistakes that will
potentially break your system. In contrast, Prettier is concerned with **_a e s t
h e t i c s_**, things like semicolons, dangling commas, and spacing.

## Enforce code quality with ESLint
The TSLint project recently announced that they would migrate the project to
ESLint to streamline the Javascript and Typescript development experience. I
generally use the recommended ESLint and TS rules, some of these
recommendations come with formatting (less so in eslint, more so in
typescript-eslint rules).

`npm install --save-dev eslint @typscript-eslint/parser
@typescript-eslint/plugin`

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

## Automatically formatting with Prettier 💅
Now that we have ESLint checking for code quality, how do we make sure that the
number of line breaks or use of semicolons doesn't come up in code reviews?
With Prettier, we can format code through the CLI or we can integrate it with
our favorite code editor to format on save! There's one small issue. Some of
the rules in your ESLint configuration may conflict with the rules you set in
Prettier. The result is one tool overriding the other in a loop. Luckily the
team at Prettier has solved this problem. There are a few options, but we'll go
with my choice; turn off ESLint format rules.

`npm i --save-dev prettier eslint-config-prettier`

We've now installed Prettier and an ESLint config specifically to integrate
with Prettier. This config has a set list of rules to turn off on the ESLint
side of things to allow Prettier to do its thing. In contrast to the endless
amount of rules you can enforce in ESLint, Prettier has a very specific list of
formatting options. Let's get it working.

Our .eslintrc.json file should now look like the following:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

Here's what our .prettierrc.json file will look like:
```json
{
   "printWidth": 100,
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

`./node_modules/.bin/eslint . --ext .ts`

`./node_modules/prettier/bin-prettier.js -c "src/**/*.ts`

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

## Bonus: Setup Eslint, Prettier, and Typescript with Vim/Neovim and ALE
I personally use Neovim and ALE to write code. This comes with the headache of
having to configure my setup from scratch. Luckily, ALE takes a lot of the
effort out of language syntax highlighting, linting, and formatting on save.

First install ALE via your plugin of choice. I personally use
[vim-plug](https://github.com/junegunn/vim-plug) for it's ease of use and
simplicity. With ALE installed, let's update your `.vimrc` for vanilla vim or
`init.vim` if you use Neovim like I do.

```vim
let g:ale_fixers = {
\   'typescript': ['prettier', 'eslint'],
\}

let g:ale_linters = {}
let g:ale_linters.typescript = ['eslint', 'tsserver']

let g:ale_typescript_prettier_use_local_config = 1

let g:ale_fix_on_save = 1

let g:ale_linters_explicit = 1
```

Notice that I've added Prettier and ESLint to my `ale_fixers` and set
`ale_fix_on_save` to `1`. This will allow ESLint and Prettier to auto-fix any
problems when I save a file. I've also created a linters object and added a
specific setting for Typescript. Obviously, we're using `eslint` to check our
files but there's also `tsserver`. TSServer is a tool that runs in the
background to conduct type checking as we're coding. It's essentially our
Typescript compiler running on watch mode.

## TLDR; Turn off ESLint format rules for Prettier
I found performance issues on larger files when I configured ESLint to run
Prettier. Instead of integrating Prettier, I opted to turn ESLint format rules
off in favor of Prettier running independently.

`npm install --save-dev eslint prettier @typscript-eslint/parser
@typscript-eslint/plugin eslint-config-prettier`

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}

```

