const express = require("express");
const app = express();

app.get("/health-check", (_, res) => {
    res.status(200).send("ok");
});

module.exports = app;