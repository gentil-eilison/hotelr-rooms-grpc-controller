const { Router } = require("express");
const bookings = require("../clients/bookings");
const payments = require("../clients/payments");
const constants = require("../constants");
const { isObjectEmpty } = require("../utils");

router = Router();

router.get("/payments", (req, res) => {
  payments.List(null, (err, data) => {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.json(data.results);
    }
  });
});

router.post("/payments", (req, res) => {
  const payment = req.body;
  if (isObjectEmpty(payment)) {
    res.status(400).json({ error: "Payment object is empty" });
  } else {
    const bookingId = bookings.Retrieve(
      { id: payment.bookingId },
      (err, data) => {
        if (err) {
          const statusCode = constants.GRPC_STATUS_CODES[err.code];
          res.status(statusCode).json({ error: JSON.parse(err.details) });
        } else {
          payments.Create(payment, (err, data) => {
            if (err) {
              const statusCode = constants.GRPC_STATUS_CODES[err.code];
              res.status(statusCode).json({ error: JSON.parse(err.details) });
            } else {
              res.status(201).json(data.results);
            }
          });
        }
      }
    );
  }
});

router.delete("/payments/:paymentId", (req, res) => {
  const paymentId = req.params.paymentId;
  payments.Remove({ paymentId: paymentId }, (err, data) => {
    if (err) {
      const statusCode = constants.GRPC_STATUS_CODES[err.code];
      res.status(statusCode).json({ error: JSON.parse(err.details) });
    } else {
      res.status(204).json(data);
    }
  });
});

module.exports = router;
