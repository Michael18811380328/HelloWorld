show databases;
create database gc;
drop database gc;

# VARCHAR TEXT LONGTEXT DATETIME TINTINT INT BIGINT DOUBLE

create table account(
  id bigint(20),
  name varchar(255),
  comment text,
  gender int(11),
  city varchar(255),
);

drop table account;

describe account;
create database account;
use account;
show tables;
drop table account;

alter table account rename userinfo;
alter table account add nickange not null default 1;
alter table account drop nickname;
alter table account name nickname varchar(255);

insert into account values("Tom", 20, 'hello');
select * from account;
select name, id from account;
select * from account where id >= 10;
select & from account where name = 'Michael' and (id = 20 or id > 30);
select * from account where email is null and name is not null;
select distinct name, age from account;

select * from account order by id asc;
select * from account order by age asc, name desc limit 1, 5;
insert into account values(10);
insert into account select name, age from gc;

update account set name = "Tom", email = '1@1qq.com' where id = 1;
select * from account where id in ("Mike", "Andy");
select * from account where id in (select id from oldAccount where id < 10);
select * from account where id between 10 and 20;
select * from account where id not between 100 and 200;
select * from account name like '%abc%';
