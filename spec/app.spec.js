process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('', () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    console.log('end of connection');
    return connection.destroy();
  });
  describe('/api', () => {
    describe('/topics', () => {
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
          .send(topicToSend)
          .expect(201)
          .then((res) => {
            expect(res.body[0]).contain.keys('slug', 'description');
            expect(res.body[0].slug).to.eql('matters');
          });
      });
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
