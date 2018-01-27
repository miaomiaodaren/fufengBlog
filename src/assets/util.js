var count = 0;

//正则检测是否有这个样式
function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
};

//把obj数据中的数据调换， key = val; val = key
function invert(obj) {
    if(!obj) return
    var keys = Object.keys(obj),
        values = Object.values(obj),
        resolt = {};
    keys.forEach((v, n) => {
        resolt[values[n]] = keys[n]
    })
    return resolt
}

var createEscaper = function(map) {
    var escaper = function(match) {
        return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + Object.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
        string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
};

var unescapeMap = invert(escapeMap);

//转义字符
export const escape = createEscaper(escapeMap);
export const unescape = createEscaper(unescapeMap);

//判断传入值是否为数组 []也算数组
export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

//判断这个数据是否是有值的真数组,如果数据组空，则返回false
export const isArrayLislk = function(arr) {
    let length = arr == null ? void 0 : arr['length'];
    return typeof length == 'number' && length > 0
}

//判断传入值是否为Object
export function isObject(obj) {
    let type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

//遍历效果，可以遍历object，返回其key，类似于jquery中的each,效果极其强大
export function each(obj, iteratee) {
    if(isArrayLislk(obj)) {
        let keys = Object.keys(obj), leng = keys.length;
        for(let i = 0; i < leng; i++) {
            iteratee && iteratee(obj[i], i, obj)
        }
    } else {
        var keys = Object.keys(obj), values = Object.values(obj), leng = keys.length;
        for(let i = 0; i < leng; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }
}

//正则去取HTML标签 
export function delHtmlTag(str) {
    // return str.replace(/<[^>]+>/g,"");
    return str.replace(/<\/?.+?>/g, "").replace(/ /g, "");
}

//正则获取二个标签之间的内容
export function getTabsCon(str) {
    // return str.replace(/<pre (.|\n)*(?=<\/pre>)/, "").replace(/ /g, "");
    return str.replace(/<pre(.|\n)*<\/pre>/, "");
}

//生成唯一id
export function uniqueId(prefix) {
    var id = ++count + '';
    return prefix ? prefix + id : id;
}

//清空对象
export const clears = (obj) => {
    let objtype = Object.prototype.toString.call(obj);
    if(objtype === '[object Object]') {
        let keys = Object.keys(obj);
        keys.forEach((v) => {
            obj[v] = typeof obj[v] === 'boolean' ? false : ''
        })
    } else if(objtype === '[object Array]') {
       obj.length = 0;
    }
    return obj
}

//去掉空值,在进行AJAX传值的时候，把一些为空的值的key进行忽略(需要注意传入值0与false需要特殊处理)
//type 默认是false 则说明是对0与false不进行处理，还是会传给后台，如果传true，则进行if(!!obj)处理，会把0 与 值为false的key全部清空掉。
export const clearflase = (obj, type = false) => {
    if(!isObject(obj)) return false;
    let newobj = {};
    each(obj, (v, i) => {
        if(!type) {
            v != null && v != void 0 && v != '' ? newobj[i] = v : '';
        } else {
            !!v ? newobj[i] = v : '';
        }
    })
    return newobj;
}

//去除空格 type = 1, 去掉所有的空格, 2 前后空格 3 前空格  4后格
//正则\s 匹配任意的空白符
export const trim = (str, type = 2)=> {
    switch(type) {
        case 1: return str.replace(/\s+/g, '');
        case 2: return str.replace(/(^\s*)|(\s*$)/g, '');
        case 3: return str.replace(/(^\s*)/g, '');
        case 4: return str.replace(/(\s*$)/g, '');
    }
}

//正则在数字中间每隔三位添加一个逗号
export const groupCommas = (str) => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, `$1${gap}`)
}

//判断是否为手机号
export const isPhoneNum = (str) => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

//判断是否为有效邮箱号
export const isEmail = (str) => {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
}

//判断是否为有效身份证号码
export const isIdCard = (str) => {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

//判断文字的长度(字符串为2字符,数字为1个字符)
export function getByteLen(val) {
   let len = 0;
   for (let i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else { len += 1; }
   }
   return Math.floor(len);
}

//数字大小写转换
export const upDigit = (n) => {
    var fraction = ['角', '分','厘'];  
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
    n = Math.abs(n);  
    var s = '';  
    for (var i = 0; i < fraction.length; i++)   
    {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, ''); 
    } 
    s = s || '整';  
    n = Math.floor(n);  
    for (var i = 0; i < unit[0].length && n > 0; i++)   
    {  
        var p = '';  
        for (var j = 0; j < unit[1].length && n > 0; j++)   
        {  
            p = digit[n % 10] + unit[1][j] + p; 
            n = Math.floor(n / 10);
        }
        s = p+ unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

//获取url参数
//getUrlPrmt('segmentfault.com/write?draftId=122000011938')
//Object{draftId: "122000011938"}
export const getUrlPrmt = (url)=> {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
        let pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

//设置url参数
//setUrlPrmt({'a':1,'b':2})
//a=1&b=2
export const setUrlPrmt = (obj)=> {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] !== '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

// Return a random integer between min and max (inclusive).
export const random = (min, max) => {
    if(max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}


//删除指定数组中的某个值
export const delArr = (arr, opt, type = 'once') => {
    if(!arr) return false
    //如果是删除第一个则type传once或不传否则会遍历，进行删除 
    if(type === 'once') {
        let index = arr.indexOf(opt);
        if(index > -1) {
            arr.splice(index, 1)
            return arr;
        }
    } else {
        let index = [];
        arr.forEach((v, i) => {
            if(v === opt) {
                delete arr[i];
            }
        })
        let data = arr.filter(v => { return v !== undefined })
        return data
    }
}

//HTML Dom 模块


//判断是否拥有该样式
//20181-22 在阅读element源码的时候，了解了hasClass addClass removeClass更完善的写法，后期可以参考element/utils/dom.js
export const hasClass = (ele, v) => {
    return classReg( v ).test( ele.className );
    // if (!el || !cls) return false;
    // if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    // if (el.classList) {
    //     return el.classList.contains(cls);
    // } else {
    //     return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    // }
}

//添加样式
export const addClass = (ele, v) => {
    if(!ele) return
    if (ele.classList) {
        ele.classList.add(v);
    } else {
        if( !hasClass( ele, v ) ) {
            ele.className = ele.className + ' ' + v;
        }
    }
}

//删除样式
export const removeClass = (ele, v) => {
    if (el.classList) {
        el.classList.remove(clsName);
    } else {
        if(hasClass( ele, v )) {
            ele.className = ele.className.replace(classReg(v), ' ')
        }
    } 
}

//toggleClass 改变这个样式
export const toggleClass = (el, cls) => {
    if(el.hasClass(cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ')
    } else {
        el.className += ' ' + cls
    }
}

//2017-11-6新增,主要是实现类似jquery append中的效果，参考网上资料，做出更方便的效果
export const append = (ele, html) => {
    if(html && typeof html === 'string') {
        //在此处新建一个div元素
        let temp = document.createElement('div');
        temp.innerHTML = html;
        //此处新建一个碎片文档，参考vue源码 comper
        //循环遍历，并且移除碎片文档中的数据。直到没有第一个元素即为全部移完
        let frag = document.createDocumentFragment();
        while(temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        ele.appendChild(frag)
    } else {
        ele.appendChild(html)
    }
}

//注册方法(做了兼容处理)
//这边on方法是一个立即执行函数。在触发的时候会返回带参数的一个方法，所以On(xx,xx,xx)的参数能取到
//由于箭头函数不能取到不存在 this arguments、super、new.target，所以导致很多bind call apply等方法不能使用，所以后期要特别注意使用
//foo::bar 等同于 bar.bind(foo);   foo::bar(...arguments) 等同于 bar.apply(foo, arguments)
export const on = (() => {
    return (element, event, handler) => {
        if(document.addEventListener) {
            if (element && event && handler) {
                //addEvenetListener 第三个参数 Booler指定事件是否在捕获或冒泡阶段执行。
                element.addEventListener(event, handler, false)
            } else {
                //注：attachEvent注册的方法要带上on
                element.attachEvent('on' + event, handler);
            }
        }
    }
})()

//删除注册的方法(做了兼容处理)  这边做这个注册与删除,主要是后面为了实现once,
export const off = (() => {
    return (element, event, handler) => {
        if(document.removeEventListener) {
            if (element && event) {
                //addEvenetListener 第三个参数 Booler指定事件是否在捕获或冒泡阶段执行。
                element.removeEventListener(event, handler, false)
            } else {
                //注：attachEvent注册的方法要带上on
                element.detachEvent('on' + event, handler);
            }
        }
    }
})()

//用once注册的方法只会执行一次，执行一次之后就会注销掉
//es6的箭头函数中不存在 this arguments、super、new.target  
//此处可能会触发 arguments无法获取的问题
export const once = (el, event, fn) => {
    const linster = () => {
        if(fn) {
            fn.apply(this, arguments)
        }
        off(el, event, linster)
    }
    on(el, event, linster)
}


//2018/1/26新加
//判断是否为微信内置浏览器
export const isWeixin = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

//判断操作系统类型
export const mobileType = () => {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1  //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios终端
    if (isAndroid) {
        return 'android'
    } else if (isiOS) {
        return 'iphone'
    }
}

//判断是用手机还是web
//Navigator 包含了有关浏览器的信息  而userAgent 返回的是浏览器http请求的信息头的数据
//一般用这个方法来判断当前是如何使用浏览器
const getOs = () => {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
    let bIsMidp = sUserAgent.match(/midp/i) == 'midp'
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
    let bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
    let bIsAndroid = sUserAgent.match(/android/i) == 'android'
    let bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
    let bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return 'mobile'
    } else {
        return 'web'
    }
}


//2018-1-18新增debounce函数去抖动，throttle函数节流    undesoced 跟 lodash都有封装这种函数
//此方法是借用了vue element 的一个插件实现的一个比较简单的
export const debounce = (fn, delay, immediate) => {
    return throttle(fn, delay, immediate, true);
}

//debounce 参数的话说明是调用的debounce
//debounce 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后   也就是二次事件的触发间隔一定要大于一个值，不然如果一直触发，则只会触发一次
//throttle 当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数       如果事件一直在触发，则会每隔几秒触发一次，与debounce相比会触发多次，但是有时间间隔
//immediate 如果是trun 则会把延迟执行，会以最后一个的参数为准，false的话，会先执行，再判断
export const throttle = function(fn, delay, immediate, debounce) {
    let currtime = +new Date(),         //当前时间
        last_call = 0,
        last_exec = 0,          //最后一次执行时间
        that,               //赋值当前的this
        args,               //方法所带参数
        diff,               //二者时间差
        timer = null,       //定时执行的方法
        exec = function() {
            last_exec = currtime        //执行的时候把当前时间赋值给最后一次执行时间
            fn.apply(that, args);   //执行方法
        }
    return function () {
        currtime = +new Date();
        that = this;
        args = arguments;
        diff = currtime - (debounce ? last_call : last_exec) - delay;
        clearTimeout(timer);
        if(debounce) {
            if(immediate) {
                timer = setTimeout(exec, delay);
            } else if (diff >= 0) {
                exec();
            }
        } else {
            if(diff >= 0) {
                exec();
            } else if(immediate) {
                timer = setTimeout(exec, -diff);
            }
        }
        last_call = currtime;
    }
}
