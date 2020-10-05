"use strict";
exports.__esModule = true;
exports.addItem = exports.delItem = exports.clearItem = exports.editContent = exports.changGroup = exports.changeState = void 0;
var Item_1 = require("../models/Item");
var USER_ID = 0;
exports.changeState = function (req, res, next) {
    var _a = req.body, id = _a.id, done = _a.done;
    console.log('body:', req.body);
    console.log(id, done);
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.updateOne({ _id: id }, { done: done }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.changGroup = function (req, res, next) {
    var _a = req.body, id = _a.id, group = _a.group;
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.updateOne({ _id: id }, { group: group }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.editContent = function (req, res, next) {
    var _a = req.body, id = _a.id, content = _a.content;
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.updateOne({ _id: id }, { content: content }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.clearItem = function (req, res, next) {
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    console.log('clear');
    Item_1.Item.deleteMany({ user_id: USER_ID }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.delItem = function (req, res, next) {
    var id = req.body.id;
    var retData = {
        status: 200,
        msg: '成功',
        data: {}
    };
    Item_1.Item.deleteOne({ _id: id }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = '失败';
            next(err);
        }
        res.send(retData);
    });
};
exports.addItem = function (req, res, next) {
    var _a = req.body, _b = _a.userId, userId = _b === void 0 ? 0 : _b, content = _a.content;
    // res.send('addItem');
    var obj = {
        _id: 0,
        user_id: userId,
        done: false,
        content: content,
        group: -1
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
        var _id = resItem._id, done = resItem.done, content = resItem.content, group = resItem.group;
        retData.data = {
            id: _id,
            done: done,
            content: content,
            group: group
        };
        res.send(retData);
    });
};
//# sourceMappingURL=item.js.map