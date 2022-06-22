"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const express_handlebars_1 = require("express-handlebars");
const middlewares_1 = require("../middlewares");
const passport_1 = __importDefault(require("passport"));
const compression_1 = __importDefault(require("compression"));
const utils_1 = require("../utils");
const createApp = () => {
  const app = (0, express_1.default)();
  app.use((0, compression_1.default)());
  app.use(express_1.default.static("public"));
  app.use(express_1.default.json());
  app.use(express_1.default.urlencoded({ extended: true }));
  app.use(
    (0, express_session_1.default)({
      secret: "foo",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 10,
      },
      store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: "ecommerce",
        collectionName: "sessions",
      }),
    })
  );
  app.use(passport_1.default.authenticate("session"));
  app.use(middlewares_1.sessionToLocals);
  app.engine(
    "hbs",
    (0, express_handlebars_1.engine)({
      layoutsDir: __dirname + "/../../views/layouts",
      partialsDir: __dirname + "/../../views/partials",
      defaultLayout: "index",
      extname: "hbs",
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
      },
    })
  );
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/../../views");
  app.use((req, res, next) => {
    utils_1.loggerInfo.info(`${req.method} ${req.url}`);
    next();
  });
  app.use(routes_1.default);
  app.get("/health", (_req, res) => {
    res.send("Running");
  });
  app.all("*", (req, res) => {
    utils_1.loggerWarning.warn(`${req.method} ${req.url} not implemented`);
    res.status(404).send("404 Not Found");
  });
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ err, message: "Something went wrong, sorry" });
  });
  return app;
};
exports.createApp = createApp;
