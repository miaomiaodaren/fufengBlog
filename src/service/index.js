import GetAjax from '@/http/index'

// 获取首页问题列表
// this.getAjax('/news/newslist', params, type ? 'POST': 'GET');
export const GetProList = (params) => GetAjax('/news/newslist', params, 'POST');


//测试node中间件的外部接口
export const minApi = GetAjax('/news/aa', {}, 'GET');

//首页根据内容进行搜索
export const hasSearch = (params, type) => GetAjax('/news/search', params, type);

//上传用户头像api
export const huploader = '/api/users/uploader';
