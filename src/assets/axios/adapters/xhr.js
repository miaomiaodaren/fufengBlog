import { copyObj } from '../../util'
module.exports = function xhrAdapter(resolve, reject, config) {
    var data = transformData(
        config.data,
        config.headers,
        config.transformRequest
    );

    var headers = copyObj(
        defaults.headers.common,
        defaults.headers[config.method] || {},
        config.headers || {}
    );
}