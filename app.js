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
    const rover = new Rover();
    rover.move(command);

    return res.json(rover.getCoordinates());
});

module.exports = app;