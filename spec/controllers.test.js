const supertest = require('supertest');
const server = require('./testserver');

const app = supertest(server);

const PING_ENDPOINT = '/api/ping';
const POSTS_ENDPOINT = '/api/posts';
const TAGS_ERROR = { error: 'Tags parameter is required' };
const SORT_ERROR = { error: 'sortBy parameter in invalid' };
const DIRECTION_ERROR = { error: 'direction parameter is invalid' };

const api = require('./testapi');

/* ================================
    GET /api/ping
================================ */
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

/* ================================
    GET /api/posts query use
================================ */
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

/* ================================
    GET /api/posts query testing
================================ */
describe('Blogs API endpoint - GET /api/posts sorting', () => {
  test('without a specified sort, defaults to id, asc, returns correct value', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech' })
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].id).toEqual(1);
      });
  });

  test('with direction as desc, defaults to id, desc, returns correct value', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', direction: 'desc' })
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].id).toEqual(99);
      });
  });

  test('with sortBy as reads, defaults to asc, returns correct value', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', sortBy: 'reads' })
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].id).toEqual(54);
        expect(body.posts[0].reads).toEqual(312);
      });
  });

  test('with sort by reads, desc returns correct value', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', sortBy: 'reads', direction: 'desc' })
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].id).toEqual(51);
        expect(body.posts[0].reads).toEqual(98798);
      });
  });

  test('with sort by likes, desc returns correct value', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', sortBy: 'likes', direction: 'desc' })
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].author).toEqual("Jon Abbott");
        expect(body.posts[0].likes).toEqual(985);
      });
  });

  test('with sort by popularity, asc returns correct value', async () => {
    await app.get(POSTS_ENDPOINT)
      .query({ tags: 'tech', sortBy: 'popularity', direction: 'asc' })
      .expect(200)
      .then((response) => response.body)
      .then((body) => {
        expect(body.posts[0].popularity).toEqual(0.01);
        expect(body.posts[0].author).toEqual("Jaden Bryant");
      });
  });
});
