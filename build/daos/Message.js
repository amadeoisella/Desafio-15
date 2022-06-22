"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const models_1 = require("../models");
class Message {
  static async create(data) {
    return models_1.MessageModel.create(data);
  }
  static async getAll() {
    return models_1.MessageModel.find();
  }
  static async getById(id) {
    return models_1.MessageModel.findById(id);
  }
  static async update(id, data) {
    return models_1.MessageModel.findByIdAndUpdate(id, data, { new: true });
  }
  static async delete(id) {
    return models_1.MessageModel.findByIdAndDelete(id);
  }
}
exports.Message = Message;
