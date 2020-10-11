"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Item = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Counter_1 = require("./Counter");
var ItemSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true },
    user_id: { type: Number },
    done: { type: Boolean },
    content: { type: String },
    group: { type: Number }
}, { versionKey: false, _id: false });
ItemSchema.pre('save', function (next) {
    var item = this;
    Counter_1.Counter.findOneAndUpdate({ _id: 'itemid' }, { $inc: { seq_val: 1 } }, function (err, counter) {
        if (err || !counter) {
            console.log(err);
        }
        else {
            item._id = counter.seq_val;
        }
        next();
    });
});
exports.Item = mongoose_1["default"].model('Item', ItemSchema);
//# sourceMappingURL=Item.js.map