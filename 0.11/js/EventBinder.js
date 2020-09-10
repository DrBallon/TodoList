var EventNode = /** @class */ (function () {
    function EventNode(selector) {
        this.selector = selector;
        this.indexes = [];
        this.events = [];
    }
    EventNode.prototype.addEvent = function (type, func) {
        if (typeof this.events[type] == 'undefined') {
            this.events[type] = [];
        }
        this.events[type].push(func);
        return this;
    };
    EventNode.prototype.delEvent = function (type, func) {
        if (typeof this.events[type] == 'undefined')
            return;
        if (this.events[type].indexOf(func) != -1) {
            this.events[type].splice(this.events[type].indexOf(func), 1);
        }
        return this;
    };
    EventNode.prototype.addIndexes = function (indexes) {
        var _this = this;
        indexes.forEach(function (index) {
            if (_this.indexes.indexOf(index) == -1) {
                _this.indexes.push(index);
            }
        });
        return this;
    };
    EventNode.prototype.deleteIndex = function (index) {
        if (this.indexes.indexOf(index) != -1) {
            this.indexes.splice(this.indexes.indexOf(index), 1);
        }
        return this;
    };
    EventNode.prototype.getSelector = function () {
        return this.selector;
    };
    EventNode.prototype.getEvents = function () {
        return this.events;
    };
    EventNode.prototype.getIndexes = function () {
        return this.indexes;
    };
    return EventNode;
}());
var EventNodeBinder = /** @class */ (function () {
    function EventNodeBinder(eventNodes) {
        this.eventNodes = eventNodes;
    }
    EventNodeBinder.prototype.addNode = function (eventNode) {
        this.eventNodes.push(eventNode);
    };
    EventNodeBinder.prototype.removeNode = function (targetNode) {
        if (this.eventNodes.length == 0)
            return;
        if (this.eventNodes.indexOf(targetNode) != -1) {
            this.eventNodes.splice(this.eventNodes.indexOf(targetNode), 1);
        }
        return this;
    };
    EventNodeBinder.prototype.attachEvents = function (rootNode) {
        if (typeof rootNode == 'undefined')
            return;
        var eventTree = {};
        this.eventNodes.forEach(function (node) {
            // console.log(node.getEvents());
            eventTree[node.getSelector()] = {};
            eventTree[node.getSelector()]['events'] = node.getEvents();
            eventTree[node.getSelector()]['indexes'] = node.getIndexes();
        });
        var _loop_1 = function (selector) {
            // console.log(selector);
            //判断是否有指定索引
            var indexes = eventTree[selector].indexes;
            // console.log(eventTree[selector]);
            if (typeof indexes == 'undefined' || indexes.length == 0) {
                //根据选择器查找元素
                var eles = rootNode.querySelectorAll(selector);
                // console.log(ele);
                if (!eles)
                    return { value: void 0 };
                // console.log(events[selector]);
                eles.forEach(function (ele) {
                    var _loop_2 = function (eventName) {
                        eventTree[selector].events[eventName].forEach(function (func) {
                            ele.addEventListener(eventName, func);
                        });
                    };
                    for (var eventName in eventTree[selector].events) {
                        _loop_2(eventName);
                    }
                });
            }
            else {
                var eles_1 = rootNode.querySelectorAll(selector);
                //遍历需要绑定的索引
                indexes.forEach(function (index) {
                    if (index > eles_1.length - 1 || index < 0)
                        return;
                    var _loop_3 = function (eventName) {
                        //遍历该种事件的所有事件
                        eventTree[selector].events[eventName].forEach(function (func) {
                            eles_1[index].addEventListener(eventName, func);
                        });
                    };
                    //遍历事件的种类
                    for (var eventName in eventTree[selector].events) {
                        _loop_3(eventName);
                    }
                });
            }
        };
        // console.log(eventTree)
        // console.log(eventTree)
        //遍历选择器
        for (var selector in eventTree) {
            var state_1 = _loop_1(selector);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    return EventNodeBinder;
}());
