---
title: execute() vs executeQuery() vs executeUpdate() 
---

## executeQuery()
Definition: `ResultSet executeQuery(String sql) throws SQLException`

`executeQuery()` is used for executing the sql statements which retrieves (e.g, select) date from the
database.

## executeUpdate()
Definition: `int executeUpdate(String sql) throws SQLException`

`executeUpdate()` is used for executing the sql statements which update (e.g, insert, update, delete,
create, alter) the database.

## execute()
Definition: `boolean execute(String sql) throws SQLException`

`execute()` can be used for executing any kind of sql statements.
