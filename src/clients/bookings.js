const Client = require("./ClientMaker");

const client = new Client(
  "../proto/bookings.proto",
  "hotel_rooms.bookings.BookingController",
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
