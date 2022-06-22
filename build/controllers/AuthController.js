"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const daos_1 = require("../daos");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
  static async main(req, res) {
    if (!req.user) {
      return res.redirect("/login");
    }
    const productos = await daos_1.Product.getAll();
    let messages = await daos_1.Message.getAll();
    res.render("main", { title: "Productos", productos, messages });
  }
  static async renderLogin(req, res) {
    res.render("login", { title: "Login" });
  }
  static async renderRegister(req, res) {
    res.render("register", { title: "Login" });
  }
  static async register(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        return res.json({
          error: true,
          message: "Missing information",
        });
      }
      const user = await daos_1.User.getByEmail(req.body.email);
      if (user)
        return res.json({ error: true, message: "Email ya registrado" });
      const hashedPw = await bcrypt_1.default.hash(req.body.password, 10);
      await daos_1.User.create({
        email: req.body.email,
        password: hashedPw,
      });
      res.json({
        error: false,
        message: "Usuario creado correctamente",
      });
    } catch (err) {
      console.log(err);
      return res.json({ error: err });
    }
  }
  static async login(req, res) {
    return res.json({
      redirect: "/",
    });
  }
  static async logout(req, res) {
    if (!req.user) return res.redirect("/login");
    const email = req.user.email;
    req.logout((err) => {
      if (err) return;
      return res.render("logout", { title: "Logout", name: email });
    });
  }
}
exports.AuthController = AuthController;
