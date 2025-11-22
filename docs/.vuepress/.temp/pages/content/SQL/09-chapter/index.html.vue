<template><div><h1 id="chapter-9-—-window-analytic-functions" tabindex="-1"><a class="header-anchor" href="#chapter-9-—-window-analytic-functions"><span>CHAPTER 9 — Window (Analytic) Functions</span></a></h1>
<p><strong>ROW_NUMBER, RANK, DENSE_RANK, NTILE, LEAD/LAG, SUM OVER, AVG OVER, PARTITION BY, ORDER BY</strong></p>
<h2 id="_1-introduction" tabindex="-1"><a class="header-anchor" href="#_1-introduction"><span>1. INTRODUCTION</span></a></h2>
<p>Window functions allow you to perform calculations across a set of rows related to the current row, without collapsing rows like a normal GROUP BY.</p>
<p>They are used for:</p>
<ul>
<li>Ranking</li>
<li>Running totals</li>
<li>Moving averages</li>
<li>Finding previous/next row values</li>
<li>Top-N queries per group</li>
<li>Deduplication</li>
</ul>
<h3 id="interview-definition" tabindex="-1"><a class="header-anchor" href="#interview-definition"><span>Interview Definition</span></a></h3>
<p>A window function performs a calculation across a set of rows that are related to the current row, defined using an OVER() clause with optional PARTITION BY and ORDER BY.</p>
<h2 id="_2-the-over-clause" tabindex="-1"><a class="header-anchor" href="#_2-the-over-clause"><span>2. THE OVER() CLAUSE</span></a></h2>
<p>All window functions require:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">OVER</span> <span class="token punctuation">(</span> <span class="token punctuation">[</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> <span class="token keyword">column</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token keyword">column</span><span class="token punctuation">]</span> <span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>PARTITION BY</strong></p>
<ul>
<li>Divides result set into groups (like subgrouping)</li>
</ul>
<p><strong>ORDER BY</strong></p>
<ul>
<li>Defines order of rows within each partition</li>
</ul>
<h2 id="_3-window-function-categories" tabindex="-1"><a class="header-anchor" href="#_3-window-function-categories"><span>3. WINDOW FUNCTION CATEGORIES</span></a></h2>
<table>
<thead>
<tr>
<th>Category</th>
<th>Functions</th>
</tr>
</thead>
<tbody>
<tr>
<td>Ranking functions</td>
<td>ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE()</td>
</tr>
<tr>
<td>Analytic/Value functions</td>
<td>LEAD(), LAG(), FIRST_VALUE(), LAST_VALUE()</td>
</tr>
<tr>
<td>Aggregate window functions</td>
<td>SUM() OVER, AVG() OVER, MIN() OVER, MAX() OVER</td>
</tr>
</tbody>
</table>
<h3 id="sample-dataset" tabindex="-1"><a class="header-anchor" href="#sample-dataset"><span>Sample Dataset</span></a></h3>
<p>Let's create a dataset:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Sales <span class="token punctuation">(</span></span>
<span class="line">    SaleID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    EmpName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    Dept NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    SaleAmount <span class="token keyword">INT</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Sales <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Amit'</span><span class="token punctuation">,</span> <span class="token string">'IT'</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Amit'</span><span class="token punctuation">,</span> <span class="token string">'IT'</span><span class="token punctuation">,</span> <span class="token number">700</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Rita'</span><span class="token punctuation">,</span> <span class="token string">'IT'</span><span class="token punctuation">,</span> <span class="token number">600</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">'Raj'</span><span class="token punctuation">,</span> <span class="token string">'HR'</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">'Raj'</span><span class="token punctuation">,</span> <span class="token string">'HR'</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token string">'Neha'</span><span class="token punctuation">,</span> <span class="token string">'HR'</span><span class="token punctuation">,</span> <span class="token number">700</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token string">'Neha'</span><span class="token punctuation">,</span> <span class="token string">'HR'</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-ranking-functions" tabindex="-1"><a class="header-anchor" href="#_4-ranking-functions"><span>4. RANKING FUNCTIONS</span></a></h2>
<h3 id="_4-1-row-number" tabindex="-1"><a class="header-anchor" href="#_4-1-row-number"><span>4.1 ROW_NUMBER()</span></a></h3>
<p><strong>Definition:</strong> Assigns a unique sequential number starting from 1 within each partition.</p>
<p><strong>Example:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       ROW_NUMBER<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> RowNum</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Use Case:</strong></p>
<ul>
<li>Fetch top-N per department</li>
<li>Remove duplicates</li>
</ul>
<h3 id="_4-2-rank" tabindex="-1"><a class="header-anchor" href="#_4-2-rank"><span>4.2 RANK()</span></a></h3>
<p><strong>Definition:</strong> Assigns a rank, but ties receive same rank, and ranks skip after ties.</p>
<p><strong>Example:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> RankNo</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>When to use:</strong></p>
<ul>
<li>Competitions or leaderboards where ties matter</li>
</ul>
<h3 id="_4-3-dense-rank" tabindex="-1"><a class="header-anchor" href="#_4-3-dense-rank"><span>4.3 DENSE_RANK()</span></a></h3>
<p><strong>Definition:</strong> Like RANK(), but no gaps in ranking.</p>
<p><strong>Example:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       DENSE_RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> DenseRankNo</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>When to use:</strong></p>
<ul>
<li>Rankings where you don't skip numbers after ties</li>
</ul>
<h3 id="_4-4-ntile-n" tabindex="-1"><a class="header-anchor" href="#_4-4-ntile-n"><span>4.4 NTILE(n)</span></a></h3>
<p><strong>Definition:</strong> Distributes rows into n equal buckets.</p>
<p><strong>Example:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       NTILE<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> Quartile</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Use Case:</strong></p>
<ul>
<li>Divide customers into quartiles</li>
<li>Marketing segmentation</li>
</ul>
<h2 id="_5-analytic-value-window-functions" tabindex="-1"><a class="header-anchor" href="#_5-analytic-value-window-functions"><span>5. ANALYTIC / VALUE WINDOW FUNCTIONS</span></a></h2>
<h3 id="_5-1-lag" tabindex="-1"><a class="header-anchor" href="#_5-1-lag"><span>5.1 LAG()</span></a></h3>
<p><strong>Definition:</strong> Access previous row value without a self-join.</p>
<p><strong>Example:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       LAG<span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount<span class="token punctuation">)</span> <span class="token keyword">AS</span> PreviousSale</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Use Case:</strong></p>
<ul>
<li>Compare current vs previous value</li>
<li>Trend analysis</li>
</ul>
<h3 id="_5-2-lead" tabindex="-1"><a class="header-anchor" href="#_5-2-lead"><span>5.2 LEAD()</span></a></h3>
<p><strong>Definition:</strong> Access next row value.</p>
<p><strong>Example:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       LEAD<span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount<span class="token punctuation">)</span> <span class="token keyword">AS</span> NextSale</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-first-value-last-value" tabindex="-1"><a class="header-anchor" href="#_5-3-first-value-last-value"><span>5.3 FIRST_VALUE() / LAST_VALUE()</span></a></h3>
<p><strong>Example:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       FIRST_VALUE<span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount<span class="token punctuation">)</span> <span class="token keyword">AS</span> LowestSale<span class="token punctuation">,</span></span>
<span class="line">       LAST_VALUE<span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount</span>
<span class="line">           <span class="token keyword">ROWS</span> <span class="token operator">BETWEEN</span> <span class="token keyword">UNBOUNDED</span> <span class="token keyword">PRECEDING</span> <span class="token operator">AND</span> <span class="token keyword">UNBOUNDED</span> <span class="token keyword">FOLLOWING</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> HighestSale</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-aggregate-window-functions-sum-over-avg-over" tabindex="-1"><a class="header-anchor" href="#_6-aggregate-window-functions-sum-over-avg-over"><span>6. AGGREGATE WINDOW FUNCTIONS (SUM OVER, AVG OVER)</span></a></h2>
<p><strong>Definition:</strong> Performs aggregate calculations without collapsing rows (unlike GROUP BY).</p>
<h3 id="example-—-running-total" tabindex="-1"><a class="header-anchor" href="#example-—-running-total"><span>Example — Running Total</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       <span class="token function">SUM</span><span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount<span class="token punctuation">)</span> <span class="token keyword">AS</span> RunningTotal</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-percentage-contribution" tabindex="-1"><a class="header-anchor" href="#example-—-percentage-contribution"><span>Example — Percentage Contribution</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       SaleAmount <span class="token operator">*</span> <span class="token number">100.0</span> <span class="token operator">/</span> <span class="token function">SUM</span><span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> PercentContribution</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-average-sale-per-department" tabindex="-1"><a class="header-anchor" href="#example-—-average-sale-per-department"><span>Example — Average Sale Per Department</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       <span class="token function">AVG</span><span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept<span class="token punctuation">)</span> <span class="token keyword">AS</span> AvgDeptSales</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-min-max-without-group-by" tabindex="-1"><a class="header-anchor" href="#example-—-min-max-without-group-by"><span>Example — Min &amp; Max without GROUP BY</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">       <span class="token function">MIN</span><span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept<span class="token punctuation">)</span> <span class="token keyword">AS</span> MinSale<span class="token punctuation">,</span></span>
<span class="line">       <span class="token function">MAX</span><span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept<span class="token punctuation">)</span> <span class="token keyword">AS</span> MaxSale</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-window-frame-clause" tabindex="-1"><a class="header-anchor" href="#_7-window-frame-clause"><span>7. WINDOW FRAME CLAUSE</span></a></h2>
<p>Used for advanced analytics:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">ROWS</span> <span class="token operator">BETWEEN</span> <span class="token keyword">UNBOUNDED</span> <span class="token keyword">PRECEDING</span> <span class="token operator">AND</span> <span class="token keyword">CURRENT</span> <span class="token keyword">ROW</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="example-—-proper-running-total" tabindex="-1"><a class="header-anchor" href="#example-—-proper-running-total"><span>Example — Proper Running Total</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> SaleAmount<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">SUM</span><span class="token punctuation">(</span>SaleAmount<span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount </span>
<span class="line">        <span class="token keyword">ROWS</span> <span class="token operator">BETWEEN</span> <span class="token keyword">UNBOUNDED</span> <span class="token keyword">PRECEDING</span> <span class="token operator">AND</span> <span class="token keyword">CURRENT</span> <span class="token keyword">ROW</span></span>
<span class="line">    <span class="token punctuation">)</span> <span class="token keyword">AS</span> TrueRunningTotal</span>
<span class="line"><span class="token keyword">FROM</span> Sales<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-top-interview-questions-with-ready-answers" tabindex="-1"><a class="header-anchor" href="#_8-top-interview-questions-with-ready-answers"><span>8. TOP INTERVIEW QUESTIONS (With Ready Answers)</span></a></h2>
<h3 id="q1-difference-between-rank-and-dense-rank" tabindex="-1"><a class="header-anchor" href="#q1-difference-between-rank-and-dense-rank"><span>Q1: Difference between RANK() and DENSE_RANK()?</span></a></h3>
<ul>
<li>RANK() skips numbers after ties</li>
<li>DENSE_RANK() does not skip numbers</li>
</ul>
<h3 id="q2-difference-between-row-number-and-rank" tabindex="-1"><a class="header-anchor" href="#q2-difference-between-row-number-and-rank"><span>Q2: Difference between ROW_NUMBER() and RANK()?</span></a></h3>
<ul>
<li>ROW_NUMBER() always unique</li>
<li>RANK() allows ties</li>
</ul>
<h3 id="q3-what-does-partition-by-do" tabindex="-1"><a class="header-anchor" href="#q3-what-does-partition-by-do"><span>Q3: What does PARTITION BY do?</span></a></h3>
<ul>
<li>It divides result set into groups</li>
<li>Window function then operates separately inside each group</li>
</ul>
<h3 id="q4-can-window-functions-be-used-in-where" tabindex="-1"><a class="header-anchor" href="#q4-can-window-functions-be-used-in-where"><span>Q4: Can window functions be used in WHERE?</span></a></h3>
<p><strong>No.</strong> They can only be used in:</p>
<ul>
<li>SELECT</li>
<li>ORDER BY</li>
<li>HAVING (indirectly via subquery)</li>
</ul>
<p><strong>To filter:</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> CTE <span class="token keyword">AS</span> <span class="token punctuation">(</span></span>
<span class="line">   <span class="token keyword">SELECT</span> <span class="token operator">*</span><span class="token punctuation">,</span> ROW_NUMBER<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> rn</span>
<span class="line">   <span class="token keyword">FROM</span> Sales</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> CTE <span class="token keyword">WHERE</span> rn <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="q5-how-to-get-the-top-1-employee-per-department" tabindex="-1"><a class="header-anchor" href="#q5-how-to-get-the-top-1-employee-per-department"><span>Q5: How to get the top 1 employee per department?</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> Ranked <span class="token keyword">AS</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> <span class="token operator">*</span><span class="token punctuation">,</span> </span>
<span class="line">           ROW_NUMBER<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span><span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> Dept <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> SaleAmount <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> rn</span>
<span class="line">    <span class="token keyword">FROM</span> Sales</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Dept<span class="token punctuation">,</span> SaleAmount</span>
<span class="line"><span class="token keyword">FROM</span> Ranked</span>
<span class="line"><span class="token keyword">WHERE</span> rn <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-practical-use-cases" tabindex="-1"><a class="header-anchor" href="#_9-practical-use-cases"><span>9. PRACTICAL USE CASES</span></a></h2>
<table>
<thead>
<tr>
<th>Use Case</th>
<th>Window Function</th>
</tr>
</thead>
<tbody>
<tr>
<td>Deduplicate rows</td>
<td>ROW_NUMBER()</td>
</tr>
<tr>
<td>Get top-N per group</td>
<td>ROW_NUMBER(), RANK()</td>
</tr>
<tr>
<td>Compare with previous/next row</td>
<td>LAG(), LEAD()</td>
</tr>
<tr>
<td>Running totals</td>
<td>SUM() OVER</td>
</tr>
<tr>
<td>Percentile or quartile grouping</td>
<td>NTILE()</td>
</tr>
<tr>
<td>Partitioned analytics</td>
<td>SUM/AVG OVER PARTITION BY</td>
</tr>
</tbody>
</table>
<h2 id="_10-practice-questions" tabindex="-1"><a class="header-anchor" href="#_10-practice-questions"><span>10. PRACTICE QUESTIONS</span></a></h2>
<ol>
<li>Using ROW_NUMBER, get the highest sale per department</li>
<li>Using RANK, rank employees based on sale amount per department</li>
<li>Use NTILE(4) to segment employees into quartiles</li>
<li>Use LAG to compare each sale with previous sale in same department</li>
<li>Use SUM OVER to calculate running total of sales</li>
<li>Use AVG OVER to find department-wise average salary</li>
</ol>
<h2 id="_11-summary" tabindex="-1"><a class="header-anchor" href="#_11-summary"><span>11. SUMMARY</span></a></h2>
<table>
<thead>
<tr>
<th>Function</th>
<th>Behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td>ROW_NUMBER()</td>
<td>Unique numbering</td>
</tr>
<tr>
<td>RANK()</td>
<td>Ties share rank; rank skips numbers</td>
</tr>
<tr>
<td>DENSE_RANK()</td>
<td>Ties share rank; no skip in numbers</td>
</tr>
<tr>
<td>NTILE()</td>
<td>Splits rows into N buckets</td>
</tr>
<tr>
<td>LAG()</td>
<td>Previous row value</td>
</tr>
<tr>
<td>LEAD()</td>
<td>Next row value</td>
</tr>
<tr>
<td>FIRST_VALUE()</td>
<td>First row value in window</td>
</tr>
<tr>
<td>LAST_VALUE()</td>
<td>Last row value in window</td>
</tr>
<tr>
<td>OVER()</td>
<td>Defines partition and order</td>
</tr>
<tr>
<td>PARTITION BY</td>
<td>Groups data without collapsing rows</td>
</tr>
<tr>
<td>ORDER BY</td>
<td>Defines row sequence for function</td>
</tr>
</tbody>
</table>
<h2 id="_12-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_12-next-chapter-preview"><span>12. NEXT CHAPTER PREVIEW</span></a></h2>
<p><strong>Next: Chapter 10 — Indexes and Query Optimization</strong></p>
<p>You'll learn:</p>
<ul>
<li>Clustered vs non-clustered indexes</li>
<li>Covering indexes</li>
<li>Included columns</li>
<li>Seek vs Scan</li>
<li>Execution plan analysis</li>
<li>Index fragmentation, fill factor</li>
<li>Performance tuning strategies</li>
</ul>
</div></template>


