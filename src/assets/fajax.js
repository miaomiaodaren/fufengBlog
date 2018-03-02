// if(myreq.readyState == 4 && myreq.status == 200) {
//     var item = myreq.responseText;
//     if(getxml == 1) {
//         item = myreq.responseXML;	
//     }
//     eval(callback + '(item)');	
// } else {
//     //backing();
//     return
// }	
import { copyObj, gettype } from './util'
//对xhq进行了一次兼容的封装
function getXMLHttpRequest() {
    try {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");	
        } catch(e) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    } catch(e) {
        return new XMLHttpRequest();
    }
}

const noop = function() {};
var abortTimeout;
var defsetting = {
    type: 'GET',
    success: noop,
    error: noop,
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded",
    data: {},
    complete: noop,       //ajax正在执行中的状态
    timeout: 0,
    async: true,    //是否异步
    accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": 'allTypes'
    },
    contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
    },
    responseFields: {
        xml: "responseXML",
        text: "responseText"
    },
}


export default function doAjax(url, options) {
    //如果传入doajax({url: 22})第一个参数是object的，则把这个obj赋值给options
    //正常传法是  doajax('xxxx', {xx: xxx})
    if(typeof url === 'object') {
        options = url;
        url = void 0
    }
    options = options || {};
    //把传入的参数与默认参数进行合并
    options = copyObj({}, defsetting, options);
    var xhr = getXMLHttpRequest();
    //xhr在监听到readystate状态发生变化的时候，都会触发这个事件
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== 4) return;
        clearTimeout(abortTimeout);
        var result, status = xhr.status;
        if((status >= 200 && status < 300) || status === 304) {
            result = xhr.responseText;
            if(options.dataType === 'xml') result = xhr.responseXML;
            try {
                if(options.dataType === 'json') result = JSON.parse(result);
            } catch (e) {}
            options.success(result, xhr)
        } else {
            options.error(xhr)
        }
        options.complete(xhr)
    }
    if(options.type.toUpperCase() == "POST") {
        requestPOST(options.url, options.data, xhr);
    } else {
        requestGET(options.url, options.data, xhr);	
    }
    
    if(options.timeout > 0) {
        abortTimeout = setTimeout(function() {
            xhr.onreadystatechange = noop;
            xhr.abort();
            options.error(xhr, 'timeout');
            options.complete(xhr);
        }, options.timeout)
    }
    return xhr
}

function requestGET(url,query,req){
    var myRandom = parseInt(Math.random()*99999999);
    if(query == ''){
        var callUrl = url + '?rand' + myRandom;	
    }
    else{
        var callUrl = url + '?' + query + '&rand=' + myRandom;	
    }
    req.open("GET", callUrl, true);
    req.send(null);
}

function requestPOST(url, query, req) {
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(query);	
}



// var flagsCache = {};

// function createFlags( flags ) {
// 	var object = flagsCache[ flags ] = {},
// 		i, length;
// 	flags = flags.split( /\s+/ );
// 	for ( i = 0, length = flags.length; i < length; i++ ) {
// 		object[ flags[i] ] = true;
// 	}
// 	return object;
// }
// function Callbacks(flags) {
//     flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};
//     var add = function( args ) {
//         var i,
//             length,
//             elem,
//             type,
//             actual;
//         for ( i = 0, length = args.length; i < length; i++ ) {
//             elem = args[ i ];
//             type = gettype( elem );
//             if ( type === "array" ) {
//                 // Inspect recursively
//                 add( elem );
//             } else if ( type === "function" ) {
//                 // Add if not in unique mode and callback is not in
//                 if ( !flags.unique || !self.has( elem ) ) {
//                     list.push( elem );
//                 }
//             }
//         }
//     },
//     fired: function() {
//         return !!memory;
//     }
// }

// //find jq  Deferred: function( func ) {
// function Deferred(func) {
//     var doneList = Callbacks('once memory'),
//         failList = Callbacks('once menory'),
//         progressList = Callbacks('menory'),
//         state = "pending",
//         lists = {
//             resolve: doneList,
//             reject: failList,
//             notify: progressList
//         },
//         promise = {
//             done: doneList.add,
//             fail: failList.add,
//             progress: progressList.add,
//             state: function() {
//                 return state
//             },
//             isResolved: doneList.fired,
//             isRejected: failList.fired,
//         },
//         then: function(doneCallbacks, failCallbacks, progressCallbacks) {
//             deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
//             return this;
//         }
// }