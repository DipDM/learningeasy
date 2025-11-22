<template><div><h1 id="chapter-3-—-ddl-create-alter-drop-and-constraints" tabindex="-1"><a class="header-anchor" href="#chapter-3-—-ddl-create-alter-drop-and-constraints"><span>Chapter 3 — DDL (CREATE, ALTER, DROP) and Constraints</span></a></h1>
<h2 id="_3-1-introduction" tabindex="-1"><a class="header-anchor" href="#_3-1-introduction"><span>3.1 Introduction</span></a></h2>
<p>In SQL Server, <strong>Data Definition Language (DDL)</strong> statements define and modify database structures such as databases, tables, schemas, indexes, and constraints.</p>
<h3 id="common-ddl-commands" tabindex="-1"><a class="header-anchor" href="#common-ddl-commands"><span>Common DDL Commands</span></a></h3>
<table>
<thead>
<tr>
<th>Command</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CREATE</strong></td>
<td>Creates a new database object (table, view, etc.)</td>
</tr>
<tr>
<td><strong>ALTER</strong></td>
<td>Modifies an existing object (add column, change datatype, etc.)</td>
</tr>
<tr>
<td><strong>DROP</strong></td>
<td>Deletes an existing object</td>
</tr>
<tr>
<td><strong>TRUNCATE</strong></td>
<td>Removes all data from a table but keeps its structure</td>
</tr>
</tbody>
</table>
<blockquote>
<p>Note: TRUNCATE is technically DML but behaves like DDL due to minimal logging.</p>
</blockquote>
<hr>
<h2 id="_3-2-sql-object-hierarchy" tabindex="-1"><a class="header-anchor" href="#_3-2-sql-object-hierarchy"><span>3.2 SQL Object Hierarchy</span></a></h2>
<p>SQL Server objects follow this structure:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">Instance</span>
<span class="line"> └── Database</span>
<span class="line">      └── Schema</span>
<span class="line">           └── Table / View / Procedure / Function</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>Instance</strong> → Running SQL Server engine</li>
<li><strong>Database</strong> → Collection of data</li>
<li><strong>Schema</strong> → Logical container (default: dbo)</li>
<li><strong>Table</strong> → Stores rows and columns</li>
</ul>
<hr>
<h2 id="_3-3-create-command" tabindex="-1"><a class="header-anchor" href="#_3-3-create-command"><span>3.3 CREATE Command</span></a></h2>
<h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>schema_name<span class="token punctuation">.</span><span class="token punctuation">]</span>table_name <span class="token punctuation">(</span></span>
<span class="line">    column_name data_type <span class="token punctuation">[</span><span class="token boolean">NULL</span> <span class="token operator">|</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token keyword">CONSTRAINT</span> constraint_name constraint_type<span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-1-—-create-students-table" tabindex="-1"><a class="header-anchor" href="#example-1-—-create-students-table"><span>Example 1 — Create Students Table</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dbo<span class="token punctuation">.</span>Students <span class="token punctuation">(</span></span>
<span class="line">    StudentID <span class="token keyword">INT</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    FirstName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    LastName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    DateOfBirth <span class="token keyword">DATE</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    Email NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span></span>
<span class="line">    AdmissionDate <span class="token keyword">DATETIME</span> <span class="token keyword">DEFAULT</span><span class="token punctuation">(</span>GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    Marks <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">CHECK</span> <span class="token punctuation">(</span>Marks <span class="token operator">BETWEEN</span> <span class="token number">0</span> <span class="token operator">AND</span> <span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="explanation" tabindex="-1"><a class="header-anchor" href="#explanation"><span>Explanation</span></a></h3>
<ul>
<li><strong>IDENTITY(1,1)</strong> → Auto-increment</li>
<li><strong>PRIMARY KEY</strong> → Unique row identifier</li>
<li><strong>NOT NULL</strong> → Mandatory value</li>
<li><strong>UNIQUE</strong> → Distinct values required</li>
<li><strong>DEFAULT</strong> → Assigns default value</li>
<li><strong>CHECK</strong> → Restricts allowed values</li>
</ul>
<h3 id="example-2-—-create-relationship-foreign-key" tabindex="-1"><a class="header-anchor" href="#example-2-—-create-relationship-foreign-key"><span>Example 2 — Create Relationship (Foreign Key)</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dbo<span class="token punctuation">.</span>Departments <span class="token punctuation">(</span></span>
<span class="line">    DeptID <span class="token keyword">INT</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    DeptName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dbo<span class="token punctuation">.</span>Employees <span class="token punctuation">(</span></span>
<span class="line">    EmpID <span class="token keyword">INT</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    EmpName NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    Salary <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    DeptID <span class="token keyword">INT</span> <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token keyword">REFERENCES</span> dbo<span class="token punctuation">.</span>Departments<span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-4-constraints-in-detail" tabindex="-1"><a class="header-anchor" href="#_3-4-constraints-in-detail"><span>3.4 Constraints in Detail</span></a></h2>
<p>Constraints ensure data integrity.</p>
<table>
<thead>
<tr>
<th>Constraint</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>PRIMARY KEY</strong></td>
<td>Uniquely identifies each row</td>
</tr>
<tr>
<td><strong>FOREIGN KEY</strong></td>
<td>Enforces relationship between tables</td>
</tr>
<tr>
<td><strong>UNIQUE</strong></td>
<td>Prevents duplicate values</td>
</tr>
<tr>
<td><strong>CHECK</strong></td>
<td>Restricts values using logic</td>
</tr>
<tr>
<td><strong>DEFAULT</strong></td>
<td>Supplies a default value</td>
</tr>
<tr>
<td><strong>NOT NULL</strong></td>
<td>Requires a value</td>
</tr>
</tbody>
</table>
<h3 id="primary-key" tabindex="-1"><a class="header-anchor" href="#primary-key"><span>PRIMARY KEY</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Products <span class="token punctuation">(</span></span>
<span class="line">    ProductID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    ProductName NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="composite-key" tabindex="-1"><a class="header-anchor" href="#composite-key"><span>Composite Key</span></a></h4>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Orders <span class="token punctuation">(</span></span>
<span class="line">    OrderID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    ProductID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>OrderID<span class="token punctuation">,</span> ProductID<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="foreign-key" tabindex="-1"><a class="header-anchor" href="#foreign-key"><span>FOREIGN KEY</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Employees</span>
<span class="line"><span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> FK_Employees_Departments</span>
<span class="line"><span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">REFERENCES</span> Departments<span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="with-cascading" tabindex="-1"><a class="header-anchor" href="#with-cascading"><span>With Cascading</span></a></h4>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">REFERENCES</span> Departments<span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span></span>
<span class="line"><span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CASCADE</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unique" tabindex="-1"><a class="header-anchor" href="#unique"><span>UNIQUE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Users <span class="token punctuation">(</span></span>
<span class="line">    UserID <span class="token keyword">INT</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    Email NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="check" tabindex="-1"><a class="header-anchor" href="#check"><span>CHECK</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Accounts <span class="token punctuation">(</span></span>
<span class="line">    AccountID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    Balance <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">CHECK</span> <span class="token punctuation">(</span>Balance <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="default" tabindex="-1"><a class="header-anchor" href="#default"><span>DEFAULT</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Orders <span class="token punctuation">(</span></span>
<span class="line">    OrderID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    OrderDate <span class="token keyword">DATETIME</span> <span class="token keyword">DEFAULT</span><span class="token punctuation">(</span>GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token keyword">Status</span> NVARCHAR<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span><span class="token punctuation">(</span><span class="token string">'Pending'</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="not-null" tabindex="-1"><a class="header-anchor" href="#not-null"><span>NOT NULL</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Countries <span class="token punctuation">(</span></span>
<span class="line">    CountryID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    CountryName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-5-alter-command" tabindex="-1"><a class="header-anchor" href="#_3-5-alter-command"><span>3.5 ALTER Command</span></a></h2>
<h3 id="a-add-column" tabindex="-1"><a class="header-anchor" href="#a-add-column"><span>A. Add Column</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Employees</span>
<span class="line"><span class="token keyword">ADD</span> PhoneNumber NVARCHAR<span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="b-modify-data-type" tabindex="-1"><a class="header-anchor" href="#b-modify-data-type"><span>B. Modify Data Type</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Employees</span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">COLUMN</span> Salary <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="c-drop-column" tabindex="-1"><a class="header-anchor" href="#c-drop-column"><span>C. Drop Column</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Employees</span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">COLUMN</span> PhoneNumber<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="d-add-constraint" tabindex="-1"><a class="header-anchor" href="#d-add-constraint"><span>D. Add Constraint</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Employees</span>
<span class="line"><span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> CK_Salary <span class="token keyword">CHECK</span> <span class="token punctuation">(</span>Salary <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="e-drop-constraint" tabindex="-1"><a class="header-anchor" href="#e-drop-constraint"><span>E. Drop Constraint</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Employees</span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">CONSTRAINT</span> CK_Salary<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-6-drop-command" tabindex="-1"><a class="header-anchor" href="#_3-6-drop-command"><span>3.6 DROP Command</span></a></h2>
<h3 id="a-drop-table" tabindex="-1"><a class="header-anchor" href="#a-drop-table"><span>A. Drop Table</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> dbo<span class="token punctuation">.</span>Students<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="b-drop-database" tabindex="-1"><a class="header-anchor" href="#b-drop-database"><span>B. Drop Database</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> LearningDB<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><blockquote>
<p>⚠️ Danger: DROP permanently removes structure + data.</p>
</blockquote>
<hr>
<h2 id="_3-7-truncate-vs-delete-vs-drop" tabindex="-1"><a class="header-anchor" href="#_3-7-truncate-vs-delete-vs-drop"><span>3.7 TRUNCATE vs DELETE vs DROP</span></a></h2>
<table>
<thead>
<tr>
<th>Operation</th>
<th>Removes Data</th>
<th>Keeps Structure</th>
<th>Logs Rows</th>
<th>Can Rollback</th>
<th>Speed</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>DELETE</strong></td>
<td>Yes (selective)</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Slow</td>
</tr>
<tr>
<td><strong>TRUNCATE</strong></td>
<td>Yes (all rows)</td>
<td>Yes</td>
<td>Minimal</td>
<td>Yes</td>
<td>Fast</td>
</tr>
<tr>
<td><strong>DROP</strong></td>
<td>Yes</td>
<td>No</td>
<td>N/A</td>
<td>No</td>
<td>Fastest</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_3-8-practical-examples" tabindex="-1"><a class="header-anchor" href="#_3-8-practical-examples"><span>3.8 Practical Examples</span></a></h2>
<h3 id="example-1-—-add-drop-column" tabindex="-1"><a class="header-anchor" href="#example-1-—-add-drop-column"><span>Example 1 — Add &amp; Drop Column</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Students <span class="token keyword">ADD</span> City NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Students <span class="token keyword">DROP</span> <span class="token keyword">COLUMN</span> City<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-2-—-add-check-constraint" tabindex="-1"><a class="header-anchor" href="#example-2-—-add-check-constraint"><span>Example 2 — Add CHECK Constraint</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Students</span>
<span class="line"><span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> CK_Marks <span class="token keyword">CHECK</span> <span class="token punctuation">(</span>Marks <span class="token operator">BETWEEN</span> <span class="token number">0</span> <span class="token operator">AND</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-3-—-drop-constraint" tabindex="-1"><a class="header-anchor" href="#example-3-—-drop-constraint"><span>Example 3 — Drop Constraint</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Students</span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">CONSTRAINT</span> CK_Marks<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-4-—-truncate-delete" tabindex="-1"><a class="header-anchor" href="#example-4-—-truncate-delete"><span>Example 4 — TRUNCATE &amp; DELETE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> Employees <span class="token keyword">WHERE</span> Salary <span class="token operator">&lt;</span> <span class="token number">40000</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-9-practice-questions" tabindex="-1"><a class="header-anchor" href="#_3-9-practice-questions"><span>3.9 Practice Questions</span></a></h2>
<p>Create table <code v-pre>Customers</code>:</p>
<ul>
<li>CustomerID INT (PK)</li>
<li>Name NVARCHAR(100) NOT NULL</li>
<li>Email NVARCHAR(100) UNIQUE</li>
<li>JoinDate DATE DEFAULT(GETDATE())</li>
<li>Age INT CHECK (Age &gt;= 18)</li>
</ul>
<p>Then:</p>
<ol>
<li>Add column <code v-pre>PhoneNumber</code>.</li>
<li>Add CHECK constraint enforcing length ≥ 10.</li>
<li>Drop <code v-pre>PhoneNumber</code> column.</li>
<li>Create tables <code v-pre>Authors</code> and <code v-pre>Books</code> with FK relationship.</li>
</ol>
<hr>
<h2 id="_3-10-summary" tabindex="-1"><a class="header-anchor" href="#_3-10-summary"><span>3.10 Summary</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CREATE</strong></td>
<td>Create objects</td>
</tr>
<tr>
<td><strong>ALTER</strong></td>
<td>Modify objects</td>
</tr>
<tr>
<td><strong>DROP</strong></td>
<td>Delete objects</td>
</tr>
<tr>
<td><strong>Constraints</strong></td>
<td>Enforce rules for data integrity</td>
</tr>
<tr>
<td><strong>TRUNCATE</strong></td>
<td>Fast removal of all data</td>
</tr>
<tr>
<td><strong>DELETE vs DROP</strong></td>
<td>DELETE removes data; DROP removes structure</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_3-11-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_3-11-next-chapter-preview"><span>3.11 Next Chapter Preview</span></a></h2>
<p>Next: <strong>Chapter 4 — DML (INSERT, UPDATE, DELETE, MERGE)</strong></p>
<p>You’ll learn:</p>
<ul>
<li>Safe data insertion &amp; updates</li>
<li>Using transactions</li>
<li>OUTPUT clause</li>
<li>MERGE (UPSERT logic)</li>
</ul>
</div></template>


