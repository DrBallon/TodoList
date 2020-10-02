"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.addItem = exports.delItem = exports.editContent = exports.changGroup = exports.changeState = void 0;
var Item_1 = require("../models/Item");
var mongodb_1 = require("mongodb");
var mongoose_1 = __importDefault(require("mongoose"));
exports.changeState = function (req, res, next) {
    var targetId = req.body.data.id;
    var done = req.body.data.done;
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.updateOne({ _id: mongoose_1["default"].Types.ObjectId(targetId) }, { done: done }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.changGroup = function (req, res, next) {
    var targetId = req.body.data.id;
    var group = req.body.data.group;
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.updateOne({ _id: mongoose_1["default"].Types.ObjectId(targetId) }, { group: group }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.editContent = function (req, res, next) {
    var targetId = req.body.data.id;
    var content = req.body.data.content;
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.updateOne({ _id: mongoose_1["default"].Types.ObjectId(targetId) }, { content: content }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.delItem = function (req, res, next) {
    var targetId = req.body.data.id;
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.deleteOne({ _id: mongoose_1["default"].Types.ObjectId(targetId) }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.addItem = function (req, res, next) {
    // res.send('addItem');
    var obj = {
        user_id: new mongodb_1.ObjectID(),
        done: true,
        content: 'abc',
        group: 0,
        date: new Date()
    };
    var item = new Item_1.Item(obj);
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    item.save(function (err, resItem) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        var _id = resItem._id, done = resItem.done, content = resItem.content, group = resItem.group, date = resItem.date;
        retData.data = {
            id: _id,
            done: done,
            content: content,
            group: group,
            date: date
        };
        res.send(retData);
    });
};
//# sourceMappingURL=item.js.map