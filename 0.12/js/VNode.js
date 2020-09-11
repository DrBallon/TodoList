var VDom = /** @class */ (function () {
    function VDom(tagName, props, children) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }
    VDom.prototype.render = function () {
        //如果是文字节点的话
        if (this.tagName == '') {
            var content = typeof this.props['value'] == 'undefined' ? '' : this.props['value'];
            return document.createTextNode(content);
        }
        var element = document.createElement(this.tagName);
        this.setAttributes(element, this.props);
        if (this.children.length != 0) {
            var self_1 = this;
            this.children.forEach(function (VDom) {
                var tempEle = VDom.render();
                element.appendChild(tempEle);
            });
        }
        return element;
    };
    VDom.prototype.setAttributes = function (node, attrs) {
        for (var key in attrs) {
            node.setAttribute(key, attrs[key]);
        }
    };
    VDom.prototype.addChild = function (VDom) {
        this.children.push(VDom);
    };
    VDom.prototype.addAttr = function (attrName, attrVal) {
        this.props[attrName] = attrVal;
    };
    VDom.prototype.removeAttr = function (attrName) {
        delete this.props[attrName];
    };
    VDom.prototype.getProps = function () {
        return this.props;
    };
    return VDom;
}());
//   let tree = new VDom('div', { id: 'id1', class: 'div1' }, [
//     new VDom('div', { id: 'id2', class: 'div2' }, [
//       new VDom('div', { id: 'id5', class: 'div5' }, []),
//       new VDom('div', { id: 'id6', class: 'div6' }, []),
//       new VDom('div', { id: 'id7', class: 'div7' }, []),
//     ]),
//     new VDom('div', { id: 'id3', class: 'div3' }, []),
//     new VDom('div', { id: 'id4', class: 'div4' }, []),
//     new VDom('div', { class: 'div4' }, []),
//     new VDom('div', { class: 'div4' }, []),
//   ])
