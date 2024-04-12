const Client = require("./ClientMaker");

const client = new Client(
  "../proto/rooms.proto",
  "hotel_rooms.rooms.RoomController",
  "127.0.0.1:50054",
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
