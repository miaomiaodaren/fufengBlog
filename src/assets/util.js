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


//生成唯一id
export function uniqueId(prefix) {
    var id = ++count + '';
    return prefix ? prefix + id : id;
}




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

export const hasClass = (ele, v) => {
    return classReg( v ).test( ele.className );
}

export const addClass = (ele, v) => {
    if( !hasClass( ele, v ) ) {
        ele.className = ele.className + ' ' + v;
    }
}

export const removeClass = (ele, v) => {
    if(hasClass( ele, v )) {
        ele.className = ele.className.replace(classReg(v), ' ')
    }
}