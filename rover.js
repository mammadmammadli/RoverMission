class Rover {
    coordinate = {
        x: 0,
        y: 0,
    };
    direction = null;

    move(directions) {
        directions.split('').forEach(direction => {
            switch (direction) {
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
        });
    }

    getCoordinates() {
        const { x, y } = this.coordinate;

        return `(${x}, ${y}) ${this.direction?.toUpperCase()}`;
    }
}

module.exports = Rover;