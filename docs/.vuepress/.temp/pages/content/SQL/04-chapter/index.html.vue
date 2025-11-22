<template><div><h1 id="chapter-4-—-dml-data-manipulation-language" tabindex="-1"><a class="header-anchor" href="#chapter-4-—-dml-data-manipulation-language"><span>Chapter 4 — DML (Data Manipulation Language)</span></a></h1>
<h3 id="insert-update-delete-merge-with-output-and-transactions" tabindex="-1"><a class="header-anchor" href="#insert-update-delete-merge-with-output-and-transactions"><span>INSERT, UPDATE, DELETE, MERGE with OUTPUT and Transactions</span></a></h3>
<hr>
<h2 id="_4-1-introduction" tabindex="-1"><a class="header-anchor" href="#_4-1-introduction"><span>4.1 Introduction</span></a></h2>
<p>In this chapter, we move from defining structures (<strong>DDL</strong>) to manipulating data using <strong>DML</strong>.</p>
<h3 id="common-dml-commands" tabindex="-1"><a class="header-anchor" href="#common-dml-commands"><span>Common DML Commands</span></a></h3>
<table>
<thead>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>INSERT</strong></td>
<td>Adds new rows</td>
</tr>
<tr>
<td><strong>UPDATE</strong></td>
<td>Modifies existing rows</td>
</tr>
<tr>
<td><strong>DELETE</strong></td>
<td>Removes existing rows</td>
</tr>
<tr>
<td><strong>MERGE</strong></td>
<td>Inserts, updates, or deletes based on matching</td>
</tr>
</tbody>
</table>
<p>We cover syntax, examples, variations, and best practices.</p>
<hr>
<h2 id="_4-2-insert-command" tabindex="-1"><a class="header-anchor" href="#_4-2-insert-command"><span>4.2 INSERT Command</span></a></h2>
<h3 id="purpose" tabindex="-1"><a class="header-anchor" href="#purpose"><span>Purpose</span></a></h3>
<p>Adds new rows to a table.</p>
<h3 id="a-basic-syntax" tabindex="-1"><a class="header-anchor" href="#a-basic-syntax"><span>A. Basic Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> table_name <span class="token punctuation">(</span>column1<span class="token punctuation">,</span> column2<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">VALUES</span> <span class="token punctuation">(</span>value1<span class="token punctuation">,</span> value2<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="b-example-—-basic-insert" tabindex="-1"><a class="header-anchor" href="#b-example-—-basic-insert"><span>B. Example — Basic Insert</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Students <span class="token punctuation">(</span>FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> DateOfBirth<span class="token punctuation">,</span> Email<span class="token punctuation">,</span> Marks<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'Amit'</span><span class="token punctuation">,</span> <span class="token string">'Sharma'</span><span class="token punctuation">,</span> <span class="token string">'2002-01-15'</span><span class="token punctuation">,</span> <span class="token string">'amit@example.com'</span><span class="token punctuation">,</span> <span class="token number">85.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="c-example-—-insert-multiple-rows" tabindex="-1"><a class="header-anchor" href="#c-example-—-insert-multiple-rows"><span>C. Example — Insert Multiple Rows</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Students <span class="token punctuation">(</span>FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Marks<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">'Ravi'</span><span class="token punctuation">,</span> <span class="token string">'Patel'</span><span class="token punctuation">,</span> <span class="token number">75</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">'Sonal'</span><span class="token punctuation">,</span> <span class="token string">'Rao'</span><span class="token punctuation">,</span> <span class="token number">92</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">'Kiran'</span><span class="token punctuation">,</span> <span class="token string">'Mehta'</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="d-example-—-insert-from-another-table" tabindex="-1"><a class="header-anchor" href="#d-example-—-insert-from-another-table"><span>D. Example — Insert from Another Table</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Graduates <span class="token punctuation">(</span>Name<span class="token punctuation">,</span> Email<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> FirstName <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> LastName<span class="token punctuation">,</span> Email</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">></span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="e-example-—-insert-default-values" tabindex="-1"><a class="header-anchor" href="#e-example-—-insert-default-values"><span>E. Example — Insert Default Values</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Students <span class="token keyword">DEFAULT</span> <span class="token keyword">VALUES</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="f-example-—-insert-using-subquery" tabindex="-1"><a class="header-anchor" href="#f-example-—-insert-using-subquery"><span>F. Example — Insert Using Subquery</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>TopStudents <span class="token punctuation">(</span>StudentName<span class="token punctuation">,</span> Marks<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> FirstName <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> LastName<span class="token punctuation">,</span> Marks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">>=</span> <span class="token number">90</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-3-update-command" tabindex="-1"><a class="header-anchor" href="#_4-3-update-command"><span>4.3 UPDATE Command</span></a></h2>
<h3 id="purpose-1" tabindex="-1"><a class="header-anchor" href="#purpose-1"><span>Purpose</span></a></h3>
<p>Modifies existing rows.</p>
<h3 id="a-basic-syntax-1" tabindex="-1"><a class="header-anchor" href="#a-basic-syntax-1"><span>A. Basic Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">UPDATE</span> table_name</span>
<span class="line"><span class="token keyword">SET</span> column1 <span class="token operator">=</span> value1</span>
<span class="line"><span class="token keyword">WHERE</span> condition<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="b-example-—-simple-update" tabindex="-1"><a class="header-anchor" href="#b-example-—-simple-update"><span>B. Example — Simple Update</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">UPDATE</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">SET</span> Marks <span class="token operator">=</span> <span class="token number">95</span></span>
<span class="line"><span class="token keyword">WHERE</span> StudentID <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="c-example-—-conditional-update" tabindex="-1"><a class="header-anchor" href="#c-example-—-conditional-update"><span>C. Example — Conditional Update</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">UPDATE</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">SET</span> Marks <span class="token operator">=</span> Marks <span class="token operator">+</span> <span class="token number">5</span></span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">&lt;</span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="d-example-—-update-from-another-table" tabindex="-1"><a class="header-anchor" href="#d-example-—-update-from-another-table"><span>D. Example — Update from Another Table</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">UPDATE</span> S</span>
<span class="line"><span class="token keyword">SET</span> S<span class="token punctuation">.</span>Marks <span class="token operator">=</span> G<span class="token punctuation">.</span>NewMarks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students S</span>
<span class="line"><span class="token keyword">JOIN</span> dbo<span class="token punctuation">.</span>GradeUpdates G <span class="token keyword">ON</span> S<span class="token punctuation">.</span>StudentID <span class="token operator">=</span> G<span class="token punctuation">.</span>StudentID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="e-example-—-update-with-subquery" tabindex="-1"><a class="header-anchor" href="#e-example-—-update-with-subquery"><span>E. Example — Update With Subquery</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">UPDATE</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">SET</span> Marks <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Marks<span class="token punctuation">)</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-4-delete-command" tabindex="-1"><a class="header-anchor" href="#_4-4-delete-command"><span>4.4 DELETE Command</span></a></h2>
<h3 id="purpose-2" tabindex="-1"><a class="header-anchor" href="#purpose-2"><span>Purpose</span></a></h3>
<p>Removes rows from a table.</p>
<h3 id="a-basic-syntax-2" tabindex="-1"><a class="header-anchor" href="#a-basic-syntax-2"><span>A. Basic Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> table_name</span>
<span class="line"><span class="token keyword">WHERE</span> condition<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="b-example-—-delete-rows" tabindex="-1"><a class="header-anchor" href="#b-example-—-delete-rows"><span>B. Example — Delete Rows</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">&lt;</span> <span class="token number">35</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="c-example-—-delete-all-rows" tabindex="-1"><a class="header-anchor" href="#c-example-—-delete-all-rows"><span>C. Example — Delete All Rows</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="d-example-—-delete-using-join" tabindex="-1"><a class="header-anchor" href="#d-example-—-delete-using-join"><span>D. Example — Delete Using JOIN</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DELETE</span> S</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students S</span>
<span class="line"><span class="token keyword">JOIN</span> dbo<span class="token punctuation">.</span>Departments D <span class="token keyword">ON</span> S<span class="token punctuation">.</span>DeptID <span class="token operator">=</span> D<span class="token punctuation">.</span>DeptID</span>
<span class="line"><span class="token keyword">WHERE</span> D<span class="token punctuation">.</span>DeptName <span class="token operator">=</span> <span class="token string">'Science'</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="e-example-—-delete-using-subquery" tabindex="-1"><a class="header-anchor" href="#e-example-—-delete-using-subquery"><span>E. Example — Delete Using Subquery</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> DeptID <span class="token operator">IN</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Departments <span class="token keyword">WHERE</span> DeptName <span class="token operator">=</span> <span class="token string">'Arts'</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="f-delete-vs-truncate" tabindex="-1"><a class="header-anchor" href="#f-delete-vs-truncate"><span>F. DELETE vs TRUNCATE</span></a></h3>
<table>
<thead>
<tr>
<th>Feature</th>
<th>DELETE</th>
<th>TRUNCATE</th>
</tr>
</thead>
<tbody>
<tr>
<td>Removes all rows</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Uses WHERE</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Logs each row</td>
<td>Yes</td>
<td>Minimal</td>
</tr>
<tr>
<td>Rollback possible</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Resets identity</td>
<td>No</td>
<td>Yes</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-5-merge-command" tabindex="-1"><a class="header-anchor" href="#_4-5-merge-command"><span>4.5 MERGE Command</span></a></h2>
<h3 id="purpose-3" tabindex="-1"><a class="header-anchor" href="#purpose-3"><span>Purpose</span></a></h3>
<p>Performs INSERT, UPDATE, or DELETE in one statement.</p>
<h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">MERGE</span> target_table <span class="token keyword">AS</span> T</span>
<span class="line"><span class="token keyword">USING</span> source_table <span class="token keyword">AS</span> S</span>
<span class="line"><span class="token keyword">ON</span> <span class="token punctuation">(</span>T<span class="token punctuation">.</span>id <span class="token operator">=</span> S<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token keyword">MATCHED</span> <span class="token keyword">THEN</span></span>
<span class="line">    <span class="token keyword">UPDATE</span> <span class="token keyword">SET</span> T<span class="token punctuation">.</span><span class="token keyword">column</span> <span class="token operator">=</span> S<span class="token punctuation">.</span><span class="token keyword">column</span></span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token operator">NOT</span> <span class="token keyword">MATCHED</span> <span class="token keyword">BY</span> TARGET <span class="token keyword">THEN</span></span>
<span class="line">    <span class="token keyword">INSERT</span> <span class="token punctuation">(</span><span class="token keyword">columns</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token keyword">values</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token operator">NOT</span> <span class="token keyword">MATCHED</span> <span class="token keyword">BY</span> SOURCE <span class="token keyword">THEN</span></span>
<span class="line">    <span class="token keyword">DELETE</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">MERGE</span> dbo<span class="token punctuation">.</span>Students <span class="token keyword">AS</span> Target</span>
<span class="line"><span class="token keyword">USING</span> dbo<span class="token punctuation">.</span>NewStudents <span class="token keyword">AS</span> Source</span>
<span class="line"><span class="token keyword">ON</span> Target<span class="token punctuation">.</span>Email <span class="token operator">=</span> Source<span class="token punctuation">.</span>Email</span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token keyword">MATCHED</span> <span class="token keyword">THEN</span></span>
<span class="line">    <span class="token keyword">UPDATE</span> <span class="token keyword">SET</span> Target<span class="token punctuation">.</span>Marks <span class="token operator">=</span> Source<span class="token punctuation">.</span>Marks</span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token operator">NOT</span> <span class="token keyword">MATCHED</span> <span class="token keyword">BY</span> TARGET <span class="token keyword">THEN</span></span>
<span class="line">    <span class="token keyword">INSERT</span> <span class="token punctuation">(</span>FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Email<span class="token punctuation">,</span> Marks<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>Source<span class="token punctuation">.</span>FirstName<span class="token punctuation">,</span> Source<span class="token punctuation">.</span>LastName<span class="token punctuation">,</span> Source<span class="token punctuation">.</span>Email<span class="token punctuation">,</span> Source<span class="token punctuation">.</span>Marks<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token operator">NOT</span> <span class="token keyword">MATCHED</span> <span class="token keyword">BY</span> SOURCE <span class="token keyword">THEN</span></span>
<span class="line">    <span class="token keyword">DELETE</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="when-to-use-merge" tabindex="-1"><a class="header-anchor" href="#when-to-use-merge"><span>When to Use MERGE</span></a></h3>
<ul>
<li>Syncing data between tables</li>
<li>Nightly imports</li>
<li>Deduplication</li>
</ul>
<hr>
<h2 id="_4-6-output-clause" tabindex="-1"><a class="header-anchor" href="#_4-6-output-clause"><span>4.6 OUTPUT Clause</span></a></h2>
<p>Allows returning affected rows.</p>
<h3 id="example-—-track-inserted-rows" tabindex="-1"><a class="header-anchor" href="#example-—-track-inserted-rows"><span>Example — Track Inserted Rows</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>LogTable <span class="token punctuation">(</span>Name<span class="token punctuation">,</span> Marks<span class="token punctuation">)</span></span>
<span class="line">OUTPUT inserted<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> inserted<span class="token punctuation">.</span>Marks</span>
<span class="line"><span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'Ravi'</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-capture-updated-rows" tabindex="-1"><a class="header-anchor" href="#example-—-capture-updated-rows"><span>Example — Capture Updated Rows</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">UPDATE</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">SET</span> Marks <span class="token operator">=</span> Marks <span class="token operator">+</span> <span class="token number">5</span></span>
<span class="line">OUTPUT deleted<span class="token punctuation">.</span>Marks <span class="token keyword">AS</span> OldMarks<span class="token punctuation">,</span> inserted<span class="token punctuation">.</span>Marks <span class="token keyword">AS</span> NewMarks</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">&lt;</span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-capture-deleted-rows" tabindex="-1"><a class="header-anchor" href="#example-—-capture-deleted-rows"><span>Example — Capture Deleted Rows</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line">OUTPUT deleted<span class="token punctuation">.</span>StudentID<span class="token punctuation">,</span> deleted<span class="token punctuation">.</span>FirstName<span class="token punctuation">,</span> deleted<span class="token punctuation">.</span>Marks</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">&lt;</span> <span class="token number">40</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-7-transactions" tabindex="-1"><a class="header-anchor" href="#_4-7-transactions"><span>4.7 Transactions</span></a></h2>
<h3 id="purpose-4" tabindex="-1"><a class="header-anchor" href="#purpose-4"><span>Purpose</span></a></h3>
<p>Group multiple DML operations into a single unit.</p>
<h3 id="syntax-1" tabindex="-1"><a class="header-anchor" href="#syntax-1"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">BEGIN</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- operations</span></span>
<span class="line"><span class="token keyword">COMMIT</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- or</span></span>
<span class="line"><span class="token keyword">ROLLBACK</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">BEGIN</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">UPDATE</span> dbo<span class="token punctuation">.</span>Students <span class="token keyword">SET</span> Marks <span class="token operator">=</span> Marks <span class="token operator">+</span> <span class="token number">10</span> <span class="token keyword">WHERE</span> Marks <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students <span class="token keyword">WHERE</span> Marks <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">IF</span> @<span class="token variable">@ERROR</span> <span class="token operator">&lt;></span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">ROLLBACK</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">ELSE</span></span>
<span class="line">    <span class="token keyword">COMMIT</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-8-practical-examples" tabindex="-1"><a class="header-anchor" href="#_4-8-practical-examples"><span>4.8 Practical Examples</span></a></h2>
<h3 id="example-1-—-insert-and-log" tabindex="-1"><a class="header-anchor" href="#example-1-—-insert-and-log"><span>Example 1 — Insert and Log</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>Students <span class="token punctuation">(</span>FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Marks<span class="token punctuation">)</span></span>
<span class="line">OUTPUT inserted<span class="token punctuation">.</span>StudentID<span class="token punctuation">,</span> inserted<span class="token punctuation">.</span>FirstName</span>
<span class="line"><span class="token keyword">INTO</span> dbo<span class="token punctuation">.</span>InsertLog</span>
<span class="line"><span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'Neha'</span><span class="token punctuation">,</span> <span class="token string">'Patel'</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-2-—-safe-update-in-transaction" tabindex="-1"><a class="header-anchor" href="#example-2-—-safe-update-in-transaction"><span>Example 2 — Safe Update in Transaction</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">BEGIN</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">UPDATE</span> dbo<span class="token punctuation">.</span>Students <span class="token keyword">SET</span> Marks <span class="token operator">=</span> Marks <span class="token operator">+</span> <span class="token number">5</span> <span class="token keyword">WHERE</span> Marks <span class="token operator">&lt;</span> <span class="token number">60</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">IF</span> @<span class="token variable">@ROWCOUNT</span> <span class="token operator">></span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">COMMIT</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">ELSE</span></span>
<span class="line">    <span class="token keyword">ROLLBACK</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-3-—-merge-synchronization" tabindex="-1"><a class="header-anchor" href="#example-3-—-merge-synchronization"><span>Example 3 — Merge Synchronization</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">MERGE</span> dbo<span class="token punctuation">.</span>TargetTable <span class="token keyword">AS</span> T</span>
<span class="line"><span class="token keyword">USING</span> dbo<span class="token punctuation">.</span>SourceTable <span class="token keyword">AS</span> S</span>
<span class="line"><span class="token keyword">ON</span> T<span class="token punctuation">.</span>ID <span class="token operator">=</span> S<span class="token punctuation">.</span>ID</span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token keyword">MATCHED</span> <span class="token keyword">THEN</span> <span class="token keyword">UPDATE</span> <span class="token keyword">SET</span> T<span class="token punctuation">.</span><span class="token keyword">Value</span> <span class="token operator">=</span> S<span class="token punctuation">.</span><span class="token keyword">Value</span></span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token operator">NOT</span> <span class="token keyword">MATCHED</span> <span class="token keyword">BY</span> TARGET <span class="token keyword">THEN</span> <span class="token keyword">INSERT</span> <span class="token punctuation">(</span>ID<span class="token punctuation">,</span> <span class="token keyword">Value</span><span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>S<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> S<span class="token punctuation">.</span><span class="token keyword">Value</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">WHEN</span> <span class="token operator">NOT</span> <span class="token keyword">MATCHED</span> <span class="token keyword">BY</span> SOURCE <span class="token keyword">THEN</span> <span class="token keyword">DELETE</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-9-practice-questions" tabindex="-1"><a class="header-anchor" href="#_4-9-practice-questions"><span>4.9 Practice Questions</span></a></h2>
<ol>
<li>
<p>Create tables <code v-pre>Products</code> and <code v-pre>NewProducts</code> with overlapping data.</p>
<ul>
<li>Use <strong>MERGE</strong> to update and insert records.</li>
</ul>
</li>
<li>
<p>Use <strong>OUTPUT</strong> to show IDs of students deleted with Marks &lt; 50.</p>
</li>
<li>
<p>Write an UPDATE with JOIN to increase salary by 10% for IT department employees.</p>
</li>
<li>
<p>Use a transaction:</p>
<ul>
<li>Insert 2 new students</li>
<li>If one fails, rollback both</li>
</ul>
</li>
</ol>
<hr>
<h2 id="_4-10-summary" tabindex="-1"><a class="header-anchor" href="#_4-10-summary"><span>4.10 Summary</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>INSERT</strong></td>
<td>Adds data</td>
</tr>
<tr>
<td><strong>UPDATE</strong></td>
<td>Modifies data</td>
</tr>
<tr>
<td><strong>DELETE</strong></td>
<td>Removes data</td>
</tr>
<tr>
<td><strong>MERGE</strong></td>
<td>Combines insert/update/delete</td>
</tr>
<tr>
<td><strong>OUTPUT</strong></td>
<td>Returns affected rows</td>
</tr>
<tr>
<td><strong>TRANSACTION</strong></td>
<td>Ensures data integrity</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-11-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_4-11-next-chapter-preview"><span>4.11 Next Chapter Preview</span></a></h2>
<p>Next: <strong>Chapter 5 — Filtering, Sorting, and Aggregation</strong></p>
<p>You’ll learn:</p>
<ul>
<li>WHERE, ORDER BY, DISTINCT</li>
<li>Aggregate functions (SUM, AVG, COUNT)</li>
<li>GROUP BY and HAVING</li>
<li>Advanced grouping: ROLLUP, CUBE, GROUPING SETS</li>
</ul>
</div></template>


