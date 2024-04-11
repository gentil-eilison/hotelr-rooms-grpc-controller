const { Router } = require("express");
const bookings = require("../clients/bookings");
const users = require("../clients/users");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");

const router = Router();

router.get("/bookings", function (req, res) {
  bookings.service.List(null, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.results);
    }
  });
});

router.get("/bookings/:bookingId", function (req, res) {
  bookings.service.Retrieve({ id: req.params.bookingId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data);
    }
  });
});

router.post("/bookings", function (req, res) {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).json({ error: "user_id is required" });
    return;
  }

  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Booking object is empty" });
    return;
  }

  users.service.Retrieve({ id: user_id }, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    }
  });

  bookings.service.Create(req.body, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(201).json(data);
    }
  });
});

router.put("/bookings/:bookingId", function (req, res) {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(400).json({ error: "user_id is required" });
    return;
  }

  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "Booking object is empty" });
    return;
  }

  users.service.Retrieve({ id: user_id }, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    }
  });

  bookings.service.Update(
    { id: req.params.bookingId, ...req.body },
    function (err, data) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.json(data);
      }
    }
  );
});

router.delete("/bookings/:bookingId", function (req, res) {
  bookings.Destroy({ id: req.params.bookingId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(204).json(data);
    }
  });
});

module.exports = router;
