<template><div><h1 id="chapter-10-—-indexes-query-optimization" tabindex="-1"><a class="header-anchor" href="#chapter-10-—-indexes-query-optimization"><span>CHAPTER 10 — Indexes &amp; Query Optimization</span></a></h1>
<p><strong>Clustered / Non-Clustered / Included Columns / Covering Index / Seek vs Scan / Statistics / Execution Plans / Fragmentation</strong></p>
<blockquote>
<p>This chapter is crucial for interviews, real-world performance, and tuning slow queries.</p>
</blockquote>
<h2 id="_1-introduction" tabindex="-1"><a class="header-anchor" href="#_1-introduction"><span>1. INTRODUCTION</span></a></h2>
<p>Indexing is the heart of SQL performance. Well-designed indexes make queries fast, and poor indexing makes even simple queries slow.</p>
<h3 id="interview-definition-short-strong" tabindex="-1"><a class="header-anchor" href="#interview-definition-short-strong"><span>Interview Definition (Short &amp; Strong)</span></a></h3>
<p>An index in SQL Server is a data structure that improves the speed of data retrieval by providing a fast lookup path for rows, similar to an index in a book.</p>
<h2 id="_2-types-of-indexes" tabindex="-1"><a class="header-anchor" href="#_2-types-of-indexes"><span>2. TYPES OF INDEXES</span></a></h2>
<table>
<thead>
<tr>
<th>Index Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Clustered Index</td>
<td>Defines the physical order of rows in a table</td>
</tr>
<tr>
<td>Non-Clustered Index</td>
<td>A separate structure that references table rows via pointers (RID/Key)</td>
</tr>
<tr>
<td>Unique Index</td>
<td>Ensures uniqueness</td>
</tr>
<tr>
<td>Filtered Index</td>
<td>Index on subset of rows</td>
</tr>
<tr>
<td>Covering Index</td>
<td>Query can be fully answered from index</td>
</tr>
<tr>
<td>Columnstore Index</td>
<td>Optimized for analytics (OLAP)</td>
</tr>
<tr>
<td>Hash Index (Memory-Optimized)</td>
<td>Used for in-memory tables</td>
</tr>
</tbody>
</table>
<h2 id="_3-clustered-index" tabindex="-1"><a class="header-anchor" href="#_3-clustered-index"><span>3. CLUSTERED INDEX</span></a></h2>
<h3 id="definition" tabindex="-1"><a class="header-anchor" href="#definition"><span>Definition</span></a></h3>
<p>A clustered index determines the physical order of the rows in the table. Each table can have only ONE clustered index.</p>
<h3 id="characteristics" tabindex="-1"><a class="header-anchor" href="#characteristics"><span>Characteristics</span></a></h3>
<ul>
<li>Acts like the table's backbone</li>
<li>Data is stored in a B-Tree sorted by the clustered key</li>
<li>Ideal for:
<ul>
<li>Range queries</li>
<li>Sorting</li>
<li>Searching by primary key</li>
</ul>
</li>
</ul>
<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">CLUSTERED</span> <span class="token keyword">INDEX</span> IX_Employees_EmpID</span>
<span class="line"><span class="token keyword">ON</span> Employees <span class="token punctuation">(</span>EmpID<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="primary-key-→-clustered-index-default" tabindex="-1"><a class="header-anchor" href="#primary-key-→-clustered-index-default"><span>Primary Key → Clustered Index (Default)</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Orders <span class="token punctuation">(</span></span>
<span class="line">   OrderID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>    <span class="token comment">-- auto creates clustered index</span></span>
<span class="line">   OrderDate <span class="token keyword">DATETIME</span><span class="token punctuation">,</span></span>
<span class="line">   Amount <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If no clustered index exists, SQL Server makes PK index clustered unless instructed otherwise.</p>
<h3 id="when-to-choose-clustered-index" tabindex="-1"><a class="header-anchor" href="#when-to-choose-clustered-index"><span>When to choose Clustered Index</span></a></h3>
<p>For columns frequently used in:</p>
<ul>
<li>ORDER BY</li>
<li>BETWEEN queries</li>
<li>ranges</li>
</ul>
<p>Ideal columns:</p>
<ul>
<li>Identity keys</li>
<li>Sequential values</li>
</ul>
<h2 id="_4-non-clustered-index" tabindex="-1"><a class="header-anchor" href="#_4-non-clustered-index"><span>4. NON-CLUSTERED INDEX</span></a></h2>
<h3 id="definition-1" tabindex="-1"><a class="header-anchor" href="#definition-1"><span>Definition</span></a></h3>
<p>A non-clustered index is a separate structure containing key values and pointers (Row Locator) to the actual table rows.</p>
<h3 id="characteristics-1" tabindex="-1"><a class="header-anchor" href="#characteristics-1"><span>Characteristics</span></a></h3>
<ul>
<li>Doesn't affect physical order of rows</li>
<li>Multiple non-clustered indexes are allowed</li>
<li>Good for:
<ul>
<li>Search queries (WHERE)</li>
<li>JOIN conditions</li>
<li>Filtering</li>
</ul>
</li>
</ul>
<h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">NONCLUSTERED</span> <span class="token keyword">INDEX</span> IX_Employees_Name</span>
<span class="line"><span class="token keyword">ON</span> Employees <span class="token punctuation">(</span>EmpName<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="row-locator" tabindex="-1"><a class="header-anchor" href="#row-locator"><span>Row Locator</span></a></h3>
<ul>
<li>For clustered tables → clustered key is locator</li>
<li>For heaps → RID (Row Identifier)</li>
</ul>
<h2 id="_5-included-columns" tabindex="-1"><a class="header-anchor" href="#_5-included-columns"><span>5. INCLUDED COLUMNS</span></a></h2>
<h3 id="definition-2" tabindex="-1"><a class="header-anchor" href="#definition-2"><span>Definition</span></a></h3>
<p>Included columns are non-key columns added to a non-clustered index to make it covering without affecting the index's sort order.</p>
<h3 id="syntax-1" tabindex="-1"><a class="header-anchor" href="#syntax-1"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">NONCLUSTERED</span> <span class="token keyword">INDEX</span> IX_Employees_Name</span>
<span class="line"><span class="token keyword">ON</span> Employees <span class="token punctuation">(</span>EmpName<span class="token punctuation">)</span></span>
<span class="line">INCLUDE <span class="token punctuation">(</span>DeptID<span class="token punctuation">,</span> Salary<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="why-use-included" tabindex="-1"><a class="header-anchor" href="#why-use-included"><span>Why use INCLUDED?</span></a></h3>
<ul>
<li>Reduces lookups</li>
<li>Improves performance</li>
<li>Makes index cover the entire query</li>
</ul>
<h2 id="_6-covering-index" tabindex="-1"><a class="header-anchor" href="#_6-covering-index"><span>6. COVERING INDEX</span></a></h2>
<h3 id="definition-3" tabindex="-1"><a class="header-anchor" href="#definition-3"><span>Definition</span></a></h3>
<p>A covering index is an index that contains all the columns required by a query, so SQL Server does not need to go back to the base table.</p>
<h3 id="example-query" tabindex="-1"><a class="header-anchor" href="#example-query"><span>Example Query</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> EmpName <span class="token operator">=</span> <span class="token string">'Amit'</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="create-covering-index" tabindex="-1"><a class="header-anchor" href="#create-covering-index"><span>Create covering index</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">NONCLUSTERED</span> <span class="token keyword">INDEX</span> IX_Employees_Cover</span>
<span class="line"><span class="token keyword">ON</span> Employees <span class="token punctuation">(</span>EmpName<span class="token punctuation">)</span></span>
<span class="line">INCLUDE <span class="token punctuation">(</span>Salary<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="benefit" tabindex="-1"><a class="header-anchor" href="#benefit"><span>Benefit</span></a></h3>
<p>Avoids the expensive &quot;Key Lookup&quot; or &quot;RID Lookup&quot;.</p>
<h2 id="_7-seek-vs-scan" tabindex="-1"><a class="header-anchor" href="#_7-seek-vs-scan"><span>7. SEEK vs SCAN</span></a></h2>
<h3 id="definition-4" tabindex="-1"><a class="header-anchor" href="#definition-4"><span>Definition</span></a></h3>
<table>
<thead>
<tr>
<th>Operation</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td>Index SEEK</td>
<td>Fast lookup using index structure → best performance</td>
</tr>
<tr>
<td>Index SCAN</td>
<td>Reads entire index table → slower</td>
</tr>
<tr>
<td>Table SCAN</td>
<td>Reads entire table → worst performance</td>
</tr>
</tbody>
</table>
<h3 id="when-sql-uses-seek" tabindex="-1"><a class="header-anchor" href="#when-sql-uses-seek"><span>When SQL uses SEEK</span></a></h3>
<ul>
<li>When WHERE column is indexed</li>
<li>When searching by exact match or range on leading index column</li>
</ul>
<h3 id="when-sql-uses-scan" tabindex="-1"><a class="header-anchor" href="#when-sql-uses-scan"><span>When SQL uses SCAN</span></a></h3>
<ul>
<li>Missing index on filtered column</li>
<li>Non-sargable queries (LIKE '%abc', functions on indexed column)</li>
</ul>
<h3 id="non-sargable-example-avoid" tabindex="-1"><a class="header-anchor" href="#non-sargable-example-avoid"><span>Non-Sargable Example (Avoid)</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span></span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> <span class="token keyword">YEAR</span><span class="token punctuation">(</span>HireDate<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">2020</span><span class="token punctuation">;</span>  <span class="token comment">-- BAD</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SQL will scan because index cannot be used.</p>
<h3 id="sargable-rewrite-good" tabindex="-1"><a class="header-anchor" href="#sargable-rewrite-good"><span>Sargable Rewrite (Good)</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WHERE</span> HireDate <span class="token operator">>=</span> <span class="token string">'2020-01-01'</span> <span class="token operator">AND</span> HireDate <span class="token operator">&lt;</span> <span class="token string">'2021-01-01'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_8-execution-plans" tabindex="-1"><a class="header-anchor" href="#_8-execution-plans"><span>8. EXECUTION PLANS</span></a></h2>
<p>Execution plans show how SQL Server executes queries.</p>
<h3 id="how-to-view-plan" tabindex="-1"><a class="header-anchor" href="#how-to-view-plan"><span>How to view plan</span></a></h3>
<ul>
<li>Press <strong>Ctrl + M</strong> → Include Actual Execution Plan</li>
<li>Or use:</li>
</ul>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SET</span> SHOWPLAN_ALL <span class="token keyword">ON</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="important-operators" tabindex="-1"><a class="header-anchor" href="#important-operators"><span>Important Operators</span></a></h3>
<table>
<thead>
<tr>
<th>Operator</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td>Clustered Index Seek</td>
<td>Very fast, best-case scenario</td>
</tr>
<tr>
<td>Clustered Index Scan</td>
<td>Reads whole index</td>
</tr>
<tr>
<td>Key Lookup</td>
<td>Looks up additional columns from clustered index</td>
</tr>
<tr>
<td>RID Lookup</td>
<td>Lookup on heap</td>
</tr>
<tr>
<td>Hash Match</td>
<td>Join using hash table</td>
</tr>
<tr>
<td>Merge Join</td>
<td>Requires sorted input</td>
</tr>
<tr>
<td>Nested Loop</td>
<td>Row-by-row join</td>
</tr>
</tbody>
</table>
<h3 id="key-lookup-problem" tabindex="-1"><a class="header-anchor" href="#key-lookup-problem"><span>Key Lookup Problem</span></a></h3>
<p>Occurs when query needs columns NOT in index.</p>
<p><strong>Fix:</strong> Use INCLUDED columns or Covering Index.</p>
<h2 id="_9-statistics" tabindex="-1"><a class="header-anchor" href="#_9-statistics"><span>9. STATISTICS</span></a></h2>
<h3 id="definition-5" tabindex="-1"><a class="header-anchor" href="#definition-5"><span>Definition</span></a></h3>
<p>Statistics store data distribution information used by the optimizer to produce efficient execution plans.</p>
<h3 id="types" tabindex="-1"><a class="header-anchor" href="#types"><span>Types</span></a></h3>
<ul>
<li>Index statistics (auto-created)</li>
<li>Column statistics</li>
</ul>
<h3 id="update-stats" tabindex="-1"><a class="header-anchor" href="#update-stats"><span>Update Stats</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">UPDATE</span> <span class="token keyword">STATISTICS</span> Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>or automatically via SQL Server every time enough changes occur.</p>
<h3 id="when-stale-statistics-cause-problems" tabindex="-1"><a class="header-anchor" href="#when-stale-statistics-cause-problems"><span>When stale statistics cause problems?</span></a></h3>
<p>Wrong estimates → Wrong join strategy → Slow queries</p>
<h2 id="_10-index-fragmentation" tabindex="-1"><a class="header-anchor" href="#_10-index-fragmentation"><span>10. INDEX FRAGMENTATION</span></a></h2>
<p>Fragmentation occurs when data pages are not stored contiguously.</p>
<h3 id="two-types" tabindex="-1"><a class="header-anchor" href="#two-types"><span>Two Types</span></a></h3>
<ul>
<li><strong>Logical Fragmentation (External)</strong> → Out-of-order pages</li>
<li><strong>Internal Fragmentation</strong> → Too much free space inside pages</li>
</ul>
<h3 id="check-fragmentation" tabindex="-1"><a class="header-anchor" href="#check-fragmentation"><span>Check Fragmentation</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> index_id<span class="token punctuation">,</span> avg_fragmentation_in_percent</span>
<span class="line"><span class="token keyword">FROM</span> sys<span class="token punctuation">.</span>dm_db_index_physical_stats<span class="token punctuation">(</span>DB_ID<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> OBJECT_ID<span class="token punctuation">(</span><span class="token string">'Employees'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fix-fragmentation" tabindex="-1"><a class="header-anchor" href="#fix-fragmentation"><span>Fix Fragmentation</span></a></h3>
<table>
<thead>
<tr>
<th>Fragmentation</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td>5% – 30%</td>
<td>REORGANIZE</td>
</tr>
<tr>
<td>&gt; 30%</td>
<td>REBUILD</td>
</tr>
</tbody>
</table>
<h3 id="commands" tabindex="-1"><a class="header-anchor" href="#commands"><span>Commands</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">INDEX</span> IX_Employees_Name <span class="token keyword">ON</span> Employees REORGANIZE<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">INDEX</span> IX_Employees_Name <span class="token keyword">ON</span> Employees REBUILD<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-filtered-index" tabindex="-1"><a class="header-anchor" href="#_11-filtered-index"><span>11. FILTERED INDEX</span></a></h2>
<h3 id="definition-6" tabindex="-1"><a class="header-anchor" href="#definition-6"><span>Definition</span></a></h3>
<p>A non-clustered index on subset of rows using a WHERE clause.</p>
<h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">NONCLUSTERED</span> <span class="token keyword">INDEX</span> IX_ActiveUsers</span>
<span class="line"><span class="token keyword">ON</span> Users <span class="token punctuation">(</span>LastLoginDate<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHERE</span> IsActive <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="benefits" tabindex="-1"><a class="header-anchor" href="#benefits"><span>Benefits</span></a></h3>
<ul>
<li>Smaller index</li>
<li>Faster</li>
<li>Perfect for sparse columns</li>
</ul>
<h2 id="_12-columnstore-index-olap" tabindex="-1"><a class="header-anchor" href="#_12-columnstore-index-olap"><span>12. COLUMNSTORE INDEX (OLAP)</span></a></h2>
<h3 id="definition-7" tabindex="-1"><a class="header-anchor" href="#definition-7"><span>Definition</span></a></h3>
<p>Stores data column-wise, optimized for analytics, not OLTP.</p>
<h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h3>
<ul>
<li>Data warehouse queries</li>
<li>Big aggregations</li>
</ul>
<h3 id="create" tabindex="-1"><a class="header-anchor" href="#create"><span>Create</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> COLUMNSTORE <span class="token keyword">INDEX</span> IX_Sales_ColumnStore</span>
<span class="line"><span class="token keyword">ON</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13-real-interview-questions-with-answers" tabindex="-1"><a class="header-anchor" href="#_13-real-interview-questions-with-answers"><span>13. REAL INTERVIEW QUESTIONS (with answers)</span></a></h2>
<h3 id="q1-what-is-the-difference-between-clustered-and-non-clustered-index" tabindex="-1"><a class="header-anchor" href="#q1-what-is-the-difference-between-clustered-and-non-clustered-index"><span>Q1: What is the difference between Clustered and Non-Clustered Index?</span></a></h3>
<ul>
<li>Clustered index sorts and stores data physically → only one allowed</li>
<li>Non-clustered index is a separate structure pointing to data rows → many allowed</li>
</ul>
<h3 id="q2-what-is-a-key-lookup" tabindex="-1"><a class="header-anchor" href="#q2-what-is-a-key-lookup"><span>Q2: What is a Key Lookup?</span></a></h3>
<p>A lookup operation when non-clustered index does not contain all required columns.</p>
<h3 id="q3-how-to-fix-key-lookup" tabindex="-1"><a class="header-anchor" href="#q3-how-to-fix-key-lookup"><span>Q3: How to fix Key Lookup?</span></a></h3>
<p>Create a covering index with INCLUDE columns.</p>
<h3 id="q4-what-is-sargability" tabindex="-1"><a class="header-anchor" href="#q4-what-is-sargability"><span>Q4: What is SARGability?</span></a></h3>
<p>Query ability to use indexes effectively. Non-sargable operations cause scans.</p>
<h3 id="q5-how-does-sql-choose-execution-plans" tabindex="-1"><a class="header-anchor" href="#q5-how-does-sql-choose-execution-plans"><span>Q5: How does SQL choose execution plans?</span></a></h3>
<p>Using statistics and cost-based optimizer.</p>
<h3 id="q6-what-is-fragmentation-and-how-to-fix-it" tabindex="-1"><a class="header-anchor" href="#q6-what-is-fragmentation-and-how-to-fix-it"><span>Q6: What is fragmentation and how to fix it?</span></a></h3>
<p>Out-of-order pages → slow IO</p>
<p>Fix via REORGANIZE or REBUILD</p>
<h3 id="q7-when-to-use-filtered-indexes" tabindex="-1"><a class="header-anchor" href="#q7-when-to-use-filtered-indexes"><span>Q7: When to use Filtered Indexes?</span></a></h3>
<p>When you only need to index a subset of data.</p>
<h2 id="_14-practice-tasks" tabindex="-1"><a class="header-anchor" href="#_14-practice-tasks"><span>14. PRACTICE TASKS</span></a></h2>
<ol>
<li>Create a clustered index on primary key in Employees</li>
<li>Create non-clustered index on DeptID</li>
<li>Add INCLUDE (Salary) to that index</li>
<li>Find a query that produces a Key Lookup and fix it</li>
<li>Compare table scan vs index seek using execution plan</li>
<li>Check fragmentation and rebuild index</li>
</ol>
<h2 id="_15-summary" tabindex="-1"><a class="header-anchor" href="#_15-summary"><span>15. SUMMARY</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td>Clustered Index</td>
<td>Defines physical order of table</td>
</tr>
<tr>
<td>Non-Clustered Index</td>
<td>Separate index structure</td>
</tr>
<tr>
<td>Included Columns</td>
<td>Make index covering</td>
</tr>
<tr>
<td>Covering Index</td>
<td>Query doesn't need table lookup</td>
</tr>
<tr>
<td>Seek</td>
<td>Fast lookup</td>
</tr>
<tr>
<td>Scan</td>
<td>Reads entire table/index</td>
</tr>
<tr>
<td>Statistics</td>
<td>Used by optimizer to choose plan</td>
</tr>
<tr>
<td>Fragmentation</td>
<td>Out-of-order pages → degrade performance</td>
</tr>
<tr>
<td>Filtered Index</td>
<td>Index on subset of rows</td>
</tr>
<tr>
<td>Columnstore Index</td>
<td>Analytics-focused index</td>
</tr>
</tbody>
</table>
<h2 id="_16-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_16-next-chapter-preview"><span>16. NEXT CHAPTER PREVIEW</span></a></h2>
<p><strong>Next: Chapter 11 — Transactions, Locking, and Isolation Levels</strong></p>
<p>We'll cover:</p>
<ul>
<li>ACID properties</li>
<li>BEGIN / COMMIT / ROLLBACK</li>
<li>Lock types (Shared, Exclusive, Update)</li>
<li>Deadlocks</li>
<li>Isolation levels (Read Uncommitted → Serializable → Snapshot)</li>
</ul>
</div></template>


