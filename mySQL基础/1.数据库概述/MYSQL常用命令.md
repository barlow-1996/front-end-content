# 常用命令

- 退出 mysql：quit

- 查看 mysql 中有哪些数据库(最后要加分号): show databases;
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
mysql 中默认自带了4个数据库

- 使用某个数据库： use databaseName;
如要用上面的 test 数据库：
mysql> use test;
Database changed
表示正在使用名叫 test 的数据库

- 创建数据库： create database databaseName;
如 mysql> create database byl;
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| byl                |
| mysql              |
| performance_schema |
| test               |
+--------------------+

- 查看某个数据库下有哪些表：show tables;

- 查看表中数据：select * from tableName;

- 只查看表的结构，不查看表中的数据：desc tableName;

- 查看 mysql 数据库的版本号：select version();

- 查看当前使用的是哪个数据库：select database();
