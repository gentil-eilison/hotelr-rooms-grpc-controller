const { Router } = require("express");
const creditCard = require("../clients/credit_card");
const users = require("../clients/users");
const { isObjectEmpty, handlegRPCRequestError } = require("../utils");

const router = Router();

router.get("/credit_cards", function (req, res) {
  creditCard.service.List(null, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.json(data.results);
    }
  });
});

router.get("/credit_cards/:creditCardId", function (req, res) {
  creditCard.service.Retrieve(
    { id: req.params.creditCardId },
    function (err, data) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.json(data);
      }
    }
  );
});

router.post("/credit_cards", function (req, res) {
  const creditCardData = req.body;
  if (isObjectEmpty(creditCardData)) {
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }

  users.service.Retrieve({ id: creditCardData.owner }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    }
  });

  creditCard.service.Create(creditCardData, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    } else {
      res.status(201).json(data);
    }
  });
});

router.put("/credit_cards/:creditCardId", function (req, res) {
  const creditCardId = req.params.creditCardId;
  const creditCardData = req.body;
  if (isObjectEmpty(creditCardData)) {
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }

  users.service.Retrieve({ id: creditCardData.owner }, function (err, data) {
    if (err) {
      handlegRPCRequestError(req, res, err);
    }
  });

  creditCard.service.Update(
    { id: creditCardId, ...creditCardData },
    function (err, data) {
      if (err) {
        handlegRPCRequestError(req, res, err);
      } else {
        res.json(data);
      }
    }
  );
});

router.delete("/credit_cards/:creditCardId", function (req, res) {
  creditCard.service.Destroy(
    { id: req.params.creditCardId },
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
