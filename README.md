aba-cli
=======

automate boring stuff in node js, react and react native

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/aba-cli.svg)](https://npmjs.org/package/aba-cli)
[![Codecov](https://codecov.io/gh/eyousefifar/aba-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/eyousefifar/aba-cli)
[![Downloads/week](https://img.shields.io/npm/dw/aba-cli.svg)](https://npmjs.org/package/aba-cli)
[![License](https://img.shields.io/npm/l/aba-cli.svg)](https://github.com/eyousefifar/aba-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g aba-cli
$ aba COMMAND
running command...
$ aba (-v|--version|version)
aba-cli/0.1.6 linux-x64 node-v12.18.3
$ aba --help [COMMAND]
USAGE
  $ aba COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aba add PACKAGENAME`](#aba-add-packagename)
* [`aba audit`](#aba-audit)
* [`aba autocomplete [SHELL]`](#aba-autocomplete-shell)
* [`aba create MODE NAME`](#aba-create-mode-name)
* [`aba help [COMMAND]`](#aba-help-command)
* [`aba remove PACKAGENAME`](#aba-remove-packagename)

## `aba add PACKAGENAME`

```
USAGE
  $ aba add PACKAGENAME

ARGUMENTS
  PACKAGENAME  names of npm package you want to add to your nca project

OPTIONS
  -D, --dev          will save package info in development section
  -c, --controllers  will save package info in controllers section
  -e, --entity       will save package info in entities section
  -g, --global       will save package info in global section
  -i, --interface    will save package info in interface section
  -n, --nodelib      will save package for node library
  -u, --usecase      will save package info in usecase section
```

_See code: [src/commands/add.ts](https://github.com/eyousefifar/aba-cli/blob/v0.1.6/src/commands/add.ts)_

## `aba audit`

```
USAGE
  $ aba audit

OPTIONS
  -g, --groups=groups  Applying the groups flag will limit the audit table to vulnerabilities of the corresponding
                       dependency groups (e.g dependencies,devDependencies)

  -j, --json           Shows dependencies vulnerabilities in JSON format

  -l, --level=level    [default: info] shows vulnerabilities impact level, low, medium, high etc.

  -v, --verbose        Shows dependencies vulnerabilities in JSON format as well as response data
```

_See code: [src/commands/audit.ts](https://github.com/eyousefifar/aba-cli/blob/v0.1.6/src/commands/audit.ts)_

## `aba autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ aba autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ aba autocomplete
  $ aba autocomplete bash
  $ aba autocomplete zsh
  $ aba autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `aba create MODE NAME`

creates node js clean architecture, nca layers, node libraries and react + react native project

```
USAGE
  $ aba create MODE NAME

ARGUMENTS
  MODE  (service|nodelib|rrn|entity|usecase|adapter|schema) choose what to create
  NAME  the package / layer name you want to create

EXAMPLES
  $ aba create service serviceName
  $ aba create nodelib libName
  $ aba create rrn rrnName
  $ aba create entity entityName
  $ aba create usecase usecaseName
  $ aba create adapter adapterName
  $ aba create schema schemaName
```

_See code: [src/commands/create.ts](https://github.com/eyousefifar/aba-cli/blob/v0.1.6/src/commands/create.ts)_

## `aba help [COMMAND]`

display help for aba

```
USAGE
  $ aba help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `aba remove PACKAGENAME`

remove package from your nca project

```
USAGE
  $ aba remove PACKAGENAME

ARGUMENTS
  PACKAGENAME  name of npm module you want to remove from your nca / nodelib / rrn project
```

_See code: [src/commands/remove.ts](https://github.com/eyousefifar/aba-cli/blob/v0.1.6/src/commands/remove.ts)_
<!-- commandsstop -->
