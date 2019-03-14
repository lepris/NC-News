


```http
GET /api/articles/:article_id
```

##### Responds with
- an article object,  which should have the following properties:
  * `author` which is the `username` from the users table
  * `title`
  * `article_id`
  * `body`
  * `topic`
  * `created_at`
  * `votes`
  * `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

***

```http
PATCH /api/articles/:article_id
```

##### Request body accepts
- an object in the form `{ inc_votes: newVote }`

  * `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -100 }` would decrement the current article's vote property by 100

##### Responds with
- the updated article

***

```http
DELETE /api/articles/:article_id
```
##### Should
- delete the given article by `article_id`

##### Responds with
- status 204 and no content

***

```http
GET /api/articles/:article_id/comments
```

##### Responds with
- an array of comments for the given `article_id` of which each comment should have the following properties:
  * `comment_id`
  * `votes`
  * `created_at`
  * `author` which is the `username` from the users table
  * `body`

##### Accepts queries
  * `sort_by`, which sorts the articles by any valid column (defaults to date)
  * `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

##### If time  (the following will make pagination easier when you get to building your front-end application)
- accept the following queries:
  * `limit`, which limits the number of responses (defaults to 10)
  * `p`, stands for page which specifies the page at which to start (calculated using limit)

***

```http
POST /api/articles/:article_id/comments
```

##### Request body accepts
- an object with the following properties:
  * `username`
  * `body`

##### Responds with
- the posted comment

***

```http
PATCH /api/comments/:comment_id
```
##### Request body accepts
- an object in the form `{ inc_votes: newVote }`

  * `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -1 }` would decrement the current article's vote property by 1

##### Responds with
- the updated comment

***

```http
DELETE /api/comments/:comment_id
```

##### Should
- delete the given comment by `comment_id`

##### Responds with
- status 204 and no content

***

```http
GET /api/users
```

##### Responds with
- an array of user objects, each of which should have the following properties:
  * `username`
  * `avatar_url`
  * `name`

***

```http
POST /api/users
```

##### Request body accepts
- an object containing the following properties:
  * `username`
  * `avatar_url`
  * `name`

##### Responds with
- the posted user

***

```http
GET /api/users/:username
```

##### Responds with
- a user object which should have the following properties:
  * `username`
  * `avatar_url`
  * `name`

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
