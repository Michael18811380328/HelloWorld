# npm install出现Unexpected end of JSON input while parsing near错误

今天在更新包时，出现以下错误：

~~~bash
npm install react-dom
~ Unexpected end of JSON input while parsing near 'xxx'
~~~

## 解决方法1

尝试删除全部的包，可能已有的包和新安装的冲突，再次执行 npm install 

~~~bash
rm -rf node_modules
npm install
~~~

尝试更换网络（换成4G或者开代理），还是不行；

尝试使用 cnpm install 或者切换到国内的源 npm，还是不行；

~~~bash
cnpm install
npm config set registry https://registry.npm.taobao.org
cnpm install
~~~

## 解决方法2

尝试清空 npm 缓存文件。执行后，界面会出现警告，确认即可。如果是Mac，需要Sudo。

~~~bash
npm cache clean --force
npm install
~~~

执行 npm install 即可正常安装相关的依赖了

## 解决方法3

如果上面两种方法都无法解决，可能是 npm 版本和 node 版本问题。需要降低一下npm的版本，然后安装即可

~~~bash
npm -g i npm@4
npm install
~~~