class MissionControlCenter {
    calculateSafestRoute(startPoint, endPoint, dir) {
        let direction = this.directionMapper(dir, false);
        let isReached = false;
        let steps = "";
        let i = 0;
        let x = startPoint[0]
        let y = startPoint[1]
        const endX = endPoint[0];
        const endY = endPoint[1];

        while (!isReached) {
            let [nextX, nextY] = this.getNextCoordinates([x, y], direction);
            let directionsToEnd = this.getTheDirectionsToEnd([x, y], [endX, endY], direction);
            let directionToEnd = directionsToEnd[0];

            i++;
            if (i === 10) {
                isReached = true;
            }

            let isNextMoveNotSafe = this.checkIfThereWillBeACollisionInNextMove([nextX, nextY]);

            if (x === endX && y === endY) {
                isReached = true;
            }

            if (isNextMoveNotSafe) {
                directionToEnd = directionsToEnd[1];

                if (directionToEnd === 'L') {
                    steps += "L";
                    direction = 4;
                } else if (directionToEnd === 'R') {
                    steps += "R";
                    direction === 2;
                }
            } else {
                if (directionToEnd === 'F') {
                    switch (direction) {
                        case 1:
                            y++;
                            break;
                        case 2:
                            x++
                            break;
                        case 3:
                            y--
                            break;
                        case 4:
                            x--
                            break;
                        default:
                    }
                    steps += "F";
                } else if (directionToEnd === "B") {
                    switch (direction) {
                        case 1:
                            y--;
                            break;
                        case 2:
                            x--;
                            break;
                        case 3:
                            y++;
                            break;
                        case 4:
                            x++;
                            break;
                        default:
                    }
                    steps += "B";
                } else if (directionToEnd === "L") {
                    if (direction === 1) {
                        direction = 4;
                    } else {
                        direction--;
                    }
                    steps += "L";
                } else if (directionToEnd === "R") {
                    if (direction === 4) {
                        direction = 1;
                    } else {
                        direction++;
                    }
                    steps += "R";
                }
            }
        }

        return steps;
    }

    directionMapper = (direction, byNumber) => {
        if (byNumber) {
            if (direction === 1) {
                return "NORTH";
            } else if (direction === 2) {
                return "EAST";
            } else if (direction === 3) {
                return "SOUTH";
            } else {
                return "WEST";
            }
        } else {
            if (direction === "NORTH") {
                return 1;
            } else if (direction === "EAST") {
                return 2;
            } else if (direction === "SOUTH") {
                return 3;
            } else {
                return 4;
            }
        }
    }

    getNextCoordinates([x, y], direction) {
        if (direction === 1) {
            return [x, y + 1];
        } else if (direction === 2) {
            return [x + 1, y];
        } else if (direction === 3) {
            return [x, y - 1];
        } else {
            return [x - 1, y];
        }
    }

    checkIfThereWillBeACollisionInNextMove([nextX, nextY]) {
        const obstacles = [[6, 3], [4, 1]];

        return obstacles.some(([x, y]) => nextX === x && nextY === y);
    }

    getTheDirectionsToEnd([currentX, currentY], [endX, endY], direction) {
        const directions = [];

        if (direction === 1) {
            if (currentY > endY) {
                directions.push("B");
            } else if (endY > currentY) {
                directions.push("F");
            }

            if (currentX > endX) {
                directions.push("L");
            } else if (endX > currentX) {
                directions.push("R");
            }
        } else if (direction === 2) {
            if (currentX > endX) {
                directions.push("B");
            } else if (currentX < endX) {
                directions.push("F");
            }

            if (currentY > endY) {
                directions.push("R")
            } else if (endY > currentY) {
                directions.push("L");
            }
        } else if (direction === 3) {
            if (currentY > endY) {
                directions.push("F");
            } else if (endY > currentY) {
                directions.push("B");
            }

            if (currentX > endX) {
                directions.push("R");
            } else if (endX > currentX) {
                directions.push("L");
            }
        } else if (direction === 4) {
            if (currentX > endX) {
                directions.push("F");
            } else if (currentX < endX) {
                directions.push("B");
            }

            if (currentY > endY) {
                directions.push("L")
            } else if (endY > currentY) {
                directions.push("R");
            }
        }

        return directions;
    }
}

module.exports = MissionControlCenter;