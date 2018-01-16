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
export const hasClass = (ele, v) => {
    return classReg( v ).test( ele.className );
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