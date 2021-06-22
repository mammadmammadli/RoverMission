const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Rover = require("./rover");

app.use(bodyParser.json())

app.get("/health-check", (_, res) => {
    return res.status(200).send("ok");
});

app.post("/move", (req, res) => {
    const { command } = req.body;
    try {
        const rover = new Rover(4, 2, "EAST");
        rover.moveByCommand(command);
        return res.json(rover.getCoordinates());
    } catch (e) {
        throw new Error(e.message);
    }
});

module.exports = app;