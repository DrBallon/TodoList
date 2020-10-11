"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true },
    username: { type: String },
    password: { type: String },
    curMode: { type: Number },
    groups: { type: Array }
}, { versionKey: false, _id: false });
exports.User = mongoose_1["default"].model('User', UserSchema);
//# sourceMappingURL=User.js.map