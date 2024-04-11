const Client = require("./ClientMaker");

const client = new Client(
  "../proto/credit_card.proto",
  "hotel_rooms_users_services.credit_card.CreditCardController",
  "127.0.0.1:50052",
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
