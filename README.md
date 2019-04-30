<!-- PROJECT SHIELDS -->
<p><a href="">![Build Status][build-shield]</a><br>
<a href="">![Contributors][contributors-shield]</a><br>
[![MIT License][license-shield]][license-url]<br>
[![LinkedIn][linkedin-shield]][linkedin-url]</p>
<!-- Header -->
<h1 id="nc-news">NC NEWS</h1>
<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li><a href="#about-the-project">About the Project</a>
<ul>
<li><a href="#built-with">Built With</a></li>
</ul>
</li>
<li><a href="#getting-started">Getting Started</a>
<ul>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#installation">Installation</a></li>
</ul>
</li>
<li><a href="#usage">Usage</a></li>
<li><a href="#contributing">Contributing</a></li>
<li><a href="#license">License</a></li>
<li><a href="#contact">Contact</a></li>
</ul>
<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project">About The Project</h2>
<h4 id="nc-news-api">NC News API</h4>
<p>Makes students life merrier, by enabling to post articles touching various topics, is plain, simple and to the point:</p>
<p>Great functionalities:</p>
<ul>
<li>Defining topics</li>
<li>Creating articles</li>
<li>Commenting</li>
<li>Voting</li>
<li>Adding Users</li>
</ul>
<h4 id="documentation">Documentation</h4>
<p>Full interactive  API documentation available:</p>
<p><a href="https://apincnews.docs.apiary.io/">https://apincnews.docs.apiary.io</a></p>
<h4 id="default-permissions">Default permissions</h4>

<table>
<thead>
<tr>
<th>User roles</th>
<th>Guest</th>
<th>Authenticated User</th>
</tr>
</thead>
<tbody>
<tr>
<td>View Articles</td>
<td><strong>OK</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Add Articles</td>
<td><strong>X</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Delete Articles</td>
<td><strong>X</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Vote on Articles</td>
<td><strong>OK</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>View Topics</td>
<td><strong>OK</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Add Topics</td>
<td><strong>X</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Delete Topics</td>
<td><strong>X</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>View Comments</td>
<td><strong>OK</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Add Comments</td>
<td><strong>X</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Delete Comments</td>
<td><strong>X</strong></td>
<td><strong>OK</strong></td>
</tr>
<tr>
<td>Vote on Comments</td>
<td><strong>OK</strong></td>
<td><strong>OK</strong></td>
</tr>
</tbody>
</table><h3 id="built-with">Built With</h3>
<p>This project is a simple, RESTful Node.js based api which allows to read, create and delete articles and comments. Express acts as HTTP server communicating with PostgreSQL database.</p>
<ul>
<li><a href="https://expressjs.com/">Express</a></li>
<li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
</ul>
<!-- GETTING STARTED -->
<h2 id="getting-started">Getting Started</h2>
<p>To run the project locally</p>
<h3 id="prerequisites">Prerequisites</h3>
<p>In order to run this project PostgreSQL must be running either on the host or in Docker container.</p>
<ul>
<li>npm</li>
</ul>
<pre class=" language-sh"><code class="prism  language-sh">npm install npm@latest -g
</code></pre>
<p><strong>or</strong></p>
<ul>
<li>yarn</li>
</ul>
<p>Follow <strong>Yarn</strong> installation instructions<br>
<a href="https://yarnpkg.com/en/docs/install">https://yarnpkg.com/en/docs/install</a></p>
<h3 id="installation">Installation</h3>
<ol>
<li>Clone the repo</li>
</ol>
<pre class=" language-sh"><code class="prism  language-sh">git clone git@github.com:lepris/NC-News.git
</code></pre>
<ol start="2">
<li>Install dependencies</li>
</ol>
<pre class=" language-sh"><code class="prism  language-sh">npm install
</code></pre>
<p><strong>or</strong></p>
<ul>
<li>yarn</li>
</ul>
<pre class=" language-sh"><code class="prism  language-sh">yarn
</code></pre>
<p>For app deployment follow your specific service provider instructions.</p>
<!-- USAGE EXAMPLES -->
<h2 id="usage">Usage</h2>
<p>API Documentation can be found on <strong>APIARY</strong><br>
<a href="https://apincnews.docs.apiary.io/">https://apincnews.docs.apiary.io</a></p>
<!-- CONTRIBUTING -->
<h2 id="contributing">Contributing</h2>
<p>Any contributions are  <strong>extremely welcome</strong>.</p>
<ol>
<li>Fork the Project</li>
<li>Create your Feature Branch (<code>git checkout -b feature/AmazingFeature</code>)</li>
<li>Commit your Changes (<code>git commit -m 'Add some AmazingFeature</code>)</li>
<li>Push to the Branch (<code>git push origin feature/AmazingFeature</code>)</li>
<li>Open a Pull Request</li>
</ol>
<!-- LICENSE -->
<h2 id="license">License</h2>
<p>Distributed under the MIT License. See <a href="./license.txt">LICENSE</a> for more information.</p>
<!-- CONTACT -->
<h2 id="contact">Contact</h2>
<p>Project Link: <a href="https://github.com/lepris/NC-News">https://github.com/lepris/NC-News</a></p>
<!--ACKNOWLEDGEMENTS-->
<h3 id="acknowledgements">Acknowledgements</h3>
<p><strong>STACKEDIT</strong>  <a href="https://stackedit.io/">https://stackedit.io</a><br>
<strong>APIARY</strong>  <a href="https://apiary.io/">https://apiary.io</a></p>

