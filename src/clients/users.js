const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../proto/users.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: false,
    arrays: false,
    objects: false,
    oneofs: false,
});

const UserController = grpc.loadPackageDefinition(packageDefinition).hotel_rooms_users_services.users.UserController;
const client = new UserController('127.0.0.1:50052', grpc.credentials.createInsecure());

module.exports = client;