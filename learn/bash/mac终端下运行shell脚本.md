mac终端下运行shell脚本

1、写好自己的 脚本，比如aa.sh 

2、打开终端 执行，方法一： 输入命令 ./aa.sh ,

方法二：直接把 aa.sh 拖入到终端里面。

注意事项：

如果 没有成功报出问题：: 

Permission denied。就是没有权限。

解决办法：

修改该文件aa.sh 的权限 ：使用命令： 

chmod 777 aa.sh 。
