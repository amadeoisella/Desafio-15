"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_child_process_1 = require("node:child_process");
const node_path_1 = __importDefault(require("node:path"));
const os_1 = require("os");
const passport_1 = __importDefault(require("passport"));
const controllers_1 = require("../controllers");
const daos_1 = require("../daos");
const router = (0, express_1.Router)();
router.get("/api/messages", controllers_1.MessageController.getMessages);
router.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const productos = await daos_1.Product.getAll();
  let messages = await daos_1.Message.getAll();
  res.render("main", { title: "Productos", productos, messages });
});
router.get("/login", controllers_1.AuthController.renderLogin);
router.get("/register", controllers_1.AuthController.renderRegister);
router.post("/register", controllers_1.AuthController.register);
router.post(
  "/login",
  passport_1.default.authenticate("local", { session: true }),
  controllers_1.AuthController.login
);
router.get("/logout", controllers_1.AuthController.logout);
router.get("/info", async (req, res) => {
  const info = {
    args: process.argv.slice(2),
    os: process.platform,
    node_v: process.version,
    memory: process.memoryUsage().heapUsed,
    path: process.execPath,
    pid: process.pid,
    dir: process.cwd(),
    cpus: (0, os_1.cpus)().length,
  };
  res.render("info", { title: "Info", info });
});
router.get("/api/random", (req, res) => {
  const amount = parseInt(req.query.cant) || 100_000_000;
  const forked = (0, node_child_process_1.fork)(
    node_path_1.default.join(__dirname, "./random.js")
  );
  forked.send({ start: true, amount });
  forked.on("message", (result) => {
    res.json(result);
  });
});
exports.default = router;
