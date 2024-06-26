---
layout: post
title: "How to improve Git monorepo performance"
description: "Optimize Git in monorepos with an optimized Git config. Follow
clear steps to boost CPU performance and workflow efficiency"
date: 2023-12-15
last_modified_at: 2024-05-04
---
[Git v2.37.0](https://github.blog/2022-06-27-highlights-from-git-2-37/)
introduced new features that significantly improve performance for repositories
with large numbers of files. This blog post will cover custom Git monorepo
configurations to improve local performance and provide step-by-step guidance
to rollback if anything goes wrong. We’ll look into these new features and
explain how to implement them effectively in your global or local Git config.

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

### Update Git index to version 4 in repo

Although `feature.manyFiles` sets the default index version, you need to
manually update the [index format](https://git-scm.com/docs/index-format) on
your local repository through your terminal.

```console
$ cd ~/example-monorepo
$ git update-index --index-version 4
```
### Start `fsmonitor—daemon`

```console
$ cd ~/example-monorepo
$ git fsmonitor--daemon start
```

## Results

Using the custom Git configuration and updated index format, my command
execution time for "git status" was reduced from approximately 0.316 seconds to
0.118 seconds, and by a decrease in CPU utilization from 425% to 89%,
leading to a significantly improved performance. Additionally, I no longer
encounter `fatal: Unable to create 'project_path/.git/index.lock': File
exists.` errors while performing basic Git commands (MacOS Intel Core i9).

**Before**
```console
$ time git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
git status  0.21s user 1.14s system 425% cpu 0.316 total
```

**After**
```console
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

Git writes an entirely new index in `index.lock` and then replaces `.git/index`
when you use basic commands. In a monorepo with many files, this index can be
large and take several seconds to write every time you perform a command.
Upgrading from the standard version 2 to version 4 reduces index size by 30% to
50% by compressing the pathnames, which results in faster load time on
operations. Caching untracked files adds more memory load but again reduces the
load time.

When performing simple Git commands, I would encounter the following errors
before I made the update:

```console
fatal: Unable to create 'project_path/.git/index.lock': File exists.
```

**`core.commitgraph`**

Git will use a commit history cache to significantly speed up history
operations, such as `git log` with the `--graph` option.

**`fetch.writeCommitGraph`**

Improves performance of commands like `git push -f` and `git log --graph` by
writing a commit-graph on every `git fetch`.

## How to revert changes

In the event that you experience an error or issues with your Git operations,
revert the changes by doing the following:

1. Update global or local Git config:
    * Open your global or local Git config file.
    * Remove or comment out the include path for the custom configuration.
2. Revert index version in repo:
    * Go to the specific repository (e.g., `cd ~/example-monorepo`).
    * If you want to revert the index version to a previous state (e.g.,
       version 2), run the following command: `git update-index --index-version
       2`
    * Note: This step depends on your requirements and the original index
       version you were using.
3. Stop fsmonitor daemon in repo:
    * In the repository where you started the `fsmonitor--daemon`, stop it
       using `git fsmonitor--daemon stop`
    * This will disable the file system monitor for that repository.
4. General check and cleanup:
    * Run `git status` to ensure that Git is working properly.

## References

* [How to Improve Performance in Git: The Complete
  Guide](https://www.git-tower.com/blog/git-performance/)
* [Improve Git monorepo performance with a file system
  monitor](https://github.blog/2022-06-29-improve-git-monorepo-performance-with-a-file-system-monitor/)
* [git error `invalid data in index` with index.skipHash
  config](https://github.com/rust-lang/cargo/issues/11857)
* [git 2.40.0 index.skipHash incompatible with
  libgit2](https://github.com/libgit2/libgit2/issues/6531)

