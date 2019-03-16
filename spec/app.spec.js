process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('', () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    console.log('/**TEST SUITE**/end of connection');
    return connection.destroy();
  });

  describe('/ROOT ERROR TESTING', () => {
    it('/TOPICS bad route', () => request.delete('/api/topics')
      .expect(405)
      .then(({ body }) => {
        expect(body.message).to.eql('Method not allowed');
      }));

    it('/ROOT bad route', () => request.get('/bad_route')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.eql('Route not found');
      }));
  });

  describe('Router /api', () => {
    describe('Router /articles', () => {
      describe('/api/articles GET REQUEST', () => {
        it('/GET /ARTICLES status 200 and return articles', () => request.get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
          }));
        it('/GET /ARTICLES QUERY author', () => request.get('/api/articles?author=butter_bridge')
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0].author).to.be.eql('butter_bridge');
          }));
        it('ERROR /GET /ARTICLES QUERY WRONG author', () => request.get('/api/articles?author=Felix_Pauls_Cat')
          .expect(404)
          .then((res) => {
            expect(res.body.message).to.eql('Sorry no articles found');
          }));
        it('/GET /ARTICLES QUERY topic', () => request.get('/api/articles?topic=cats')
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0].topic).to.be.eql('cats');
          }));

        it('ERROR /GET /ARTICLES QUERY WRONG topic', () => request.get('/api/articles?topic=cucumbers')
          .expect(404)
          .then((res) => {
            expect(res.body.message).to.eql('Sorry no articles found');
          }));

        it('/GET /ARTICLES QUERY SORT_BY taking valid column name', () => request.get('/api/articles?sort_by=votes')
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0].votes).to.be.greaterThan(res.body.articles[1].votes);
          }));
        it('ERROR /GET /ARTICLES QUERY SORT_BY taking valid column name', () => request.get('/api/articles?sort_by=chewbaca')
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.eql('Column does not exist, please change sort criteria');
          }));
        it('/GET /ARTICLES QUERY ORDER set to ascending', () => request.get('/api/articles?sort_by=votes&&order=asc')
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0].votes).to.be.not.greaterThan(res.body.articles[1].votes);
            expect(res.body.articles[1].votes).to.be.not.greaterThan(res.body.articles[2].votes);
          }));
        it('/GET /ARTICLES QUERY ORDER set to descending', () => request.get('/api/articles?sort_by=article_id&&order=desc')
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0].article_id).to.be.not.lessThan(res.body.articles[1].article_id);
            expect(res.body.articles[1].article_id).to.be.not.lessThan(res.body.articles[2].article_id);
          }));
        it('ERROR /GET /ARTICLES QUERY ORDER set to WRONG VALUE', () => request.get('/api/articles?sort_by=votes&&order=HanSolo')
          .expect(404)
          .then((res) => {
            expect(res.body.message).to.eql('Please input asc or desc');
          }));
      });
      describe('/api/articles POST REQUEST', () => {
        it('POST /ArTICLES should reply with status 201 and the posted topic', () => request.post('/api/articles')
          .send({
            title: 'Cats following Exploding Kittens Stars',
            body: 'Instead of drinking water from the cat bowl, make sure to steal water from the toilet wake up human for food at 4am chase the pig around the house vommit food and eat it again meowzer or curl into a furry donut cat snacks. Have my breakfast spaghetti yarn soft kitty warm kitty little ball of furr small kitty warm kitty little balls of fur you call this cat food. I could pee on this if i had the energy push your water glass on the floor rub face on owner for pose purrfectly to show my beauty. Flop over stand in doorway, unwilling to chose whether to stay in or go out jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water. Curl into a furry donut lick the other cats or run in circles, so groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked or stand in doorway, unwilling to chose whether to stay in or go out but thug cat . Sleep everywhere, but not in my bed. Cat walks in keyboard twitch tail in permanent irritation yet scream for no reason at 4 am. Sleep in the bathroom sink chase laser. ',
            topic: 'cats',
            username: 'lepris',
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.article.title).to.eql('Cats following Exploding Kittens Stars');
          }));
        it('ERROR POST /ArTICLES should reply with status 400 and correct key values', () => request.post('/api/articles')
          .send({
            title: 'Cats following Exploding Kittens Stars',
            body: 'Instead of drinking water from the cat bowl, make sure to steal water from the toilet wake up human for food at 4am chase the pig around the house vommit food and eat it again meowzer or curl into a furry donut cat snacks. Have my breakfast spaghetti yarn soft kitty warm kitty little ball of furr small kitty warm kitty little balls of fur you call this cat food. I could pee on this if i had the energy push your water glass on the floor rub face on owner for pose purrfectly to show my beauty. Flop over stand in doorway, unwilling to chose whether to stay in or go out jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water. Curl into a furry donut lick the other cats or run in circles, so groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked or stand in doorway, unwilling to chose whether to stay in or go out but thug cat . Sleep everywhere, but not in my bed. Cat walks in keyboard twitch tail in permanent irritation yet scream for no reason at 4 am. Sleep in the bathroom sink chase laser. ',
            username: 'lepris',
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.eql('Please input data correctly: title body topic username');
          }));
        it('ERROR POST /ARTICLES should reply with status 400 and BAD lnaguage', () => request.post('/api/articles')
          .send({
            title: 'Cats following Exploding Kittens Stars',
            body: 'Instead of drinking water from the cat bowl, make broccoli sure to steal water from the toilet wake up human for food at 4am chase the pig around the house vommit food and eat it again meowzer or curl into a furry donut cat snacks. Have my breakfast spaghetti yarn soft kitty warm kitty little ball of furr small kitty warm kitty little balls of fur you call this cat food. I could pee on this if i had the energy push your water glass on the floor rub face on owner for pose purrfectly to show my beauty. Flop over stand in doorway, unwilling to chose whether to stay in or go out jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water. Curl into a furry donut lick the other cats or run in circles, so groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked or stand in doorway, unwilling to chose whether to stay in or go out but thug cat . Sleep everywhere, but not in my bed. Cat walks in keyboard twitch tail in permanent irritation yet scream for no reason at 4 am. Sleep in the bathroom sink chase laser. ',
            topic: 'cats',
            username: 'lepris',
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.eql('Please no swearing, this is not allowed :   broccoli ');
          }));
        it('ERROR POST /ARTICLES when author is not registered user', () => request.post('/api/articles')
          .send({
            title: 'Cats following Exploding Kittens Stars',
            body: 'Instead of drinking water from the cat bowl, make sure to steal water from the toilet wake up human for food at 4am chase the pig around the house vommit food and eat it again meowzer or curl into a furry donut cat snacks. Have my breakfast spaghetti yarn soft kitty warm kitty little ball of furr small kitty warm kitty little balls of fur you call this cat food. I could pee on this if i had the energy push your water glass on the floor rub face on owner for pose purrfectly to show my beauty. Flop over stand in doorway, unwilling to chose whether to stay in or go out jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water. Curl into a furry donut lick the other cats or run in circles, so groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked or stand in doorway, unwilling to chose whether to stay in or go out but thug cat . Sleep everywhere, but not in my bed. Cat walks in keyboard twitch tail in permanent irritation yet scream for no reason at 4 am. Sleep in the bathroom sink chase laser. ',
            topic: 'cats',
            username: 'Batman',
          })
          .expect(422)
          .then(({ body }) => {
            expect(body.message).to.eql('Please enter valid username Key (author)=(Batman) is not present in table "users".');
          }));

        it('ERROR POST /ARTICLES BODY is empty', () => request.post('/api/articles')
          .send({
            title: 'Cats following Exploding Kittens Stars',
            body: '  ',
            topic: 'cats',
            username: 'lepris',
          })
          .expect(400)
          .then(({ body }) => {
            // expect(body.message).to.eql('Key (author)=(Batman) is not present in table "users".');
          }));
      });
      describe('GET api/articles/:article_id', () => {
        it('/GET /ARTICLES/:article_id responds with 200 and the correct article', () => request.get('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0]).to.contain.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
            expect(body.article[0].comment_count).to.eql('13');
          }));
        it('/GET /ARTICLES/bad_type responds with 400 ', () => request.get('/api/articles/bad_type')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.eql('Invalid article id');
          }));
        it('/GET /ARTICLES/999999 responds with 404 ', () => request.get('/api/articles/999999')
          .expect(404)
          .then(({ body }) => {
            expect(body.message).to.eql('This id is not currently in our database');
          }));
      });
      describe('/PATCH api/articles/:article_id', () => {
        it('/PATCH api/articles/:article_id { inc_votes: 1 } 200  success retuns votes +1', () => request.patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body[0].votes).to.be.eql(101);
          }));
        it('/PATCH api/articles/:article_id { inc_votes: -1 } 200  success retuns votes -1', () => request.patch('/api/articles/1')
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body }) => {
            expect(body[0].votes).to.be.eql(99);
          }));
        it('/PATCH api/articles/:article_id 200 {} success retuns votes unchanged', () => request.patch('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            expect(body[0].votes).to.be.eql(100);
          }));
        it('/PATCH api/articles/:article_id { inc_votes: test } 400  success retuns votes -1', () => request.patch('/api/articles/1')
          .send({ inc_votes: 'test' })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.be.eql('Please provide a number');
          }));
        it('ERROR /PATCH api/articles/:article_id BAD ID { inc_votes: -1 } 400 Bad request', () => request.patch('/api/articles/gg')
          .send({ inc_votes: -1 })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.be.eql('Invalid article id');
          }));
      });
      describe('/DELETE api/articles/:article_id', () => {
        it('/DELETE api/articles/:article_id 204 success No Content', () => request.delete('/api/articles/1')
          .expect(204)
          .then(({ body }) => {
            expect(body).to.be.eql({});
          })
          .then(() => request.delete('/api/articles/1')
            .expect(404)
            .then(({ body }) => {
              expect(body.message).to.be.eql('Article with id 1 does not exist');
            })));
      });

      describe.only('/GET /articles/:article_id/comments', () => {
        it('/GET /articles/:article_id/comments responds with 200 and the correct comments for article', () => request.get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments[0]).to.have.all.keys('comment_id', 'votes', 'created_at', 'author', 'body');
          }));

        it('/GET /articles/:article_id/comments?sort_by=comment_id responds with 200 and sorted comments for article', () => request.get('/api/articles/1/comments?sort_by=comment_id&order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments[0].comment_id).to.be.lessThan(body.comments[1].comment_id);
          }));
        it('/GET /articles/:article_id/comments?sort_by=comment_id DEFAULT LIMIT of 10 status 200 and sorted comments for article', () => request.get('/api/articles/1/comments?sort_by=comment_id&order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).to.be.eql(10);
          }));
        it('/GET /articles/:article_id/comments?sort_by=comment_id SET LIMIT of 5 status 200 and sorted comments for article', () => request.get('/api/articles/1/comments?sort_by=comment_id&order=asc&limit=5')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).to.be.eql(5);
          }));

        it('ERROR /GET /articles/:article_id/comments responds with 404', () => request.get('/api/articles/9999999/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body.message).to.eql('Article id is not currently in our database');
          }));
        it('ERROR /GET /articles/:article_id/comments responds with 404', () => request.get('/api/articles/mobyDick/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.eql('Invalid article id');
          }));
        it('ERROR /GET /articles/:article_id/comments responds with 204 and NO comments for article', () => request.get('/api/articles/11/comments')
          .expect(204)
          .then(({ body }) => {
            expect(body).to.eql({});
          }));

        describe('/POST /articles/:article_id/comments', () => {
          it('/POST /articles/:article_id/comments status 201 and the posted comment', () => request.post('/api/articles/2/comments')
            .send({
              author: 'lepris',
              body: 'Pizza with a hole is just an oversized wagon wheel, this wil ot feed a family',
            })
            .expect(201)
            .then(({ body }) => {
              console.log(body);
              const testRes = body.postedComment[0];
              expect(testRes).to.contain.keys('author', 'body');
              expect(testRes.author).to.eql('lepris');
              expect(testRes.body).to.eql('Pizza with a hole is just an oversized wagon wheel, this wil ot feed a family');
            }));
          it('ERROR POST /body missing /articles/:article_id/comments 400I*NCORRECT string for exixstent article id', () => request.post('/api/articles/kk/comments')
            .send({
              author: 'lepris',
              body: 'Pizza with a hole is just an oversized wagon wheel, this wil ot feed a family',
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.eql('Invalid article id');
            }));
          it('ERROR POST /body missing /articles/:article_id/comments 400 NON exixstent article id', () => request.post('/api/articles/99999999/comments')
            .send({
              author: 'lepris',
              body: 'Pizza with a hole is just an oversized wagon wheel, this wil ot feed a family',
            })
            .expect(422)
            .then(({ body }) => {
              expect(body.message).to.eql('Please enter valid username Key (article_id)=(99999999) is not present in table "articles".');
            }));
          it('ERROR POST /body missing /articles/:article_id/comments 400 when passed a malformed body', () => request.post('/api/articles/2/comments')
            .send({
              author: 'lepris',
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.eql('Supplied POST data is incomplete, please add:  body');
            }));
          it('ERROR POST /body missing /articles/:article_id/comments 400 when bad column entered', () => request.post('/api/articles/2/comments')
            .send({
              author: 'lepris',
              country: 'Paraguay',
              body: 'Pizza with a hole is just an oversized wagon wheel, this wil ot feed a family',
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.eql('New comment can only take values author and comment body');
            }));
          it('ERROR POST /body missing /articles/:article_id/comments 400 when bad column entered', () => request.post('/api/articles/2/comments')
            .send({
              author: 'Jerry the Postman',
              body: 'Pizza with a hole is just an oversized wagon wheel, this wil ot feed a family',
            })
            .expect(422)
            .then(({ body }) => {
              expect(body.message).to.eql('Please enter valid username Key (author)=(Jerry the Postman) is not present in table "users".');
            }));
        });
      });
    });


    describe('Router /topics ', () => {
      it('GET /TOPICS should reply with status 200 and array of all topics', () => request.get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.have.keys('slug', 'description');
        }));
      it('POST /TOPICS should reply with status 201 and the posted topic', () => request.post('/api/topics')
        .send({
          slug: 'matters',
          description: 'Nothing really Matters',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.topic).to.contain.keys('slug', 'description');
          expect(body.topic.slug).to.eql('matters');
        }));

      it('ERROR POST /BAD TOPICS 400 when passed a malformed body', () => request.post('/api/topics')
        .send({
          description: 'Nothing really Matters',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.eql('Supplied POST data is incomplete, please add:  slug');
        }));
      it('ERROR /BAD URL TOPICS 404 when passed wrong URL', () => request.post('/api/topics/abracadabra')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql('Route not found');
        }));
    });


    describe('Router /users', () => {
      describe('/USERS /GET /POST', () => {
        it('/GET /USERS status 200 and list of users', () => request.get('/api/users')
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.usersData[0]).to.have.all.keys('username', 'avatar_url', 'name');
          }));
        it('/POST /USERS status 201 and the posted users', () => request.post('/api/users')
          .send({
            username: 'HauHau',
            avatar_url: 'https://photos.app.goo.gl/6m9i8keuBQpjWgre9',
            name: 'Klaka',
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.user).to.contain.keys('username', 'avatar_url', 'name');
            expect(body.user.name).to.eql('Klaka');
          }));
        it('ERROR POST /BAD USER 400 when passed a malformed body', () => request.post('/api/users')
          .send({
            name: 'Klaka',
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.eql('Supplied POST data is incomplete, please add:  username');
          }));
        it('ERROR METHOD NOT ALLOWED 405 when PATCH', () => request.patch('/api/users')
          .send({
            name: 'Klakakakaka',
          })
          .expect(405)
          .then(({ body }) => {
            expect(body.message).to.eql('Method not allowed');
          }));
      });
      describe('/USERS/:username', () => {
        it('/GET /USERS:username status 200 and requested user with correct keys', () => request.get('/api/users/lepris')
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            const expectant = body.userData[0];
            expect(expectant).to.have.all.keys('username', 'avatar_url', 'name');
            expect(expectant.username).to.be.eql('lepris');
          }));
        it('ERROR /GET /USERS:username 404 user does not exist', () => request.get('/api/users/MrPresident')
          .expect(404)
          .then(({ body }) => {
            console.log(body);
            expect(body.message).to.be.eql('User not found');
          }));
        it('ERROR /GET /USERS:username 404 user does not exist', () => request.post('/api/users/MrPresident')
          .expect(405)
          .then(({ body }) => {
            console.log(body);
            expect(body.message).to.be.eql('Method not allowed');
          }));
        it('ERROR /GET /USERS:username 404 user does not exist', () => request.delete('/api/users/MrPresident')
          .expect(405)
          .then(({ body }) => {
            console.log(body);
            expect(body.message).to.be.eql('Method not allowed');
          }));
      });
    });

    describe('Router /comments', () => {
      describe('commentsRouter Error 405 METHOD NOT ALLOWED', () => {
        it('api/comments /GET not allowed', () => request.get('/api/comments/')
          .expect(405)
          .then(({ body }) => {
            expect(body.message).to.be.eql('Method not allowed');
          }));
        it('api/comments /POST not allowed', () => request.post('/api/comments/')
          .expect(405)
          .then(({ body }) => {
            expect(body.message).to.be.eql('Method not allowed');
          }));
      });
      describe('/comments/:comment_Id', () => {
        describe('commentsRouter endpoint :comment_Id Error 405 METHOD NOT ALLOWED', () => {
          it('api/comments/:comment_Id /GET not allowed', () => request.get('/api/comments/1')
            .expect(405)
            .then(({ body }) => {
              expect(body.message).to.be.eql('Method not allowed');
            }));
          it('api/comments/:comment_Id /POST not allowed', () => request.post('/api/comments/2')
            .expect(405)
            .then(({ body }) => {
              expect(body.message).to.be.eql('Method not allowed');
            }));
        });
        describe('/DELETE comment', () => {
          it('/DELETE api/comments/:comment_Id 204 success No Content', () => request.delete('/api/comments/1')
            .expect(204)
            .then(({ body }) => {
              expect(body).to.be.eql({});
            })
            .then(() => request.delete('/api/comments/1')
              .expect(404)
              .then(({ body }) => {
                expect(body.message).to.be.eql('Comment with id 1 does not exist');
              })));
        });
        describe('/PATCH comment updating VOTES', () => {
          it('/PATCH api/comments/:comment_Id { inc_votes: 1 } 200  success retuns votes +1', () => request.patch('/api/comments/1')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body[0].votes).to.be.eql(17);
            }));
          it('/PATCH api/comments/:comment_Id { inc_votes: -1 } 200  success retuns votes -1', () => request.patch('/api/comments/1')
            .send({ inc_votes: -1 })
            .expect(200)
            .then(({ body }) => {
              expect(body[0].votes).to.be.eql(15);
            }));
          it('/PATCH api/comments/:comment_Id 200 {} success retuns votes unchanged', () => request.patch('/api/comments/1')
            .expect(200)
            .then(({ body }) => {
              expect(body[0].votes).to.be.eql(16);
            }));
          it('/PATCH api/comments/:comment_Id { inc_votes: test } 400  success retuns votes -1', () => request.patch('/api/comments/1')
            .send({ inc_votes: 'test' })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.be.eql('Please provide a number');
            }));
          it('ERROR /PATCH api/comments/:comment_Id BAD ID { inc_votes: -1 } 400 Bad request', () => request.patch('/api/comments/gg')
            .send({ inc_votes: -1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.be.eql('Invalid comment id');
            }));
        });
      });
    });
  });
});
