const { Router } = require("express");
const rooms = require("../clients/rooms");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");

const router = Router();

router.get("/rooms", function (req, res) {
  rooms.service.List(null, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.results);
    }
  });
});

router.get("/rooms/:roomId", function (req, res) {
  rooms.service.Retrieve({ id: req.params.roomId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data);
    }
  });
});

router.post("/rooms", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Room object is empty" });
    return;
  }

  rooms.service.Create(req.body, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data);
    }
  });
});

router.delete("/rooms/:roomId", function (req, res) {
  rooms.service.Destroy({ id: req.params.roomId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data);
    }
  });
});

router.put("/rooms/:roomId", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Room object is empty" });
    return;
  }

  rooms.client.Update(
    { id: req.params.roomId, ...req.body },
    function (err, data) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.json(data);
      }
    }
  );
});

module.exports = router;
