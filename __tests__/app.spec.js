const request = require("supertest");
const app = require("../app.js");

describe("Application", () => {
    test.todo("Health check", done => {
        request(app).get('/').then(response => {
            expect(response.body === "ok");
            expect(response.statusCode === 200 || 201);
            done();
        })
    });
});