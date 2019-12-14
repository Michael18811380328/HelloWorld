# Browserslist: caniuse-lite is outdated. Please run next command `npm update caniuse-lite browserslis` 报错解决

### 问题

在 React 项目中，使用 npm install 安装全部依赖后，运行 npm run start 然后界面出现上面的错误

依照命令行提示去更新（npm update……）不起作用

### 解决

1.直接删除该项目node_modules下面的caniuse-lite和browserslist这两个文件夹

2.npm i caniuse-lite browserslist

~~~bash
cd node_modules
rm -rf caniuse-lite
rm -rf browserslist
cd ../
npm install caniuse-lite browserslist
~~~

### 参考链接

https://github.com/madskristensen/WebCompiler/issues/413

https://www.cnblogs.com/1394htw/p/11023377.html

https://blog.csdn.net/Cynthia_Wiki/article/details/98598713