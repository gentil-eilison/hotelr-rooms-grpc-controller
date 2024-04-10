const constants = require("./constants");

function isObjectEmpty(obj) {
  if (typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }
  return false;
}

function handlegRPCRequestError(req, res, err) {
  const statusCode = constants.GRPC_STATUS_CODES[err.code];
  return res.status(statusCode).json({ error: JSON.parse(err.details) });
}

module.exports = { isObjectEmpty, handlegRPCRequestError };
