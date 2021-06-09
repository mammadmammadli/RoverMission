class Rover {
    coordinate = {
        x: 0,
        y: 0,
    };
    direction = null;

    move(directions) {
        let hasCollapsed = false;

        for (let i = 0; i < directions.split('').length; i++) {
            switch (directions[i]) {
                case "F":
                    this.coordinate.y += 1;
                    this.direction = "North";
                    break;
                case "B":
                    this.coordinate.y -= 1;
                    this.direction = "South";
                    break;
                case "L":
                    this.coordinate.x -= 1;
                    this.direction = "West";
                    break;
                case "R":
                    this.coordinate.x += 1;
                    this.direction = "East";
                    break;
                default:
            }

            hasCollapsed = this.checkIfThereIsAnCollision();
            if (hasCollapsed) {
                const crashCoordinate = this.coordinate;

                switch (this.direction) {
                    case "East":
                        crashCoordinate.x++;
                        break;
                    case "West":
                        crashCoordinate.x--;
                        break;
                    case "South":
                        crashCoordinate.y--;
                        break;
                    case "North":
                        crashCoordinate.y++;
                        break;
                }
                return { collapseReport: `(${crashCoordinate.x}, ${crashCoordinate.y}) ${this.direction.toUpperCase()} STOPPED` };
            }
        }

    }

    checkIfThereIsAnCollision() {
        const obstacles = [[1, 4], [3, 5], [7, 4]];

        return obstacles.some(([x, y]) => x === this.coordinate.x && y === this.coordinate.y);
    }

    getCoordinates() {
        const { x, y } = this.coordinate;

        return `(${x}, ${y}) ${this.direction?.toUpperCase()}`;
    }
}

module.exports = Rover;