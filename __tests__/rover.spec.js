const request = require("supertest");
const Rover = require("../rover.js");
const app = require("../app.js");

describe("Rover", () => {
    it("Moves in each direction", function () {
        const rover = new Rover();
        rover.move("F");
        expect(rover.coordinate.y).toBe(1);
        rover.move("B");
        expect(rover.coordinate.y).toBe(0);
        rover.move("L");
        expect(rover.coordinate.x).toBe(-1);
        rover.move("R");
        expect(rover.coordinate.x).toBe(0);
    });

    it("Reports current coordinates correctly", () => {
        const rover = new Rover();
        rover.move("FFL");
        expect(rover.getCoordinates()).toBe("(-1, 2) WEST");
    });

    it("Moves in Mars", () => {
        request(app).post('/move', "FLFFFRFLB").then(response => {
            expect(response.body).toBe("(-1, 4) SOUTH");
            expect(response.statusCode).toBe(200);
            done();
        })
    });
});