const request = require("supertest");
const Rover = require("../rover.js");
const app = require("../app.js");
const { report } = require("../app.js");

describe("Rover", () => {
    let rover;

    beforeEach(() => {
        rover = new Rover();
    });

    it("Moves in each direction", function () {
        rover.move("F");
        expect(rover.coordinate.y).toBe(1);
        rover.move("B");
        expect(rover.coordinate.y).toBe(0);
        rover.move("L");
        expect(rover.coordinate.x).toBe(-1);
        rover.move("R");
        expect(rover.coordinate.x).toBe(0);
    });

    it("Does not move if it receives unknown command", function () {
        const currentCoordinates = rover.coordinate;
        rover.move("D");
        expect(rover.coordinate).toBe(currentCoordinates);
    });

    it("Reports current coordinates correctly", () => {
        rover.move("FFL");
        expect(rover.getCoordinates()).toBe("(-1, 2) WEST");
    });

    it("Moves in Mars and reports it back", done => {
        request(app).post('/move').send({ command: "FLFFFRFLB" }).expect(200).end((err, res) => {
            expect(res.body).toEqual("(-1, 4) SOUTH");
            done();
        });
        
        request(app).post('/move').send({ command: "RFFLB" }).expect(200).end((err, res) => {
            expect(res.body).toEqual("(0, 1) SOUTH");
            done();
        });
        
        request(app).post('/move').send({ command: "BLFFFRL" }).expect(200).end((err, res) => {
            expect(res.body).toEqual("(-1, 2) WEST");
            done();
        });
    });
});