<template><div><h1 id="generated-files-chapter-1-—-introduction-getting-started" tabindex="-1"><a class="header-anchor" href="#generated-files-chapter-1-—-introduction-getting-started"><span>Generated files: Chapter 1 — Introduction &amp; Getting Started</span></a></h1>
<p>Below are the individual markdown files prepared for <strong>Chapter 1</strong>. Each section is ready to be saved as a separate <code v-pre>.md</code> file under <code v-pre>docs/content/SQL/01-introduction/</code>.</p>
<p>Use the file markers to copy each section into the corresponding file in your repo.</p>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/README.md -->
<h1 id="chapter-1-—-introduction-getting-started" tabindex="-1"><a class="header-anchor" href="#chapter-1-—-introduction-getting-started"><span>Chapter 1 — Introduction &amp; Getting Started</span></a></h1>
<p>Welcome to Chapter 1. This chapter builds the foundation for SQL Server usage and basic querying.</p>
<h2 id="what-this-chapter-covers" tabindex="-1"><a class="header-anchor" href="#what-this-chapter-covers"><span>What this chapter covers</span></a></h2>
<ul>
<li>What SQL Server is and typical editions</li>
<li>Tools: SSMS, sqlcmd, Azure Data Studio</li>
<li>How to connect to an instance</li>
<li>Basic database/object model</li>
<li>First queries</li>
<li>Understanding errors</li>
<li>Running scripts</li>
</ul>
<h2 id="learning-objectives" tabindex="-1"><a class="header-anchor" href="#learning-objectives"><span>Learning objectives</span></a></h2>
<p>After this chapter you will be able to:</p>
<ul>
<li>Explain SQL Server object hierarchy</li>
<li>Connect to an instance and create a database</li>
<li>Write basic <code v-pre>SELECT</code> statements</li>
<li>Understand SSMS result panes</li>
<li>Debug common errors</li>
</ul>
<h3 id="chapter-parts" tabindex="-1"><a class="header-anchor" href="#chapter-parts"><span>Chapter Parts</span></a></h3>
<ul>
<li><RouteLink to="/content/SQL/01-chapter/1.1-overview.html">1.1 Quick conceptual overview</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.2-tools.html">1.2 Tools (short)</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.3-create-database.html">1.3 Create a database (example)</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.4-create-table.html">1.4 Create a table &amp; insert rows</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.5-select.html">1.5 Basic SELECT queries</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.6-filtering.html">1.6 Filtering rows (WHERE)</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.7-orderby.html">1.7 Sorting (ORDER BY)</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.8-top.html">1.8 Limiting rows (TOP)</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.9-ssms-panes.html">1.9 Understanding result panes (SSMS)</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.10-debugging.html">1.10 Basic mistakes &amp; debugging tips</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.11-exercises.html">1.11 Exercises</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.12-solutions.html">1.12 Solutions (brief)</RouteLink></li>
<li><RouteLink to="/content/SQL/01-chapter/1.13-next-steps.html">1.13 Recommended next steps</RouteLink></li>
</ul>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.1-overview.md -->
<h1 id="_1-1-quick-conceptual-overview" tabindex="-1"><a class="header-anchor" href="#_1-1-quick-conceptual-overview"><span>1.1 Quick conceptual overview</span></a></h1>
<p>SQL Server is a relational database management system (RDBMS) from Microsoft.</p>
<p><strong>Key concepts</strong></p>
<ul>
<li><strong>Instance</strong> — A running SQL Server engine process. One machine can host multiple instances.</li>
<li><strong>Database</strong> — Logical container for data; typically has data files (<code v-pre>.mdf</code>) and log files (<code v-pre>.ldf</code>).</li>
<li><strong>Schema</strong> — Namespace inside a database (e.g., <code v-pre>dbo</code>, <code v-pre>sales</code>). Objects are referenced as <code v-pre>schema.object</code>.</li>
<li><strong>Common object types</strong> — tables, views, stored procedures, functions, triggers, indexes.</li>
</ul>
<p>Short notes:</p>
<ul>
<li>Instances host databases; databases host schemas; schemas host objects.</li>
</ul>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.2-tools.md -->
<h1 id="_1-2-tools-short" tabindex="-1"><a class="header-anchor" href="#_1-2-tools-short"><span>1.2 Tools (short)</span></a></h1>
<h3 id="sql-server-management-studio-ssms" tabindex="-1"><a class="header-anchor" href="#sql-server-management-studio-ssms"><span>SQL Server Management Studio (SSMS)</span></a></h3>
<ul>
<li>Classic Windows GUI for managing SQL Server.</li>
<li>Object Explorer, Query Editor, Execution Plan, Management tools.</li>
</ul>
<h3 id="azure-data-studio" tabindex="-1"><a class="header-anchor" href="#azure-data-studio"><span>Azure Data Studio</span></a></h3>
<ul>
<li>Cross-platform editor with notebooks and modern UI.</li>
<li>Good for cross-platform workflows and lightweight editing.</li>
</ul>
<h3 id="sqlcmd" tabindex="-1"><a class="header-anchor" href="#sqlcmd"><span>sqlcmd</span></a></h3>
<ul>
<li>Command-line client for executing ad-hoc or scripted SQL commands (Windows / Linux).</li>
</ul>
<p>When to use:</p>
<ul>
<li>Use SSMS for deep administrative tasks and execution plans.</li>
<li>Use Azure Data Studio for cross-platform development and notebooks.</li>
<li>Use <code v-pre>sqlcmd</code> for automation and CI pipelines.</li>
</ul>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.3-create-database.md -->
<h1 id="_1-3-create-a-database-example" tabindex="-1"><a class="header-anchor" href="#_1-3-create-a-database-example"><span>1.3 Create a database (example)</span></a></h1>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- Create a new database named LearningDB</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> LearningDB<span class="token punctuation">;</span></span>
<span class="line">GO</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- Switch context to the database</span></span>
<span class="line"><span class="token keyword">USE</span> LearningDB<span class="token punctuation">;</span></span>
<span class="line">GO</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation</strong>: <code v-pre>CREATE DATABASE</code> provisions data and log files. <code v-pre>USE</code> changes the current database context for the session.</p>
<p>Tip: In scripts run in SSMS, <code v-pre>GO</code> is a batch separator understood by the client (SSMS/Azure Data Studio), not a T-SQL command.</p>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.4-create-table.md -->
<h1 id="_1-4-create-a-table-insert-rows" tabindex="-1"><a class="header-anchor" href="#_1-4-create-a-table-insert-rows"><span>1.4 Create a table &amp; insert rows</span></a></h1>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- create a simple table to experiment</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dbo<span class="token punctuation">.</span>Employees <span class="token punctuation">(</span></span>
<span class="line">    EmployeeID <span class="token keyword">INT</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    FirstName  NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    LastName   NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    HireDate   <span class="token keyword">DATE</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    Salary     <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">GO</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- insert sample data</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Employees <span class="token punctuation">(</span>FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> HireDate<span class="token punctuation">,</span> Salary<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">VALUES</span></span>
<span class="line"> <span class="token punctuation">(</span><span class="token string">'Asha'</span><span class="token punctuation">,</span> <span class="token string">'Patil'</span><span class="token punctuation">,</span>  <span class="token string">'2020-03-15'</span><span class="token punctuation">,</span> <span class="token number">45000.00</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"> <span class="token punctuation">(</span><span class="token string">'Vikram'</span><span class="token punctuation">,</span> <span class="token string">'Kumar'</span><span class="token punctuation">,</span> <span class="token string">'2018-11-01'</span><span class="token punctuation">,</span> <span class="token number">60000.00</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"> <span class="token punctuation">(</span><span class="token string">'Rita'</span><span class="token punctuation">,</span> <span class="token string">'Shah'</span><span class="token punctuation">,</span>    <span class="token string">'2021-06-20'</span><span class="token punctuation">,</span> <span class="token number">38000.50</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">GO</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Notes</strong>:</p>
<ul>
<li><code v-pre>IDENTITY(1,1)</code> creates an auto-increment column starting at 1.</li>
<li><code v-pre>PRIMARY KEY</code> creates a unique constraint and a clustered index by default (unless changed).</li>
</ul>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.5-select.md -->
<h1 id="_1-5-basic-select-queries" tabindex="-1"><a class="header-anchor" href="#_1-5-basic-select-queries"><span>1.5 Basic SELECT queries</span></a></h1>
<h3 id="example-1-—-select-all-columns" tabindex="-1"><a class="header-anchor" href="#example-1-—-select-all-columns"><span>Example 1 — select all columns</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span></span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Use <code v-pre>*</code> sparingly in production; explicit columns are preferred.</p>
</blockquote>
<h3 id="example-2-—-select-specific-columns" tabindex="-1"><a class="header-anchor" href="#example-2-—-select-specific-columns"><span>Example 2 — select specific columns</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmployeeID<span class="token punctuation">,</span> FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-3-—-expression-alias" tabindex="-1"><a class="header-anchor" href="#example-3-—-expression-alias"><span>Example 3 — expression &amp; alias</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> FirstName <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> LastName <span class="token keyword">AS</span> FullName<span class="token punctuation">,</span></span>
<span class="line">       Salary<span class="token punctuation">,</span></span>
<span class="line">       Salary <span class="token operator">*</span> <span class="token number">12</span> <span class="token keyword">AS</span> AnnualSalary</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-4-—-literal-and-computed-column" tabindex="-1"><a class="header-anchor" href="#example-4-—-literal-and-computed-column"><span>Example 4 — literal and computed column</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token string">'Company: ABC Pvt Ltd'</span> <span class="token keyword">AS</span> Company<span class="token punctuation">,</span></span>
<span class="line">       GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> RetrievedAt</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Notes</strong>:</p>
<ul>
<li><code v-pre>+</code> concatenates strings for <code v-pre>NVARCHAR</code> types.</li>
<li><code v-pre>AS</code> creates a column alias.</li>
</ul>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.6-filtering.md -->
<h1 id="_1-6-filtering-rows-where" tabindex="-1"><a class="header-anchor" href="#_1-6-filtering-rows-where"><span>1.6 Filtering rows (WHERE)</span></a></h1>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmployeeID<span class="token punctuation">,</span> FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees</span>
<span class="line"><span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token number">40000</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation</strong>: <code v-pre>WHERE</code> filters rows using comparison operators (<code v-pre>=</code>, <code v-pre>&lt;</code>, <code v-pre>&gt;</code>, <code v-pre>&lt;=</code>, <code v-pre>&gt;=</code>, <code v-pre>&lt;&gt;</code>) and logical operators (<code v-pre>AND</code>, <code v-pre>OR</code>, <code v-pre>NOT</code>).</p>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.7-orderby.md -->
<h1 id="_1-7-sorting-order-by" tabindex="-1"><a class="header-anchor" href="#_1-7-sorting-order-by"><span>1.7 Sorting (ORDER BY)</span></a></h1>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmployeeID<span class="token punctuation">,</span> FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Salary <span class="token keyword">DESC</span><span class="token punctuation">,</span> LastName <span class="token keyword">ASC</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Note</strong>: Result sets are unordered unless an <code v-pre>ORDER BY</code> is specified.</p>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.8-top.md -->
<h1 id="_1-8-limiting-rows-top" tabindex="-1"><a class="header-anchor" href="#_1-8-limiting-rows-top"><span>1.8 Limiting rows (TOP)</span></a></h1>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- top 2 highest salaries:</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">TOP</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> EmployeeID<span class="token punctuation">,</span> FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Salary <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Note</strong>: <code v-pre>TOP (n)</code> returns the first <code v-pre>n</code> rows of the ordered result. For pagination use <code v-pre>OFFSET ... FETCH</code> (covered later).</p>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.9-ssms-panes.md -->
<h1 id="_1-9-understanding-result-panes-and-messages-ssms" tabindex="-1"><a class="header-anchor" href="#_1-9-understanding-result-panes-and-messages-ssms"><span>1.9 Understanding result panes and messages (SSMS)</span></a></h1>
<ul>
<li><strong>Results grid</strong>: tabular view of query output.</li>
<li><strong>Messages</strong>: shows row counts, warnings, errors.</li>
<li><strong>Execution plan</strong>: visualizes how SQL Server executed the query (important for tuning).</li>
</ul>
<p><strong>Common error example</strong>:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">Msg 208, Level 16, State 1, Line 1</span>
<span class="line">Invalid object name 'dbo.Employees'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>Meaning: object not found in the current database or schema — check <code v-pre>USE</code> and spelling.</p>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.10-debugging.md -->
<h1 id="_1-10-basic-mistakes-and-debugging-tips" tabindex="-1"><a class="header-anchor" href="#_1-10-basic-mistakes-and-debugging-tips"><span>1.10 Basic mistakes and debugging tips</span></a></h1>
<ul>
<li><strong>Wrong database context</strong> → run:</li>
</ul>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DB_NAME<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>Missing GO</strong> in scripts may cause dependency order issues in SSMS.</li>
<li><strong>Case sensitivity</strong> depends on database collation; most installs are case-insensitive.</li>
</ul>
<p>Quick tips:</p>
<ul>
<li>Confirm you are in the intended database.</li>
<li>Use fully-qualified names: <code v-pre>Database.Schema.Object</code> when troubleshooting cross-db issues.</li>
</ul>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.11-exercises.md -->
<h1 id="_1-11-exercises-practice" tabindex="-1"><a class="header-anchor" href="#_1-11-exercises-practice"><span>1.11 Exercises (practice)</span></a></h1>
<ol>
<li>
<p><strong>Create PracticeDB and Customers table</strong></p>
<ul>
<li>
<p>Create a database <code v-pre>PracticeDB</code> and a table <code v-pre>Customers</code> with columns:</p>
<ul>
<li><code v-pre>CustomerID INT IDENTITY PK</code></li>
<li><code v-pre>Name NVARCHAR(100)</code></li>
<li><code v-pre>Email NVARCHAR(255)</code></li>
<li><code v-pre>CreatedAt DATETIME DEFAULT GETDATE()</code></li>
</ul>
</li>
<li>
<p>Insert 4 rows and select them.</p>
</li>
</ul>
</li>
<li>
<p><strong>FullName &amp; AnnualSalary</strong></p>
<ul>
<li>Write a query to show <code v-pre>FullName</code> and <code v-pre>AnnualSalary</code> for employees with <code v-pre>Salary &lt; 50000</code>, ordered by <code v-pre>HireDate</code> DESC.</li>
</ul>
</li>
<li>
<p><strong>NULL HireDate</strong></p>
<ul>
<li>Insert a row with <code v-pre>NULL</code> <code v-pre>HireDate</code> and write a query to select rows where <code v-pre>HireDate IS NULL</code>.</li>
</ul>
</li>
</ol>
<hr>
<!-- FILE: docs/content/SQL/01-introduction/1.12-solutions.md -->
<h1 id="_1-12-solutions-brief" tabindex="-1"><a class="header-anchor" href="#_1-12-solutions-brief"><span>1.12 Solutions (brief)</span></a></h1>
<h3 id="solution-—-create-db-table" tabindex="-1"><a class="header-anchor" href="#solution-—-create-db-table"><span>Solution — Create DB &amp; Table</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> PracticeDB<span class="token punctuation">;</span></span>
<span class="line">GO</span>
<span class="line"><span class="token keyword">USE</span> PracticeDB<span class="token punctuation">;</span></span>
<span class="line">GO</span>
<span class="line"></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dbo<span class="token punctuation">.</span>Customers <span class="token punctuation">(</span></span>
<span class="line">  CustomerID <span class="token keyword">INT</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">  Name NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">  Email NVARCHAR<span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">  CreatedAt <span class="token keyword">DATETIME</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token punctuation">(</span>GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">GO</span>
<span class="line"></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Customers <span class="token punctuation">(</span>Name<span class="token punctuation">,</span> Email<span class="token punctuation">)</span> <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">'Rahul Desai'</span><span class="token punctuation">,</span><span class="token string">'rahul@example.com'</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">'Meera Joshi'</span><span class="token punctuation">,</span><span class="token string">'meera@example.com'</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">'Sonal Rao'</span><span class="token punctuation">,</span><span class="token string">'sonal@example.com'</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">'Kumar Singh'</span><span class="token punctuation">,</span><span class="token string">'kumar@example.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Customers<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="solution-—-fullname-annualsalary" tabindex="-1"><a class="header-anchor" href="#solution-—-fullname-annualsalary"><span>Solution — FullName &amp; AnnualSalary</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> FirstName <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> LastName <span class="token keyword">AS</span> FullName<span class="token punctuation">,</span></span>
<span class="line">       Salary<span class="token punctuation">,</span></span>
<span class="line">       Salary <span class="token operator">*</span> <span class="token number">12</span> <span class="token keyword">AS</span> AnnualSalary<span class="token punctuation">,</span></span>
<span class="line">       HireDate</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees</span>
<span class="line"><span class="token keyword">WHERE</span> Salary <span class="token operator">&lt;</span> <span class="token number">50000</span></span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> HireDate <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="solution-—-null-example" tabindex="-1"><a class="header-anchor" href="#solution-—-null-example"><span>Solution — NULL example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Employees <span class="token punctuation">(</span>FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> HireDate<span class="token punctuation">,</span> Salary<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'Test'</span><span class="token punctuation">,</span> <span class="token string">'User'</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees <span class="token keyword">WHERE</span> HireDate <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<!-- FILE: docs/content/SQL/01-introduction/1.13-next-steps.md -->
<h1 id="_1-13-recommended-next-steps" tabindex="-1"><a class="header-anchor" href="#_1-13-recommended-next-steps"><span>1.13 Recommended next steps</span></a></h1>
<ul>
<li>Practice creating databases and tables.</li>
<li>Explore SSMS panes: Object Explorer, Query Editor, Results, Messages, Execution Plan.</li>
<li>When comfortable, move to <strong>Chapter 2 — Data Types &amp; NULLs</strong> to study types, storage, and NULL behavior in detail.</li>
</ul>
<hr>
<h1 id="how-to-use" tabindex="-1"><a class="header-anchor" href="#how-to-use"><span>How to use</span></a></h1>
<ol>
<li>Create folder: <code v-pre>docs/content/SQL/01-introduction/</code> in your repo.</li>
<li>Create each file named above and paste corresponding section content (the canvas shows each file block).</li>
<li>Restart <code v-pre>npm run docs:dev</code> and visit <code v-pre>/content/SQL/01-introduction/</code> to see the chapter index and navigate the sub-pages.</li>
</ol>
<p>If you want, I can also:</p>
<ul>
<li>generate the corresponding <code v-pre>sidebar</code> entries for <code v-pre>config.js</code> (I can paste the array),</li>
<li>or create the files directly in a zip for download.</li>
</ul>
<p>Tell me which next step you want.</p>
</div></template>


