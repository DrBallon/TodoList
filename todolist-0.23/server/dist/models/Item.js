"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Item = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_1 = require("mongodb");
var ItemSchema = new mongoose_1["default"].Schema({
    //   id: { type: Number },
    user_id: { type: mongodb_1.ObjectID },
    done: { type: Boolean },
    content: { type: String },
    group: { type: Number },
    date: { type: Date }
}, { versionKey: false });
// ItemSchema.virtual('id').get(function () {
//   return this._id;
// });
exports.Item = mongoose_1["default"].model('Item', ItemSchema);
//# sourceMappingURL=Item.js.map