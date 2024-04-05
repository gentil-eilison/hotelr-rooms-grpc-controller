const express = require("express");
const cors = require("cors");
const roomsRouter = require("./rooms/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(roomsRouter);

app.listen(3000, function () {
  console.log("Controller Service running on port 3000");
});
