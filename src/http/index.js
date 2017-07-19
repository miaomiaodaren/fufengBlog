import axios from 'axios'
import router from '@/router/index'

import { Loading, Message, Notification } from 'element-ui'

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //baseURL: 'http://testh5.huaqiaobao.cn',
    timeout: 5000
});

instance.interceptors.request.use(config => {
    //只有在已经登录的情况下才设置请求头
    return config
  }, error => {
      return Promise.reject(error)
})

const HOST = process.env.NODE_ENV === 'development' ? '/api' : ''
const GetAjax = function(url, params, type) {
    return new Promise((resolve, reject) => {
        instance({
            url: HOST + url,
            method: type,
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default GetAjax
