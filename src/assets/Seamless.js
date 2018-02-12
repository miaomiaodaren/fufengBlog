//参考代码 https://github.com/chenxuan0000/seamless-scroll/blob/master/src/content/seamless.js
import { copyObj, on, animationFrame } from './util'
animationFrame();
//主要用来实现上下左右无缝滚动的代码
var defaultOptions = {
    hoverStop: true,   //是否启动鼠标hover时控制
    direction: 1,   //0 往下 1往上 2往左 3往右
    waitTime: 1000,  //间隔时间
    singJump: true,  //是否一条一条滚动,
    jumpHeight: void 0,  //每隔多少高度进行一次跳
    jumpWidth: void 0,
    step: 1,        //特别注意: 如果设置了sindJump,传入的jumpHeight的值必须能除尽setp，不然会造成错误
}

var seamless = function(options) {
    this.options = copyObj({}, defaultOptions, options);
    var dom = this.options.dom;
    if(!dom)  throw new Error('you must set dom');
    dom.innerHTML += dom.innerHTML;
    dom.style.position = 'relative'
    dom.style.overflow = 'hidden'
    this.reqFrame = void 0;
    this._top = 0;
    this._left = 0;
    if (this.options.direction > 1) {
        //水平向滚动
        let child = dom.children,
            childFirst = child[0],
            len = child.length;
        //设置外面框的宽度为 (元素宽度 + 二边margin) * 个数
        this._width = (childFirst.offsetWidth + this._getInt(childFirst, 'margin-left') + this._getInt(childFirst, 'margin-right')) * len
        dom.style.width = this._width + 'px'
    }
    this._bindEvent();
    this._move();
}

seamless.prototype = {
    _move() {
        var that = this;
        this.reqFrame = window.requestAnimationFrame(_style.bind(that))
    },
    _bindEvent () {
        if(!this.options.hoverStop) return
        var that = this, dom = this.options.dom;
        on(dom, 'mouseenter', function() {
            //注册鼠标hover的时候，停止滚动
            that._cancle()
        });
        on(dom, 'mouseleave', function() {
            that._move();
        })
    },
    _cancle() {
        window.cancelAnimationFrame(this.reqFrame || '');
    },
    _singRun() {
        var dom = this.options.dom, 
            that = this,
            dwidth = this.options.jumpWidth || dom.firstChild.getBoundingClientRect().width, 
            dheight =this.options.jumpHeight || dom.firstChild.getBoundingClientRect().height,
            timer;
        // console.info(Math.abs(this._top), parseInt(dheight), 88, Math.abs(this._top) % parseInt(dheight) === 0);
        if (Math.abs(this._top) % parseInt(dheight) === 0 && (this.options.direction === 0 || this.options.direction === 1)) { // 求余数符合条件暂停waitTime
            if(timer) clearTimeout(timer);
            timer = setTimeout(function() {
                that._move();
            }, that.options.waitTime)
        } else if(Math.abs(this._left) % dwidth === 0  && (this.options.direction === 2 || this.options.direction === 3)) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(function() {
                that._move();
            }, that.options.waitTime)
        } else {
            that._move();
        }
    },
    _getInt(dom, name) {
        return parseInt(_getStyle(dom, name))
    }
}

function _getStyle(dom, name) {
    let elem = dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom, null)
    return elem[name]
}

function _style() {
    var dom = this.options.dom, 
        height = dom.getBoundingClientRect().height / 2,
        direction = this.options.direction;
    if(direction === 1) {
        if(Math.abs(this._top) > height) { this._top = 0; }
        this._top -= this.options.step;
        dom.style.top = this._top + 'px';
    } else if(direction === 0) {
        if (this._top >= 0) this._top = parseInt(height) * -1;
        this._top += this.options.step;
        dom.style.top = this._top + 'px';
    } else if (direction === 2) { // 左
        if (Math.abs(this._left) >= this._width / 2) this._left = 0
        this._left -= this.options.step
        dom.style.left = this._left + 'px'
      } else if (direction === 3) { // 右
        if (this._left >= 0) this._left = this._width / 2 * -1
        this._left += this.options.step
        dom.style.left = this._left + 'px'
      }
    this._singRun();
}

const clerar = (options) => {
    return new seamless(options)
}
export default clerar