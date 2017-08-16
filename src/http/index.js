import axios from 'axios'
import router from '@/router/index'
import qs from 'query-string'

import { Loading, Message, Notification } from 'element-ui'

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //baseURL: 'http://testh5.huaqiaobao.cn',
    timeout: 300000
});

instance.interceptors.request.use(config => {
    //只有在已经登录的情况下才设置请求头
    console.log(qs);
    return config
  }, error => {
      return Promise.reject(error)
})

const HOST = process.env.NODE_ENV === 'development' ? '/api' : ''


//尝试使用async await 替换promise，使js更加语意化，并简洁
const GetAjax = async function(url, params, type) {
    try {
        return await instance({
            url: HOST + url,
            method: type,
            // params: params,       使用params的时候如果跨域的时候会造成后台req.body无法获取值，只能用req.query获取值，造成混淆，所以这边改成data，使用qs转换
            data: qs.stringify(params)
        })
    }
    catch(err) {
        console.log(err)
    }
}

export default GetAjax