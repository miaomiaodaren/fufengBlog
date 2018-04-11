//此插件主要是为了学习AXIOS的源码.并且在学习过程中，熟悉一下，xhr以及后面

import { copyObj, each, buildUrl, isObject, isFile, isBlob } from '../util'

function getXMLHttpRequest() {
    try {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");	
        }
        catch(e) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    catch(e) {
        return new XMLHttpRequest();
    }
}

var defaults = {
    transformRequest: [function(data) {
        return isObject(data) &&
          !isFile(data) &&
          !isBlob(data) ?
            JSON.stringify(data) : null;
    }],
    transformResponse: [function(data) {
        if (typeof data === 'string') {
            data = data.replace(/^\)\]\}',?\n/, '');
            if (/^\s*(\[|\{[^\{])/.test(data) && /[\}\]]\s*$/.test(data)) {
              data = JSON.parse(data);
            }
        }
        return data;
    }],
    headers: {
        common: {
            'Accept': 'application/json, text/plain, */*'
        },
        patch: { 'Content-Type': 'application/json;charset=utf-8' },
        post: { 'Content-Type': 'application/json;charset=utf-8' },
        put: { 'Content-Type': 'application/json;charset=utf-8' }
    }
}

var transformData = function(data, headers, fns) {
    fns.forEach(function (fn) {
        data = fn(data, headers);
    });
    return data;
}

var axios = function axios(config) {
    config = copyObj({
        method: 'get',
        headers: {},
        transformRequest: defaults.transformRequest,
        transformResponse: defaults.transformResponse
    }, config)

    

    var promise = new Promise(function(resolve, reject) {
        var request = getXMLHttpRequest();
        var data = transformData(
            config.data,
            config.headers,
            config.transformRequest
        );
        request.open(config.method, buildUrl(config.url, config.params), true);
        request.onreadystatechange = function() {
            // 0 为初始化——open函数还没调用。 1 正在加载——open函数已调用，但send函数没有调用。 2 已加载  ——send函数已调用。 3 正在交互——服务器正在发送响应。 4 完成    ——服务器完成发送响应。
            if(request && request.readyState === 4) {
                var headers = request.getAllResponseHeaders();
                var response = {
                    data: transformData(
                      request.responseText,
                      headers,
                      config.transformResponse
                    ),
                    status: request.status,
                    headers: headers,
                    config: config
                }; 
                (request.status >= 200 && request.status < 300 ? resolve : reject)(response.data, response.status, response.headers, response.config);
                request = null;
            }
        }
        var headers = copyObj(
            defaults.headers.common,
            defaults.headers[config.method] || {},
            config.headers || {}
        );
        each(headers, function (val, key) {
            // Remove Content-Type if data is undefined
            if (!data && key.toLowerCase() === 'content-type') {
                delete headers[key];
            }
            // Otherwise add header to the request
            else {
                request.setRequestHeader(key, val);
            }
        });
        request.send(data);
    })
    return promise
}

createShortMethods('get', 'delete');
createShortMethodsWithData('post', 'put');

function createShortMethods() {
    each(arguments, function(method) {
        axios[method] = function(url, config) {
            console.info(config, 444);
            return axios(copyObj(config || {}, {method: method, url: url}))
        }
    })
}

function createShortMethodsWithData() {
    each(arguments, function(method) {
        axios[method] = function(url, data, config) {
            return axios(copyObj(config || {}, {
                method: method,
                url: url,
                data: data
            }))
        }
    })
}

export default axios;