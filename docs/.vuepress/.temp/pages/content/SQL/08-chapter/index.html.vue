<template><div><h1 id="chapter-8-—-common-table-expressions-ctes-and-recursive-queries" tabindex="-1"><a class="header-anchor" href="#chapter-8-—-common-table-expressions-ctes-and-recursive-queries"><span>CHAPTER 8 — Common Table Expressions (CTEs) and Recursive Queries</span></a></h1>
<h2 id="_1-introduction" tabindex="-1"><a class="header-anchor" href="#_1-introduction"><span>1. INTRODUCTION</span></a></h2>
<p>Common Table Expressions (CTEs) provide a temporary, named result set that exists only during the execution of a single SQL statement. They make complex queries easier to read, modular, and recursive-friendly.</p>
<h3 id="interview-definition" tabindex="-1"><a class="header-anchor" href="#interview-definition"><span>Interview Definition</span></a></h3>
<p>A CTE (Common Table Expression) is a temporary, named result set defined using the WITH keyword that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement.</p>
<h3 id="why-use-ctes" tabindex="-1"><a class="header-anchor" href="#why-use-ctes"><span>Why use CTEs?</span></a></h3>
<ul>
<li>Improves query readability and structure</li>
<li>Can be reused multiple times in the same query</li>
<li>Supports recursion for hierarchical or tree-like data (e.g., employee-manager relationships)</li>
</ul>
<h2 id="_2-basic-cte-structure" tabindex="-1"><a class="header-anchor" href="#_2-basic-cte-structure"><span>2. BASIC CTE STRUCTURE</span></a></h2>
<h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> cte_name <span class="token punctuation">(</span>column1<span class="token punctuation">,</span> column2<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token comment">-- CTE query definition</span></span>
<span class="line">    <span class="token keyword">SELECT</span> column1<span class="token punctuation">,</span> column2<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token keyword">FROM</span> table_name</span>
<span class="line">    <span class="token keyword">WHERE</span> condition</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">-- Main query using the CTE</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> cte_name<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-1-—-simple-cte" tabindex="-1"><a class="header-anchor" href="#example-1-—-simple-cte"><span>Example 1 — Simple CTE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> HighSalaryEmployees <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token number">50000</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> HighSalaryEmployees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation:</strong></p>
<ul>
<li>CTE filters employees earning more than 50,000</li>
<li>The main query simply reads from the CTE as if it were a table</li>
</ul>
<h3 id="equivalent-query-without-cte" tabindex="-1"><a class="header-anchor" href="#equivalent-query-without-cte"><span>Equivalent Query Without CTE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> </span>
<span class="line"><span class="token keyword">FROM</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token number">50000</span></span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">AS</span> HighSalaryEmployees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CTE offers better readability than nested subqueries.</p>
<h2 id="_3-multiple-ctes" tabindex="-1"><a class="header-anchor" href="#_3-multiple-ctes"><span>3. MULTIPLE CTEs</span></a></h2>
<p>You can define more than one CTE by separating them with commas.</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> IT_Employees <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> EmpName<span class="token punctuation">,</span> Salary<span class="token punctuation">,</span> DeptID</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> DeptID <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">HighEarners <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token number">60000</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> I<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> I<span class="token punctuation">.</span>Salary</span>
<span class="line"><span class="token keyword">FROM</span> IT_Employees I</span>
<span class="line"><span class="token keyword">JOIN</span> HighEarners H <span class="token keyword">ON</span> I<span class="token punctuation">.</span>EmpID <span class="token operator">=</span> H<span class="token punctuation">.</span>EmpID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="key-points" tabindex="-1"><a class="header-anchor" href="#key-points"><span>Key Points</span></a></h3>
<ul>
<li>Each CTE can reference previous ones defined in the same WITH block</li>
<li>They are temporary — valid only for that statement</li>
</ul>
<h2 id="_4-using-ctes-with-dml-operations" tabindex="-1"><a class="header-anchor" href="#_4-using-ctes-with-dml-operations"><span>4. USING CTEs WITH DML OPERATIONS</span></a></h2>
<p>CTEs can also be used with UPDATE, DELETE, or INSERT.</p>
<h3 id="example-—-update-using-cte" tabindex="-1"><a class="header-anchor" href="#example-—-update-using-cte"><span>Example — Update Using CTE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> LowSalary <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> Salary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> Salary <span class="token operator">&lt;</span> <span class="token number">40000</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">UPDATE</span> LowSalary</span>
<span class="line"><span class="token keyword">SET</span> Salary <span class="token operator">=</span> Salary <span class="token operator">+</span> <span class="token number">5000</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation:</strong></p>
<ul>
<li>CTE identifies employees earning below 40,000</li>
<li>The outer update modifies only those rows</li>
</ul>
<h3 id="example-—-delete-using-cte" tabindex="-1"><a class="header-anchor" href="#example-—-delete-using-cte"><span>Example — Delete Using CTE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> OldEmployees <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID <span class="token keyword">FROM</span> Employees <span class="token keyword">WHERE</span> Salary <span class="token operator">&lt;</span> <span class="token number">30000</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> OldEmployees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-—-insert-using-cte" tabindex="-1"><a class="header-anchor" href="#example-—-insert-using-cte"><span>Example — Insert Using CTE</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> HighEarners <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary</span>
<span class="line">    <span class="token keyword">FROM</span> Employees</span>
<span class="line">    <span class="token keyword">WHERE</span> Salary <span class="token operator">></span> <span class="token number">60000</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> HighSalaryLog <span class="token punctuation">(</span>EmpName<span class="token punctuation">,</span> Salary<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> EmpName<span class="token punctuation">,</span> Salary <span class="token keyword">FROM</span> HighEarners<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-recursive-cte" tabindex="-1"><a class="header-anchor" href="#_5-recursive-cte"><span>5. RECURSIVE CTE</span></a></h2>
<h3 id="definition" tabindex="-1"><a class="header-anchor" href="#definition"><span>Definition</span></a></h3>
<p>A Recursive CTE is a CTE that references itself, allowing you to process hierarchical or tree-structured data (like organization charts).</p>
<h3 id="recursive-cte-structure" tabindex="-1"><a class="header-anchor" href="#recursive-cte-structure"><span>Recursive CTE Structure</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> cte_name <span class="token punctuation">(</span><span class="token keyword">columns</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token comment">-- Anchor member (base query)</span></span>
<span class="line">    <span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token keyword">FROM</span> <span class="token keyword">table</span></span>
<span class="line">    <span class="token keyword">WHERE</span> condition</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">-- Recursive member (refers to CTE)</span></span>
<span class="line">    <span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token keyword">FROM</span> <span class="token keyword">table</span></span>
<span class="line">    <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> cte_name</span>
<span class="line">    <span class="token keyword">ON</span> <span class="token keyword">table</span><span class="token punctuation">.</span><span class="token keyword">column</span> <span class="token operator">=</span> cte_name<span class="token punctuation">.</span><span class="token keyword">column</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> cte_name<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rules-for-recursive-cte" tabindex="-1"><a class="header-anchor" href="#rules-for-recursive-cte"><span>Rules for Recursive CTE</span></a></h3>
<ul>
<li>Must include an anchor member (the starting point)</li>
<li>Must include a recursive member that references the CTE itself</li>
<li>Must end with a UNION ALL (not UNION, unless you want to remove duplicates)</li>
<li>Must have a termination condition to prevent infinite recursion</li>
<li>Default recursion depth is 100 levels (configurable via MAXRECURSION)</li>
</ul>
<h2 id="_6-recursive-cte-example-—-employee-hierarchy" tabindex="-1"><a class="header-anchor" href="#_6-recursive-cte-example-—-employee-hierarchy"><span>6. RECURSIVE CTE EXAMPLE — EMPLOYEE HIERARCHY</span></a></h2>
<p>Let's create a sample employee table for demonstration.</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> EmployeeHierarchy <span class="token punctuation">(</span></span>
<span class="line">    EmpID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    EmpName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    ManagerID <span class="token keyword">INT</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> EmployeeHierarchy <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Amit'</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">)</span><span class="token punctuation">,</span>     <span class="token comment">-- CEO</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Rita'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Raj'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">'Neha'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">'Kiran'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token string">'Meena'</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="recursive-cte-query" tabindex="-1"><a class="header-anchor" href="#recursive-cte-query"><span>Recursive CTE Query</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> EmployeeCTE <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token comment">-- Anchor: top-level employee (no manager)</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> EmpName<span class="token punctuation">,</span> ManagerID<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">AS</span> <span class="token keyword">Level</span></span>
<span class="line">    <span class="token keyword">FROM</span> EmployeeHierarchy</span>
<span class="line">    <span class="token keyword">WHERE</span> ManagerID <span class="token operator">IS</span> <span class="token boolean">NULL</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">-- Recursive: employees reporting to someone in the CTE</span></span>
<span class="line">    <span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpID<span class="token punctuation">,</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> E<span class="token punctuation">.</span>ManagerID<span class="token punctuation">,</span> EC<span class="token punctuation">.</span><span class="token keyword">Level</span> <span class="token operator">+</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">FROM</span> EmployeeHierarchy E</span>
<span class="line">    <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> EmployeeCTE EC</span>
<span class="line">    <span class="token keyword">ON</span> E<span class="token punctuation">.</span>ManagerID <span class="token operator">=</span> EC<span class="token punctuation">.</span>EmpID</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> EmployeeCTE<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Explanation:</strong></p>
<ul>
<li>The CTE first selects the CEO (where ManagerID IS NULL)</li>
<li>Then recursively finds all employees reporting to that person, and so on</li>
<li>Each recursion level increments the hierarchy depth</li>
</ul>
<h3 id="output-example" tabindex="-1"><a class="header-anchor" href="#output-example"><span>Output Example:</span></a></h3>
<table>
<thead>
<tr>
<th>EmpID</th>
<th>EmpName</th>
<th>ManagerID</th>
<th>Level</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Amit</td>
<td>NULL</td>
<td>0</td>
</tr>
<tr>
<td>2</td>
<td>Rita</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>Raj</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>Neha</td>
<td>2</td>
<td>2</td>
</tr>
<tr>
<td>5</td>
<td>Kiran</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>6</td>
<td>Meena</td>
<td>4</td>
<td>3</td>
</tr>
</tbody>
</table>
<h3 id="limiting-recursion" tabindex="-1"><a class="header-anchor" href="#limiting-recursion"><span>Limiting Recursion</span></a></h3>
<p>To prevent infinite loops:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">OPTION</span> <span class="token punctuation">(</span>MAXRECURSION <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="_7-real-life-use-cases-of-ctes" tabindex="-1"><a class="header-anchor" href="#_7-real-life-use-cases-of-ctes"><span>7. REAL-LIFE USE CASES OF CTEs</span></a></h2>
<table>
<thead>
<tr>
<th>Use Case</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>Organizational hierarchy</td>
<td>Find employees reporting to a manager recursively</td>
</tr>
<tr>
<td>Bill of materials (BOM)</td>
<td>Identify components and sub-components</td>
</tr>
<tr>
<td>Parent-child relationships</td>
<td>Folder structures, category hierarchies</td>
</tr>
<tr>
<td>Ranked reporting</td>
<td>Rank or level computation in reports</td>
</tr>
<tr>
<td>Temporary aggregation</td>
<td>Group and reuse results for complex analysis</td>
</tr>
</tbody>
</table>
<h2 id="_8-advanced-examples" tabindex="-1"><a class="header-anchor" href="#_8-advanced-examples"><span>8. ADVANCED EXAMPLES</span></a></h2>
<h3 id="example-1-—-display-path-from-employee-to-top-manager" tabindex="-1"><a class="header-anchor" href="#example-1-—-display-path-from-employee-to-top-manager"><span>Example 1 — Display path from employee to top manager</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> <span class="token keyword">Chain</span> <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> EmpName<span class="token punctuation">,</span> ManagerID<span class="token punctuation">,</span> CAST<span class="token punctuation">(</span>EmpName <span class="token keyword">AS</span> NVARCHAR<span class="token punctuation">(</span>MAX<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> HierarchyPath</span>
<span class="line">    <span class="token keyword">FROM</span> EmployeeHierarchy</span>
<span class="line">    <span class="token keyword">WHERE</span> ManagerID <span class="token operator">IS</span> <span class="token boolean">NULL</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpID<span class="token punctuation">,</span> E<span class="token punctuation">.</span>EmpName<span class="token punctuation">,</span> E<span class="token punctuation">.</span>ManagerID<span class="token punctuation">,</span></span>
<span class="line">           CAST<span class="token punctuation">(</span>C<span class="token punctuation">.</span>HierarchyPath <span class="token operator">+</span> <span class="token string">' -> '</span> <span class="token operator">+</span> E<span class="token punctuation">.</span>EmpName <span class="token keyword">AS</span> NVARCHAR<span class="token punctuation">(</span>MAX<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">FROM</span> EmployeeHierarchy E</span>
<span class="line">    <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token keyword">Chain</span> C <span class="token keyword">ON</span> E<span class="token punctuation">.</span>ManagerID <span class="token operator">=</span> C<span class="token punctuation">.</span>EmpID</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">Chain</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Output Example:</strong>
Amit -&gt; Rita -&gt; Neha -&gt; Meena</p>
<h3 id="example-2-—-count-number-of-subordinates-for-each-employee" tabindex="-1"><a class="header-anchor" href="#example-2-—-count-number-of-subordinates-for-each-employee"><span>Example 2 — Count number of subordinates for each employee</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">WITH</span> SubTree <span class="token keyword">AS</span></span>
<span class="line"><span class="token punctuation">(</span></span>
<span class="line">    <span class="token keyword">SELECT</span> EmpID<span class="token punctuation">,</span> ManagerID</span>
<span class="line">    <span class="token keyword">FROM</span> EmployeeHierarchy</span>
<span class="line">    <span class="token keyword">WHERE</span> ManagerID <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span></span>
<span class="line">    <span class="token keyword">UNION</span> <span class="token keyword">ALL</span></span>
<span class="line">    <span class="token keyword">SELECT</span> E<span class="token punctuation">.</span>EmpID<span class="token punctuation">,</span> E<span class="token punctuation">.</span>ManagerID</span>
<span class="line">    <span class="token keyword">FROM</span> EmployeeHierarchy E</span>
<span class="line">    <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> SubTree S <span class="token keyword">ON</span> E<span class="token punctuation">.</span>ManagerID <span class="token operator">=</span> S<span class="token punctuation">.</span>EmpID</span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> ManagerID<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> SubordinateCount</span>
<span class="line"><span class="token keyword">FROM</span> SubTree</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> ManagerID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-difference-between-cte-and-derived-table" tabindex="-1"><a class="header-anchor" href="#_9-difference-between-cte-and-derived-table"><span>9. DIFFERENCE BETWEEN CTE AND DERIVED TABLE</span></a></h2>
<table>
<thead>
<tr>
<th>Feature</th>
<th>CTE</th>
<th>Derived Table</th>
</tr>
</thead>
<tbody>
<tr>
<td>Definition</td>
<td>Temporary named result set defined using WITH</td>
<td>Subquery inside FROM</td>
</tr>
<tr>
<td>Reusability</td>
<td>Can be referenced multiple times</td>
<td>Used once</td>
</tr>
<tr>
<td>Readability</td>
<td>High (structured)</td>
<td>Harder for complex queries</td>
</tr>
<tr>
<td>Recursion</td>
<td>Supported</td>
<td>Not supported</td>
</tr>
<tr>
<td>Scope</td>
<td>Single statement</td>
<td>Single statement</td>
</tr>
</tbody>
</table>
<h2 id="_10-practice-questions" tabindex="-1"><a class="header-anchor" href="#_10-practice-questions"><span>10. PRACTICE QUESTIONS</span></a></h2>
<ol>
<li>Write a CTE to find employees earning above average salary</li>
<li>Create a recursive CTE to list all subordinates under a given manager</li>
<li>Use multiple CTEs to show:
<ul>
<li>Average salary per department, and</li>
<li>Employees earning above their department's average</li>
</ul>
</li>
<li>Write a CTE with MAXRECURSION to limit hierarchy depth to 3 levels</li>
<li>Create a CTE-based update to increase salary by 10% for employees under a manager named &quot;Rita&quot;</li>
</ol>
<h2 id="_11-summary" tabindex="-1"><a class="header-anchor" href="#_11-summary"><span>11. SUMMARY</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>CTE</td>
<td>A temporary named result set defined using WITH</td>
</tr>
<tr>
<td>Recursive CTE</td>
<td>A CTE that references itself for hierarchical queries</td>
</tr>
<tr>
<td>Anchor Member</td>
<td>Base query that starts recursion</td>
</tr>
<tr>
<td>Recursive Member</td>
<td>Query that refers back to the CTE</td>
</tr>
<tr>
<td>MAXRECURSION</td>
<td>Limits recursion depth to prevent infinite loops</td>
</tr>
<tr>
<td>CTE vs Derived Table</td>
<td>CTE supports recursion and reusability</td>
</tr>
<tr>
<td>Use Cases</td>
<td>Hierarchies, ranking, organization structures, reusable subqueries</td>
</tr>
</tbody>
</table>
<h2 id="_12-interview-definitions-quick-reference" tabindex="-1"><a class="header-anchor" href="#_12-interview-definitions-quick-reference"><span>12. INTERVIEW DEFINITIONS (QUICK REFERENCE)</span></a></h2>
<table>
<thead>
<tr>
<th>Term</th>
<th>Interview Definition</th>
</tr>
</thead>
<tbody>
<tr>
<td>Common Table Expression (CTE)</td>
<td>A temporary result set defined with the WITH clause used to simplify complex queries</td>
</tr>
<tr>
<td>Recursive CTE</td>
<td>A CTE that refers to itself to handle hierarchical or tree-structured data</td>
</tr>
<tr>
<td>Anchor Member</td>
<td>The initial query in a recursive CTE</td>
</tr>
<tr>
<td>Recursive Member</td>
<td>The query that refers back to the CTE for recursion</td>
</tr>
<tr>
<td>MAXRECURSION</td>
<td>Clause used to restrict the number of recursion levels (default 100)</td>
</tr>
<tr>
<td>Difference between CTE and Subquery</td>
<td>CTEs are more readable, reusable, and support recursion</td>
</tr>
<tr>
<td>Difference between CTE and Derived Table</td>
<td>Derived tables are used once; CTEs can be referenced multiple times</td>
</tr>
</tbody>
</table>
<h2 id="_13-next-chapter-preview" tabindex="-1"><a class="header-anchor" href="#_13-next-chapter-preview"><span>13. NEXT CHAPTER PREVIEW</span></a></h2>
<p><strong>Next: Chapter 9 — Window (Analytic) Functions</strong></p>
<p>You'll learn:</p>
<ul>
<li>Ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE)</li>
<li>Aggregate window functions (SUM() OVER, AVG() OVER)</li>
<li>PARTITION BY, ORDER BY within window clauses</li>
<li>Interview-style questions and practical reporting examples</li>
</ul>
</div></template>


