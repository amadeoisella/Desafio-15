"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const models_1 = require("../models");
class Product {
  static async create(data) {
    return models_1.ProductModel.create(data);
  }
  static async getAll() {
    return models_1.ProductModel.find();
  }
  static async getById(id) {
    return models_1.ProductModel.findById(id);
  }
  static async update(id, data) {
    return models_1.ProductModel.findByIdAndUpdate(id, data, { new: true });
  }
  static async delete(id) {
    return models_1.ProductModel.findByIdAndDelete(id);
  }
}
exports.Product = Product;
