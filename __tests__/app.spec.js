const request = require("supertest");
const app = require("../app.js");

jest.setTimeout(10000);

describe("Application", () => {
    test("Health check", done => {
        request(app).get('/health-check').then(response => {
            expect(response.text).toBe("ok");
            expect(response.statusCode).toBe(200);
            done();
        })
    });
});