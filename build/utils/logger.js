"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerError = exports.loggerWarning = exports.loggerInfo = void 0;
const log4js_1 = __importDefault(require("log4js"));
const path_1 = __importDefault(require("path"));
log4js_1.default.configure({
  appenders: {
    myConsoleLogger: { type: "console" },
    myWarningLogger: {
      type: "file",
      filename: path_1.default.join(__dirname, "../logs/warnings.log"),
    },
    myErrorLogger: {
      type: "file",
      filename: path_1.default.join(__dirname, "../logs/error.log"),
    },
  },
  categories: {
    default: { appenders: ["myConsoleLogger"], level: "debug" },
    loggerInfo: { appenders: ["myConsoleLogger"], level: "info" },
    loggerWarning: {
      appenders: ["myConsoleLogger", "myWarningLogger"],
      level: "warn",
    },
    loggerError: {
      appenders: ["myConsoleLogger", "myErrorLogger"],
      level: "error",
    },
  },
});
exports.loggerInfo = log4js_1.default.getLogger("loggerInfo");
exports.loggerWarning = log4js_1.default.getLogger("loggerWarning");
exports.loggerError = log4js_1.default.getLogger("loggerError");
