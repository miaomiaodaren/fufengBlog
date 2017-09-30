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

//去除空格 type = 1, 去掉所有的空格, 2 前后空格 3 前空格  4后格
//正则\s 匹配任意的空白符
export const trim = (str, type = 1)=> {
    switch(type) {
        case 1: return str.replace(/\s+/g, '');
        case 2: return str.replace(/(^\s*)|(\s*$)/g, '');
        case 3: return str.replace(/(^\s*)/g, '');
        case 4: return str.replace(/(\s*$)/g, '');
    }
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
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

