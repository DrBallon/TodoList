"use strict";
exports.__esModule = true;
exports.delGroup = exports.addGroup = void 0;
var Group_1 = require("../models/Group");
var USER_ID = 0;
exports.addGroup = function (req, res, next) {
    var title = req.body.title;
    var group = new Group_1.Group({ title: title, _id: 0, user_id: 0 });
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
        // console.log('resGroup', resGroup);
        var id = resGroup._id, title = resGroup.title;
        retData.data = {
            id: id,
            title: title
        };
        res.send(retData);
    });
};
exports.delGroup = function (req, res, next) {
    var retData = {
        status: 200,
        msg: '完成',
        data: {}
    };
    var id = req.body.id;
    Group_1.Group.remove({ _id: id }, function (err) {
        if (err) {
            retData.status = 500;
            retData.msg = 'failed';
            next(err);
        }
        res.send(retData);
    });
};
//# sourceMappingURL=group.js.map