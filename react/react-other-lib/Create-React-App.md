# Create React App

Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.

Create React App 是官方推荐的创建库。不需要任何的配置，直接完成创建打包。项目中直接把script脚本单独拿出来，进行自定义的配置。

## 快速开始

```bash
npx create-react-app my-app
cd my-app
npm start
```

> If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we recommend you uninstall the package using `npm uninstall -g create-react-app` to ensure that `npx` always uses the latest version. 如果已经全局安装，那么最好卸载全局安装的库，确保现在使用的是最新的版本。

Then open http://localhost:3000/ to see your app. When you’re ready to deploy to production, create a minified bundle with `npm run build`.

测试环境使用 npm run start, 生产环境用 npm run build.

You **don’t** need to install or configure tools like Webpack or Babel. They are preconfigured and hidden so that you can focus on the code.Just create a project, and you’re good to go.

不需要安装配置工具（webpack+babel）构建工具已经配置好，可以直接开始React项目。

**You’ll need to have Node >= 8.10 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.To create a new app, you may choose one of the following methods:

需要在node环境下运行（>8s）支持 npm npx yarn ts 环境

```sh
npm init react-app my-app
```

### Selecting a package manager 选择包管理工具

如果同时安装了yarn npm 那么会默认使用 yarn 管理。如果需要 npm 安装，就需要加上配置。

When you create a new app, the CLI will use [Yarn](https://yarnpkg.com/) to install dependencies (when available). If you have Yarn installed, but would prefer to use npm, you can append --use-npm to the creation command. For example:

```sh
npx create-react-app my-app --use-npm
```

## Output

Running any of these commands will create a directory called `my-app` inside the current folder. Inside that directory, it will generate the initial project structure and install the transitive dependencies:

输出文件结构

```undefined
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

No configuration or complicated folder structures, just the files you need to build your app. Once the installation is done, you can open your project folder:

不需要配置环境和文件夹，直接运行即可完成文件管理

```sh
cd my-app
```

## Scripts

Inside the newly created project, you can run some built-in commands:

在新创建的项目中，可以直接运行下面的命令

### npm start

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console.

这个界面会热加载（改变文件后）可以看到错误和格式警告

### `npm test` 

Runs the test watcher in an interactive mode. By default, runs tests related to files changed since the last commit.

在交互模式下运行测试（默认测试最近一次提交的部分）

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.The build is minified and the filenames include the hashes.Your app is ready to be deployed.

在build中创建生产模式（最佳的性能）



原文链接：

https://create-react-app.dev/docs/getting-started
