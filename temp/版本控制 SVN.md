# 版本控制 SVN

现在大部分项目的版本控制是 git 软件。一部分面试会问到 SVN，这里简单学习总计一下 SVN。

## 1、SVN 简介

软件开发过程中，可能多人编辑同一个文件会产生冲突，此时需要版本控制软件。

最早在linux开发的CVS可以实现，缺点：产生很多无用文件

SVN是CVS的替代品。这两个软件都是服务器-客户端模式。需要搭建服务器应用，并在本地配置客户端应用。

这两个软件的缺点：必须在联网的情况下使用。

## 2、服务器端搭建

0. 需要关闭防火墙和杀毒软件

1. 在windows平台上：部署SVN服务器，安装 SVNServer 软件

2. 配置工作目录

   ~~~bash
   mkdir mySVN
   # 创建工作目录
   svnadmin create e:\mySVN 
   
   # 打开 conf 文件夹
   # svnserver.conf 内部的单行注释，去掉注释（设置密码和认证）
   
   # passwd 文件
   # userName = password
   michael = hello
   
   # authz 权限设置:更改三处
   [/]
   michale = rw
   
   # [/foo/bar]
   michale = rw
   * =
   
   #下面去掉注释
   * = r
   ~~~
   
 3. 启动 SVN 服务，验证安装配置;

~~~bash
svnserve -d -r e:\mySVN
~~~

启动之后，命令行不要关闭（最小化）。此时服务器端配置成功。

## 3、客户端搭建

教程基于 Java 的eclipse安装插件；如果是其他开发，参考其他安装方法 

~~~bash
anon-access = read
auth-access = write
password-db = passwd
authz-db = authz
~~~

## 4、开始项目

类似于 git， SVN也需要新建一个项目；

然后有一个总代码（服务器端代码）

不同开发者开发时，首先把本地代码和服务器代码更新，然后更新之后提交代码。

相对于 git ， SVN 只有两个分支：主分支和本地分支。本地分支不能push到远程。开发者只能直接 push 到远程分支上。人少的情况可以很好的push，如果开发者很多，那么push中冲突会很多。

解决冲突：如果远程代码和本地代码有冲突，在更新代码后，会显示类似的代码冲突。然后解决完冲突后，就可以提交到master了。

## 5、总结

SVN 是早期的版本控制工具，git 的功能更强大，日常开发优先使用git。



参考链接：阿里云大学 + 菜鸟教程

https://edu.aliyun.com/course/83/learn#lesson/1192

https://www.runoob.com/svn/svn-tutorial.html