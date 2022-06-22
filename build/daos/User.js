"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const models_1 = require("../models");
class User {
  static async create(data) {
    return models_1.UserModel.create(data);
  }
  static async getAll() {
    return models_1.UserModel.find();
  }
  static async getById(id) {
    return models_1.UserModel.findById(id);
  }
  static async getByEmail(email) {
    return models_1.UserModel.findOne({ email });
  }
  static async update(id, data) {
    return models_1.UserModel.findByIdAndUpdate(id, data, { new: true });
  }
  static async delete(id) {
    return models_1.UserModel.findByIdAndDelete(id);
  }
}
exports.User = User;
