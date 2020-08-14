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
aba-cli/0.0.0 linux-x64 node-v12.18.3
$ aba --help [COMMAND]
USAGE
  $ aba COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aba hello [FILE]`](#aba-hello-file)
* [`aba help [COMMAND]`](#aba-help-command)

## `aba hello [FILE]`

describe the command here

```
USAGE
  $ aba hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ aba hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/eyousefifar/aba-cli/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
