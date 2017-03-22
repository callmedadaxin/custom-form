/**
 * 用于统一的请求控制，使用vue-resource进行请求
 * 约定200为成功状态码
 * 使用Promise进行异步管理
 * @Author   wangweixin
 * @DateTime 2017-02-07T14:37:28+0800
 */

import Vue from 'vue';

//interceptor json格式化
Vue.http.interceptors.push((request, next) => {
  next((res) => {
    if(typeof(res.data) == 'string'){
      var json = {};

      try {
        json = JSON.parse(res.data);
      } catch(e) {
        json = {
          code: 500,
          message: '服务器异常，请重试！'
        }
      }

      return json;
    }else{
      return res;
    }
  })
});

//code状态码200判断
Vue.http.interceptors.push((request, next) => {

  next((res) => {
    if(typeof(Vue.hideLoading) == 'function') {
      Vue.hideLoading();
    }

    if(res.data.code == 200) {
      return res;
    } else {
      return Promise.reject(res);
    }
  })
});

/**
 * get方法
 * @param    {[String]}                 url  [请求api]
 * @param    {[Object]}                 data [参数]
 */
export const get = function (url, data, showLoading) {
  if(showLoading && typeof(Vue.showLoading) == 'function') {
    Vue.showLoading();
  }

  let params = '&' + formatParams(data);

  return Vue.http.get( ENV_OPT.baseApi + url + params).then(r=>{
    return r.data;
  })
}

export const post = function (url, data, showLoading) {
  if(showLoading && typeof(Vue.showLoading) == 'function') {
    Vue.showLoading();
  }

  return Vue.http.post( ENV_OPT.baseApi + url , data ).then(r=>{
    return r.data;
  })
}

function formatParams(data) {
  const arr = [];

  for (let name of Object.keys(data) ) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  return arr.join('&');
}