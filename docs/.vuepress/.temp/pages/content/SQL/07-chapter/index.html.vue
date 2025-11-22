<template><div><h1 id="chapter-7-—-subqueries-and-derived-tables" tabindex="-1"><a class="header-anchor" href="#chapter-7-—-subqueries-and-derived-tables"><span>Chapter 7 — Subqueries and Derived Tables</span></a></h1>
<h3 id="scalar-multi-row-correlated-nested-subqueries-and-derived-tables" tabindex="-1"><a class="header-anchor" href="#scalar-multi-row-correlated-nested-subqueries-and-derived-tables"><span>Scalar, Multi-row, Correlated, Nested Subqueries, and Derived Tables</span></a></h3>
<hr>
<h2 id="_7-1-introduction" tabindex="-1"><a class="header-anchor" href="#_7-1-introduction"><span>7.1 Introduction</span></a></h2>
<p>A <strong>Subquery</strong> (inner query) is a query inside another query.</p>
<h3 id="interview-definition" tabindex="-1"><a class="header-anchor" href="#interview-definition"><span>Interview Definition</span></a></h3>
<blockquote>
<p>A subquery is a query nested inside another SQL query that returns data used by the outer query for filtering, comparison, or computation.</p>
</blockquote>
<h3 id="use-cases" tabindex="-1"><a class="header-anchor" href="#use-cases"><span>Use Cases</span></a></h3>
<ul>
<li>Compare values between tables</li>
<li>Perform dynamic calculations</li>
<li>Filter based on results of another query</li>
</ul>
<hr>
<h2 id="_7-2-types-of-subqueries" tabindex="-1"><a class="header-anchor" href="#_7-2-types-of-subqueries"><span>7.2 Types of Subqueries</span></a></h2>
<table>
<thead>
<tr>
<th>Type</th>
<th>Returns</th>
<th>Common Use</th>
</tr>
</thead>
<tbody>
<tr>
<td>Scalar Subquery</td>
<td>One value</td>
<td>SELECT, WHERE, HAVING</td>
</tr>
<tr>
<td>Multi-row Subquery</td>
<td>Multiple rows</td>
<td>IN, ANY, ALL</td>
</tr>
<tr>
<td>Correlated Subquery</td>
<td>Runs once per outer row</td>
<td>Dependent filtering</td>
</tr>
<tr>
<td>Nested Subquery</td>
<td>Subquery inside another subquery</td>
<td>Multi-level filtering</td>
</tr>
<tr>
<td>Derived Table</td>
<td>Subquery in FROM clause</td>
<td>Acts as temporary table</td>
</tr>
</tbody>
</table>
<h3 id="sample-setup" tabindex="-1"><a class="header-anchor" href="#sample-setup"><span>Sample Setup</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Departments <span class="token punctuation">(</span></span>
<span class="line">    DeptID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    DeptName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Employees <span class="token punctuation">(</span></span>
<span class="line">    EmpID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    EmpName NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    DeptID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    Salary <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Departments <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'IT'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'HR'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Finance'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Employees <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">101</span><span class="token punctuation">,</span> <span class="token string">'Amit'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">60000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">102</span><span class="token punctuation">,</span> <span class="token string">'Rita'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">55000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">103</span><span class="token punctuation">,</span> <span class="token string">'Raj'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">45000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">104</span><span class="token punctuation">,</span> <span class="token string">'Meena'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">70000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">105</span><span class="token punctuation">,</span> <span class="token string">'Kiran'</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_7-3-scalar-subquery" tabindex="-1"><a class="header-anchor" href="#_7-3-scalar-subquery"><span>7.3 Scalar Subquery</span></a></h2>
<p>Returns <strong>exactly one value</strong>.</p>
<h3 id="example-—-in-select" tabindex="-1"><a class="header-anchor" href="#example-—-in-select"><span>Example — In SELECT</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span></span>
<span class="line">       Salary<span class="token punctuation">,</span></span>
<span class="line">       <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span> <span class="token keyword">FROM</span> Employees<span class="token punctuation">)</span> <span class="token keyword">AS</span> AvgCompanySalary</span>
<span class="line"><span class="token keyword">FROM</span> Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-in-where" tabindex="-1"><a class="header-anchor" href="#example-—-in-where"><span>Example — In WHERE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span> <span class="token keyword">FROM</span> Employees<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Interview Tip:</strong> Scalar subqueries must return one value only.</p>
<hr>
<h2 id="_7-4-multi-row-subquery" tabindex="-1"><a class="header-anchor" href="#_7-4-multi-row-subquery"><span>7.4 Multi-row Subquery</span></a></h2>
<p>Used with <strong>IN</strong>, <strong>ANY</strong>, <strong>ALL</strong>.</p>
<h3 id="example-—-in" tabindex="-1"><a class="header-anchor" href="#example-—-in"><span>Example — IN</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> DeptID <span class="token operator">IN</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Departments</span>
<span class="line">    <span class="token keyword">WHERE</span> DeptName <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">'IT'</span><span class="token punctuation">,</span> <span class="token string">'HR'</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-any" tabindex="-1"><a class="header-anchor" href="#example-—-any"><span>Example — ANY</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token keyword">ANY</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> Salary <span class="token keyword">FROM</span> Employees <span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-all" tabindex="-1"><a class="header-anchor" href="#example-—-all"><span>Example — ALL</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token keyword">ALL</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> Salary <span class="token keyword">FROM</span> Employees <span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_7-5-correlated-subquery" tabindex="-1"><a class="header-anchor" href="#_7-5-correlated-subquery"><span>7.5 Correlated Subquery</span></a></h2>
<p>Subquery <strong>depends on the outer query</strong>.</p>
<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> E<span class="token punctuation">.</span>Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">WHERE</span> E<span class="token punctuation">.</span>Salary <span class="token operator">></span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> E<span class="token punctuation">.</span>DeptID</span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Runs once for each employee.</p>
<h3 id="equivalent-using-join" tabindex="-1"><a class="header-anchor" href="#equivalent-using-join"><span>Equivalent Using JOIN</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> E<span class="token punctuation">.</span>Salary<span class="token punctuation">,</span> D<span class="token punctuation">.</span>AvgSalary</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">JOIN</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span> <span class="token keyword">AS</span> AvgSalary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID</span>
<span class="line"><span class="token punctuation">)</span> D <span class="token keyword">ON</span> E<span class="token punctuation">.</span>DeptID <span class="token operator">=</span> D<span class="token punctuation">.</span>DeptID</span>
<span class="line"><span class="token keyword">WHERE</span> E<span class="token punctuation">.</span>Salary <span class="token operator">></span> D<span class="token punctuation">.</span>AvgSalary<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_7-6-nested-subqueries" tabindex="-1"><a class="header-anchor" href="#_7-6-nested-subqueries"><span>7.6 Nested Subqueries</span></a></h2>
<p>Subqueries inside another subquery.</p>
<h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> DeptID</span>
<span class="line">    <span class="token keyword">FROM</span> Departments</span>
<span class="line">    <span class="token keyword">WHERE</span> DeptName <span class="token operator">=</span> <span class="token punctuation">(</span></span>
<span class="line">        <span class="token keyword">SELECT</span> DeptName <span class="token keyword">FROM</span> Departments</span>
<span class="line">        <span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_7-7-derived-tables" tabindex="-1"><a class="header-anchor" href="#_7-7-derived-tables"><span>7.7 Derived Tables</span></a></h2>
<p>Subquery in the <strong>FROM clause</strong>, acts as a temporary table.</p>
<h3 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> AvgSalary</span>
<span class="line"><span class="token keyword">FROM</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span> <span class="token keyword">AS</span> AvgSalary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID</span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">AS</span> DeptAvg</span>
<span class="line"><span class="token keyword">WHERE</span> AvgSalary <span class="token operator">></span> <span class="token number">50000</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="subquery-vs-derived-table" tabindex="-1"><a class="header-anchor" href="#subquery-vs-derived-table"><span>Subquery vs Derived Table</span></a></h3>
<table>
<thead>
<tr>
<th>Feature</th>
<th>Subquery</th>
<th>Derived Table</th>
</tr>
</thead>
<tbody>
<tr>
<td>Usage</td>
<td>Anywhere</td>
<td>Only in FROM</td>
</tr>
<tr>
<td>Returns</td>
<td>Scalar/multi-row</td>
<td>Virtual table</td>
</tr>
<tr>
<td>Alias</td>
<td>Optional</td>
<td>Mandatory</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_7-8-common-interview-examples" tabindex="-1"><a class="header-anchor" href="#_7-8-common-interview-examples"><span>7.8 Common Interview Examples</span></a></h2>
<h3 id="example-1-—-max-salary-employee" tabindex="-1"><a class="header-anchor" href="#example-1-—-max-salary-employee"><span>Example 1 — Max salary employee</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> Salary <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">MAX</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span> <span class="token keyword">FROM</span> Employees<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-2-—-departments-with-1-employee" tabindex="-1"><a class="header-anchor" href="#example-2-—-departments-with-1-employee"><span>Example 2 — Departments with &gt;1 employee</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID</span>
<span class="line"><span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-with-subquery" tabindex="-1"><a class="header-anchor" href="#example-—-with-subquery"><span>Example — With subquery</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID</span>
<span class="line"><span class="token keyword">FROM</span> Departments</span>
<span class="line"><span class="token keyword">WHERE</span> DeptID <span class="token operator">IN</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID <span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-3-—-salary-above-department-average" tabindex="-1"><a class="header-anchor" href="#example-3-—-salary-above-department-average"><span>Example 3 — Salary above department average</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> DeptID<span class="token punctuation">,</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> E<span class="token punctuation">.</span>DeptID</span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-4-—-derived-table-for-top-salary-per-department" tabindex="-1"><a class="header-anchor" href="#example-4-—-derived-table-for-top-salary-per-department"><span>Example 4 — Derived table for top salary per department</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> D<span class="token punctuation">.</span>DeptName<span class="token punctuation">,</span> DT<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> DT<span class="token punctuation">.</span>Salary</span>
<span class="line"><span class="token keyword">FROM</span> Departments D</span>
<span class="line"><span class="token keyword">JOIN</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> DeptID<span class="token punctuation">,</span> Salary<span class="token punctuation">,</span></span>
<span class="line">           RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> DeptID <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Salary <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> RankNo</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">AS</span> DT <span class="token keyword">ON</span> D<span class="token punctuation">.</span>DeptID <span class="token operator">=</span> DT<span class="token punctuation">.</span>DeptID</span>
<span class="line"><span class="token keyword">WHERE</span> DT<span class="token punctuation">.</span>RankNo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_7-9-practice-questions" tabindex="-1"><a class="header-anchor" href="#_7-9-practice-questions"><span>7.9 Practice Questions</span></a></h2>
<ol>
<li>Employees earning above overall average salary.</li>
<li>Departments where minimum salary &gt; 40000.</li>
<li>Correlated subquery: employees earning more than department avg.</li>
<li>Derived table: top salary per department.</li>
<li>Nested subquery: employees in same dept as 'Rita'.</li>
</ol>
<hr>
<h2 id="_7-10-summary" tabindex="-1"><a class="header-anchor" href="#_7-10-summary"><span>7.10 Summary</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td>Subquery</td>
<td>Query inside another query</td>
</tr>
<tr>
<td>Scalar Subquery</td>
<td>Returns one value</td>
</tr>
<tr>
<td>Multi-row Subquery</td>
<td>Returns multiple values</td>
</tr>
<tr>
<td>Correlated Subquery</td>
<td>References outer query</td>
</tr>
<tr>
<td>Nested Subquery</td>
<td>Subquery inside another</td>
</tr>
<tr>
<td>Derived Table</td>
<td>Subquery in FROM clause</td>
</tr>
<tr>
<td>ANY/ALL/IN</td>
<td>Multi-row comparison tools</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_7-11-interview-recap" tabindex="-1"><a class="header-anchor" href="#_7-11-interview-recap"><span>7.11 Interview Recap</span></a></h2>
<table>
<thead>
<tr>
<th>Term</th>
<th>Interview Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td>Subquery</td>
<td>Query inside another used for comparison/filtering</td>
</tr>
<tr>
<td>Scalar Subquery</td>
<td>One-row, one-column result</td>
</tr>
<tr>
<td>Correlated Subquery</td>
<td>Runs once per outer row</td>
</tr>
<tr>
<td>Derived Table</td>
<td>Subquery used as temporary table</td>
</tr>
<tr>
<td>Nested Subquery</td>
<td>Multi-level subquery</td>
</tr>
<tr>
<td>Join vs Subquery</td>
<td>Join merges horizontally; subquery filters vertically</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_7-12-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_7-12-next-chapter-preview"><span>7.12 Next Chapter Preview</span></a></h2>
<p>Next: <strong>Chapter 8 — Common Table Expressions (CTEs) and Recursive Queries</strong></p>
<p>You will learn:</p>
<ul>
<li>WITH clause syntax</li>
<li>Recursive CTEs</li>
<li>Hierarchical queries (employee-manag</li>
</ul>
</div></template>


