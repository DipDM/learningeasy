<template><div><h1 id="chapter-5-—-filtering-sorting-and-aggregation" tabindex="-1"><a class="header-anchor" href="#chapter-5-—-filtering-sorting-and-aggregation"><span>Chapter 5 — Filtering, Sorting, and Aggregation</span></a></h1>
<h3 id="where-order-by-distinct-group-by-having-rollup-cube-grouping-sets" tabindex="-1"><a class="header-anchor" href="#where-order-by-distinct-group-by-having-rollup-cube-grouping-sets"><span>WHERE, ORDER BY, DISTINCT, GROUP BY, HAVING, ROLLUP, CUBE, GROUPING SETS</span></a></h3>
<hr>
<h2 id="_5-1-introduction" tabindex="-1"><a class="header-anchor" href="#_5-1-introduction"><span>5.1 Introduction</span></a></h2>
<p>In this chapter, we focus on querying and analyzing data effectively.</p>
<p>You will learn:</p>
<ul>
<li>Filtering with <strong>WHERE</strong> and <strong>DISTINCT</strong></li>
<li>Sorting with <strong>ORDER BY</strong></li>
<li>Aggregation with <strong>GROUP BY</strong> and <strong>HAVING</strong></li>
<li>Advanced grouping: <strong>ROLLUP</strong>, <strong>CUBE</strong>, <strong>GROUPING SETS</strong></li>
</ul>
<hr>
<h2 id="_5-2-filtering-data-—-where-clause" tabindex="-1"><a class="header-anchor" href="#_5-2-filtering-data-—-where-clause"><span>5.2 Filtering Data — WHERE Clause</span></a></h2>
<h3 id="purpose" tabindex="-1"><a class="header-anchor" href="#purpose"><span>Purpose</span></a></h3>
<p>Filters rows before grouping/aggregation.</p>
<h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> column1<span class="token punctuation">,</span> column2</span>
<span class="line"><span class="token keyword">FROM</span> table_name</span>
<span class="line"><span class="token keyword">WHERE</span> condition<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="supported-operators" tabindex="-1"><a class="header-anchor" href="#supported-operators"><span>Supported Operators</span></a></h3>
<table>
<thead>
<tr>
<th>Category</th>
<th>Operators</th>
</tr>
</thead>
<tbody>
<tr>
<td>Comparison</td>
<td>=, &lt;&gt;, &gt;, &lt;, &gt;=, &lt;=</td>
</tr>
<tr>
<td>Range</td>
<td>BETWEEN ... AND ...</td>
</tr>
<tr>
<td>Set Membership</td>
<td>IN, NOT IN</td>
</tr>
<tr>
<td>Pattern Matching</td>
<td>LIKE, NOT LIKE</td>
</tr>
<tr>
<td>Null Check</td>
<td>IS NULL, IS NOT NULL</td>
</tr>
<tr>
<td>Logical</td>
<td>AND, OR, NOT</td>
</tr>
</tbody>
</table>
<h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples"><span>Examples</span></a></h3>
<p><strong>Example 1 — Simple filter</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">></span> <span class="token number">70</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2 — Multiple conditions</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Marks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">></span> <span class="token number">70</span> <span class="token operator">AND</span> DeptID <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 3 — Using IN</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> DeptID <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 4 — Using BETWEEN</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> Marks <span class="token operator">BETWEEN</span> <span class="token number">60</span> <span class="token operator">AND</span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 5 — Using LIKE</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">WHERE</span> FirstName <span class="token operator">LIKE</span> <span class="token string">'A%'</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="key-notes" tabindex="-1"><a class="header-anchor" href="#key-notes"><span>Key Notes</span></a></h3>
<ul>
<li>String comparisons are case-insensitive by default.</li>
<li><code v-pre>BETWEEN</code> is inclusive.</li>
<li>Use <strong>IS NULL</strong> for NULL checks.</li>
</ul>
<hr>
<h2 id="_5-3-sorting-data-—-order-by" tabindex="-1"><a class="header-anchor" href="#_5-3-sorting-data-—-order-by"><span>5.3 Sorting Data — ORDER BY</span></a></h2>
<h3 id="purpose-1" tabindex="-1"><a class="header-anchor" href="#purpose-1"><span>Purpose</span></a></h3>
<p>Sorts result sets.</p>
<h3 id="syntax-1" tabindex="-1"><a class="header-anchor" href="#syntax-1"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> column1<span class="token punctuation">,</span> column2</span>
<span class="line"><span class="token keyword">FROM</span> table_name</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> column1 <span class="token punctuation">[</span><span class="token keyword">ASC</span><span class="token operator">|</span><span class="token keyword">DESC</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="examples-1" tabindex="-1"><a class="header-anchor" href="#examples-1"><span>Examples</span></a></h3>
<p><strong>Example 1 — Ascending order</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> Marks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Marks<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2 — Descending order</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> Marks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Marks <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 3 — Multiple columns</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> Marks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Marks <span class="token keyword">DESC</span><span class="token punctuation">,</span> LastName <span class="token keyword">ASC</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="notes" tabindex="-1"><a class="header-anchor" href="#notes"><span>Notes</span></a></h3>
<ul>
<li>You can use column aliases in ORDER BY.</li>
<li>SQL Server does not guarantee row order without ORDER BY.</li>
</ul>
<hr>
<h2 id="_5-4-distinct-—-removing-duplicates" tabindex="-1"><a class="header-anchor" href="#_5-4-distinct-—-removing-duplicates"><span>5.4 DISTINCT — Removing Duplicates</span></a></h2>
<h3 id="purpose-2" tabindex="-1"><a class="header-anchor" href="#purpose-2"><span>Purpose</span></a></h3>
<p>Removes duplicate rows.</p>
<h3 id="syntax-2" tabindex="-1"><a class="header-anchor" href="#syntax-2"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> column1</span>
<span class="line"><span class="token keyword">FROM</span> table_name<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> DeptID</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="note" tabindex="-1"><a class="header-anchor" href="#note"><span>Note</span></a></h3>
<p><code v-pre>DISTINCT</code> applies to the entire row.</p>
<hr>
<h2 id="_5-5-aggregation-functions" tabindex="-1"><a class="header-anchor" href="#_5-5-aggregation-functions"><span>5.5 Aggregation Functions</span></a></h2>
<p>SQL Server provides these aggregate functions:</p>
<table>
<thead>
<tr>
<th>Function</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>COUNT()</td>
<td>Count rows</td>
</tr>
<tr>
<td>SUM()</td>
<td>Total sum</td>
</tr>
<tr>
<td>AVG()</td>
<td>Average value</td>
</tr>
<tr>
<td>MIN()</td>
<td>Minimum value</td>
</tr>
<tr>
<td>MAX()</td>
<td>Maximum value</td>
</tr>
</tbody>
</table>
<h3 id="examples-2" tabindex="-1"><a class="header-anchor" href="#examples-2"><span>Examples</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> TotalStudents <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Marks<span class="token punctuation">)</span> <span class="token keyword">AS</span> AverageMarks <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token function">SUM</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span> <span class="token keyword">AS</span> TotalSalary <span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_5-6-grouping-—-group-by" tabindex="-1"><a class="header-anchor" href="#_5-6-grouping-—-group-by"><span>5.6 Grouping — GROUP BY</span></a></h2>
<h3 id="purpose-3" tabindex="-1"><a class="header-anchor" href="#purpose-3"><span>Purpose</span></a></h3>
<p>Groups rows for summarization.</p>
<h3 id="syntax-3" tabindex="-1"><a class="header-anchor" href="#syntax-3"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> column1<span class="token punctuation">,</span> AGG<span class="token punctuation">(</span>column2<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> table_name</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> column1<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="examples-3" tabindex="-1"><a class="header-anchor" href="#examples-3"><span>Examples</span></a></h3>
<p><strong>Example 1 — Count students per department</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> StudentCount</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2 — Avg marks per department</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Marks<span class="token punctuation">)</span> <span class="token keyword">AS</span> AvgMarks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 3 — Multiple grouping</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> StudentCount</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="key-rules" tabindex="-1"><a class="header-anchor" href="#key-rules"><span>Key Rules</span></a></h3>
<ul>
<li>Every non-aggregated column must be in GROUP BY.</li>
<li>WHERE filters before grouping.</li>
</ul>
<hr>
<h2 id="_5-7-filtering-groups-—-having-clause" tabindex="-1"><a class="header-anchor" href="#_5-7-filtering-groups-—-having-clause"><span>5.7 Filtering Groups — HAVING Clause</span></a></h2>
<h3 id="purpose-4" tabindex="-1"><a class="header-anchor" href="#purpose-4"><span>Purpose</span></a></h3>
<p>Filters groups after aggregation.</p>
<h3 id="syntax-4" tabindex="-1"><a class="header-anchor" href="#syntax-4"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> column1<span class="token punctuation">,</span> AGG<span class="token punctuation">(</span>column2<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> table_name</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> column1</span>
<span class="line"><span class="token keyword">HAVING</span> condition<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="examples-4" tabindex="-1"><a class="header-anchor" href="#examples-4"><span>Examples</span></a></h3>
<p><strong>Example 1 — Departments with more than 3 students</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> TotalStudents</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID</span>
<span class="line"><span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2 — Departments with avg marks &gt; 70</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Marks<span class="token punctuation">)</span> <span class="token keyword">AS</span> AvgMarks</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID</span>
<span class="line"><span class="token keyword">HAVING</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Marks<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">70</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="where-vs-having" tabindex="-1"><a class="header-anchor" href="#where-vs-having"><span>WHERE vs HAVING</span></a></h3>
<table>
<thead>
<tr>
<th>Clause</th>
<th>Filters</th>
<th>Aggregate Use?</th>
</tr>
</thead>
<tbody>
<tr>
<td>WHERE</td>
<td>Rows</td>
<td>No</td>
</tr>
<tr>
<td>HAVING</td>
<td>Groups</td>
<td>Yes</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_5-8-advanced-grouping-—-rollup-cube-grouping-sets" tabindex="-1"><a class="header-anchor" href="#_5-8-advanced-grouping-—-rollup-cube-grouping-sets"><span>5.8 Advanced Grouping — ROLLUP, CUBE, GROUPING SETS</span></a></h2>
<h3 id="a-rollup" tabindex="-1"><a class="header-anchor" href="#a-rollup"><span>A. ROLLUP</span></a></h3>
<p>Generates subtotals and grand totals.</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> StudentCount</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> ROLLUP<span class="token punctuation">(</span>DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="b-cube" tabindex="-1"><a class="header-anchor" href="#b-cube"><span>B. CUBE</span></a></h3>
<p>Generates all possible grouping combinations.</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> CUBE<span class="token punctuation">(</span>DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="c-grouping-sets" tabindex="-1"><a class="header-anchor" href="#c-grouping-sets"><span>C. GROUPING SETS</span></a></h3>
<p>Custom grouping combinations.</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> GROUPING SETS <span class="token punctuation">(</span></span>
<span class="line">    <span class="token punctuation">(</span>DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="d-identify-summary-rows" tabindex="-1"><a class="header-anchor" href="#d-identify-summary-rows"><span>D. Identify Summary Rows</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> Count<span class="token punctuation">,</span></span>
<span class="line">       GROUPING<span class="token punctuation">(</span>DeptID<span class="token punctuation">)</span> <span class="token keyword">AS</span> IsDeptTotal<span class="token punctuation">,</span></span>
<span class="line">       GROUPING<span class="token punctuation">(</span>Gender<span class="token punctuation">)</span> <span class="token keyword">AS</span> IsGenderTotal</span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> ROLLUP<span class="token punctuation">(</span>DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_5-9-practical-examples" tabindex="-1"><a class="header-anchor" href="#_5-9-practical-examples"><span>5.9 Practical Examples</span></a></h2>
<h3 id="example-1-—-salary-summary-per-department" tabindex="-1"><a class="header-anchor" href="#example-1-—-salary-summary-per-department"><span>Example 1 — Salary summary per department</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">SUM</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Salary<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Employees</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-2-—-rollup-totals" tabindex="-1"><a class="header-anchor" href="#example-2-—-rollup-totals"><span>Example 2 — ROLLUP totals</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> ROLLUP<span class="token punctuation">(</span>DeptID<span class="token punctuation">,</span> Gender<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-3-—-departments-with-avg-marks-80" tabindex="-1"><a class="header-anchor" href="#example-3-—-departments-with-avg-marks-80"><span>Example 3 — Departments with avg marks &gt; 80</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> DeptID<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Marks<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> dbo<span class="token punctuation">.</span>Students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DeptID</span>
<span class="line"><span class="token keyword">HAVING</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Marks<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_5-10-practice-questions" tabindex="-1"><a class="header-anchor" href="#_5-10-practice-questions"><span>5.10 Practice Questions</span></a></h2>
<ol>
<li>Display all unique department IDs.</li>
<li>List students scoring between 70 and 90.</li>
<li>Find total students per department.</li>
<li>Find departments with more than 5 students.</li>
<li>Get total + subtotals using ROLLUP for DeptID &amp; Gender.</li>
<li>Use GROUPING() to label summary rows.</li>
</ol>
<hr>
<h2 id="_5-11-summary" tabindex="-1"><a class="header-anchor" href="#_5-11-summary"><span>5.11 Summary</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td>WHERE</td>
<td>Filters rows before grouping</td>
</tr>
<tr>
<td>ORDER BY</td>
<td>Sorts result set</td>
</tr>
<tr>
<td>DISTINCT</td>
<td>Removes duplicates</td>
</tr>
<tr>
<td>Aggregates</td>
<td>SUM, AVG, COUNT, etc.</td>
</tr>
<tr>
<td>GROUP BY</td>
<td>Group rows for summary</td>
</tr>
<tr>
<td>HAVING</td>
<td>Filters groups</td>
</tr>
<tr>
<td>ROLLUP / CUBE / GROUPING SETS</td>
<td>Multi-level summary aggregates</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_5-12-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_5-12-next-chapter-preview"><span>5.12 Next Chapter Preview</span></a></h2>
<p>Next: <strong>Chapter 6 — Joins and Set Operators</strong></p>
<p>You’ll learn:</p>
<ul>
<li>INNER, LEFT, RIGHT, FULL, CROSS, SELF joins</li>
<li>APPLY (CROSS/OUTER)</li>
<li>Set operators: UNION, INTERSECT, EXCEPT</li>
</ul>
</div></template>


