//分组信息
interface Group {
  id: number
  title: string
}
//单个任务条信息
interface Item {
  id: number
  done: boolean
  content: string
  group?: number
}
//localstorage 数据格式
interface LsData {
  curMode: number
  groups: Group[]
  list: Item[]
}
/*
    localstorage 数据 get,set,clear
*/
function getLsData(): LsData {
  return JSON.parse(window.localStorage.getItem('data'))
}
function setLsData() {
  window.localStorage.setItem('data', JSON.stringify(data))
}
function clearLsData() {
  window.localStorage.clear()
  data = {
    curMode: 0,
    groups: [],
    list: [],
  }
  render(data.curMode)
}
/*
    操作item数据
*/
//添加
function addItem(content: string) {
  let id = 0
  if (data.list.length != 0) id = data.list[data.list.length - 1].id + 1
  let item: Item = {
    id: id,
    done: false,
    content: content,
  }
  data.list.push(item)
  render(data.curMode)
}
//删除
function delItem(item: Item) {
  data.list.splice(data.list.indexOf(item), 1)
  render(data.curMode)
}
//编辑内容
function editItem(id: number, content: string) {
  console.log(content)
  data.list.forEach((item) => {
    if (item.id == id) {
      item.content = content
    }
  })
  render(data.curMode)
}
//改变状态
function stateChange(id: number) {
  data.list.forEach((item) => {
    if (item.id == id) {
      item.done = !item.done
    }
  })
  render(data.curMode)
}
//修改分组
function groupChange(id: number, groupId: number) {
  data.list.forEach((item) => {
    if (item.id == id) {
      if (groupId == -1) {
        delete item.group
      } else {
        item['group'] = groupId
      }
    }
  })
  render(data.curMode)
}

//增加分组
function addGroup(title: string) {
  if (title == '') return
  for (let i = 0; i < data.groups.length; i++) {
    if (data.groups[i].title == title) {
      return
    }
  }
  let id = 0
  if (data.groups.length != 0) {
    id = data.groups[data.groups.length - 1].id + 1
  }
  data.groups.push({
    id: id,
    title: title,
  })
  render(data.curMode)
}
//删除分组
function delGroup(groupId: number) {
  data.groups = data.groups.filter((group) => {
    return group.id != groupId
  })
  data.list.forEach((item) => {
    if (item.group == groupId) delete item.group
  })
  render(data.curMode)
}

//数据
let data: LsData = {
  curMode: 0,
  groups: [],
  list: [],
}

//dom树生成函数
function getSelect(item: Item): VDom {
  let select = new VDom('select', {}, [])
  let defaultOption: VDom = null
  select.addChild((defaultOption = new VDom('option', { value: '-1' }, [new VDom('', { value: '未分组' }, [])])))
  if (typeof item.group == 'undefined') {
    defaultOption.addAttr('selected', 'selected')
  }
  data.groups.forEach((group) => {
    let option = new VDom('option', { value: group.id }, [new VDom('', { value: group.title }, [])])
    // console.log(item.group, group.id)
    if (item.group == group.id) {
      option.addAttr('selected', 'selected')
    }

    select.addChild(option)
  })
  return new VDom('div', { class: 'select' }, [select])
}
function getItem(item: Item, mode: number): VDom {
  let classes = item.done ? 'done-item item' : 'todo-item item'
  let checkbox: VDom = null
  let tempItem = new VDom('li', { class: classes, id: item.id }, [
    (checkbox = new VDom('input', { type: 'checkbox', class: 'item-state' }, [])),
    new VDom('input', { type: 'text', class: 'item-input', value: item.content }, []),
    new VDom('span', { class: 'del-btn' }, [new VDom('', { value: 'X' }, [])]),
  ])
  if (item.done) {
    checkbox.addAttr('checked', 'checked')
  }
  if (mode == 1) {
    let select = getSelect(item)
    // console.log(select)
    tempItem.addChild(select)
  }
  return tempItem
}
function getGroup(mode: number, group: Group, list: Item[]): VDom {
  //   console.log(list)
  let toolbar: VDom = null
  let ul: VDom = null
  let groupNode = new VDom('div', { class: 'group clearfix' }, [
    new VDom('div', { class: 'title clearfix' }, [
      new VDom('h2', {}, [new VDom('', { value: group.title }, [])]),
      (toolbar = new VDom('div', { class: 'toolbar clearfix' }, [
        new VDom('span', { class: 'iconfont drop-down list-toggle' }, []),
        // new VDom('span', { class: 'circle percent' }, []),
      ])),
    ]),
    new VDom('div', { class: 'list' }, [(ul = new VDom('ul', {}, []))]),
  ])

  if (mode == 1 && group.id != -1) {
    toolbar.addChild(
      new VDom('span', { class: 'circle del-group', id: group.id }, [new VDom('', { value: '删除分组' }, [])])
    )
  }
  list.forEach((item) => {
    ul.addChild(getItem(item, mode))
  })
  return groupNode
}
function getContent(mode: number): DocumentFragment {
  let fragment = document.createDocumentFragment()
  let inner = new VDom('div', { class: 'inner' }, [])
  //分组
  if (mode == 0) {
    let todoList = []
    let doneList = []

    data.list.forEach((item) => (item.done ? doneList.push(item) : todoList.push(item)))

    let todoGroup = getGroup(mode, { id: -1, title: '正在进行' }, todoList)
    let doneGroup = getGroup(mode, { id: -1, title: '已完成' }, doneList)

    inner.addChild(todoGroup)
    inner.addChild(doneGroup)
  }
  if (mode == 1) {
    //将item分组
    let groupedItems = {}
    data.groups.forEach((group) => {
      groupedItems[group.id] = []
    })
    groupedItems['default'] = []
    data.list.forEach((item) => {
      if (typeof item.group != 'undefined') {
        groupedItems[item.group].push(item)
      } else {
        groupedItems['default'].push(item)
      }
    })

    // console.log(groupedItems)

    data.groups.forEach((group) => {
      //   console.log(group)
      let tempGroup = getGroup(mode, group, groupedItems[group.id])
      inner.addChild(tempGroup)
    })
    let tempGroup = getGroup(mode, { id: -1, title: '未分组' }, groupedItems['default'])
    inner.addChild(tempGroup)
  }
  fragment.appendChild(inner.render())
  return fragment
}

//绑定事件
function attachEvents(mode: number) {
  //通用
  //checkbox事件
  let body = document.querySelector('body')
  let ens = []
  let checkbox = new EventNode('.item-state')
  let delItemBtn = new EventNode('.del-btn')
  let itemImput = new EventNode('.item-input')
  let listToggle = new EventNode('.list-toggle')
  ens = [checkbox, delItemBtn, itemImput, listToggle]
  //任务条状态改变
  checkbox.addEvent('click', (e) => {
    // console.log("状态改变");
    let id = e.target.parentNode.attributes['id'].value
    stateChange(id)
  })
  //任务条删除按钮
  delItemBtn.addEvent('click', (e) => {
    // console.log("删除item");
    let id = e.target.parentNode.attributes['id'].value
    delItem(id)
  })
  //任务条编辑内容
  itemImput.addEvent('focus', (e) => {
    e.target.setAttribute('oldValue', e.target.value)
  })
  itemImput.addEvent('blur', (e) => {
    let id = e.target.parentNode.attributes['id'].value
    let value = e.target.value
    let oldValue = e.target.getAttribute('oldValue')
    // console.log(oldValue);
    if (value != '' && value != oldValue) {
      editItem(id, value)
    }
  })
  //隐藏分组
  listToggle.addEvent('click', (e) => {
    // console.log("隐藏")
    let show = e.target.classList.contains('drop-down')
    let list = e.target.parentNode.parentNode.parentNode.querySelector('.list')
    // console.log(list);
    if (show) {
      list.setAttribute('style', 'display:none;')
      // console.log(e.target.classList);
      e.target.classList.remove('drop-down')
      e.target.classList.add('drop-up')
    } else {
      list.setAttribute('style', '')
      // console.log(e.target.classList);
      e.target.classList.remove('drop-up')
      e.target.classList.add('drop-down')
    }
  })

  //自定义分组独有的事件
  if (mode == 1) {
    //删除分组按钮
    let delGroupBtns = new EventNode('.del-group')
    //任务条修改分组
    let selects = new EventNode('select')
    delGroupBtns.addEvent('click', (e) => {
      // console.log('删除分组')
      let groupId = e.target.id
      console.log(groupId)
      delGroup(groupId)
    })
    ens.push(delGroupBtns)
    selects.addEvent('change', (e) => {
      let value = e.target.value
      let id = e.target.parentNode.parentNode.getAttribute('id')
      groupChange(id, value)
      // console.log('value:', value)
      // console.log('id:', id)
    })
    ens.push(selects)
  }
  let eb = new EventNodeBinder(ens)
  eb.attachEvents(body)
}

function getContentHeight() {
  function getHeight(ele) {
    let heightStr = window.getComputedStyle(ele, null).height
    let heightNum = heightStr.slice(0, heightStr.indexOf('px'))
    return parseInt(heightNum)
  }
  let switchBtns = document.querySelector('#switch-btns')
  // console.log("switchBtns,",getHeight(switchBtns));
  let header = document.querySelector('#header')
  // console.log("header,",getHeight(header));
  let footer = document.querySelector('.footer')
  // console.log("footer,",getHeight(footer));
  let body = document.querySelector('body')
  // console.log("body,",getHeight(body));
  let height = getHeight(body) - getHeight(header) - getHeight(switchBtns) - getHeight(footer)
  return height
}

//渲染主函数

function render(mode) {
  //切换模式按钮的样式
  let cur = document.querySelector('.current-mode')
  if (cur) cur.classList.remove('current-mode')
  document.querySelectorAll('.switch-mode')[mode].classList.add('current-mode')

  //添加分组按钮 显示/隐藏 切换
  let addGroup = document.querySelector('.add-group')
  let clear = document.querySelector('.clear')
  // console.log(clear.classList)
  if (mode == 0) {
    addGroup.setAttribute('style', 'display:none;')
    clear.classList.add('full-btn')
    clear.classList.remove('half-btn')
  } else {
    addGroup.setAttribute('style', '')
    clear.classList.remove('full-btn')
    clear.classList.add('half-btn')
  }
  let content = document.querySelector('#content')
  content.innerHTML = ''

  //添加元素到页面
  content.appendChild(getContent(mode))
  //绑定事件
  attachEvents(mode)

  //绑定滑动事件

  let inner = document.querySelector('.inner')
  let contentHeight = getContentHeight()
  content.style.height = contentHeight + 'px'
  let miniScroll = new MiniSCroll(inner, content, null, null)
  miniScroll.addScroll()

  //保存数据
  setLsData()
}
window.onload = function () {
  //获取数据
  let lsData = getLsData()
  if (lsData) data = lsData
  //首次渲染
  render(data.curMode)
  //切换模式按钮
  document.querySelectorAll('.switch-mode').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let mode = e.target.attributes['mode']['value']
      data.curMode = mode
      render(mode)
      setLsData()
    })
  })
  //标签栏，添加功能
  let addTodo = document.querySelector('#add-todo')
  //添加任务分组
  let addGroupBtn = document.querySelector('.add-group')
  //清空数据
  let clearAll = document.querySelector('.clear')

  addTodo.addEventListener('blur', (e) => {
    let value = e.target.value.trim()
    if (value !== '') {
      addItem(value)
      e.target.value = ''
      e.target.blur()
    }
  })

  //清空数据按钮
  clearAll.addEventListener('click', (e) => {
    clearLsData()
  })
  //添加分组按钮
  addGroupBtn.addEventListener('click', (e) => {
    let newTitle = prompt('输入新分组的名称')
    if (newTitle) {
      addGroup(newTitle)
    }
  })
}
