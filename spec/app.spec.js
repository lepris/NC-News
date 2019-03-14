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
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.eql('Route not found');
      }));

    it('/ROOT bad route', () => request.get('/bad_route')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.eql('Route not found');
      }));
  });

  describe('/api', () => {
    describe('/articles', () => {
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
            expect(res.body.message).to.eql('Knex returned no results');
          }));
        it('/GET /ARTICLES QUERY topic', () => request.get('/api/articles?topic=cats')
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0].topic).to.be.eql('cats');
          }));

        it('ERROR /GET /ARTICLES QUERY WRONG topic', () => request.get('/api/articles?topic=cucumbers')
          .expect(404)
          .then((res) => {
            expect(res.body.message).to.eql('Knex returned no results');
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
        it('REQUEST body accepts the following properties', () => {

        });
      });
    });


    describe('/topics ', () => {
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
          expect(body.message).to.eql('Supplied POST data is incomplete, MISSING value of slug');
        }));
      it('ERROR /BAD URL TOPICS 404 when passed wrong URL', () => request.post('/api/topics/abracadabra')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.eql('Route not found');
        }));
    });


    describe('/users', () => {
      it('/GET /USERS status 200 and router Hello response', () => request.get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.eql({ greeting: 'Helo from USERS router' });
        }));
    });
  });
});
