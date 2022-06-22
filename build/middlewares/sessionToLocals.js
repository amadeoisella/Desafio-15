"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionToLocals = void 0;
async function sessionToLocals(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
}
exports.sessionToLocals = sessionToLocals;
