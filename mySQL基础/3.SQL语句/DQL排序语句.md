# DQL 排序语句

## 单个字段排序

- select 字段名 from 表名 order by 想要排序的字段名 asc(升序);
如：select ename, sal from emp order by sal;
默认为升序，如果是升序 asc 可省略

- select 字段名 from 表名 order by 想要排序的字段名 desc(降序);

## 两个或多个字段排序

- select 字段名 from 表名 order by 想要排序的字段1 asc, 想要排序的字段2 asc;

## 执行顺序

from > where > order by
如：select ename,sal from emp where sal between 1250 and 3000 order by sal;
