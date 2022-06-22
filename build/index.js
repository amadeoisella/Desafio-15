"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const minimist_1 = __importDefault(require("minimist"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const express_1 = require("./config/express");
const db_1 = require("./config/db");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const daos_1 = require("./daos");
require("./middlewares/passport");
dotenv_1.default.config();
const totalCPUs = (0, os_1.cpus)().length;
const args = (0, minimist_1.default)(process.argv.slice(2));
const PORT = args.port || 3001;
const main = async () => {
  await (0, db_1.connectDb)();
  console.log(`Worker ${process.pid} started`);
  const app = (0, express_1.createApp)();
  const server = http_1.default.createServer(app);
  const io = new socket_io_1.Server(server);
  io.on("connection", (socket) => {
    console.log("New conection", socket.id);
    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
    socket.on("add-product", async (product) => {
      await daos_1.Product.create(product);
      io.emit("update-products", product);
    });
    socket.on("message", async (message) => {
      const data = {
        author: {
          id: message.author.id,
          name: message.author.nombre,
          lastname: message.author.apellido,
          alias: message.author.alias,
          age: message.author.edad,
          avatar: message.author.avatar,
        },
        text: message.text,
        date: new Date(),
      };
      await daos_1.Message.create(data);
      io.emit("message", data);
    });
  });
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
  });
  server.on("error", (err) => {
    console.log(`Algo salio mal: ${err}`);
  });
};
const MODE = args.mode || "FORK";
if (MODE === "CLUSTER") {
  if (cluster_1.default.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < totalCPUs; i++) {
      cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster_1.default.fork();
    });
  } else {
    main().catch((err) => console.log(err));
  }
} else {
  main().catch((err) => console.log(err));
}
