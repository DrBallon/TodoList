"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Counter = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var CounerSchema = new mongoose_1["default"].Schema({
    _id: { type: String, required: true },
    seq_val: { type: Number, "default": 0 }
});
exports.Counter = mongoose_1["default"].model('Counter', CounerSchema);
//# sourceMappingURL=Counter.js.map