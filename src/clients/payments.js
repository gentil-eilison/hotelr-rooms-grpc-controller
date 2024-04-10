const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/payments.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: false,
  arrays: false,
  objects: false,
  oneofs: false,
});

const PaymentController =
  grpc.loadPackageDefinition(packageDefinition).payment.PaymentService;
const client = new PaymentController(
  "127.0.0.1:50053",
  grpc.credentials.createInsecure()
);

module.exports = client;
