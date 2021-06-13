const MissionControlCenter = require("../MissionControlCenter");

describe("Missiom Control Center", () => {
    it("Calculates safest route for Rover", () => {
        const startCoordinate = [4, 5];
        const endCoordinate = [1, 0];
        const MCC = new MissionControlCenter();
        const safestRoute = MCC.calculatesSafestRoute(startCoordinate, endCoordinate);

        expect(safestRoute).toBe("NWWNWNNN");
    });
});