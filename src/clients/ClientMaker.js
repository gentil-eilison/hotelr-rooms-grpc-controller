const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

class Client {
  constructor(protoFilePath, protoPackageService, serverAddress, settings) {
    this.protoFilePath = protoFilePath;
    this.protoPackageService = protoPackageService;
    this.serverAddress = serverAddress;
    this.settings = settings;
    this.service = this.#createClient();
  }

  #createClient() {
    const packageDefinition = protoLoader.loadSync(
      this.protoFilePath,
      this.settings
    );
    const ServiceController = eval(
      `grpc.loadPackageDefinition(packageDefinition).${this.protoPackageService}`
    );
    return new ServiceController(
      this.serverAddress,
      grpc.credentials.createInsecure()
    );
  }
}

module.exports = Client;
