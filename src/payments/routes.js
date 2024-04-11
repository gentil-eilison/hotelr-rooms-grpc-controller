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
      res.json(data);
    }
  });
});

router.post("/payments", (req, res) => {
  const payment = req.body;
  if (isObjectEmpty(payment)) {
    res.status(400).json({ error: "Payment object is empty" });
  }

  bookings.service.Retrieve({ id: payment.bookingId }, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      payments.service.Insert(payment, (err, data) => {
        if (err) {
          handlegRPCRequestError(req, res, err);
        } else {
          res.status(201).json(data);
        }
      });
    }
  });
});

router.put("/payments/:paymentId", (req, res) => {
  const paymentId = req.params.paymentId;
  const payment = req.body;
  if (isObjectEmpty(payment)) {
    res.status(400).json({ error: "Payment object is empty" });
  } else {
    payments.service.Update(
      { paymentId: paymentId, ...payment },
      (err, data) => {
        if (err) {
          handlegRPCRequestError(req, res, err);
        } else {
          res.status(200).json(data);
        }
      }
    );
  }
});

router.get("/payments/:paymentId", (req, res) => {
  const paymentId = req.params.paymentId;
  payments.service.Find({ paymentId: paymentId }, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.delete("/payments/:paymentId", (req, res) => {
  const paymentId = req.params.paymentId;
  payments.service.Remove({ paymentId: paymentId }, (err, data) => {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(204).json({ message: "Payment successfully deleted." });
    }
  });
});

module.exports = router;
