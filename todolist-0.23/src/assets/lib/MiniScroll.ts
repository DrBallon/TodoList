class MiniSCroll {
  //内外元素
  private inner: HTMLElement;
  private outer: HTMLElement;
  //顶部，底部回调函数
  private cbTop: Function | null;
  private cbBottom: Function | null;

  //拖动时的数据记录
  //点击时的y值
  private startY = 0;
  //内部元素高度
  private innerHeight = 0;
  //外部元素高度
  private outerHeight = 0;
  //内部元素超出屏幕上方的高度
  private innerTop = 0;

  //是否在边界状态
  //例：下拉到下边界，设置atTop=true，此时过滤向上拖动的事件。
  //在上边界时，向下拖动便可以去除掉边界状态
  //没有这个，边界回调函数会一直触发
  private atTop = false;
  private atBottom = false;

  //当前设备是pc还是手机端
  private isPC = false;

  //内外元素position设置出错
  private positionError = false;
  //内外元素高度出错。内元素的高度比外元素小的时候没必要绑定事件
  private heightError = false;

  //记录绑定的事件地址，用于清除绑定事件
  private startEvent2: EventListener | null = null;
  private moveEvent2: EventListener | null = null;
  private endEvent2: EventListener | null = null;

  //pc端需要使用，记录当前是否是按下鼠标
  private mouseTouching = false;
  constructor(inner: HTMLElement, outer: HTMLElement, cbTop?: Function, cbBottom?: Function) {
    this.inner = inner;
    this.outer = outer;
    this.cbTop = cbTop || null;
    this.cbBottom = cbBottom || null;
    this.init();
  }
  init() {
    console.log('init');
    this.isPC = this.isPCFunc();
    this.innerHeight = this.getHeight(this.inner);
    this.outerHeight = this.getHeight(this.outer);
    if (this.innerHeight <= this.outerHeight) {
      this.heightError = true;
      console.log('内部元素高度小于外部元素，不绑定');
    }
    const outerPosition = window.getComputedStyle(this.outer, null).position;
    const innerPosition = window.getComputedStyle(this.inner, null).position;
    if (outerPosition != 'relative' || innerPosition != 'absolute') {
      this.positionError = true;
      console.log('元素position设置出错。outer需要relative，inner需要absolute');
    }
  }
  isPCFunc(): boolean {
    const userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  //inner移动到某个位置
  scrollTo(top: number) {
    let target = top;
    if (top <= 0) {
      target = 0;
    } else if (top > this.innerHeight - this.outerHeight) {
      target = this.innerHeight - this.outerHeight;
    }
    this.setTop(this.inner, -target);
  }
  //设置绝对定位元素的top值
  setTop(ele: HTMLElement, top: number) {
    ele.style.top = top + 'px';
  }
  //获取绝对定位元素的top值
  getTop(ele: HTMLElement) {
    const str = window.getComputedStyle(ele, null).top;
    const num = parseInt(str.slice(0, str.indexOf('px')));
    return num;
  }
  //获取元素的高度
  getHeight(ele: HTMLElement) {
    const str = window.getComputedStyle(ele, null).height;
    const num = parseInt(str.slice(0, str.indexOf('px')));
    return num;
  }
  //解绑事件
  removeScroll() {
    this.inner.removeEventListener('mousedown', this.startEvent);
    this.inner.removeEventListener('mousemove', this.moveEvent);
    this.inner.removeEventListener('touchmove', this.endEvent);
  }
  /*
    点击：绑定up事件，绑定move事件
    移动：
    松开：移除
  */
  endEvent() {
    const self = this;
    return (self.endEvent2 = function() {
      // console.log('end');
      self.mouseTouching = false;
      if (self.moveEvent2 != null) self.inner.removeEventListener('mousemove', self.moveEvent2);
      if (self.endEvent2 != null) self.inner.removeEventListener('mouseup', self.endEvent2);
      self.moveEvent2 = null;
      self.endEvent2 = null;
    });
  }
  moveEvent(): EventListener {
    const self = this;
    return (self.moveEvent2 = function(e: Event) {
      if (self.isPC && !self.mouseTouching) {
        return;
      }
      // console.log('move');
      // console.log('mousedown')
      const y = self.isPC ? (e as MouseEvent).clientY : (e as TouchEvent).touches[0].clientY;
      const distance = y - self.startY;
      //当前高度大于初始高度，说明向下滑动了
      if (distance > 0) {
        // console.log('向下滑动:', distance)
        //向下滑动会脱离底端边界状态
        self.atBottom = false;
        //上边界状态时，向下滑动不触发事件
        if (self.atTop) return;
        //判断是否到上滑到了边界，即内部元素top值是否为大于0
        if (self.innerTop + distance > 0) {
          // console.log('拉到顶了')
          //因为数字可能不精确，直接设置为0
          self.setTop(self.inner, 0);
          self.innerTop = self.getTop(self.inner);
          //触发上边界回调函数，如果有传入的话
          self.cbTop && self.cbTop();
          //设置上边界状态
          self.atTop = true;
        } else {
          self.setTop(self.inner, self.innerTop + distance);
        }
      } else {
        // console.log('向下滑动:', distance)
        self.atTop = false;
        if (self.atBottom) return;
        //   console.log(-self.innerTop - distance + self.outerHeight, self.innerHeight)
        if (-self.innerTop - distance + self.outerHeight > self.innerHeight) {
          // console.log('拉到底了')
          self.setTop(self.inner, self.outerHeight - self.innerHeight);
          self.innerTop = self.getTop(self.inner);
          self.atBottom = true;
          self.cbBottom && self.cbBottom();
        } else {
          self.setTop(self.inner, self.innerTop + distance);
        }
      }
    });
  }
  startEvent() {
    const self = this;
    return (self.startEvent2 = function(e: Event) {
      //记录匿名函数的地址，用于解绑事件。
      //获取点击时的y值
      const y = self.isPC ? (e as MouseEvent).clientY : (e as TouchEvent).touches[0].clientY;
      // console.log('start');

      // console.log('开始高度:', y)
      self.startY = y;
      // console.log(self)
      self.innerTop = self.getTop(self.inner);
      self.mouseTouching = true;

      //把绑定移动事件,pc端为mousemove(不需要鼠标保持点击，所以需要判断)，手机端为touchmove(需要保持按住)
      const event = self.isPC ? 'mousemove' : 'touchmove';

      self.inner.addEventListener(event, self.moveEvent());
      //pc端单独绑定的鼠标松开事件
      //鼠标松开时，解绑移动事件（否则会出现鼠标只是略过就会带着元素滑动）
      if (self.isPC && !self.endEvent2) {
        self.inner.addEventListener('mouseup', self.endEvent());
      }
    });
  }
  //绑定事件
  addScroll() {
    if (this.heightError) {
      console.log('内部元素高度小于外部元素，不绑定');
      return;
    }
    if (this.positionError) {
      console.log('元素position设置出错，不绑定');
      return;
    }
    const event = this.isPC ? 'mousedown' : 'touchstart';

    this.inner.addEventListener(event, this.startEvent());

    return;
  }
}
export default MiniSCroll;
