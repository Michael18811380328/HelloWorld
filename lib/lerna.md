# lerna

### lerna

Lerna 是一个用来优化托管在git\npm上的多package代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。

### lerna项目示范

```
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```

### Lerna 能做什么?

Lerna中主要要用到 lerna bootstrap、lerna publish这二个命令

- lerna bootstrap： 安装依赖
- lerna publish：发布和更新package

### 开始我们的探索之旅

目前的最新版Lerna 2.x 是beta版

###### 安装
```bash
# install the latest 2.x version using the `prerelease` dist-tag 
$ npm install --global lerna@prerelease
# install version directly 
$ npm install --global lerna@^2.0.0-beta
```

###### 新建git仓库并用lerna初始化

```bash
$ git init lerna-repo
$ cd lerna-repo
lerna init
```

现在我们的项目看起来应该是这样的：

```
lerna-repo/
  package.json
  lerna.json
```

#### How it works

Lerna 提供两类管理项目的模式: Fixed 和 Independent.

1. Fixed/Locked mode (default)
   Fixed模式下，项目通过单一的版本进行控制。版本号放在项目根目录下的lerna.json文件的version这个字段。当你执行 lerna publish，如果有文件更新，它将发布新的版本。
   babel项目采用的就是这种模式
2. Independent mode (--independent)
   这种模式下，项目里的各个package独立维护自己的version，它将会忽略lerna.json中定义的version

#### Commands

##### init

```
$ lerna init
```

创建一个新的或升级一个已经存在的lerna项目

1. 在 package.json文件的devDependency字段里增加 lerna
2. 生成lerna.json

##### --independent, -i

```
$ lerna init --independent
```

#### bootstrap

```
lerna bootstrap
```

引导packages安装各自的依赖，它有--ignore和--scope二个可选参数
它主要做以下几件事：

1. 为每个package npm install 安装dependencies.
2. 为packages 中存在相互 dependencies的做Symlink
3. npm prepublish all bootstrapped packages.

#### publish

```
$ lerna publish
```

发布当前项目
他创建一个新的release,生成新的版本，执行git commit/tag并发布到npm

1. 发布项目里的每个模块
2. 执行lerna updated确定是否需要发布
3. 假如需要发布 给lerna.json 版本号做自增
4. 更新package.json里的版本号至最新
5. 为新版本更新dependencies
6. 为新版本创建一个git commit 和tag
7. 发布更新项目到npm
8. 一次发布所有packages,删除lerna-temp tags和增加tags到latest

> 通过在package.json中标记 "private": true，将使该包不发布

#### --npm-tag [tagname]

```
$ lerna publish --npm-tag=next
```

When run with this flag, publish
will publish to npm with the given npm [dist-tag](https://link.jianshu.com/?t=https://docs.npmjs.com/cli/dist-tag) (defaults to latest
).
当加上这个选项，发布时除了发布到npm，同时也会同步到给定的dist-tag(默认为latest)
This option can be used to publish a [prerelease
](https://link.jianshu.com/?t=http://carrot.is/coding/npm_prerelease)or beta
version.
这个选项一般用来发布prerelease或beta版

> 通常，通过npm install my-package这个命令安装的就是latest tag,你可以通过npm install my-package@prerelease来安装prerelease版

#### --canary, -c

```
$ lerna publish --canary
```

When run with this flag, publish publishes packages in a more granular way (per commit). Before publishing to npm, it creates the new version tag by taking the current version and appending the current git sha (ex: 1.0.0-alpha.81e3b443
).

> The intended use case for this flag is a per commit level release or nightly release.

#### --skip-git

```
$ lerna publish --skip-git
```

When run with this flag, publish will publish to npm without running any of the git commands.

> Only publish to npm; skip committing, tagging, and pushing git changes (this only affects publish).

#### --skip-npm

```
$ lerna publish --skip-npm
```

When run with this flag, publish will update all package.json package versions and dependency versions, but it will not actually publish the packages to npm.
This is useful as a workaround for an [npm issue](https://link.jianshu.com/?t=https://github.com/npm/registry/issues/42) which prevents README updates from appearing on npmjs.com when published via Lerna. When publishing with README changes, use --skip-npm and do the final npm publish by hand for each package.
This flag can be combined with --skip-git to *just* update versions and dependencies, without committing, tagging, pushing or publishing.

> Only update versions and dependencies; don't actually publish (this only affects publish).

#### --force-publish [packages]

```
$ lerna publish --force-publish=package-2,package-4
# force publish all packages 
$ lerna publish --force-publish=*
```

When run with this flag, publish will force publish the specified packages (comma-separated) or all packages using *
.

> This will skip the lerna updated check for changed packages and forces a package that didn't have a git diff change to be updated.

#### --yes

```
$ lerna publish --canary --yes
# skips `Are you sure you want to publish the above changes?` 
```

When run with this flag, publish will skip all confirmation prompts. Useful in [Continuous integration (CI)](https://link.jianshu.com/?t=https://en.wikipedia.org/wiki/Continuous_integration) to automatically answer the publish confirmation prompt.

#### --repo-version

```
$ lerna publish --repo-version 1.0.1
# applies version and skips `Select a new version for...` prompt 
```

When run with this flag, publish will skip the version selection prompt and use the specified version. Useful for bypassing the user input prompt if you already know which version to publish.

#### updated

```
$ lerna updated
```

Check which packages have changed since the last release (the last git tag).

Lerna determines the last git tag created and runs git diff --name-only v6.8.1 to get all files changed since that tag. It then returns an array of packages that have an updated file.

#### clean

```
$ lerna clean
```

Remove the node_modules directory from all packages.
lerna clean respects the --ignore and --scope flags (see Flags).

#### diff

```
$ lerna diff [package?]
 
$ lerna diff
# diff a specific package 
$ lerna diff package-name
```

Diff all packages or a single package since the last release.

> Similar to lerna updated. This command runs git diff

#### ls

```
$ lerna ls
```

List all of the public packages in the current Lerna repo.
lerna ls respects the --ignore and --scope flags (see Flags).

#### run

```
$ lerna run [script] # runs npm run my-script in all packages that have it 
$ lerna run test
$ lerna run build
```

Run an npm script in each package that contains that script.

lerna run respects the --concurrency, --scope and ignore flags (see Flags).
`$ lerna run --scope my-component test`

#### exec

```
$ lerna exec -- [command] # runs the command in all packages 
$ lerna exec -- rm -rf ./node_modules
$ lerna exec -- protractor conf.js
```

Run an arbitrary command in each package.
lerna exec respects the --concurrency, --scope and --ignore flags (see Flags).
`$ lerna exec --scope my-component -- ls -la`

> Hint: The commands are spawned in parallel, using the concurrency given. The output is piped through, so not deterministic. If you want to run the command in one package after another, use it like this:

```
$ lerna exec --concurrency 1 -- ls -la
```

#### import

```
$ lerna import <path-to-external-repository>
```

Import the package at <path-to-external-repository>, with commit history, into packages/<directory-name>. Original commit authors, dates and messages are preserved. Commits are applied to the current branch.
This is useful for gathering pre-existing standalone packages into a Lerna repo. Each commit is modified to make changes relative to the package directory. So, for example, the commit that added package.json will instead add packages/<directory-name>/package.json.

#### Misc

Lerna will log to a lerna-debug.log file (same as npm-debug.log) when it encounters an error running a command.
Lerna also has support for scoped packages.
Running lerna without arguments will show all commands/options.

#### lerna.json

```json
{
  "lerna": "2.0.0-beta.18",
  "version": "1.1.3",
  "publishConfig": {
    "ignore": [
      "ignored-file",
      "*.md"
    ]
  },
  "bootstrapConfig": {
    "ignore": "component-*"
  },
  "packages": ["packages/*"]
}
```

- lerna: the current version of Lerna being used.
- version: the current version of the repository.
- publishConfig.ignore: an array of globs that won't be included in lerna updated/publish. Use this to prevent publishing a new version unnecessarily for changes, such as fixing a README.md typo.
- bootstrapConfig.ignore: an glob that won't be bootstrapped when running the lerna bootstrap command.
- bootstrapConfig.scope: an glob that restricts which packages will be bootstrapped when running the lerna bootstrap command.
- packages: Array of globs to use as package locations.