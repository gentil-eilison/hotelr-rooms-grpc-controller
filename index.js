const express = require("express");
const rooms = require("./rooms");
const cors = require("cors");
const constants = require("./constants");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/rooms", function (req, res) {
  rooms.List(null, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data.results);
    }
  });
});

app.post("/rooms", function (req, res) {
  rooms.Create(req.body, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function () {
  console.log("Controller Service running on port 3000");
});
