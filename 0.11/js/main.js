/*
    localstorage 数据 get,set,clear
*/
function getLsData() {
    return JSON.parse(window.localStorage.getItem('data'));
}
function setLsData() {
    window.localStorage.setItem('data', JSON.stringify(data));
}
function clearLsData() {
    window.localStorage.clear();
    data = {
        curMode: 0,
        groups: [],
        list: [],
    };
    render(data.curMode);
}
/*
    操作item数据
*/
//添加
function addItem(content) {
    var id = 0;
    if (data.list.length != 0)
        id = data.list[data.list.length - 1].id + 1;
    var item = {
        id: id,
        done: false,
        content: content,
    };
    data.list.push(item);
    render(data.curMode);
}
//删除
function delItem(item) {
    data.list.splice(data.list.indexOf(item), 1);
    render(data.curMode);
}
//编辑内容
function editItem(id, content) {
    console.log(content);
    data.list.forEach(function (item) {
        if (item.id == id) {
            item.content = content;
        }
    });
    render(data.curMode);
}
//改变状态
function stateChange(id) {
    data.list.forEach(function (item) {
        if (item.id == id) {
            item.done = !item.done;
        }
    });
    render(data.curMode);
}
//修改分组
function groupChange(id, groupId) {
    data.list.forEach(function (item) {
        if (item.id == id) {
            if (groupId == -1) {
                delete item.group;
            }
            else {
                item['group'] = groupId;
            }
        }
    });
    render(data.curMode);
}
//增加分组
function addGroup(title) {
    if (title == '')
        return;
    for (var i = 0; i < data.groups.length; i++) {
        if (data.groups[i].title == title) {
            return;
        }
    }
    var id = 0;
    if (data.groups.length != 0) {
        id = data.groups[data.groups.length - 1].id + 1;
    }
    data.groups.push({
        id: id,
        title: title,
    });
    render(data.curMode);
}
//删除分组
function delGroup(groupId) {
    data.groups = data.groups.filter(function (group) {
        return group.id != groupId;
    });
    data.list.forEach(function (item) {
        if (item.group == groupId)
            delete item.group;
    });
    render(data.curMode);
}
//数据
var data = {
    curMode: 0,
    groups: [],
    list: [],
};
//dom树生成函数
function getSelect(item) {
    var select = new VDom('select', {}, []);
    var defaultOption = null;
    select.addChild((defaultOption = new VDom('option', { value: '-1' }, [new VDom('', { value: '未分组' }, [])])));
    if (typeof item.group == 'undefined') {
        defaultOption.addAttr('selected', 'selected');
    }
    data.groups.forEach(function (group) {
        var option = new VDom('option', { value: group.id }, [new VDom('', { value: group.title }, [])]);
        // console.log(item.group, group.id)
        if (item.group == group.id) {
            option.addAttr('selected', 'selected');
        }
        select.addChild(option);
    });
    return new VDom('div', { class: 'select' }, [select]);
}
function getItem(item, mode) {
    var classes = item.done ? 'done-item item' : 'todo-item item';
    var checkbox = null;
    var tempItem = new VDom('li', { class: classes, id: item.id }, [
        (checkbox = new VDom('input', { type: 'checkbox', class: 'item-state' }, [])),
        new VDom('input', { type: 'text', class: 'item-input', value: item.content }, []),
        new VDom('span', { class: 'del-btn' }, [new VDom('', { value: 'X' }, [])]),
    ]);
    if (item.done) {
        checkbox.addAttr('checked', 'checked');
    }
    if (mode == 1) {
        var select = getSelect(item);
        // console.log(select)
        tempItem.addChild(select);
    }
    return tempItem;
}
function getGroup(mode, group, list) {
    //   console.log(list)
    var toolbar = null;
    var ul = null;
    var groupNode = new VDom('div', { class: 'group clearfix' }, [
        new VDom('div', { class: 'title clearfix' }, [
            new VDom('h2', {}, [new VDom('', { value: group.title }, [])]),
            (toolbar = new VDom('div', { class: 'toolbar clearfix' }, [
                new VDom('span', { class: 'iconfont drop-down list-toggle' }, []),
            ])),
        ]),
        new VDom('div', { class: 'list' }, [(ul = new VDom('ul', {}, []))]),
    ]);
    if (mode == 1 && group.id != -1) {
        toolbar.addChild(new VDom('span', { class: 'circle del-group', id: group.id }, [new VDom('', { value: '删除分组' }, [])]));
    }
    list.forEach(function (item) {
        ul.addChild(getItem(item, mode));
    });
    return groupNode;
}
function getContent(mode) {
    var fragment = document.createDocumentFragment();
    //分组
    if (mode == 0) {
        var todoList_1 = [];
        var doneList_1 = [];
        data.list.forEach(function (item) { return (item.done ? doneList_1.push(item) : todoList_1.push(item)); });
        var todoGroup = getGroup(mode, { id: -1, title: '正在进行' }, todoList_1).render();
        var doneGroup = getGroup(mode, { id: -1, title: '已完成' }, doneList_1).render();
        fragment.appendChild(todoGroup);
        fragment.appendChild(doneGroup);
    }
    if (mode == 1) {
        //将item分组
        var groupedItems_1 = {};
        data.groups.forEach(function (group) {
            groupedItems_1[group.id] = [];
        });
        groupedItems_1['default'] = [];
        data.list.forEach(function (item) {
            if (typeof item.group != 'undefined') {
                groupedItems_1[item.group].push(item);
            }
            else {
                groupedItems_1['default'].push(item);
            }
        });
        // console.log(groupedItems)
        data.groups.forEach(function (group) {
            //   console.log(group)
            var tempGroup = getGroup(mode, group, groupedItems_1[group.id]).render();
            fragment.appendChild(tempGroup);
        });
        var tempGroup = getGroup(mode, { id: -1, title: '未分组' }, groupedItems_1['default']).render();
        fragment.appendChild(tempGroup);
    }
    return fragment;
}
//绑定数据
function attachEvents(mode) {
    //通用
    //checkbox事件
    var body = document.querySelector('body');
    var ens = [];
    var checkbox = new EventNode('.item-state');
    var delItemBtn = new EventNode('.del-btn');
    var itemImput = new EventNode('.item-input');
    var listToggle = new EventNode('.list-toggle');
    ens = [checkbox, delItemBtn, itemImput, listToggle];
    //任务条状态改变
    checkbox.addEvent('click', function (e) {
        // console.log("状态改变");
        var id = e.target.parentNode.attributes['id'].value;
        stateChange(id);
    });
    //任务条删除按钮
    delItemBtn.addEvent('click', function (e) {
        // console.log("删除item");
        var id = e.target.parentNode.attributes['id'].value;
        delItem(id);
    });
    //任务条编辑内容
    itemImput.addEvent('focus', function (e) {
        e.target.setAttribute('oldValue', e.target.value);
    });
    itemImput.addEvent('blur', function (e) {
        var id = e.target.parentNode.attributes['id'].value;
        var value = e.target.value;
        var oldValue = e.target.getAttribute('oldValue');
        // console.log(oldValue);
        if (value != '' && value != oldValue) {
            editItem(id, value);
        }
    });
    //隐藏分组
    listToggle.addEvent('click', function (e) {
        // console.log("隐藏")
        var show = e.target.classList.contains('drop-down');
        var list = e.target.parentNode.parentNode.parentNode.querySelector('.list');
        // console.log(list);
        if (show) {
            list.setAttribute('style', 'display:none;');
            // console.log(e.target.classList);
            e.target.classList.remove('drop-down');
            e.target.classList.add('drop-up');
        }
        else {
            list.setAttribute('style', '');
            // console.log(e.target.classList);
            e.target.classList.remove('drop-up');
            e.target.classList.add('drop-down');
        }
    });
    //自定义分组独有的事件
    if (mode == 1) {
        //删除分组按钮
        var delGroupBtns = new EventNode('.del-group');
        //任务条修改分组
        var selects = new EventNode('select');
        delGroupBtns.addEvent('click', function (e) {
            // console.log('删除分组')
            var groupId = e.target.id;
            console.log(groupId);
            delGroup(groupId);
        });
        ens.push(delGroupBtns);
        selects.addEvent('change', function (e) {
            var value = e.target.value;
            var id = e.target.parentNode.parentNode.getAttribute('id');
            groupChange(id, value);
            // console.log('value:', value)
            // console.log('id:', id)
        });
        ens.push(selects);
    }
    var eb = new EventNodeBinder(ens);
    eb.attachEvents(body);
}
//渲染主函数
function render(mode) {
    //切换模式按钮的样式
    var cur = document.querySelector('.current-mode');
    if (cur)
        cur.classList.remove('current-mode');
    document.querySelectorAll('.switch-mode')[mode].classList.add('current-mode');
    //添加分组按钮 显示/隐藏 切换
    var addGroup = document.querySelector('.add-group');
    if (mode == 0)
        addGroup.setAttribute('style', 'display:none;');
    else
        addGroup.setAttribute('style', '');
    var content = document.querySelector('#content');
    content.innerHTML = '';
    //添加元素到页面
    content.appendChild(getContent(mode));
    //绑定事件
    attachEvents(mode);
    //保存数据
    setLsData();
}
window.onload = function () {
    //获取数据
    var lsData = getLsData();
    if (lsData)
        data = lsData;
    //首次渲染
    render(data.curMode);
    //切换模式按钮
    document.querySelectorAll('.switch-mode').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var mode = e.target.attributes['mode']['value'];
            data.curMode = mode;
            render(mode);
            setLsData();
        });
    });
    //标签栏，添加功能
    var addTodo = document.querySelector('#add-todo');
    //添加任务分组
    var addGroupBtn = document.querySelector('.add-group');
    //清空数据
    var clearAll = document.querySelector('.clear');
    addTodo.addEventListener('keyup', function (e) {
        var value = e.target.value.trim();
        if (e.keyCode == 13 && value !== '') {
            addItem(value);
            e.target.value = '';
            e.target.blur();
        }
    });
    //清空数据按钮
    clearAll.addEventListener('click', function (e) {
        clearLsData();
    });
    //添加分组按钮
    addGroupBtn.addEventListener('click', function (e) {
        var newTitle = prompt('输入新分组的名称');
        if (newTitle) {
            addGroup(newTitle);
        }
    });
};
