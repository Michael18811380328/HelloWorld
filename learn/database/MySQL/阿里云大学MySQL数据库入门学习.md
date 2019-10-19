# MySQL 数据库入门学习

阿里云大学 链接地址：https://edu.aliyun.com/course/153/lesson/list

mysql 数据库的简单介绍，安装配置MYSQL，基本的SQL命令。

## 01 简介

SQL：一种编程语言，strcutured query language 结构化的查询语言，主要用于数据库中的增删改查

~~~mysql
select * from tb
~~~

MySQL 关系型数据库，是数据库的一种（其他的Oracle）。MYSQL是开源数据库。

## 02 安装

官网：dev.myqsl.com/downloads/mysql

### windows 安装

在官网下载安装包后，选择默认的developer安装方式进行安装；

安装过程中如果检测到office中缺少插件，可以不用处理，因为主要在CLI模式下使用MYSQL

安装中需要设置root用户的密码，其他类型的用户（不添加其他用户）

按照安装包的流程安装完成后，可以在任务管理器下面看到服务正在运行，需要在cmd下面确认安装.

~~~bash
mysql -u root -p
# -u 表示用户 -p 表示需要密码
~~~

### linux 安装

~~~bash
sudo yum install mysql mysql-server
sudo apt-get install mysql mysql-server (ubuntu)
mysqladmin -u root -p password 'root'
# 设置新密码是root
~~~

### Mac 安装

安装包的格式是 dmg 安装完毕后需要设置root密码

~~~bash
/usr/local/mysql/bin/mysqladmin -u root -p password root
/usr/local/mysql/bin/mysql -u root -p
# 安装测试成功，密码和开机密码一致
~~~

开启或者关闭服务有两种方法

CLI

sudo /Library/StartupItems/MySQLCOM/MYSQLCOM start | stop | restart

GUI

系统配置 - MYSQL - stop |start

## 03 配置

MYSQL 的配置文件是一个文本文件 my.cof

Mac 的文件路径是 /usr/local/mysql/my.cof 默认的配置文件是空的

可以配置字符集，缓存大小等

~~~txt
[client]
default-character-set=utf8
# 添加字符集，避免乱码

[mysqld]
character-set-server=utf8
default-storage-engine=INNODB
# 默认存储引擎 INNODB
~~~

修改配置后，需要重启 mysql (或者在设置中重启)

~~~bash
sudo /Library/StartupItems/MySQLCOM/MYSQLCOM restart
~~~

自己配置的问题：使用vim编辑器保存的时候，不能保存配置；使用sudo也不行

"/usr/local/mysql-8.0.18-macos10.14-x86_64/my.cof" E212: Can't open file for writing

 Warning: Changing a readonly file



## 04 添加删除数据库

~~~mysql
show databases;
create database gc;
drop database gc;
~~~

不同数据库的数据是不会干扰的。数据库是数据库软件中基本的单位



## 05 数据类型

database 包括 tables 表中每一行就是一条数据；列就是不同的字段，不同的字段对应不同的数据类型和数据结构（例如ID是自增长的整形，Name是长字符串），是否有默认值等。下面是常见的数据类型。根据实际业务逻辑使用不同的数据类型。

#### 文本类

VARCHAR(size) 长度小于255的可变长度字符串

TEXT 长度中等的字符串

LONGTEXT 长度很长的字符串

#### 日期类

DATETIME 年月日时分秒

#### 数值类

TINYINT -128~127 或者存储布尔值

INT 小数字

BIGINT 大数字（ID，自增长）

DOUBLE 浮点型（不使用FLOAT）

## 06 增删数据表（table）

~~~mysql
CREATE TABLE account(
  id bigint(20),
  createTime datetime,
  ip varchar(255),
  mobile varchar(255),
  name varchar(255),
  brief text,
  comments text,
  location varchar(255),
  qq varchar(255),
  gender int(11),
  city varchar(255),
  province varchar(255)
);

drop table account;

describe account;
# 查看当前的表的内部结构

create database Michael;
use Michael;
show tables;
CREATE TABLE gc(...);
describe gc;
drop table gc;
~~~





