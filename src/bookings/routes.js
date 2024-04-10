const { Router } = require("express");
const bookings = require("../clients/bookings");
const users = require("../clients/users");
const constants = require("../constants");
const { isObjectEmpty } = require("../utils");

router = Router();

router.get("/bookings", function (req, res) {
  bookings.List(null, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data.results);
    }
  });
});

router.get("/bookings/:bookingId", function (req, res) {
  bookings.Retrieve({ id: req.params.bookingId }, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data);
    }
  });
});

router.post("/bookings", function (req, res) {
  const user_id = req.body.user_id;
  if (isObjectEmpty(user_id)) {
    res.status(400).json({ error: "user_id is required" });
    return;
  }
  users.Retrieve({ id: user_id }, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      bookings.Create(req.body, function (err, data) {
        if (err) {
          const statusCode = constants.GRPC_STATUS_CODES[err.code];
          res.status(statusCode).json({ error: JSON.parse(err.details) });
        } else {
          res.status(201).json(data.results);
        }
      });
    }
  });
});

router.put("/bookings/:bookingId", function (req, res) {
  bookings.Update(
    { id: req.params.bookingId, ...req.body },
    function (err, data) {
      if (err) {
        const statusCode = constants.GRPC_STATUS_CODES[err.code];
        res.status(statusCode).json({ error: JSON.parse(err.details) });
      } else {
        res.json(data);
      }
    }
  );
});

router.delete("/bookings/:bookingId", function (req, res) {
  bookings.Destroy({ id: req.params.bookingId }, function (err, data) {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.status(204).json(data);
    }
  });
});

module.exports = router;
