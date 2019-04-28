##### 1.char varchar text 的区别（数据库中）

char 表示传统的字符串，字符串的长度小于255字符，长度固定，适用于较短固定长度的数据（身份证号和电话号），查询表速度最快

varchar 长度小于65535字符（通常文本足够使用），长度可以改变（mqsql 5.0.3 之前表示65535字节），查询速度中等

text 字符串长度不受限制，查询速度最慢，通常优先使用varchar

##### 2.Foreign key 外键 primary key 主键

在mysql中，如果把表的主键设为auto_increment类型，数据库就会自动为主键赋值。

##### 3.SQL语句

操作数据库的语法：数据操作语句和数据定义语句

~~~sql
select
update
delete
insert

create database
alter database
create table
alter table
drop table
create index
drop index
alter 修改；替换
~~~