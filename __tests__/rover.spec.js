const request = require("supertest");
const Rover = require("../rover.js");
const app = require("../app.js");
const { report } = require("../app.js");

jest.setTimeout(10000);

describe("Rover", () => {
    let rover;

    beforeEach(() => {
        rover = new Rover(4, 2, "EAST");
    });

    it("Moves Forward", function () {
        rover.moveByCommand("F");
        expect(rover.coordinate.x).toBe(5);
    });

    it("Moves Backward", () => {
        rover.moveByCommand("B");
        expect(rover.coordinate.x).toBe(3);
    });

    it("Turns left", () => {
        rover.moveByCommand("L");
        expect(rover.direction).toBe(1);
    });

    it("Turns right", () => {
        rover.moveByCommand("R");
        expect(rover.direction).toBe(3);
    });

    it("Does not move if it receives unknown command", function () {
        const currentCoordinates = rover.coordinate;
        rover.moveByCommand("D");
        expect(rover.coordinate).toBe(currentCoordinates);
    });

    it("Reports current coordinates correctly", () => {
        rover.moveByCommand("FLFFFRFLB");
        expect(rover.getCoordinates()).toBe("(6, 4) NORTH");
    });

    it("Reports position after collision", () => {
        rover.moveByCommand("LFF");
        expect(rover.reportCollision()).toEqual("(4, 5) NORTH STOPPED");
    });

    it("Reports current coordinates to world correctly",
        done => {
            request(app).post('/move').send({ command: "FLFFFRFLB" }).expect(200).end((err, res) => {
                if (err) {
                    done();
                }
                expect(res.body).toEqual("(6, 4) NORTH");
                done();
            });
        })
});