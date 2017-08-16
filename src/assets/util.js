var count = 0;
export function uniqueId(prefix) {
    var id = ++count + '';
    return prefix ? prefix + id : id;
}

Array.prototype.aa = function() {
    return 2
}
