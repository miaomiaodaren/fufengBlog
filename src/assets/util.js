//2018-2-23 Elasticsearch 数据库，可使用前端直接进行操作的数据库，暂时记录一下  http://www.ruanyifeng.com/blog/2017/08/elasticsearch.html
// var e = e || window.event;                    //处理兼容性  IE8下不兼容target
// var target = e.target || e.srcElement;　
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

//将Unicode转汉字
export const reconvert = (str)  => {
    str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    return str
}

//判断传入值是否为数组 []也算数组
export function isArray(arr) {
    // return Object.prototype.toString.call(arr) === '[object Array]'
    return gettype(arr) === 'array'
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

//判断是否为文件
export function isFile(val) {
    return toString.call(val) === '[object File]';
}

//判断是否为blob文件
export function isBlob(val) {
    return toString.call(val) === '[object Blob]';
}

//判断一个参数是不是一个fun方法，并且对es6的Generator做了判断
export function isFun(obj) {
    let objStr = Object.prototype.toString.call(obj);
    return objStr === '[object Function]' || objStr === '[object GeneratorFunction]';
}

//2018-2-12修改, 封装了gettype函数,类JQ，is判断可以直接使用gettype, 返回值为小写
export function isString(obj) {
    // return Object.prototype.toString.call(obj) === '[object String]';
    return gettype(obj) === 'string'
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

//判断是否为URL地址
export const isUrl = (str) => {
    return (/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str))
}

//遍历效果，可以遍历object，返回其key，类似于jquery中的each,效果极其强大
//2018-2-26新增 在传入obj时,没有返回当前索引，添加第四个项，返回当前i
export function each(obj, iteratee) {
    if(isArrayLislk(obj)) {
        // let keys = Object.keys(obj), leng = keys.length;
        let leng = obj.length;
        for(let i = 0; i < leng; i++) {
            iteratee && iteratee(obj[i], i, obj)
        }
    } else {
        var keys = Object.keys(obj), values = Object.values(obj), leng = keys.length;
        for(let i = 0; i < leng; i++) {
            iteratee(obj[keys[i]], keys[i], obj, i);
        }
    }
    return obj
}

//2018-2-11日新加，主要是对一些常用的is判断进行了一层封装。
//class2type 最终格式为 {'[object Boolean]': boolean, ['obejct Number']: number }
//toLowerCase 是将字符串都改为小写   toUpperCase 是改为大写
//正常要获取对象的类型，是通过 Object.prototype.toString.call(obj) 来判断
export const gettype = (obj) => {
    let class2type = {};
    each("Boolean Number String Function Array Date RegExp Object".split(" "), function(name, i) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });
    return obj == null ? String(obj) : class2type[Object.prototype.toString.call(obj)]  || "object";
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

//把一个符合要求的json格式的String格式数据转换成Object对象, 此方法应该是 JSON.parse 的兼容版本
// JSON RegExp
const rvalidchars = /^[\],:{}\s]*$/,
    rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
export function parseJSON(data) {
    if(typeof data !== 'string' || !data) {
        return null;
    }
    data = trim(data);
    if(window.JSON && window.JSON.parse) {
        return window.JSON.parse(data);
    }
    //如果浏览器不兼容JSON.parse
    if (rvalidchars.test(data.replace(rvalidescape, "@")
            .replace( rvalidtokens, "]")
            .replace( rvalidbraces, ""))) {
        return ( new Function( "return " + data ) )();
    }
    throw new Error( "Invalid JSON: " + data );
}

//判断一个对象是否为空的，如果是有属性的，则返回false
//原理，使用for in 来获取obj的参数，如果有参数，则直接返回false
export const isEmptyObject = (obj) => {
    for(let name in obj) {
        return false;
    }
    return true;
}

//数组的sort实现之一， Array[num]排序
export const arrSort = (arr) => {
    let result = [].concat(arr);
    for(let i = 0; i < result.length; i++) {
        let min = result[i];
        let minIndex = i;
        for(let j = i + 1; j < result.length; j ++) {
            if(min > result[j]) {
                min = result[j];
                minIndex = j;
            }
        }
        result.splice(i, 0, min);
        result.splice(minIndex + 1, 1);
    }
    return result
}

//參考undescore.js 的sortBy 以及 loadsh的 orderBy 函數，实现了数据根据某一个key值的排序。
//算法思路是 先使用map遍历，返回一个value为item，且criter为key属性的arr,进行排序，排序完成之后，遍历新数组返回value的值。
//同时第三个参数，不传是增序，传入desc 则是倒序。后续继续优化。
export const orderBy = (arr, dec, order='asc') => {
    return arr.map((item, index) => {
        return {value: item, criter: item[dec]}
    }).sort((left, right) => {
        let a = left.criter;
        let b = right.criter;
        return order === 'desc' ? a < b : a > b
    }).map((item) => {
        return item['value']
    })
}

//清空对象
// 把obj中的对象的value值清空掉，如果值是boolean,则改为false
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

//fields是一个数组,删除obj中拥有fields的属性
export const omit = (obj, fields) => {
    const shallowCopy = {
      ...obj,
    };
    for (let i = 0; i < fields.length; i++) {
      const key = fields[i];
      delete shallowCopy[key];
    }
    return shallowCopy;
}



//把obj数据中的数据调换， key = val; val = key
export function invert(obj) {
    if(!obj) return
    var keys = Object.keys(obj),
        values = Object.values(obj),
        resolt = {};
    keys.forEach((v, n) => {
        resolt[values[n]] = keys[n]
    })
    return resolt
}

//数据递归(初版),  obj为传入对象  preid 父级的id标识, pid 子集跟父级关联的id， newname最终生成在父级下面的目录名字
//此函数只是在写权限管理时，后台返回数据未处理，自己写的一个递归方法。后面遇到该问题可以借鉴
export const objRecursion = (obj, perid, pid, newname = 'children') => {
    let map = {}, val = [];
    obj.forEach(item => {
        // map[item.id] = item
        mar[item[perid]] = item
    });
    obj.forEach(item => {
        let parent = map[item[pid]];
        if(parent) {
            (parent.newname || (parent.newname = [])).push(item);
        } else {
            val.push(item)
        }
    })
    return val
}

//此方法是在低端版本，不支持Object.keys的时候写的一个方法，做了兼容处理
//如果浏览器支持Object.keys，则直接返回原生
export const keys = (obj) => {
    if(Object.keys) return Object.keys(obj);
    let res = [], key;
    for(key in obj) res.push(key);
    return res 
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

// Use Array.filter() to filter out falsey values (false, null, 0, "", undefined, and NaN).
// 去掉数组中的 boolean 为 false 的值
// Examples   compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
export const compact = arr => arr.filter(Boolean);


// countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
// 收获 数组在使用map filter等遍历属性之后，如果参数是一个function，会自动执行
// 传入一个数组，以及接受一个方法，可以统计出返回结果的各项的统计值。
// 再记录一次reduce 1-1参数是上一次的参数  第二个是遍历的数据， 第三个是index 第二个参数是默认的数据也就是1-1的a
export const countBy = (arr, fn) => {
    if(!isArray(arr)) return
    return arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((a, b, i) => {
        a[b] = (a[b] || 0) + 1;
        return a
    }, {})
}

//去除空格 type = 1, 去掉所有的空格, 2 前后空格 3 前空格  4后格
//正则\s 匹配任意的空白符
// /^(\s|\u00A0)+|(\s|\u00A0)+$/g   2018-2-11新加,新版正则
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

export const buildUrl = (url, params) => {
    if(!params) {
        return url;
    }
    params = setUrlPrmt(params);
    url += (url.indexOf('?') === -1 ? '?' : '&') + params;
    console.info(url);
    return url;
}

// Return a random integer between min and max (inclusive).
export const random = (min, max) => {
    if(max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}

//浅复制,类似ES6中的Object.assign()
export function assign() {
    let arg = [...arguments];
    if(!arg.length) return {};
    if(Object.assign) {
        return Object.assign(...arguments)
    };
    let target = arguments[0] || {};
    for(var i = 0; i < arg.length; i++) {
        for(let o in arguments[i]) {
            console.info(o, 66);
            target[o] = arguments[i][o];
        }
    }
    return target
}


//此处改成 export const copyObj = () => {} 会出错
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
export function copyObj() {
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    var name = void 0,
        options = void 0,
        src = void 0,
        copy = void 0,
        copyIsArray = void 0,
        clone = void 0,
        i = 1,
        target = arguments[0] || {},
        // 使用||运算符，排除隐式强制类型转换为false的数据类型
        deep = false,
        len = arguments.length;
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i++;
    }
    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && typeof target !== 'function') {
        target = {};
    }
    // 如果arguments.length === 1 或typeof arguments[0] === 'boolean',且存在arguments[1]，则直接返回target对象
    if (i === len) {
        return target;
    }
    for (; i < len; i++) {
        //所以如果源对象中数据类型为Undefined或Null那么就会跳过本次循环，接着循环下一个源对象
        if ((options = arguments[i]) != null) {
            // 如果遇到源对象的数据类型为Boolean, Number for in循环会被跳过，不执行for in循环// src用于判断target对象是否存在name属性
            for (name in options) {
                // src用于判断target对象是否存在name属性
                src = target[name];
                // 需要复制的属性当前源对象的name属性
                copy = options[name];
                // 判断copy是否是数组
                copyIsArray = Array.isArray(copy);
                // 如果是深复制且copy是一个对象或数组则需要递归直到copy成为一个基本数据类型为止
                if (deep && copy && ((typeof copy === 'undefined' ? 'undefined' : _typeof(copy)) === 'object' || copyIsArray)) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        // 如果目标对象存在name属性且是一个数组
                        // 则使用目标对象的name属性，否则重新创建一个数组，用于复制
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        // 如果目标对象存在name属性且是一个对象则使用目标对象的name属性，否则重新创建一个对象，用于复制
                        clone = src && (typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object' ? src : {};
                    }
                    // 深复制，所以递归调用copyObject函数
                    // 返回值为target对象，即clone对象
                    // copy是一个源对象
                    target[name] = copyObj(deep, clone, copy);
                } else if (copy !== undefined) {
                    // 浅复制，直接复制到target对象上
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}

//删除指定数组中的某个值  [1,1,2,3,4,5,2]
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


//把一个object number string 转换成一个array类型
//此处其实最好使用map， 而不是用each
export const toArr = (val) => {
    if(!val) return [];
    if(isArray(val)) return val;
    if(isArrayLislk(val) && !isString(val)) return each(val);
    return [val]
}



//延迟几秒执行事件
//类似undescode的delay事件
export const delay = (fn, wait, args) => {
    return setTimeout(() => {
        return fn.apply(null, [args])
    }, wait)
}

//HTML Dom 模块


//判断是否拥有该样式
//20181-22 在阅读element源码的时候，了解了hasClass addClass removeClass更完善的写法，后期可以参考element/utils/dom.js
//2018/2/1 dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom, null);  style, currentStyle, getComputedStyle 三者都可以获取样式，只有style可以写入 
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
    if (ele.classList) {
        ele.classList.remove(v);
    } else {
        if(hasClass( ele, v )) {
            ele.className = ele.className.replace(classReg(v), ' ')
        }
    } 
}

//toggleClass 改变这个样式
//控制一个样式的true 与 false 当存在时消失，当消息失存在
export const toggleClass = (el, cls) => {
    if(hasClass(el, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ')
    } else {
        el.className += ' ' + cls
    }
}

//实现类似jq的css,传二个参数类似css(el, 'backgournd-color', '#fff'); 也可以css(el, {background-color: #fff})
//查询的话是 css(el, "color")
//因为 => 箭头函数不能继承this, arguments, 所以这边还是暂时改回使用function
export const css = function(element, name, value) {
    if(arguments.length < 3) {
        if(isString(name)) {
            //这种情况说明,是用来查询的css(el, "color")
            if (!element) return
            return element.style[camelize(name)] || window.getComputedStyle(element, '').getPropertyValue(name)
        } else if(isArray(name)) {
            //这种情况说明,是用来查询的是多条进行赋值，传过来的必须的是array
            let props = {};
            each(name, function(v, i) {
                props[v] = element.style[camelize(v)] || window.getComputedStyle(element, '').getPropertyValue(v);
            })
            return props
        }
    }
    let css = '';
    if(gettype(name) === 'string') {
       //参数有三个，并且第二个是string类型的 css(el, 'backgournd-color', '#fff'),应该是单条辅值
       //此处兼容了类似backgroundColor 这种驼峰的css写法
       //zepto中还使用了maybeAddPx方法，用来判断去除一些属性，可以增加px.
       css = `${dasherize(name)}: ${value};`
    } else {
        //类似 css(el, {background-color: '#fff', color: '#fff', font-szie: '12'}) 多个赋值
        each(name, function(v, i) {
            css += `${dasherize(i)}: ${v};`
        })
    }
    element.style.cssText += css;
}

//2018-2-24新增
//1. 正则使用备注 如果要测试是否匹配则使用 (/xxx/).test(str); 返回trun false   'fdaf'.match(/\d{1,4}/);  返回符合的指定的值.
//2. replace的二个属性, 第一个参数要么是字符串，要么是正则
//重点： 第二个参数，第二个参数，要么是要替换的字符串，但是也可以是function,
// var sStr='讨论一下正则表达式中的replace的用法';
//特殊替换字符： 字符 替换文本
// $& 与正则相匹配的字符串   sStr.replace(/正则表达式/,'《$&》');  得到："讨论一下《正则表达式》中的replace的用法"
// $` 匹配字符串左边的字符   sStr.replace(/正则表达式/,'《$`》');  得到："讨论一下《讨论一下》中的replace的用法"
// $’ 匹配字符串右边的字符   sStr.replace(/正则表达式/,"《$'》");  得到："讨论一下《中的replace的用法》中的replace的用法"
// $1,$2,$,3,…,$n 匹配结果中对应的分组匹配结果 sStr.replace(/(正则)(.+?)(式)/,"《$1》$2<$3>");  得到："讨论一下《正则》表达<式>中的replace的用法"
// 如果第二个参数是function, 
//参数的arguments 第一个为  匹配到的字符串  第二个是如果正则使用了分组匹配就为多个否则无此参数，也就是根据括号来的$1,$2,$n
//第三个参数为 匹配字符在总的字符串中的索引.也就是indexOf的值   第四个参数是原始的参数
//此方法是用来把以-隔开的字符实现驼峰命名。类似 camelize('aa-name') =====> 'aaName'
export const camelize = (str) => { 
    return str.replace(/-+(.)?/g, function(match, chr) { return chr ? chr.toUpperCase() : '' }) 
}

//此方法是把驼峰命名的css 类似 backgroundColor ====> background-color
//四个正则解释  1：针对样式中存在::  2.大写开头的字符 3 小写开头
export const dasherize = (str) => {
    return str.replace(/::/g, '/')
       .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
       .replace(/([a-z\d])([A-Z])/g, '$1_$2')
       .replace(/_/g, '-')
       .toLowerCase()
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

//设置dom元素的属性的方法(类似jq)
//新增，尝试把二个方法纳入一个，以传入的参数来进行判断，如果只传入二个参数，那就是get，如果传入的是三个参数，那就是set
export const Attr = (elem, ...item) => {
    const len = item.length;
    if(!len) return false
    if(len === 1) {
        elem.getAttribute && elem.getAttribute(item[0])
    } else {
        elem.setAttribute && elem.setAttribute(item[0], item[1]);
    }
}

//注册方法(做了兼容处理)
//这边on方法是一个立即执行函数。在触发的时候会返回带参数的一个方法，所以On(xx,xx,xx)的参数能取到
//由于箭头函数不能取到不存在 this arguments、super、new.target，所以导致很多bind call apply等方法不能使用，所以后期要特别注意使用
//foo::bar 等同于 bar.bind(foo);   foo::bar(...arguments) 等同于 bar.apply(foo, arguments)
//事件的各个阶段  捕获阶段  --->  目标阶段 ----->  冒泡阶段  
//true表示该元素在事件的“捕获阶段”（由外往内传递时）响应事件；  false表示该元素在事件的“冒泡阶段”（由内向外传递时）响应事件。
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

//动画requestAnimationFrame的一个hack方法，在做文字无缝滚动的时候用到了，在引用之后要先触发一下，如果使用requise,则可以 requise(xxx)(); 来直接触发
export const animationFrame = () => {
    window.cancelAnimationFrame = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
            return window.clearTimeout(id);
        };
    }();
    window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    }();
};

//让滚动条滚动到某一个位置, window.scrollX, window.scrollY 分别能获取到滚动条当前的位置
//window.scrollTo(x, y) 则可以让浏览器滚动到当前传入的值的位置.(但是没有动画效果)。
//window.onscroll=function (){xxx} 使用onscroll方法可以监听滚动条滚动事件
export const scrollTop = (value = 0) => {
    let anim;
    let st = document.documentElement.scrollTop;
    if(st === value) return false;
    let types = value <= st ? 'down' : 'up';
    cancelAnimationFrame(anim);
    anim = requestAnimationFrame(function fn() {
        let scrTop = document.documentElement.scrollTop;          //=== window.scrollY; 约等于document.body.scrollTop
        const step = scrTop > value ? 50 : -50;
        if((types === 'down' && scrTop <= value) || (types === 'up' && scrTop > value)) {
            window.scrollTo(0, value);
            window.cancelAnimationFrame(anim);
        } else {
            window.scrollTo(0, scrTop - step);
            anim = window.requestAnimationFrame(fn);
        }
    })
}

//对象序列化，类似qs
export const stringfyQs = (obj) => {
    if (!obj) return '';
    var pairs = [];
    for (var key in obj) {
        var value = obj[key];
        if (value instanceof Array) {
            for (var i = 0; i < value.length; ++i) {
                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
            }
            continue;
        }
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return pairs.join('&');
};


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


//实现加减乘除运算，保证不丢失精度
//保留几位小数，会根据indexOf('.') 来判断是否是小数点。
export const numFormat = (num, precision)=> {//字符串加小数点
    var precision = precision || 2;
    var tmp = num ? num.toString():'0';
    var len = tmp.length;
    var dot = tmp.indexOf('.');
    if(!num && num!=0){
        return "";
    }
    if(dot < 0) {
        tmp = tmp + '.';
        for(var i = 0;i < precision; i++){
            tmp += '0';
        }
        return tmp;
    }
    if(len <= dot + precision) {
        for(;len <= dot + precision; len++){
            tmp += '0';
        }
        return tmp;
    }  
    return tmp.substr(0, dot + precision + 1); 
};

const isInteger = (obj) => {
    return Math.floor(obj) === obj
}

const toInteger = (floatNum) => {
    var ret = {times: 1, num: 0},
        isNegative = floatNum < 0;  //判断传入参数是否为负数
    if (isInteger(floatNum)) {
        ret.num = floatNum
        return ret
    }
    var strfi  = floatNum + '',
        dotPos = strfi.indexOf('.'),
        len    = strfi.substr(dotPos + 1).length,
        times  = Math.pow(10, len),
        intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
    ret.times  = times;
    if (isNegative) {
        intNum = -intNum
    }
    ret.num = intNum
    return ret
}

//使用方法operation(0.043, 100, 2, 'multiply') ======> 4.30
// toFixed 修复
// function toFixed(num, s) {
//     var times = Math.pow(10, s)
//     var des = num * times + 0.5
//     des = parseInt(des, 10) / times
//     return des + ''
// }
//实现思路, 在取到a,b之后,如果有小数点, 先乘以小数点的位数 var aa = num.indexOf('.'); 获取长度 num.substr(aa+1).lenght
//然后使用math.pow(10, len) 乘以10的位数幂，比如3倍就是10的三次方 1000, 在toInteger的时候返回一个OBJ，num是计算后为整数的数字
//times是扩大的倍数，在计算完成之后，是需要除以这个times，这样算出来的数据不会产生精度失误
//总的思路就是如果遇到小数点的，先把他变成整数，进行计算，然后再缩小相应的倍数
const operation = (a, b, digits, op) => {
    var o1 = toInteger(a),
        o2 = toInteger(b),
        n1 = o1.num,
        n2 = o2.num,
        t1 = o1.times,
        t2 = o2.times,
        max = t1 > t2 ? t1 : t2,
        result = null;
    switch (op) {
        case 'add':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2
            }
            return numFormat((result / max), digits)
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return numFormat((result / max), digits)
        case 'multiply':
            result = (n1 * n2) / (t1 * t2)
            return  numFormat(result, digits)
        case 'divide':
            result = (n1 / n2) * (t2 / t1)
            return  numFormat(result, digits)
    }
}

//加法
export const add = (a, b, digits) => {
    return operation(a, b, digits, 'add')
}
//减法
export const subtract = (a, b, digits) => {
    return operation(a, b, digits, 'subtract')
}
//乘法
export const multiply = (a, b, digits) => {
    return operation(a, b, digits, 'multiply')
}
//除法
export const divide = (a, b, digits) => {
    return operation(a, b, digits, 'divide')
}


//2018/3/29 在segmentfault中发找到一个非常有意思有函数，名字叫作compose,接收N个参数，都为Function类型。右侧函数的执行结果将作为左侧的参数来进行调用
// compose(arg => `${arg}%`, arg => arg.toFixed(2), arg => arg + 10)(5);
export const compose = (...fun) => {
    var len = fun.length;
    return function(data) {
        return fun.reduceRight(function(total, currentValue) {
            return currentValue(total)
        }, data)
    }
}


//target 绑定DOM元素  startVal 开始值   endVal 结束值   duration 动画时间   iscoms  是否需要用逗号隔开  target, startVal, endVal, duration, iscoms
//var up = new countUp({target: 'count', startVal: 0, endVal: 10000000, duration: 1, iscom: true});  up.start();
//数字滚动
export function countUp(config) {
    var self = this;
    config = copyObj({
        iscom: false
    }, config)
    this.$d = document.getElementById(config.target);
    this.startVal = config.startVal;
    this.endVal = config.endVal;
    this.duration = (config.duration *1000) || 2000;
    this.iscom = config.iscom;
    this.startcount = 0;
    this.rAF;
    this.starttime;
    this.timestamp;
    self.count = function(timestamp) {
        if(!self.starttime) {
            self.starttime = timestamp;
        }
        self.timestamp = timestamp;
        if(self.startVal > self.endVal) {
            self.startcount = Math.round(self.startVal - ((self.startVal - self.endVal) * ((self.timestamp - self.starttime) / self.duration)));
            self.$d.innerHTML = self.groupCommas(self.startcount);
            if(self.startcount <= self.startVal && self.startcount > self.endVal) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                cancelAnimationFrame(self.rAF);
                self.$d.innerHTML = self.groupCommas(self.endVal);
            }
        } else {
            //公式是 起始值+ （终值-起值）* (时间差/总时间）
            self.startcount = Math.round(self.startVal + ((self.endVal - self.startVal) * ((self.timestamp - self.starttime) / self.duration)));
            self.$d.innerHTML = self.groupCommas(self.startcount);
            if(self.startcount < self.endVal) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                cancelAnimationFrame(self.rAF);
                self.$d.innerHTML = self.groupCommas(self.endVal);
            }
        }
    }
    self.start = function() {
        self.rAF = requestAnimationFrame(self.count);
    }
    self.stop = function() {
        cancelAnimationFrame(self.rAF);
    }
    self.resize = function() {
        cancelAnimationFrame(self.rAF);
        self.$d.innerHTML = self.startVal;
    }
    self.groupCommas = function(str) {
        if(!self.iscom) return str
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}


/**
 * @description 设置cookie
 * @param name cookie名称
 * @param value 值
 * @param iDay 有效时间（天数）
 */
export const setCookie = (name, value, iDay) => {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}

/**
 * @description 获取cookie
 * @param name cookie名称
 */
export const getCookie = (name) => {
    let arr = document.cookie.split('; '),arr2;
    for (let i = 0; i < arr.length; i++) {
        arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}

/**
 * @description 删除cookie
 * @param name cookie名称
 */
export const removeCookie = (name) => {
    this.setCookie(name, 1, -1);
}


export const  unix_to_datetime = (unix,time) => { //time=1 无时分秒  time=2 仅时与分

    if(unix){
      var length = unix.length;
      if (length == 10) {
        unix = unix*1000
      }
    }
  
    var myDate = new Date(parseInt(unix));
    var year = myDate.getFullYear();
    var month = myDate.getMonth();
    var date = checkTime(myDate.getDate());
    var hours = checkTime(myDate.getHours());
    var minutes = checkTime(myDate.getMinutes());
    var seconds = checkTime(myDate.getSeconds());
    if (time == 1) {
      var day = year+"-"+checkTime(parseInt(month)+1)+"-"+date;
    } else if(time === 2) {
        var day = hours + ":" + minutes;
    } else if(time === 3) {
        var day = (parseInt(month)+1)+"月"+date +"日 "+ hours + ":" + minutes;
    } else{
      var day = year+"-"+checkTime(parseInt(month)+1)+"-"+date+" "+hours+":"+minutes+":"+seconds;
    }
    return day;
  }
  
  function checkTime(i){
  if (i<10)
    {i="0" + i}
    return i
}