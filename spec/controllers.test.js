const supertest = require('supertest');
const server = require('./server');

const app = supertest(server);

const PING_ENDPOINT = '/api/ping';
const POSTS_ENDPOINT = '/api/posts';
const TAGS_ERROR = { error: 'Tags parameter is required' };
const SORT_ERROR = { error: 'sortBy parameter in invalid' };
const DIRECTION_ERROR = { error: 'direction parameter is invalid' };

/* ==================
    GET /api/ping
================== */
describe('Blogs API endpoint - GET /api/ping', () => {
  test('responds with 200, success', async () => {
    await app.get(PING_ENDPOINT)
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.success).toBeTruthy();
        expect(body.success).toEqual(true);
      });
  });
});

/* ==================
    GET /api/posts
================== */
describe('Blogs API endpoint - GET /api/posts query handling', () => {
  test('wihout a tag returns 400, error', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ notTags: true })
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body).toMatchObject(TAGS_ERROR);
      });
  });

  test('wihout tag but with sort, dir returns 400, error', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ sortBy: 'id', direction: 'desc' })
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body).toMatchObject(TAGS_ERROR);
      });
  });

  test('with only a tag returns 200', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech' })
      .expect(200);
  });

  test('with a tag but with invalid sort type returns 400, error', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', sortBy: 1 })
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body).toMatchObject(SORT_ERROR);
      });
  });

  test('with a tag but with invalid sort choice returns 400, error', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', sortBy: 'somethingInvalid' })
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body).toMatchObject(SORT_ERROR);
      });
  });

  test('with a tag but with invalid direction choice returns 400, error', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', direction: 'somethingInvalid' })
      .expect(400)
      .then((response) => response.body)
      .then((body) => {
        expect(body).toMatchObject(DIRECTION_ERROR);
      });
  });

  test('with a tag and valid sort, direction returns 200', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', sortBy: 'id', direction: 'asc' })
      .expect(200);
  });
});
