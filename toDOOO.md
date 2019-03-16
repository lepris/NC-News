

```http
GET /api/articles/:article_id/comments
```
##### If time  (the following will make pagination easier when you get to building your front-end application)
- accept the following queries:
  * `limit`, which limits the number of responses (defaults to 10)
  * `p`, stands for page which specifies the page at which to start (calculated using limit)

***

##### Responds with
- the updated comment

***


```http
GET /api
```
##### Responds with
- JSON describing all the available endpoints on your API

***

### Step 3 - Hosting

Make sure your application and your database is hosted using heroku

### Step 4 - Preparing for your review and portfolio

Finally, you should write a README for this project (and remove this one). The README should be broken down like this: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

It should also include the link where your heroku app is hosted.