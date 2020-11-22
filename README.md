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
aba-cli/0.2.1 linux-x64 node-v14.15.1
$ aba --help [COMMAND]
USAGE
  $ aba COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aba add PACKAGE_NAME`](#aba-add-package_name)
* [`aba audit`](#aba-audit)
* [`aba create MODE NAME`](#aba-create-mode-name)
* [`aba help [COMMAND]`](#aba-help-command)
* [`aba remove PACKAGE_NAME`](#aba-remove-package_name)

## `aba add PACKAGE_NAME`

```
USAGE
  $ aba add PACKAGE_NAME

ARGUMENTS
  PACKAGE_NAME  names of npm package you want to add to your nca project

OPTIONS
  -D, --dev          saves package info in development section
  -a, --adapter      saves package info in adapter section
  -c, --controllers  saves package info in controllers section
  -e, --entity       saves package info in entities section
  -g, --global       saves package info in global (global to current package) section
  -i, --interface    saves package info in interface section
  -n, --nodelib      saves package for node library
  -u, --usecase      saves package info in usecase section

EXAMPLES
  $ aba add -e entity_package
  $ aba add -a adapter_package
  $ aba add -u usecase_package
  $ aba add -c controller_package
  $ aba add -i interface_package
  $ aba add -g global_package
  $ aba add -n nodelib_package
  $ aba add -D dev_package
```

_See code: [src/commands/add.ts](https://github.com/eyousefifar/aba-cli/blob/v0.2.1/src/commands/add.ts)_

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

_See code: [src/commands/audit.ts](https://github.com/eyousefifar/aba-cli/blob/v0.2.1/src/commands/audit.ts)_

## `aba create MODE NAME`

```
USAGE
  $ aba create MODE NAME

ARGUMENTS
  MODE  (service|nodelib|rrn|entity|usecase|adapter|schema) create NCA, RRN, node library or create NCA layers
  NAME  the package / layer name you want to create

EXAMPLES
  $ aba create service service_name
  $ aba create nodelib lib_name
  $ aba create rrn rrn_name
  $ aba create entity entity_name
  $ aba create usecase usecase_name
  $ aba create adapter adapter_name
  $ aba create schema schema_name
```

_See code: [src/commands/create.ts](https://github.com/eyousefifar/aba-cli/blob/v0.2.1/src/commands/create.ts)_

## `aba help [COMMAND]`

```
USAGE
  $ aba help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `aba remove PACKAGE_NAME`

```
USAGE
  $ aba remove PACKAGE_NAME

ARGUMENTS
  PACKAGE_NAME  name of npm module you want to remove from your nca / nodelib / rrn project

EXAMPLE
  $ aba remove package_name
```

_See code: [src/commands/remove.ts](https://github.com/eyousefifar/aba-cli/blob/v0.2.1/src/commands/remove.ts)_
<!-- commandsstop -->
