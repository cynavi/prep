---
title: Statement vs PreparedStatement vs CallableStatement
---

## PreparedStatement
It is used for executing parameterized sql queries. The performance of `PreparedStatement` is better
than the `Statement` when used for multiple execution of same query. Further, `PreparedStatement`'s query
is compiled only once.
```java
try {  
    PreparedStatement preparedStatement = connection.prepareStatement("update emp set name = ? where id = ?");  
    preparedStatement.setInt(1, "Adam");  
    preparedStatement.setString(2, 143);
    
    int i = preparedStatement.executeUpdate();       
    connection.close();
} catch(Exception e) { 
    System.out.println(e);
}
```

## Statement
This interface is preferred if you are executing a particular SQL query only once. The performance of this
interface is less compared to other two interfaces. `Statement` interface is used for DDL statements like
`create`, `alter`, `drop` etc.
```java
try {  
    Statement statement = connection.createStatement();
    statement.executeUpdate("create table emp(id number not null, name varchar not null)");
    connection.close();
} catch(Exception e) { 
    System.out.println(e);
}
```

## CallableStatement
CallableStatement extends PreparedStatement and are used to execute the stored procedure. There are three
types of parameters that can be passed to stored procedures viz `in` (used for holding values to stored
procedure), `out`(used for holding the result returned by the stored procedure) and `in out` (acts as both
in and out parameter).

Before calling the stored procedure, you must register `out` parameters using `registerOutParameter()` method
of CallableStatement. As CallableStatement calls the stored procedures which are already compiled and 
stored in the database server, it has higher performance.
```java
CallableStatement callableStatement = connection.PrepareCall("{call myProcedure(?, ?, ?)}");
callableStatement.execute();
connection.close();
```
