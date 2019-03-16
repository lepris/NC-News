# Karolina - NC News Review (14/03/2019)

## General

- Good stuff so far. A few more endpoints to make. I’d advise checking our test output below and letting that guide you before coming back to make improvements on what you have already created.
- Write your own `README.md`
- Remove any unnecessary files (e.g. `toDOOO.md`)
- Remove any comments & `console.log`s
- Make sure all linting is passing

## Testing

- Utility functions seem to have only one test each?
- Could organise `describe` blocks to give a nicer output to the terminal

- Test the default `sort` and `order` before testing the valid queries
- Queries should be separated by one `&`, not two
- It looks like you have built some things before you have tested them :(




## Our Tests




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