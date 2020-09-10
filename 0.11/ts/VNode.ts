class VDom {
  private tagName: string
  private props: object
  private children: VDom[]
  constructor(tagName: string, props: object, children: VDom[]) {
    this.tagName = tagName
    this.props = props
    this.children = children
  }
  render(): HTMLElement {
    //如果是文字节点的话
    if (this.tagName == '') {
      let content =
        typeof this.props['value'] == 'undefined' ? '' : this.props['value']
      return document.createTextNode(content)
    }

    let element = document.createElement(this.tagName)
    this.setAttributes(element, this.props)
    if (this.children.length != 0) {
      let self = this
      this.children.forEach((VDom) => {
        let tempEle = VDom.render()
        element.appendChild(tempEle)
      })
    }
    return element
  }
  setAttributes(node, attrs) {
    for (let key in attrs) {
      node.setAttribute(key, attrs[key])
    }
  }
  addChild(VDom: VDom) {
    this.children.push(VDom)
  }
  addAttr(attrName: string, attrVal: string) {
    this.props[attrName] = attrVal
  }
  removeAttr(attrName:string){
    delete this.props[attrName]
  }
  getProps() {
    return this.props
  }
}
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
