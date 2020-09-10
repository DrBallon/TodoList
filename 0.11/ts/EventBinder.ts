class EventNode {
  private selector: string
  private indexes: number[]
  private events: Function[]
  constructor(selector: string) {
    this.selector = selector
    this.indexes = []
    this.events = []
  }
  addEvent(type: string, func: Function): EventNode {
    if (typeof this.events[type] == 'undefined') {
      this.events[type] = []
    }
    this.events[type].push(func)
    return this
  }
  delEvent(type: string, func: Function): EventNode {
    if (typeof this.events[type] == 'undefined') return
    if (this.events[type].indexOf(func) != -1) {
      this.events[type].splice(this.events[type].indexOf(func), 1)
    }
    return this
  }
  addIndexes(indexes: number[]) {
    indexes.forEach((index) => {
      if (this.indexes.indexOf(index) == -1) {
        this.indexes.push(index)
      }
    })
    return this
  }
  deleteIndex(index: number) {
    if (this.indexes.indexOf(index) != -1) {
      this.indexes.splice(this.indexes.indexOf(index), 1)
    }
    return this
  }
  getSelector(): string {
    return this.selector
  }
  getEvents(): Function[] {
    return this.events
  }
  getIndexes(): number[] {
    return this.indexes
  }
}
class EventNodeBinder {
  private eventNodes: EventNode[]
  constructor(eventNodes?: EventNode[]) {
    this.eventNodes = eventNodes
  }
  addNode(eventNode: EventNode) {
    this.eventNodes.push(eventNode)
  }
  removeNode(targetNode: EventNode) {
    if (this.eventNodes.length == 0) return
    if (this.eventNodes.indexOf(targetNode) != -1) {
      this.eventNodes.splice(this.eventNodes.indexOf(targetNode), 1)
    }
    return this
  }
  attachEvents(rootNode:Element) {
    if (typeof rootNode == 'undefined') return
    let eventTree = {}
    this.eventNodes.forEach((node) => {
      // console.log(node.getEvents());
      eventTree[node.getSelector()] = {}
      eventTree[node.getSelector()]['events'] = node.getEvents()
      eventTree[node.getSelector()]['indexes'] = node.getIndexes()
    })
    // console.log(eventTree)
    // console.log(eventTree)
    //遍历选择器
    for (let selector in eventTree) {
      // console.log(selector);
      //判断是否有指定索引
      let indexes = eventTree[selector].indexes
      // console.log(eventTree[selector]);
      if (typeof indexes == 'undefined' || indexes.length == 0) {
        //根据选择器查找元素
        let eles = rootNode.querySelectorAll(selector)
        // console.log(ele);
        if (!eles) return
        // console.log(events[selector]);
        eles.forEach((ele) => {
          for (let eventName in eventTree[selector].events) {
            eventTree[selector].events[eventName].forEach((func) => {
              ele.addEventListener(eventName, func)
            })
          }
        })
      } else {
        let eles = rootNode.querySelectorAll(selector)
        //遍历需要绑定的索引
        indexes.forEach((index) => {
          if (index > eles.length - 1 || index < 0) return
          //遍历事件的种类
          for (let eventName in eventTree[selector].events) {
            //遍历该种事件的所有事件
            eventTree[selector].events[eventName].forEach((func) => {
              eles[index].addEventListener(eventName, func)
            })
          }
        })
      }
    }
  }
}