"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.delGroup = exports.addGroup = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Group_1 = require("../models/Group");
exports.addGroup = function (req, res, next) {
    var title = req.body.data.title;
    var group = new Group_1.Group({ title: title });
    var retData = {
        status: 200,
        msg: '',
        data: {}
    };
    group.save(function (err, resGroup) {
        if (err) {
            next(err);
            retData.status = 500;
            retData.msg = '添加失败';
        }
        var _id = resGroup._id, title = resGroup.title;
        retData.data = {
            id: _id,
            title: title
        };
        res.send(retData);
    });
};
exports.delGroup = function (req, res, next) {
    // res.send('delGroup');
    var retData = {
        status: 200,
        msg: '完成',
        data: {}
    };
    var groupId = req.body.data.groupId;
    Group_1.Group.remove({ _id: mongoose_1["default"].Types.ObjectId(groupId) }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = 'failed';
            next(err);
        }
        res.send(retData);
    });
};
//# sourceMappingURL=group.js.map