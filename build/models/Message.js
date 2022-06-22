"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
  author: {
    id: String,
    name: String,
    lastname: String,
    alias: String,
    age: Number,
    avatar: String,
  },
  text: {
    type: String,
    required: true,
  },
  date: Date,
});
exports.MessageModel = mongoose_1.default.model("Message", MessageSchema);
