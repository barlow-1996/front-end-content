# DQL 查询语句

## 简单查询

- 查询一个字段：
select 字段名 from 表名;
如： select ename from emp;

- 查询两个或多个字段：
select 字段名，字段名 from 表名;
要查询的字段之间用 "," 隔开
如： select ename,empno from emp;

- 查询所有字段：
select * from 表名;

如： select * from emp;
这种方式效率低、可读性差，不推荐。

### 给列起别名

- select 字段名 as 别名 from 表名;
如：select ename as empname from emp;
as 可以省略

注意：只是将显示的查询结果列名显示为别名，原表的列名不变。
select 语句是永远不会进行修改操作的(只负责查询)

### 列参与数学运算

- select ename, sal×12 as yearsal from emp;

## 条件查询

- select 字段名 from 表名 where 条件;

### 都有哪些条件

- = / != ：等于/不等于
如：select ename from emp where sal=800;

- < / <= / > / >= : 小于/小于等于/大于/大于等于
- between .. and .. : 两值之间，等同于 >= and <=
如：select ename,sal from emp where sal between 1250 and 3000;
注意：用 between..and 时必须遵循左小右大

- is null / is not null : 为 null 的值 / 不为 null 的值
如：select empno,ename,sal from emp where comm is null;

- and / or : 并且 / 或者
如：select empno,ename,job,sal from emp where job='manager' and sal > 2000;
如果 and 和 or 同时出现，and 的优先级更高。如果想要 or 优先需要加括号

- in / not in : 包含(相当于多个 or) / 不在这个范围中
如：select empno,ename,job from emp where job in ('manager','salesman');
等同于：
select empno,ename,job from emp where job='manager' or job='salesman';

- not : 取非,主要用于 is 或 in 中
- like ：模糊查询，支持 % 或 下划线 匹配
% 匹配任意多个字符
_ 一个下划线匹配一个字符
如：select empno,ename from emp where ename like '%e%';

找出第二个字母是 A 的名字：
select empno,ename from emp where ename like '_A%';
