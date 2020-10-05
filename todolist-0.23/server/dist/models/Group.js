"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Group = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Counter_1 = require("../models/Counter");
var GroupSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true },
    user_id: { type: Number },
    title: { type: String }
}, { versionKey: false, _id: false });
GroupSchema.pre('save', function (next) {
    var group = this;
    Counter_1.Counter.findOneAndUpdate({ _id: 'groupid' }, { $inc: { seq_val: 1 } }, function (err, counter, res) {
        if (err || !counter) {
            console.log(err);
        }
        else {
            group._id = counter.seq_val;
        }
        next();
    });
});
exports.Group = mongoose_1["default"].model('Group', GroupSchema);
//# sourceMappingURL=Group.js.map