class Rover {
    coordinate = {
        x: 0,
        y: 0,
    };

    direction = null;

    constructor(x, y, direction) {
        this.coordinate.x = x;
        this.coordinate.y = y;
        this.direction = this.directionMapper(direction, false)
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

    moveByCommand(directions) {
        directions = directions.split('');

        for (let i = 0; i < directions.length; i++) {
            this.move(directions[i]);

            const isCollapsed = this.checkIfThereIsAnCollision();

            if (isCollapsed) {
                return this.reportCollision();
            };
        }
    }

    move(dir) {
        switch (dir) {
            case "F":
                if (this.direction === 1) {
                    this.coordinate.y += 1;
                } else if (this.direction === 2) {
                    this.coordinate.x += 1;
                } else if (this.direction === 3) {
                    this.coordinate.y -= 1;
                } else {
                    this.coordinate.x -= 1;
                }
                break;
            case "B":
                if (this.direction === 1) {
                    this.coordinate.y -= 1;
                } else if (this.direction === 2) {
                    this.coordinate.x -= 1;
                } else if (this.direction === 3) {
                    this.coordinate.y += 1;
                } else {
                    this.coordinate.x += 1;
                }
                break;

            case "L":
                if (this.direction === 1) {
                    this.direction = 4;
                } else {
                    this.direction -= 1;
                }
                break;
            case "R":
                if (this.direction === 4) {
                    this.direction = 1;
                } else {
                    this.direction += 1;
                }
                break;
        }
    }

    checkIfThereIsAnCollision() {
        const obstacles = [[1, 4], [3, 5], [7, 4]];

        return obstacles.some(([x, y]) => x === this.coordinate.x && y === this.coordinate.y);
    }

    reportCollision() {
        let collisionCoordinates = {
            x: this.coordinate.x,
            y: this.coordinate.y,
        }

        if (this.direction === 1) {
            collisionCoordinates.y += 1;
        } else if (this.direction === 2) {
            collisionCoordinates.x += 1;
        } else if (this.direction === 3) {
            collisionCoordinates.y -= 1;
        } else {
            collisionCoordinates.x -= 1;
        }

        return `(${collisionCoordinates.x}, ${collisionCoordinates.y}) ${this.directionMapper(this.direction, true)} STOPPED`;
    }

    getCoordinates() {
        const { x, y } = this.coordinate;

        return `(${x}, ${y}) ${this.directionMapper(this.direction, true)}`;
    }
}

module.exports = Rover;