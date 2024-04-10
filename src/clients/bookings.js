const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/bookings.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: false,
  arrays: false,
  objects: false,
  oneofs: false,
});

const BookingController =
  grpc.loadPackageDefinition(packageDefinition).hotel_rooms.bookings
    .BookingController;
const client = new BookingController(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;
