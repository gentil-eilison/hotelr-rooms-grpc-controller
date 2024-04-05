const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./proto/rooms.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: false,
    arrays: false,
    objects: false,
    oneofs: false,
    arrays: false,
})

const RoomController = grpc.loadPackageDefinition(packageDefinition).hotel_rooms.rooms.RoomController;
const client = new RoomController('127.0.0.1:50051', grpc.credentials.createInsecure());

// console.log(grpc.loadPackageDefinition(packageDefinition))

module.exports = client;