<template><div><h1 id="chapter-2-—-sql-server-data-types-and-nulls" tabindex="-1"><a class="header-anchor" href="#chapter-2-—-sql-server-data-types-and-nulls"><span>Chapter 2 — SQL Server Data Types and NULLs</span></a></h1>
<h2 id="_2-1-introduction" tabindex="-1"><a class="header-anchor" href="#_2-1-introduction"><span>2.1 Introduction</span></a></h2>
<p>Every column in SQL Server has a data type that defines:</p>
<ul>
<li>What kind of data can be stored (text, numbers, dates, etc.)</li>
<li>How much space it takes</li>
<li>What operations you can perform on it (mathematical, string functions, etc.)</li>
</ul>
<p>Understanding data types is critical for:</p>
<ul>
<li>Writing correct queries</li>
<li>Preventing data loss or rounding errors</li>
<li>Optimizing storage and performance</li>
</ul>
<hr>
<h2 id="_2-2-classification-of-data-types" tabindex="-1"><a class="header-anchor" href="#_2-2-classification-of-data-types"><span>2.2 Classification of Data Types</span></a></h2>
<p>SQL Server provides several categories of data types:</p>
<table>
<thead>
<tr>
<th>Category</th>
<th>Examples</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Exact Numeric</td>
<td>INT, BIGINT, SMALLINT, TINYINT, DECIMAL, NUMERIC, MONEY, SMALLMONEY</td>
<td>Used for integers or precise decimal values</td>
</tr>
<tr>
<td>Approximate Numeric</td>
<td>FLOAT, REAL</td>
<td>Used when precision is less important (scientific/engineering)</td>
</tr>
<tr>
<td>Character Strings</td>
<td>CHAR, VARCHAR</td>
<td>For text data using ASCII</td>
</tr>
<tr>
<td>Unicode Strings</td>
<td>NCHAR, NVARCHAR, NTEXT</td>
<td>For multilingual text (Unicode)</td>
</tr>
<tr>
<td>Date and Time</td>
<td>DATE, TIME, DATETIME, SMALLDATETIME, DATETIME2, DATETIMEOFFSET</td>
<td>For storing temporal values</td>
</tr>
<tr>
<td>Binary Data</td>
<td>BINARY, VARBINARY, IMAGE</td>
<td>For images, files, or raw bytes</td>
</tr>
<tr>
<td>Other Types</td>
<td>BIT, UNIQUEIDENTIFIER, XML, JSON, SQL_VARIANT, GEOGRAPHY, HIERARCHYID</td>
<td>Specialized use cases</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_2-3-key-data-types-explained" tabindex="-1"><a class="header-anchor" href="#_2-3-key-data-types-explained"><span>2.3 Key Data Types Explained</span></a></h2>
<h3 id="a-exact-numeric" tabindex="-1"><a class="header-anchor" href="#a-exact-numeric"><span>A. Exact Numeric</span></a></h3>
<h4 id="int" tabindex="-1"><a class="header-anchor" href="#int"><span>INT</span></a></h4>
<ul>
<li>Range: -2,147,483,648 to 2,147,483,647</li>
<li>Storage: 4 bytes</li>
<li>Common for IDs, counts, small numerical values.</li>
</ul>
<h4 id="bigint" tabindex="-1"><a class="header-anchor" href="#bigint"><span>BIGINT</span></a></h4>
<ul>
<li>Range: extremely large values</li>
<li>Storage: 8 bytes</li>
</ul>
<h4 id="decimal-p-s-or-numeric-p-s" tabindex="-1"><a class="header-anchor" href="#decimal-p-s-or-numeric-p-s"><span>DECIMAL(p, s) or NUMERIC(p, s)</span></a></h4>
<ul>
<li>Fixed precision and scale</li>
<li><code v-pre>p</code> = total digits, <code v-pre>s</code> = digits after decimal</li>
<li>Example: <code v-pre>DECIMAL(10,2)</code> → max 10 digits, 2 after decimal</li>
</ul>
<p>Example:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DECLARE</span> <span class="token variable">@price</span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">1234.56</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token variable">@price</span> <span class="token keyword">AS</span> Price<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="b-approximate-numeric" tabindex="-1"><a class="header-anchor" href="#b-approximate-numeric"><span>B. Approximate Numeric</span></a></h3>
<h4 id="float-n-and-real" tabindex="-1"><a class="header-anchor" href="#float-n-and-real"><span>FLOAT(n) and REAL</span></a></h4>
<ul>
<li>FLOAT → 8 bytes (precision ~15 digits)</li>
<li>REAL → 4 bytes (precision ~7 digits)</li>
<li>Used when approximate values are acceptable</li>
<li>Avoid for financial calculations</li>
</ul>
<hr>
<h3 id="c-character-data" tabindex="-1"><a class="header-anchor" href="#c-character-data"><span>C. Character Data</span></a></h3>
<h4 id="char-n" tabindex="-1"><a class="header-anchor" href="#char-n"><span>CHAR(n)</span></a></h4>
<ul>
<li>Fixed-length string</li>
<li>Example: <code v-pre>CHAR(10)</code> → always 10 characters</li>
</ul>
<h4 id="varchar-n" tabindex="-1"><a class="header-anchor" href="#varchar-n"><span>VARCHAR(n)</span></a></h4>
<ul>
<li>Variable-length string</li>
<li>Example: <code v-pre>VARCHAR(50)</code> → uses only required storage</li>
</ul>
<h4 id="nchar-n-and-nvarchar-n" tabindex="-1"><a class="header-anchor" href="#nchar-n-and-nvarchar-n"><span>NCHAR(n) and NVARCHAR(n)</span></a></h4>
<ul>
<li>Unicode versions of CHAR/VARCHAR</li>
<li>Each character → 2 bytes</li>
<li>Required for multilingual text</li>
</ul>
<p>Example:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DECLARE</span> <span class="token variable">@name</span> NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">=</span> N<span class="token string">'दीपेश मेंढे'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token variable">@name</span> <span class="token keyword">AS</span> UnicodeExample<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="d-date-and-time-data-types" tabindex="-1"><a class="header-anchor" href="#d-date-and-time-data-types"><span>D. Date and Time Data Types</span></a></h3>
<table>
<thead>
<tr>
<th>Type</th>
<th>Storage</th>
<th>Range</th>
<th>Accuracy</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>DATE</td>
<td>3 bytes</td>
<td>0001–9999</td>
<td>1 day</td>
<td>'2025-11-06'</td>
</tr>
<tr>
<td>TIME(n)</td>
<td>3–5 bytes</td>
<td>00:00:00 → 23:59:59.9999999</td>
<td>100 ns</td>
<td>'13:45:30'</td>
</tr>
<tr>
<td>DATETIME</td>
<td>8 bytes</td>
<td>1753–9999</td>
<td>3.33 ms</td>
<td>'2025-11-06 13:45:30'</td>
</tr>
<tr>
<td>DATETIME2(n)</td>
<td>6–8 bytes</td>
<td>0001–9999</td>
<td>100 ns</td>
<td>'2025-11-06 13:45:30.1234567'</td>
</tr>
<tr>
<td>SMALLDATETIME</td>
<td>4 bytes</td>
<td>1900–2079</td>
<td>1 min</td>
<td>'2025-11-06 13:46'</td>
</tr>
<tr>
<td>DATETIMEOFFSET</td>
<td>8–10 bytes</td>
<td>includes timezone offset</td>
<td>—</td>
<td>'2025-11-06 13:45:30 +05:30'</td>
</tr>
</tbody>
</table>
<p>Example:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DECLARE</span> <span class="token variable">@today</span> <span class="token keyword">DATE</span> <span class="token operator">=</span> GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">DECLARE</span> <span class="token variable">@now</span> DATETIME2 <span class="token operator">=</span> SYSDATETIME<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token variable">@today</span> <span class="token keyword">AS</span> TodayDate<span class="token punctuation">,</span> <span class="token variable">@now</span> <span class="token keyword">AS</span> CurrentDateTime<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="e-bit-type" tabindex="-1"><a class="header-anchor" href="#e-bit-type"><span>E. BIT Type</span></a></h3>
<p>Boolean-like values (0, 1, or NULL)</p>
<p>Example:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Products <span class="token punctuation">(</span></span>
<span class="line">    ProductID <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    Name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    IsAvailable <span class="token keyword">BIT</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Products <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Pen'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Pencil'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> Products<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="f-uniqueidentifier" tabindex="-1"><a class="header-anchor" href="#f-uniqueidentifier"><span>F. UNIQUEIDENTIFIER</span></a></h3>
<p>Globally unique identifier (GUID)</p>
<p>Example:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> NEWID<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> RandomGUID<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h2 id="_2-4-nulls-in-sql-server" tabindex="-1"><a class="header-anchor" href="#_2-4-nulls-in-sql-server"><span>2.4 NULLs in SQL Server</span></a></h2>
<h3 id="definition" tabindex="-1"><a class="header-anchor" href="#definition"><span>Definition</span></a></h3>
<p>NULL represents unknown, missing, or not applicable data — not zero or empty string.</p>
<h3 id="key-points" tabindex="-1"><a class="header-anchor" href="#key-points"><span>Key Points</span></a></h3>
<ul>
<li>NULL ≠ 0</li>
<li>NULL ≠ ''</li>
<li>NULL ≠ NULL</li>
<li>Must use <code v-pre>IS NULL</code> or <code v-pre>IS NOT NULL</code></li>
</ul>
<p>Example:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> Employees <span class="token keyword">WHERE</span> HireDate <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> Employees <span class="token keyword">WHERE</span> HireDate <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="behavior-in-expressions" tabindex="-1"><a class="header-anchor" href="#behavior-in-expressions"><span>Behavior in Expressions</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token boolean">NULL</span> <span class="token keyword">AS</span> Result<span class="token punctuation">;</span>  <span class="token comment">-- returns NULL</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="null-handling-functions" tabindex="-1"><a class="header-anchor" href="#null-handling-functions"><span>NULL Handling Functions</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> ISNULL<span class="token punctuation">(</span><span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token string">'Unknown'</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> Result<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">COALESCE</span><span class="token punctuation">(</span><span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span> <span class="token string">'FirstNonNull'</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> Result<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">NULLIF</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> Result<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_2-5-type-conversion" tabindex="-1"><a class="header-anchor" href="#_2-5-type-conversion"><span>2.5 Type Conversion</span></a></h2>
<h3 id="implicit-conversion" tabindex="-1"><a class="header-anchor" href="#implicit-conversion"><span>Implicit Conversion</span></a></h3>
<p>SQL Server converts compatible types automatically.</p>
<p>Example:</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token number">10.5</span> <span class="token keyword">AS</span> Result<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="explicit-conversion" tabindex="-1"><a class="header-anchor" href="#explicit-conversion"><span>Explicit Conversion</span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> CAST<span class="token punctuation">(</span><span class="token string">'2025-11-06'</span> <span class="token keyword">AS</span> <span class="token keyword">DATETIME</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> DateValue<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">CONVERT</span><span class="token punctuation">(</span><span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">103</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> DateFormatDDMMYYYY<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_2-6-practical-examples" tabindex="-1"><a class="header-anchor" href="#_2-6-practical-examples"><span>2.6 Practical Examples</span></a></h2>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> ISNULL<span class="token punctuation">(</span>Salary<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> Salary</span>
<span class="line"><span class="token keyword">FROM</span> Employees<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> LastName</span>
<span class="line"><span class="token keyword">FROM</span> Employees</span>
<span class="line"><span class="token keyword">WHERE</span> HireDate <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">COALESCE</span><span class="token punctuation">(</span>FirstName<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> <span class="token keyword">COALESCE</span><span class="token punctuation">(</span>LastName<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> FullName</span>
<span class="line"><span class="token keyword">FROM</span> Employees<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_2-7-practice-questions" tabindex="-1"><a class="header-anchor" href="#_2-7-practice-questions"><span>2.7 Practice Questions</span></a></h2>
<p>Create a table <code v-pre>Orders</code> with:</p>
<ul>
<li>OrderID INT (PK)</li>
<li>OrderDate DATETIME</li>
<li>CustomerName NVARCHAR(100)</li>
<li>Amount DECIMAL(10,2)</li>
<li>IsDelivered BIT</li>
</ul>
<p>Then:</p>
<ol>
<li>Insert at least 3 records (one with NULL Amount).</li>
<li>Display orders where Amount is NULL.</li>
<li>Replace NULL Amounts with 0 using ISNULL.</li>
<li>Demonstrate <code v-pre>NULL = NULL</code> vs <code v-pre>IS NULL</code>.</li>
<li>Show current system date/time using DATETIME &amp; DATETIMEOFFSET.</li>
</ol>
<hr>
<h2 id="_2-8-summary" tabindex="-1"><a class="header-anchor" href="#_2-8-summary"><span>2.8 Summary</span></a></h2>
<table>
<thead>
<tr>
<th>Concept</th>
<th>Key Takeaway</th>
</tr>
</thead>
<tbody>
<tr>
<td>Data types</td>
<td>Define the nature, size, and behavior of stored data</td>
</tr>
<tr>
<td>Numeric types</td>
<td>Exact (INT, DECIMAL) vs Approximate (FLOAT)</td>
</tr>
<tr>
<td>Character types</td>
<td>CHAR/VARCHAR (ASCII), NCHAR/NVARCHAR (Unicode)</td>
</tr>
<tr>
<td>Date/time types</td>
<td>Multiple variants for precision &amp; storage</td>
</tr>
<tr>
<td>NULL</td>
<td>Represents unknown/missing data; handled with ISNULL/COALESCE</td>
</tr>
<tr>
<td>Conversion</td>
<td>Use CAST() and CONVERT() for explicit conversion</td>
</tr>
</tbody>
</table>
<hr>
<p>Next: <strong>Chapter 3 — CREATE, ALTER, DROP (DDL Operations)</strong></p>
</div></template>


