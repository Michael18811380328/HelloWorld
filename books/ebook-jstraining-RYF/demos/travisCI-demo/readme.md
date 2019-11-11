# tracis CI 集成测试

集成测试：TravisCI 是第三方继承测试工具

1. 使用github登录 TravisCI 网站，可以看到公有的仓库可以直接部署集成测试，如果是私有仓库，需要授予权限才能完成测试
2. 本地在根目录增加 .travis.yml 配置文件（说明测试的环境是node什么版本等）
3. 本地在 package.json 中增加测试。例如 script test: "npm run lint && Jest" 如果有单元测试或者代码风格测试，不需要改变。
4. 修改一部分代码，然后提交新的commit，Push到远程分支（master或者其他分支）
5. Travis会获取新的Commits，并自动检测。



# 高级 Actions 测试

使用 github 自带的 Build and test your JavaScript repository

~~~bash
npm ci
npm run build --if-present
npm test
~~~

下面是模板测试

https://github.com/seafileltd/dtable/new/master?filename=.github%2Fworkflows%2Fnodejs.yml&workflow_template=nodejs

配置文件

~~~yml
name: Node CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [10.x, 12.x]
    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: npm install, build, and test
      run: |
        # npm ci
        # npm run build --if-present
        # npm test
        npm install
        ./node_modules/.bin/jest --ci
      env:
        CI: true
~~~



