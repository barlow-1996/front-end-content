# DQL 函数

## 单行处理函数

单行处理函数的特点：一个输入对应一个输出。

常见函数有：

- lower() / upper()：转换成小写 / 大写
如：select lower(ename) from emp;

- substr(a,b,c)：取子串(a为被截取的字符串，b为起始下标，c为截取长度)
如：select substr(ename,1,2) as ename from emp;
注意：起始下标从 1 开始，没有 0 下标；

- concat()：字符串拼接
- length()：取长度
如：select length(ename) as namelength from emp;

- trim()：去掉字符串前后空格
- str_to_date()：字符串转成日期
- date_format()：格式化日期
- round(a,b)：四舍五入(a为要四舍五入的数，b为要保留小数的个数(默认为0))
如：select round(123.456,2) as result from emp;

- rand()：生成随机函数
如：select round(rand()*100,0) from emp; // 100以内的随机数

- ifnull()：可将 null 换成一个具体值
在有 null 参与的数学运算中，结果都是 null，所以有必要换成别的数
如： select ename,ifnull(comm,0) as comm from emp;

- case...when...then..else...end：当..就..，模仿 if-else 语句
如：select ename,job,sal as newsal,(case job when 'manager' then sal * 1.5 else sal end) as newsal from emp;

## 分组函数(多行处理函数)

多行处理函数的特点：多个输入对应一个输出。
多行处理函数需要对数据进行分组，若没分组，整张表默认为一组。

常见函数有：

- count:计数
如：select count(ename) from emp;

- sum：求和
如：select sum(sal) from emp;

- avg：求平均值
如：select avg(sal) from emp;

- max / min：求最大值 / 最小值
如：select max(sal) from emp;

### 多行处理函数注意点

1：分组函数自动忽略 null；

2：count(*) 和 count(具体字段) 是有区别的
count(具体字段)：表示统计该字段下所有不为 null 的元素总数
count(*)：表示统计该表当中的总行数，只要有一行数据，count就加一

3：多行处理函数不能直接使用在 where 子句中
如：select ename,sal from emp where sal > min(sal);
会报错：ERROR 1111 (HY000): Invalid use of group function
因为分组函数在使用时必须先分组，where执行时还没有分组，所以where后面不能出现分组函数

4：所有多行处理函数可以组合起来一起用
如：select sum(sal),min(sal),max(sal),avg(sal) from emp;

## 分组查询(非常重要)  

在实际的应用中，可能需要先进行分组，然后对每一组的数据进行操作

格式：
select ... from ... group by ...;
如：按照职位分组，然后对工资求和
select job,sum(sal) as sum from emp group by job;
以上代码的执行顺序：
先从 emp 表中查询数据，根据 job 字段进行分组，然后对每一组数据进行sum求和。
**在一条 select 语句中，如果有group by语句的话，select后面只能跟参加分组的字段以及分组函数，其他的一律不能跟**

两个字段联合分组：
select deptno,job,max(sal) from emp group by deptno,job;

### 执行顺序

书写顺序：
select ... from ... where ... group by ... order by ...;
执行顺序：

1.from
2.where
3.group by
4.select
5.order by
