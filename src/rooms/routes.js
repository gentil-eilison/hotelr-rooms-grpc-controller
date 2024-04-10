const { Router } = require("express");
const rooms = require("../clients/rooms");
const constants = require("../constants");

router = Router();

router.get("/rooms", function (req, res) {
  rooms.List(null, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data.results);
    }
  });
});

router.post("/rooms", function (req, res) {
  rooms.Create(req.body, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data);
    }
  });
});

router.delete("/rooms/:roomId", function (req, res) {
  rooms.Destroy({ id: req.params.roomId }, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data);
    }
  });
});

router.put("/rooms/:roomId", function (req, res) {
  rooms.Update({ id: req.params.roomId, ...req.body }, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
