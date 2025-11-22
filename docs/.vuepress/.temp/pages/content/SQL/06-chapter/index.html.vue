<template><div><h1 id="chapter-6-—-joins-and-set-operators" tabindex="-1"><a class="header-anchor" href="#chapter-6-—-joins-and-set-operators"><span>Chapter 6 — Joins and Set Operators</span></a></h1>
<h2 id="inner-left-right-full-cross-self-apply-union-intersect-except" tabindex="-1"><a class="header-anchor" href="#inner-left-right-full-cross-self-apply-union-intersect-except"><span>INNER, LEFT, RIGHT, FULL, CROSS, SELF, APPLY, UNION, INTERSECT, EXCEPT</span></a></h2>
<hr>
<h2 id="_6-1-introduction" tabindex="-1"><a class="header-anchor" href="#_6-1-introduction"><span>6.1 Introduction</span></a></h2>
<p>SQL JOINs allow combining data from multiple tables based on related columns (usually foreign keys).</p>
<p><strong>JOIN definition (interview style):</strong></p>
<blockquote>
<p>A JOIN combines rows from two or more tables based on a related column, returning a unified result.</p>
</blockquote>
<p>This chapter covers all major JOIN types and Set Operators.</p>
<hr>
<h2 id="_6-2-types-of-joins-overview" tabindex="-1"><a class="header-anchor" href="#_6-2-types-of-joins-overview"><span>6.2 Types of Joins Overview</span></a></h2>
<table>
<thead>
<tr>
<th>Join Type</th>
<th>Returns</th>
</tr>
</thead>
<tbody>
<tr>
<td>INNER JOIN</td>
<td>Only matching rows between tables</td>
</tr>
<tr>
<td>LEFT JOIN</td>
<td>All rows from left + matching from right</td>
</tr>
<tr>
<td>RIGHT JOIN</td>
<td>All rows from right + matching from left</td>
</tr>
<tr>
<td>FULL JOIN</td>
<td>All rows from both tables</td>
</tr>
<tr>
<td>CROSS JOIN</td>
<td>Cartesian product (all combinations)</td>
</tr>
<tr>
<td>SELF JOIN</td>
<td>Table joined with itself</td>
</tr>
<tr>
<td>CROSS APPLY / OUTER APPLY</td>
<td>Join with table-valued function result</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_6-3-sample-data-setup" tabindex="-1"><a class="header-anchor" href="#_6-3-sample-data-setup"><span>6.3 Sample Data Setup</span></a></h2>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Departments <span class="token punctuation">(</span></span>
<span class="line">    DeptID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    DeptName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Employees <span class="token punctuation">(</span></span>
<span class="line">    EmpID <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    EmpName NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    DeptID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    Salary <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> Departments<span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Departments <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'IT'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'HR'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Finance'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Employees <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">101</span><span class="token punctuation">,</span> <span class="token string">'Amit'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">60000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">102</span><span class="token punctuation">,</span> <span class="token string">'Rita'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">55000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">103</span><span class="token punctuation">,</span> <span class="token string">'Raj'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">45000</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">104</span><span class="token punctuation">,</span> <span class="token string">'Meena'</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_6-4-inner-join" tabindex="-1"><a class="header-anchor" href="#_6-4-inner-join"><span>6.4 INNER JOIN</span></a></h2>
<h3 id="definition" tabindex="-1"><a class="header-anchor" href="#definition"><span>Definition</span></a></h3>
<p>Returns only rows with matching values in both tables.</p>
<h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">columns</span></span>
<span class="line"><span class="token keyword">FROM</span> table1</span>
<span class="line"><span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> table2</span>
<span class="line"><span class="token keyword">ON</span> table1<span class="token punctuation">.</span><span class="token keyword">column</span> <span class="token operator">=</span> table2<span class="token punctuation">.</span><span class="token keyword">column</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> D<span class="token punctuation">.</span>DeptName</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> Departments D</span>
<span class="line"><span class="token keyword">ON</span> E<span class="token punctuation">.</span>DeptID <span class="token operator">=</span> D<span class="token punctuation">.</span>DeptID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation:</strong> Only employees with valid DeptID appear (Meena is excluded).</p>
<hr>
<h2 id="_6-5-left-join" tabindex="-1"><a class="header-anchor" href="#_6-5-left-join"><span>6.5 LEFT JOIN</span></a></h2>
<h3 id="definition-1" tabindex="-1"><a class="header-anchor" href="#definition-1"><span>Definition</span></a></h3>
<p>Returns all rows from left table and matching rows from right.</p>
<h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> D<span class="token punctuation">.</span>DeptName</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> Departments D</span>
<span class="line"><span class="token keyword">ON</span> E<span class="token punctuation">.</span>DeptID <span class="token operator">=</span> D<span class="token punctuation">.</span>DeptID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation:</strong> Meena appears, but DeptName = NULL.</p>
<hr>
<h2 id="_6-6-right-join" tabindex="-1"><a class="header-anchor" href="#_6-6-right-join"><span>6.6 RIGHT JOIN</span></a></h2>
<h3 id="definition-2" tabindex="-1"><a class="header-anchor" href="#definition-2"><span>Definition</span></a></h3>
<p>Returns all rows from right table and matching from left.</p>
<h3 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> D<span class="token punctuation">.</span>DeptName<span class="token punctuation">,</span> E<span class="token punctuation">.</span>EmpName</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> Departments D</span>
<span class="line"><span class="token keyword">ON</span> E<span class="token punctuation">.</span>DeptID <span class="token operator">=</span> D<span class="token punctuation">.</span>DeptID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation:</strong> All departments appear, even if no employees.</p>
<hr>
<h2 id="_6-7-full-join" tabindex="-1"><a class="header-anchor" href="#_6-7-full-join"><span>6.7 FULL JOIN</span></a></h2>
<h3 id="definition-3" tabindex="-1"><a class="header-anchor" href="#definition-3"><span>Definition</span></a></h3>
<p>Returns all rows from both tables, matched or not.</p>
<h3 id="example-3" tabindex="-1"><a class="header-anchor" href="#example-3"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> D<span class="token punctuation">.</span>DeptName</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">FULL</span> <span class="token keyword">JOIN</span> Departments D</span>
<span class="line"><span class="token keyword">ON</span> E<span class="token punctuation">.</span>DeptID <span class="token operator">=</span> D<span class="token punctuation">.</span>DeptID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation:</strong> Combines LEFT + RIGHT join behavior.</p>
<hr>
<h2 id="_6-8-cross-join" tabindex="-1"><a class="header-anchor" href="#_6-8-cross-join"><span>6.8 CROSS JOIN</span></a></h2>
<h3 id="definition-4" tabindex="-1"><a class="header-anchor" href="#definition-4"><span>Definition</span></a></h3>
<p>Produces Cartesian product.</p>
<h3 id="example-4" tabindex="-1"><a class="header-anchor" href="#example-4"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> D<span class="token punctuation">.</span>DeptName</span>
<span class="line"><span class="token keyword">FROM</span> Employees E</span>
<span class="line"><span class="token keyword">CROSS</span> <span class="token keyword">JOIN</span> Departments D<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4 employees × 3 departments → 12 rows.</p>
<hr>
<h2 id="_6-9-self-join" tabindex="-1"><a class="header-anchor" href="#_6-9-self-join"><span>6.9 SELF JOIN</span></a></h2>
<h3 id="definition-5" tabindex="-1"><a class="header-anchor" href="#definition-5"><span>Definition</span></a></h3>
<p>Join a table with itself.</p>
<h3 id="setup" tabindex="-1"><a class="header-anchor" href="#setup"><span>Setup</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> EmployeeManager <span class="token punctuation">(</span></span>
<span class="line">    EmpID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    EmpName NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    ManagerID <span class="token keyword">INT</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> EmployeeManager <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Amit'</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Rita'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Raj'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">'Neha'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-5" tabindex="-1"><a class="header-anchor" href="#example-5"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpName <span class="token keyword">AS</span> Employee<span class="token punctuation">,</span> M<span class="token punctuation">.</span>EmpName <span class="token keyword">AS</span> Manager</span>
<span class="line"><span class="token keyword">FROM</span> EmployeeManager E</span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> EmployeeManager M</span>
<span class="line"><span class="token keyword">ON</span> E<span class="token punctuation">.</span>ManagerID <span class="token operator">=</span> M<span class="token punctuation">.</span>EmpID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_6-10-cross-apply-outer-apply" tabindex="-1"><a class="header-anchor" href="#_6-10-cross-apply-outer-apply"><span>6.10 CROSS APPLY &amp; OUTER APPLY</span></a></h2>
<h3 id="setup-1" tabindex="-1"><a class="header-anchor" href="#setup-1"><span>Setup</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> dbo<span class="token punctuation">.</span>fn_GetTopSalaries<span class="token punctuation">(</span><span class="token variable">@Dept</span> <span class="token keyword">INT</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">RETURNS</span> <span class="token keyword">TABLE</span></span>
<span class="line"><span class="token keyword">AS</span></span>
<span class="line"><span class="token keyword">RETURN</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> <span class="token keyword">TOP</span> <span class="token number">2</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> <span class="token variable">@Dept</span></span>
<span class="line">    <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Salary <span class="token keyword">DESC</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cross-apply-excludes-empty-results" tabindex="-1"><a class="header-anchor" href="#cross-apply-excludes-empty-results"><span>CROSS APPLY (excludes empty results)</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> D<span class="token punctuation">.</span>DeptName<span class="token punctuation">,</span> T<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> T<span class="token punctuation">.</span>Salary</span>
<span class="line"><span class="token keyword">FROM</span> Departments D</span>
<span class="line"><span class="token keyword">CROSS</span> <span class="token keyword">APPLY</span> dbo<span class="token punctuation">.</span>fn_GetTopSalaries<span class="token punctuation">(</span>D<span class="token punctuation">.</span>DeptID<span class="token punctuation">)</span> <span class="token keyword">AS</span> T<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="outer-apply-includes-empty-results" tabindex="-1"><a class="header-anchor" href="#outer-apply-includes-empty-results"><span>OUTER APPLY (includes empty results)</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> D<span class="token punctuation">.</span>DeptName<span class="token punctuation">,</span> T<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> T<span class="token punctuation">.</span>Salary</span>
<span class="line"><span class="token keyword">FROM</span> Departments D</span>
<span class="line"><span class="token keyword">OUTER</span> <span class="token keyword">APPLY</span> dbo<span class="token punctuation">.</span>fn_GetTopSalaries<span class="token punctuation">(</span>D<span class="token punctuation">.</span>DeptID<span class="token punctuation">)</span> <span class="token keyword">AS</span> T<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_6-11-set-operators" tabindex="-1"><a class="header-anchor" href="#_6-11-set-operators"><span>6.11 Set Operators</span></a></h2>
<table>
<thead>
<tr>
<th>Operator</th>
<th>Description</th>
<th>Duplicates</th>
</tr>
</thead>
<tbody>
<tr>
<td>UNION</td>
<td>Unique rows from both</td>
<td>Removed</td>
</tr>
<tr>
<td>UNION ALL</td>
<td>All rows</td>
<td>Kept</td>
</tr>
<tr>
<td>INTERSECT</td>
<td>Rows common to both</td>
<td>Removed</td>
</tr>
<tr>
<td>EXCEPT</td>
<td>Rows in first not in second</td>
<td>Removed</td>
</tr>
</tbody>
</table>
<h3 id="example-—-union" tabindex="-1"><a class="header-anchor" href="#example-—-union"><span>Example — UNION</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">UNION</span></span>
<span class="line"><span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Departments<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-intersect" tabindex="-1"><a class="header-anchor" href="#example-—-intersect"><span>Example — INTERSECT</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">INTERSECT</span></span>
<span class="line"><span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Departments<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-except" tabindex="-1"><a class="header-anchor" href="#example-—-except"><span>Example — EXCEPT</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Departments</span>
<span class="line"><span class="token keyword">EXCEPT</span></span>
<span class="line"><span class="token keyword">SELECT</span> DeptID <span class="token keyword">FROM</span> Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_6-12-practical-scenarios" tabindex="-1"><a class="header-anchor" href="#_6-12-practical-scenarios"><span>6.12 Practical Scenarios</span></a></h2>
<table>
<thead>
<tr>
<th>Scenario</th>
<th>Recommended Approach</th>
</tr>
</thead>
<tbody>
<tr>
<td>Employees with department names</td>
<td>INNER JOIN</td>
</tr>
<tr>
<td>All employees even without departments</td>
<td>LEFT JOIN</td>
</tr>
<tr>
<td>Departments with no employees</td>
<td>RIGHT JOIN or EXCEPT</td>
</tr>
<tr>
<td>All combinations</td>
<td>CROSS JOIN</td>
</tr>
<tr>
<td>Employee-manager relationships</td>
<td>SELF JOIN</td>
</tr>
<tr>
<td>Combine without duplicates</td>
<td>UNION</td>
</tr>
<tr>
<td>Find mismatch between datasets</td>
<td>EXCEPT</td>
</tr>
<tr>
<td>Find common rows</td>
<td>INTERSECT</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_6-13-practice-questions" tabindex="-1"><a class="header-anchor" href="#_6-13-practice-questions"><span>6.13 Practice Questions</span></a></h2>
<ol>
<li>Use INNER JOIN to display employees with department names.</li>
<li>Use LEFT JOIN to display all employees.</li>
<li>Use RIGHT JOIN to display all departments.</li>
<li>Use EXCEPT to list departments without employees.</li>
<li>Use SELF JOIN to show employees with managers.</li>
<li>Use CROSS APPLY to get top salary per department.</li>
<li>Use UNION to combine employee names from two tables.</li>
</ol>
<hr>
<h2 id="_6-14-summary" tabindex="-1"><a class="header-anchor" href="#_6-14-summary"><span>6.14 Summary</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Key Point</th>
</tr>
</thead>
<tbody>
<tr>
<td>JOIN</td>
<td>Combines rows using related columns</td>
</tr>
<tr>
<td>INNER JOIN</td>
<td>Only matching rows</td>
</tr>
<tr>
<td>LEFT JOIN</td>
<td>All left rows + matched right</td>
</tr>
<tr>
<td>RIGHT JOIN</td>
<td>All right rows + matched left</td>
</tr>
<tr>
<td>FULL JOIN</td>
<td>All rows from both tables</td>
</tr>
<tr>
<td>CROSS JOIN</td>
<td>Cartesian product</td>
</tr>
<tr>
<td>SELF JOIN</td>
<td>Table joined with itself</td>
</tr>
<tr>
<td>APPLY</td>
<td>Joins with function results</td>
</tr>
<tr>
<td>UNION</td>
<td>Unique rows from two queries</td>
</tr>
<tr>
<td>UNION ALL</td>
<td>All rows (keeps duplicates)</td>
</tr>
<tr>
<td>INTERSECT</td>
<td>Common rows</td>
</tr>
<tr>
<td>EXCEPT</td>
<td>Rows in first not in second</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_6-15-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_6-15-next-chapter-preview"><span>6.15 Next Chapter Preview</span></a></h2>
<p>Next: <strong>Chapter 7 — Subqueries and Derived Tables</strong></p>
<p>You will learn:</p>
<ul>
<li>Scalar, multi-row, and correlated subqueries</li>
<li>Subqueries in SELECT, WHERE, FROM, HAVING</li>
<li>Derived tables</li>
<li>JOIN vs Subquery perform</li>
</ul>
</div></template>


