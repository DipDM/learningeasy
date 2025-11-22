<template><div><p>✅ CHAPTER 1 — Introduction &amp; Getting Started</p>
<p>Welcome to Chapter 1!
This chapter builds the foundation for SQL Server usage and basic querying.</p>
<p>📘 What This Chapter Covers</p>
<p>What SQL Server is</p>
<p>Tools: SSMS, sqlcmd, Azure Data Studio</p>
<p>Connecting to an instance</p>
<p>Understanding object hierarchy (instance → database → schema → objects)</p>
<p>Running first queries</p>
<p>Using the Results &amp; Messages panes</p>
<p>Understanding common SQL errors</p>
<p>🎯 Learning Objectives</p>
<p>After completing this chapter, you will be able to:</p>
<p>Explain SQL Server object hierarchy</p>
<p>Connect to SQL Server &amp; create a database</p>
<p>Write and run basic SELECT queries</p>
<p>Understand result panes and debug common errors</p>
<p>1.1 — Quick Conceptual Overview</p>
<p>SQL Server is a relational database management system (RDBMS) from Microsoft.</p>
<p>Key Concepts</p>
<p>Instance
A running SQL Server engine process. One machine can host multiple instances.</p>
<p>Database
Logical storage container. Backed by:</p>
<p>.mdf → primary data file</p>
<p>.ldf → transaction log</p>
<p>Schema
Namespace inside a database (e.g., dbo, sales).
Objects belong to schemas:
schema.object</p>
<p>Common object types</p>
<p>Tables</p>
<p>Views</p>
<p>Stored procedures</p>
<p>Functions</p>
<p>Triggers</p>
<p>Indexes</p>
<p>1.2 — Tools (Short Overview)
SSMS</p>
<p>Classic GUI tool</p>
<p>Windows-only</p>
<p>Has Object Explorer, Query Editor, Execution Plan viewer</p>
<p>Azure Data Studio</p>
<p>Cross-platform</p>
<p>Modern UI</p>
<p>Supports notebooks</p>
<p>sqlcmd</p>
<p>Command-line client</p>
<p>Useful for scripting &amp; automation</p>
<p>1.3 — Create a Database (Example)
-- Create a new database named LearningDB
CREATE DATABASE LearningDB;
GO</p>
<p>-- Switch context to the database
USE LearningDB;
GO</p>
<p>Explanation:</p>
<p>CREATE DATABASE creates data &amp; log files.</p>
<p>USE changes the active database context.</p>
<p>1.4 — Create a Table &amp; Insert Rows
-- create a simple table to experiment
CREATE TABLE dbo.Employees (
EmployeeID INT IDENTITY(1,1) PRIMARY KEY,
FirstName  NVARCHAR(50) NOT NULL,
LastName   NVARCHAR(50) NOT NULL,
HireDate   DATE NULL,
Salary     DECIMAL(10,2) NULL
);
GO</p>
<p>-- insert sample data
INSERT INTO dbo.Employees (FirstName, LastName, HireDate, Salary)
VALUES
('Asha', 'Patil',  '2020-03-15', 45000.00),
('Vikram', 'Kumar', '2018-11-01', 60000.00),
('Rita', 'Shah',    '2021-06-20', 38000.50);
GO</p>
<p>Notes:</p>
<p>IDENTITY(1,1) → auto-increment</p>
<p>PRIMARY KEY creates a clustered index by default</p>
<p>1.5 — Basic SELECT Queries
Example 1 — All columns
SELECT * FROM dbo.Employees;</p>
<ul>
<li>fetches all columns — avoid in production.</li>
</ul>
<p>Example 2 — Specific columns
SELECT EmployeeID, FirstName, LastName, Salary
FROM dbo.Employees;</p>
<p>Example 3 — Expression + Alias
SELECT
FirstName + ' ' + LastName AS FullName,
Salary,
Salary * 12 AS AnnualSalary
FROM dbo.Employees;</p>
<p>Example 4 — Literal &amp; computed value
SELECT
'Company: ABC Pvt Ltd' AS Company,
GETDATE() AS RetrievedAt
FROM dbo.Employees;</p>
<p>1.6 — Filtering Rows (WHERE)
SELECT EmployeeID, FirstName, LastName, Salary
FROM dbo.Employees
WHERE Salary &gt; 40000;</p>
<p>Operators: =, &lt;, &gt;, &lt;=, &gt;=, &lt;&gt;, plus AND, OR, NOT.</p>
<p>1.7 — Sorting (ORDER BY)
SELECT EmployeeID, FirstName, LastName, Salary
FROM dbo.Employees
ORDER BY Salary DESC, LastName ASC;</p>
<p>1.8 — Limiting Rows (TOP)
-- top 2 highest salaries:
SELECT TOP (2) EmployeeID, FirstName, LastName, Salary
FROM dbo.Employees
ORDER BY Salary DESC;</p>
<p>For pagination → later chapters cover OFFSET .. FETCH.</p>
<p>1.9 — Understanding Result Panes (SSMS)
Results Grid</p>
<p>Shows your query output.</p>
<p>Messages Pane</p>
<p>Shows:</p>
<p>row counts</p>
<p>errors</p>
<p>warnings</p>
<p>Execution Plan</p>
<p>Visual representation of how SQL Server runs queries.</p>
<p>Common Error Example:
Msg 208, Level 16, Invalid object name 'dbo.Employees'</p>
<p>Means:</p>
<p>Wrong database context</p>
<p>Misspelled object name</p>
<p>1.10 — Basic Mistakes &amp; Debugging Tips</p>
<p>Wrong DB context? → check:</p>
<p>SELECT DB_NAME();</p>
<p>Missing GO in scripts may cause errors (SSMS batch separator)</p>
<p>Case sensitivity depends on database collation</p>
<p>1.11 — Exercises (Try Yourself)
✔ Exercise 1</p>
<p>Create:</p>
<p>Database: PracticeDB</p>
<p>Table: Customers</p>
<p>Insert 4 rows</p>
<p>Select them</p>
<p>✔ Exercise 2</p>
<p>Query Employees table:</p>
<p>Show FullName &amp; AnnualSalary</p>
<p>Filter salary &lt; 50000</p>
<p>Order by HireDate DESC</p>
<p>✔ Exercise 3</p>
<p>Insert a row with NULL HireDate
Then write a query to find rows where HireDate is NULL.</p>
<p>1.12 — Solutions (Brief)
Exercise 1 — Create DB &amp; Table
CREATE DATABASE PracticeDB;
GO
USE PracticeDB;
GO</p>
<p>CREATE TABLE dbo.Customers (
CustomerID INT IDENTITY(1,1) PRIMARY KEY,
Name NVARCHAR(100) NOT NULL,
Email NVARCHAR(255) NULL,
CreatedAt DATETIME NOT NULL DEFAULT (GETDATE())
);
GO</p>
<p>INSERT INTO dbo.Customers (Name, Email) VALUES
('Rahul Desai','rahul@example.com'),
('Meera Joshi','meera@example.com'),
('Sonal Rao','sonal@example.com'),
('Kumar Singh','kumar@example.com');</p>
<p>SELECT * FROM dbo.Customers;</p>
<p>Exercise 2 — Query Example
SELECT
FirstName + ' ' + LastName AS FullName,
Salary,
Salary * 12 AS AnnualSalary,
HireDate
FROM dbo.Employees
WHERE Salary &lt; 50000
ORDER BY HireDate DESC;</p>
<p>Exercise 3 — NULL Example
INSERT INTO dbo.Employees (FirstName, LastName, HireDate, Salary)
VALUES ('Test', 'User', NULL, 30000);</p>
<p>SELECT * FROM dbo.Employees
WHERE HireDate IS NULL;</p>
<p>1.13 — Recommended Next Steps</p>
<p>Create more databases &amp; tables</p>
<p>Explore SSMS panes (Results, Messages, Execution Plan)</p>
<p>Move to Chapter 2 — Data Types &amp; NULLs for deeper understanding of:</p>
<p>Numeric types</p>
<p>String types</p>
<p>Date/time types</p>
<p>Storage considerations</p>
<p>NULL behavior</p>
<p>🎉 Chapter 1 Complete!</p>
<p>Ready for Chapter 2?
Just tell me and I’ll prepare the content structure.</p>
</div></template>


