# Karolina - NC News Review (14/03/2019)

## General

- Good stuff so far. A few more endpoints to make. I’d advise checking our test output below and letting that guide you before coming back to make improvements on what you have already created.
- Write your own `README.md`
- Remove any unnecessary files (e.g. `toDOOO.md`)
- Remove any comments & `console.log`s
- Make sure all linting is passing



## Controllers

- Be careful with naming. What it `queryARgs`?

- `checkInput` function is a good idea but there are a some things that could be problematic:
  - `Object.keys()` cannot guarantee order
 
  - typo in file name

## Models

- Destructure args where possible
- Avoid `delete`. Use `AS` or rename columns. Should only need one `then` block.

## Error Handling

- Need to use more error handling blocks

## Testing

- Utility functions seem to have only one test each?
- Could organise `describe` blocks to give a nicer output to the terminal
- `author=Felix_Pauls_Cat` hahaha
- I wouldn't talk about knex to the clients: `"knex could not find..."`
- Test the default `sort` and `order` before testing the valid queries
- Queries should be separated by one `&`, not two
- It looks like you have built some things before you have tested them :(

## Our Tests

### `POST /api/topics`

status:422 client sends a body with a duplicate slug:
Error: expected 422 "Unprocessable Entity", got 500 "Internal Server Error"

### `POST /api/topics`

POST status:400 if request body is malformed (missing description property):
Error: expected 400 "Bad Request", got 201 "Created"

Looks like you have decided that a description property is not absolutely necessary to create a topic. I'll leave this up to you :)

### `/api/topics`

status:405 invalid HTTP method for this resource:
Error: expected 405 "Method Not Allowed", got 404 "Not Found"

This route exists, but only has `GET` and `POST` methods on it, therefore a `405: Method Not Allowed` status would be more appropriate for things like `DELETE` or `PUT`

### `/api/articles`

status:405 invalid request method for end-point:
Error: expected 405 "Method Not Allowed", got 404 "Not Found"

### `GET /api/articles`

responds with an empty array for articles queried with non-existent topic:
Error: expected 200 "OK", got 404 "Not Found"

If a topic exists, but contains no articles, `200` with a `{ articles: [] }` response would be best. This will make the difference clear when we come to building the front end.

### `GET /api/articles`

article objects have a comment_count property:
AssertionError: expected '0' to equal '13'

```
- expected - actual

-0
+13
```

### `PATCH /api/articles/:article_id`

status:200 and an updated article when given a body including a valid "inc_votes" (VOTE UP):
Error: expected 200 "OK", got 404 "Not Found"

### `PATCH /api/articles/:article_id`

status:200 responds with an updated article when given a body including a valid "inc_votes" (VOTE DOWN):
Error: expected 200 "OK", got 404 "Not Found"

### `PATCH /api/articles/:article_id`

status:200 no body responds with an unmodified article:
Error: expected 200 "OK", got 404 "Not Found"

### `DELETE /api/articles/:article_id`

status:204 and removes the article when given a valid article_id:
Error: expected 204 "No Content", got 404 "Not Found"

### `DELETE /api/articles/:article_id

responds with a 204 when deleting an article without comments (no comments required to perform delete):
Error: expected 204 "No Content", got 404 "Not Found"

### `/api/articles/:article_id`

invalid methods respond with 405:
Error: expected 405 "Method Not Allowed", got 404 "Not Found"

### `GET /api/articles/:article_id`

status:404 url contains a non-existent (but potentially valid) article_id:
Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.

**UNCAUGHT PROMISE REJECTION!**?

### `GET /api/articles/:article_id

status:400 URL contains an invalid article_id:
Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.

**UNCAUGHT PROMISE REJECTION!**?

### `PATCH /api/articles/:article_id`

status:400 if given an invalid inc_votes:
Error: expected 400 "Bad Request", got 404 "Not Found"

e.g. `{ "inc_votes": "cat" }`

### `DELETE /api/articles/:article_id`

responds with 400 on invalid article_id:
Error: expected 400 "Bad Request", got 404 "Not Found"

### `/api/articles/:article_id/comments`

invalid methods respond with 405:
Error: expected 405 "Method Not Allowed", got 404 "Not Found"

### `GET /api/articles/:article_id/comments`

responds with an array of comment objects:
Error: expected 200 "OK", got 404 "Not Found"

### `GET /api/articles/:article_id/comments`

sorts in the data (DEFAULT order=desc) and (DEFAULT sort_by=created_at):
Error: expected 200 "OK", got 404 "Not Found"

### `GET /api/articles/:article_id/comments`

can be sorted by author (DEFAULT order=desc):
Error: expected 200 "OK", got 404 "Not Found"

### `GET /api/articles/:article_id/comments`

can be sorted by votes (DEFAULT order=desc):
Error: expected 200 "OK", got 404 "Not Found"

### `GET /api/articles/:article_id/comments`

can change the sort order (DEFAULT sort_by=created_at):
Error: expected 200 "OK", got 404 "Not Found"

### `GET/api/articles/:article_id/comments`

responds with 400 for an invalid article_id:
Error: expected 400 "Bad Request", got 404 "Not Found"

### `POST /api/articles/:article_id/comments`

responds with a 201 and the posted comment when given a valid article_id:
Error: expected 201 "Created", got 404 "Not Found"

### `POST /api/articles/:article_id/comments`

responds with a 400 when given an invalid article id:
Error: expected 400 "Bad Request", got 404 "Not Found"

### `POST /api/articles/:article_id/comments`

responds with a 400 when given an invalid body referencing a non-existent column:
Error: expected 400 "Bad Request", got 404 "Not Found"

### `POST /api/articles/:article_id/comments`

responds with a 422 when given a non-existent username:
Error: expected 422 "Unprocessable Entity", got 404 "Not Found"

### `PATCH /api/comments/:comment_id`

status:200 and an updated comment when given a body including a valid "inc_votes" (VOTE DOWN):
Error: expected 200 "OK", got 404 "Not Found"

### `PATCH /api/comments/:comment_id

status:200 with no body responds with an unmodified comment:
Error: expected 200 "OK", got 404 "Not Found"

### `PATCH /api/comments/:comment_id`

status:400 if given an invalid inc_votes:
Error: expected 400 "Bad Request", got 404 "Not Found"

### `PATCH /api/comments/:comment_id`

status:400 if invalid comment_id is used:
Error: expected 400 "Bad Request", got 404 "Not Found"

### `DELETE /api/comments/:comment_id`

status:204 deletes the comment and responds with No Content:
Error: expected 204 "No Content", got 404 "Not Found"

### `/api/comments/:comment_id

invalid methods respond with 405:
Error: expected 405 "Method Not Allowed", got 404 "Not Found"

### `GET /api/users`

responds with a 200 and an array of user objects:
AssertionError: Target cannot be null or undefined.

### `/api/users`

invalid methods respond with 405:
Error: expected 405 "Method Not Allowed", got 404 "Not Found"

### `GET /api/users/:username`

status:200 responds with a user object when given a valid username:
Error: expected 200 "OK", got 404 "Not Found"

### `/api/users/:username`

invalid methods respond with 405:
Error: expected 405 "Method Not Allowed", got 404 "Not Found"
