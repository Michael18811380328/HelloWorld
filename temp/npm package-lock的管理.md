# npm package-lock的管理

package-lock.json文件很容易产生冲突，我们先来看看为什么需要 package-lock.json.

## package-lock.json 作用

> package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

以上摘自官方文档，翻译一下就是

package-lock.json会在npm更改node_modules目录树或者package.json时自动生成的。它准确的描述了当前项目npm包的依赖树，并且在随后的安装中会根据package-lock.json来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。

这里有个很重要的点就是，package-lock.json记录的是一个依赖树，而不是你直接在package.json中的依赖项。和直接在package.json中锁死版本不一样的地方在于，package.json中只是锁死了依赖项的版本，而没有锁死**依赖项的依赖**的版本，这里就是变数的地方。如果不对整个依赖树做锁定，那前后编译出来的应用版本可能是不一样的，有可能开发时能正常工作，而到了线上却不能工作。

所以很明显的package-lock.json是很符合我们的诉求的。我们需要让后面每一次install都是相同的版本，打出来的包都有着相同的依赖，这对于我们项目的稳定性、前后一致性是非常重要的。

## 解决 package-lock 的冲突

**不要试图删除package-lock.json来解决一些问题**，这样会破坏package-lock.json的作用。

package-lock是工具自动生成的一个文件内容，对于这种自动生成的文件最好的办法还是交由工具去处理，而不是手工一个一个的去处理产生的冲突。

在开发过程中，合并的时候如何如果出现了冲突，在merge conflicts的阶段，只需要从主分支中checkout去package-lock.json，再以此为基础，重新安装新分支中需要的依赖。

```bash
git checkout dev -- package-lock.json;
npm install lodash --save;
```

这样让npm自动的去维护package-lock.json。当然上面的步骤同样也适用于rebase过程。

我相信这个办法可以很好的解决package-lock.json冲突的问题，并且团队合作中，做merge或者rebase操作的人可以通过查看package.json的变更知道新安装了哪些依赖包，来重新安装，也可以很好的解决这个问题。

## 校验 package-lock.json 的正确性

在按照上面的步骤解决完package-lock.json的冲突后，code reviewer对package-lock.json的正确性需要做一次校验，按照gerrit中的说法就是**verify**的过程。将被review的代码拉到本地做一次`npm install`，检查package-lock.json是否有modified，如果没有modify说明提交的package-lock.json是一份正确的文件。

有一个问题，package-lock.json中的resolved字段会被不同环境中的npm registry改写，这样会导致很多的冲突。所以在经过正确性校验的过程中，可能会因为本地registry的配置问题会导致package-lock.json处于modified状态。所以为了规避这个问题，需要在团队内统一npm registry，可以在项目根目录中使用.npmrc来配置项目级别的registry来进行统一。

## resolved 选项

不同依赖库安装时，会更改 resolved 选项。不同电脑执行同样的 npm install 会产生不同的 package-lock.json 文件，这样会造成代码冲突。本质的原因如下：



# Npm版本问题

## 简介

如果你已经将节点包管理(npm)更新到版本5.x.x，看起来一切似乎都很顺利。等等，这是什么?用 npm 初始化项目的会自动创建了一个新文件 `package-lock.json`。如果打开它，它看起来有点像 `package.json` 的依赖项，但更冗长。我们决定忽略它，继续开发项目。最终，我们有时会遇到依赖项的问题，找不到，或者安装了错误的版本。大多数人最终都会删`package-lock.json`和运行“npm install”。那么，为什么要有它呢? 它应该做什么? 它实际上是做什么的?

## 总结

- 如果你使用的 npm 版本 为 ^5.x.x , package-lock.json 会默认自动生成
- 你应该使用 package-lock 来确保一致的安装和兼容的依赖关系
- 你应该将 package-lock 提交到源代码控制
- 从npm ^ 5.1.x开始，package.json能够胜过 package-lock.json，所以你遇到较少让人头痛的问题
- 不再删除 package-lock 只是为了运行`npm install`并重新生成它

## 背景

#### **语义版本控制**

在你了解 package-lock 甚至 package.jso n之前，你必须了解[语义版本控制（semver）](https://semver.org/)。 这是npm背后的天才，是什么使它更成功。 你可以在 [此处](http://blog.npmjs.org/post/162134793605/why-use-semver) 阅读有关npm如何使用它的更多信息。简而言之，如果你正在构建与其他应用程序接口的应用程序，你应该告知你所做的更改将如何影响第三方与你的应用程序交互的能力。这是通过语义版本控制完成的，版本由三部分组成：X，Y，Z，分别是主要版本，次要版本和补丁版本。

例如：1.2.3，主要版本1，次要版本2，补丁3。

补丁中的更改表示不会破坏任何内容的错误修复。 次要版本的更改表示不会破坏任何内容的新功能。 主要版本的更改代表了一个破坏兼容性的大变化。 如果用户不适应主要版本更改，则内容将无法正常工作。

#### **管理包**

npm 存在使管理包变得容易。你的项目可能有数百个依赖项，每个依赖项都有一百个，为了让你的注意力远离依赖地狱，通过 npm 管理，使用一些简单的命令，你可以安装和管理这些依赖关系，几乎不必考虑它们。

当您使用npm安装包（并保存它）时，会在 package.json 中添加一个包含包名称和应该使用的 semver的条目。默认情况下，npm 安装最新版本，并预先插入版本号，例如 “^1.2.12”，这表示至少应该使用版本 1.2.12，但任何高于此版本的版本都可以，只要它具有相同的主要版本，由于次要版本和补丁编号仅代表错误修正和非破坏性添加， 你可以安全地使用任何更高版本的同一主要版本。阅读更多关于semver通配符的信息，请看 [这里](http://blog.npmjs.org/post/115305091285/introducing-the-npm-semantic-version-calculator)。

#### **共享项目**

在 package.json 中定义这样的依赖项的真正好处是，任何有权访问 package.json 的人都可以创建一个包含运行应用程序所需模块的依赖项文件夹，但是让我们来看看事情可能出错的具体方式。

假设我们创建了一个将使用 express 的新项目。 运行`npm init`后，我们安装express：`npm install express - save`。在编写代码时，最新的版本是4.15.4，所以 “express”：“^ 4.15.4”作为我的package.json中的依赖项添加，并且我的电脑安装了确切的版本。

现在也许明天，express 的维护者会发布 bug 修复，因此最新版本变为4.15.5。 然后，如果有人想要为我的项目做贡献，他们会克隆它，然后运行`npm install。'因为4.15.5是具有相同主要版本的更高版本，所以为它们安装。 我们都安装 express ，但我们却是不同的版本。

从理论上讲，它们应该仍然是兼容的，但也许bugfix会影响我们正在使用的功能，而且当使用Express版本4.15.4和4.15.5运行时，我们的应用程序会产生不同的结果。

## **Package-lock**

#### **目的**

package-lock.json 的目的是避免上述情况，其中从同一 package.json 安装模块会导致两种不同的安装。 在 `npm` 版本 `5.x.x` 中添加了 package-lock.json，因此如果你使用的是主要版本 `5` 或更高版本，除非您禁用它，否则它会自动生成。

#### **内容结构**

package-lock 是 package.json 中列出的每个依赖项的大型列表，应安装的特定版本，模块的位置（URI），验证模块完整性的哈希，它需要的包列表 ，以及依赖项列表。 让我们来看看 express 的列表是什么：

```json
"express": {
  "version": "4.15.4",
  "resolved": "https://registry.npmjs.org/express/-/express-4.15.4.tgz",
  "integrity": "sha1-Ay4iU0ic+PzgJma+yj0R7XotrtE=",
  "requires": {
    "accepts": "1.3.3",
    "array-flatten": "1.1.1",
    "content-disposition": "0.5.2",
    "content-type": "1.0.2",
    "cookie": "0.3.1",
    "cookie-signature": "1.0.6",
    "debug": "2.6.8",
    "depd": "1.1.1",
    "encodeurl": "1.0.1",
    "escape-html": "1.0.3",
    "etag": "1.8.0",
    "finalhandler": "1.0.4",
    "fresh": "0.5.0",
    "merge-descriptors": "1.0.1",
    "methods": "1.1.2",
    "on-finished": "2.3.0",
    "parseurl": "1.3.1",
    "path-to-regexp": "0.1.7",
    "proxy-addr": "1.1.5",
    "qs": "6.5.0",
    "range-parser": "1.2.0",
    "send": "0.15.4",
    "serve-static": "1.12.4",
    "setprototypeof": "1.0.3",
    "statuses": "1.3.1",
    "type-is": "1.6.15",
    "utils-merge": "1.0.0",
    "vary": "1.1.1"
  }
},
```

可以在“requires”部分中列出的每个包中找到等效条目。

npm(^5.x.x.x)后的做法，npm 使用package-lock.json，而不是使用 package.json 来解析和安装模块。因为 package-lock 为每个模块及其每个依赖项指定了版本，位置和完整性哈希，所以它每次创建的安装都是相同的。 无论你使用什么设备，或者将来安装它都无关紧要，每次都应该给你相同的结果，这非常有用。

## 争议

因此，如果引用 package-lock 是希望解决一个常见问题，为什么它的顶级搜索结果（除了npm文档）都是关于禁用它或质疑它扮演的角色？

在npm 5.x.x之前，package.json 是项目的真实来源，npm 用户喜欢这个模型，并且非常习惯于维护他们的包文件。 但是，当首次引入 package-lock 时，它的行为与有多少人预期的相反。 给定一个预先存在的包和package-lock，对package.json的更改（许多用户认为是真实的来源）没有同步到package-lock 中。

**示例：**包A，版本 1.0.0 在 package.json 和 package.lock.json 中。 在package.json中，A被手动编辑为1.1.0版。 如果认为 package.json 是真实来源的用户运行 `npm install`，他们会期望安装 1.1.0版。 但是，安装了1.0.0版，即使列出的 v1.1.0 是 package.json， 他们也希望安装是 1.0.0版。

**示例：** package-lock.json 中不存在模块，但它存在于 package.json 中，作为一个将package.json 视为真实来源的用户，我希望能够安装我的模块。 但是，由于 package-lock.json 不存在该模块，因此未安装该模块，并且我的代码因无法找到模块而失败。

大部分时间，因为我们无法弄清楚为什么我们的依赖关系没有被正确安装，要么删除了package-lock.json 并重新安装，要么完全禁用 package-lock.json 来解决问题。

期望与真实行为之间的这种冲突在 npm repo中引发了一个非常有趣的问题线索。 有些人认为package.json 应该是事实的来源，有些人认为，因为 package-lock 是 npm 用来创建安装的东西，所以应该被认为是事实的来源。 这场争议的解决方案在于 [PR＃17508](https://github.com/npm/npm/pull/17508)。 如果 package.json 已更新，Npm 维护者添加了一个更改，导致package.json 覆盖 package-lock。 现在，在上述两种情况下，都会正确安装用户期望安装的软件包。 此更改是作为npm v5.1.0的一部分发布的，该版本于2017年7月5日上线。

