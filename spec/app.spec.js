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
        expect(body.msg).to.eql('Route not found');
      }));

    it('/ROOT bad route', () => request.get('/bad_route')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql('Route not found');
      }));
  });

  describe('/api', () => {
    describe.only('/articles', () => {
      it('/GET /ARTICLES status 200 and return articles', () => request.get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('/GET /ARTICLES QUERY author', () => request.get('/api/articles?author=butter_bridge')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].author).to.be.eql('butter_bridge');
        }));
    });


    describe('/topics ', () => {
      it('GET /TOPICS should reply with status 200 and array of all topics', () => request.get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.have.keys('slug', 'description');
        }));
      it('POST /TOPICS should reply with status 201 and the posted topic', () => {
        const topicToSend = {
          slug: 'matters',
          description: 'Nothing really Matters',
        };
        return request.post('/api/topics')
          .send({
            slug: 'matters',
            description: 'Nothing really Matters',
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.topic).to.contain.keys('slug', 'description');
            expect(body.topic.slug).to.eql('matters');
          });
      });

      it('ERROR POST /BAD TOPICS 400 when passed a malformed body', () => request.post('/api/topics')
        .send({
          description: 'Nothing really Matters',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql('Supplied POST data is incomplete, MISSING value of slug');
        }));
      it('ERROR /BAD URL TOPICS 404 when passed wrong URL', () => request.post('/api/topics/abracadabra')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql('Route not found');
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
