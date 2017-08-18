var count = 0;
export function uniqueId(prefix) {
    var id = ++count + '';
    return prefix ? prefix + id : id;
}

Array.prototype.aa = function() {
    return 2
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