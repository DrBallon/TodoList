"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Group = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var GroupSchema = new mongoose_1["default"].Schema({
    id: { type: Number },
    title: { type: String }
}, { versionKey: false });
exports.Group = mongoose_1["default"].model('Group', GroupSchema);
//# sourceMappingURL=Group.js.map