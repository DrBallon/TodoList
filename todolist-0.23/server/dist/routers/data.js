"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getData = void 0;
var mongodb_1 = require("mongodb");
var User_1 = require("../models/User");
var Item_1 = require("../models/Item");
var Group_1 = require("../models/Group");
var testUserId = new mongodb_1.ObjectID('5f7710672ae7c270cd646650');
function getData(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var retData, items, groups, curMode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    retData = {
                        curMode: 0,
                        groups: [],
                        list: []
                    };
                    return [4 /*yield*/, Item_1.Item.aggregate()
                            .project({ id: '$_id', done: 1, content: 1, group: 1, date: 1, _id: 0 })
                            .exec()];
                case 1:
                    items = _a.sent();
                    return [4 /*yield*/, Group_1.Group.aggregate().project({ id: '$_id', title: 1, _id: 0 }).exec()];
                case 2:
                    groups = _a.sent();
                    return [4 /*yield*/, User_1.User.findOne({ _id: testUserId }).exec()];
                case 3:
                    curMode = _a.sent();
                    items.forEach(function (item) { return retData.list.push(item); });
                    groups.forEach(function (group) { return retData.groups.push(group); });
                    retData.curMode = curMode.mode;
                    console.log(retData);
                    res.send({
                        status: 200,
                        msg: 'success',
                        data: retData
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getData = getData;
//# sourceMappingURL=data.js.map