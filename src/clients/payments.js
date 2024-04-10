const Client = require("./ClientMaker");

const client = new Client(
  "../proto/payments.proto",
  "payment.PaymentService",
  "127.0.0.1:50053",
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: false,
    arrays: false,
    objects: false,
    oneofs: false,
  }
);

module.exports = client;
