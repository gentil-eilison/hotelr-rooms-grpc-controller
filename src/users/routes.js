const { Router } = require("express");
const users = require("../clients/users");
const bookings = require("../clients/bookings");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");

const router = Router();

router.get("/users", function (req, res) {
  users.service.List(null, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.results);
    }
  });
});

router.get("/users/:userId", function (req, res) {
  users.service.Retrieve({ id: req.params.userId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data);
    }
  });
});

router.post("/users", function (req, res) {
  if (isObjectEmpty(req.body)) {
    res.status(400).json({ error: "User object is empty" });
    return;
  }

  users.service.Create(req.body, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(201).json(data);
    }
  });
});

router.put("/users/:userId", function (req, res) {
  const userId = req.params.userId;
  users.service.Update({ id: userId, ...req.body }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data);
    }
  });
});

router.delete("/users/:userId", function (req, res) {
  users.service.Destroy({ id: req.params.userId }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      bookings.service.List(null, function (err, bookingsResponse) {
        if (err) {
          handlegRPCRequestError(req, res, err);
        }
        bookingsResponse.results.forEach((booking) => {
          if (booking.user_id == req.params.userId) {
            bookings.service.Destroy(
              { id: booking.id },
              function (err, data) {}
            );
          }
        });
        res.status(204).json(data);
      });
    }
  });
});

module.exports = router;
