const MissionControlCenter = require("../MissionControlCenter");

describe("Missiom Control Center", () => {
    it("Calculates safest route for Rover", () => {
        const startCoordinate = [6, 1];
        const endCoordinate = [4, 6];
        const MCC = new MissionControlCenter();
        const safestRoute = MCC.calculateSafestRoute(startCoordinate, endCoordinate, "NORTH");

        expect(safestRoute).toBe("FLFFRFFFF");
    });
});