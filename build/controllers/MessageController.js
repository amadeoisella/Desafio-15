"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const daos_1 = require("../daos");
class MessageController {
  static async getMessages(req, res) {
    const messages = await daos_1.Message.getAll();
    res.json(messages);
  }
}
exports.MessageController = MessageController;
