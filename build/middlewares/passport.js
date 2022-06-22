"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const daos_1 = require("../daos");
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.use(
  new passport_local_1.Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await daos_1.User.getByEmail(email);
        if (!user) return done(null, false);
        const isValidPassword = await bcrypt_1.default.compare(
          password,
          user.password
        );
        if (!isValidPassword) return done(null, false);
        return done(null, user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);
passport_1.default.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});
passport_1.default.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
