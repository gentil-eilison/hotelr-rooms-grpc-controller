const { Router } = require("express");
const bookings = require("../clients/bookings");
const payments = require("../clients/payments");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");

const router = Router();

router.get("/payments", (req, res) => {
  payments.service.List(null, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.results);
    }
  });
});

router.post("/payments", (req, res) => {
  const payment = req.body;
  if (isObjectEmpty(payment)) {
    res.status(400).json({ error: "Payment object is empty" });
    return;
  }

  bookings.service.Retrieve({ id: payment.booking_id }, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    }
  });

  payments.service.Create(payment, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(201).json(data);
    }
  });
});

router.delete("/payments/:paymentId", (req, res) => {
  const paymentId = req.params.paymentId;
  payments.service.Remove({ paymentId: paymentId }, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(204).json(data);
    }
  });
});

module.exports = router;
