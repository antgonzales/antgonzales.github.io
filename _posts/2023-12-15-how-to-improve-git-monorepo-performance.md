---
layout: post
title: "How to improve Git monorepo performance"
description: "Optimize Git in monorepos with an optimized Git config. Follow
clear steps to boost CPU performance and workflow efficiency"
date: 2023-12-15
---

Many discussions about Git focus on its basic functions, yet there's less
attention on optimizing Git for monorepos. With the release of Git v2.37.0, new
features have been introduced that significantly improve performance for these
large repositories. This blog post will cover these updates, providing clear,
step-by-step guidance on how to enhance your Git operations, especially in
large-scale projects. We'll look into these new features and explain how to
effectively implement them in your Git workflow.

* Do not remove this line (it will not be displayed)
{:toc}

<!--break-->

## Quickstart

<div class="callout warning-callout">
  <p>
    <strong>Warning:</strong> Upgrade Git to 2.42.0+ and perform the steps in
    this tutorial on your main branch. `index.skipHash` causes errors on older
    Git versions.
  </p>
</div>

### Create a custom Git config file at `~/.gitconfig.monorepo`

```ini
[core]
    commitgraph = true
    fsmonitor = true
    writeCommitGraph = true
[feature]
    manyFiles = true
```

### Include the custom configuration in your global or local Git config

```ini
[include]
    path = ~/.gitconfig.monorepo
[user]
    email = 123345+darth.vader@users.noreply.github.com
    name = Darth Vader
[init]
    defaultBranch = main
[core]
    editor = nvim
[color]
    ui = auto
[branch]
    autosetuprebase = always
[rebase]
    autoStash = true
[pull]
    rebase = true
[push]
    default = current
```

### Update index version in repo

Although `feature.manyFiles` sets the default index version, you need to
manually update indexes on existing repositories.

```bash
$ cd ~/example
$ git update-index --index-version 4
```
### Start `fsmonitor—daemon` in repo

```bash
$ cd ~/example
$ git fsmonitor--daemon start
```

## Results

By using the recommended approach listed above, my command execution time for
"git status" was reduced from approximately 0.316 seconds to 0.118 seconds,
accompanied by a decrease in CPU utilization from 425% to 89%, leading to a
significantly improved user experience. Additionally, I no longer encounter
`fatal: Unable to create 'project_path/.git/index.lock': File exists.` errors
while performing basic Git commands (MacOS Intel Core i9).

**Before**
```bash
$ time git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
git status  0.21s user 1.14s system 425% cpu 0.316 total
```

**After**
```bash
$ time git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
git status  0.08s user 0.02s system 89% cpu 0.118 total
```

## Explanation of configurations

**`feature.manyFiles`**

Optimizes repositories with large numbers of files and commit histories.
Enabling this configuration option enables the following by default:

* `index.skipHash=true`
* `index.version=4`
* `core.untrackedCache=true`

**`core.commitgraph`**

Git will use a commit history cache to significantly speed up history
operations, such as `git log` with the `--graph` option.

**`fetch.writeCommitGraph`**

Improves performance of commands like `git push -f` and `git log --graph` by
writing a commit-graph on every `git fetch`.

## How to revert changes

In the event that experience an error or issues with your Git operations,
revert the changes by doing the following:

1. Update global or local Git config:
    1. Open your global or local Git config file.
    2. Remove or comment out the include path for the custom configuration:

```ini
[include]
    path = ~/.gitconfig.monorepo
```

1. Revert index version in repo:
    1. Go to the specific repository (e.g., `cd ~/example`).
    2. If you want to revert the index version to a previous state (e.g.,
       version 2), run the following command: `git update-index --index-version
       2`
    3. Note: This step depends on your requirements and the original index
       version you were using.
2. Stop fsmonitor daemon in repo:
    1. In the repository where you started the `fsmonitor--daemon`, stop it
       using `git fsmonitor--daemon stop`
    2. This will disable the file system monitor for that repository.
3. General check and cleanup:
    1. Run `git status` to ensure that Git is working properly.

## References

* [How to Improve Performance in Git: The Complete
  Guide](https://www.git-tower.com/blog/git-performance/)
* [Improve Git monorepo performance with a file system
  monitor](https://github.blog/2022-06-29-improve-git-monorepo-performance-with-a-file-system-monitor/)
* [git error `invalid data in index` with index.skipHash
  config](https://github.com/rust-lang/cargo/issues/11857)

