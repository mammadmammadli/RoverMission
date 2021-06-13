class MissionControlCenter {
    calculatesSafestRoute(startPoint, endPoint) {
        let currentX = startPoint[0];
        let currentY = startPoint[1];
        let directionsToEnd = this.getTheDirectionsToEnd(startPoint, endPoint);
        let isReached = false;
        let steps = "";
        let direction = directionsToEnd[0];
        let [nextX, nextY] = this.getNextCoordinates([currentX, currentY], direction);
        let isNextMoveNotSafe = this.checkIfThereWillBeACollisionInNextMove([nextX, nextY], direction);
        const [endX, endY] = endPoint;

        while (!isReached) {
            if (currentX === endX && currentY === endY) {
                isReached = true;
            };

            if (isNextMoveNotSafe) {
                direction = directionsToEnd[1];
            } else {
                direction = directionsToEnd[0];
            }

            switch (direction) {
                case "B":
                    steps += "B";
                    currentY++;
                    nextY++;
                    break;
                case "F":
                    steps += "F";
                    currentY--;
                    nextY--;
                    break;
                case "R":
                    steps += "R";
                    currentX++;
                    nextX++;
                    break;
                case "L":
                    steps += "L";
                    nextX--;
                    currentX--;
                    break;
                default:
            }

            isNextMoveNotSafe = this.checkIfThereWillBeACollisionInNextMove([nextX, nextY], direction);
            directionsToEnd = this.getTheDirectionsToEnd([currentX, currentY], [endX, endY]);
        }

        return steps;
    }

    getTheDirectionsToEnd(currentPoint, endPoint) {
        const [curentX, currentY] = currentPoint;
        const [endX, endY] = endPoint;
        const directions = [];

        if (currentY > endY) {
            directions.push("F")
        } else if (endY > currentY) {
            directions.push("B");
        }

        if (curentX > endX) {
            directions.push("L");
        } else if (endX > curentX) {
            directions.push("R");
        }

        return directions;
    }

    checkIfThereWillBeACollisionInNextMove(nextMove, direction) {
        const obstacles = [[4, 3], [3, 3], [2, 2]];
        const [nextX, nextY] = nextMove;

        if (direction === "F") {
            return obstacles.some(([x, y]) => nextX === x && nextY === y);
        } else if (direction === "B") {
            return obstacles.some(([x, y]) => nextX === x && nextY === y);
        } else if (direction === "L") {
            return obstacles.some(([x, y]) => nextX === x && nextY === y);
        } else if (direction === "R") {
            return obstacles.some(([x, y]) => nextX === x && nextY === y);
        }
    }

    getNextCoordinates(nextCoordinate, direction) {
        const [nextX, nextY] = nextCoordinate;
        switch (direction) {
            case "B":
                return [nextX, nextY + 1];
            case "F":
                return [nextX, nextY - 1];
            case "R":
                return [nextX + 1, nextY];
            case "L":
                return [nextX - 1, nextY];
        }
    }
}

module.exports = MissionControlCenter;