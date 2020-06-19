/* eslint-disable no-undef */
const request = require('request');

// eslint-disable-next-line no-unused-vars
const server = require('../../src/server');

describe('server', () => {
  describe('GET /api/games', () => {
    it('This endpoint should return status code 200', (done) => {
      request.get('http://localhost:3000/api/games', (error, response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /api/games/report', () => {
    it('This endpoint should return the report with status code 200', (done) => {
      request.get(
        'http://localhost:3000/api/games/report',
        (error, response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toContain('PDF-');
          done();
        }
      );
    });
  });
});
