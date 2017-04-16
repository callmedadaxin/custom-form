/**
 * 用于统一的请求控制，使用vue-resource进行请求
 * 约定200为成功状态码
 * 使用Promise进行异步管理
 * @Author   wangweixin
 * @DateTime 2017-02-07T14:37:28+0800
 */

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
};

Vue.http.options.emulateJSON = true;

// interceptor json格式化
Vue.http.interceptors.push((request, next) => {
  next((res) => {
    if (typeof(res.data) == 'string') {
      var json = {};

      try {
        json = JSON.parse(res.data);
      } catch (e) {
        json = {
          code: 500,
          message: '服务器异常，请重试！'
        }
      }

      res.data = json;
      return res;
    } else {
      return res;
    }
  })
});

//code状态码200判断
Vue.http.interceptors.push((request, next) => {

  next((res) => {
    if (typeof(Vue.hideLoading) == 'function') {
      Vue.hideLoading();
    }

    return res;
  })
});

/**
 * get方法
 * @param    {[String]}                 url  [请求api]
 * @param    {[Object]}                 data [参数]
 */
export const get = function(url, data, showLoading) {
  if (typeof(data) == 'object' && data !== null) {
    var params = '&' + formatParams(data);
  }

  if (typeof(data) == 'boolean') {
    showLoading = data;
  }

  if (showLoading && typeof(Vue.showLoading) == 'function') {
    Vue.showLoading();
  }

  return Vue.http.get(ENV_OPT.baseApi + url + params).then(r => {
    if (r.data.code == 200) {
      return r.data;
    } else {
      return Promise.reject(r.data);
    }
  })
}

export const post = function(url, data, showLoading) {
  if (typeof(data) == 'boolean') {
    showLoading = data;
  }

  if (showLoading && typeof(Vue.showLoading) == 'function') {
    Vue.showLoading();
  }

  return Vue.http.post(ENV_OPT.baseApi + url, data).then(r => {
    if (r.data.code == 200) {
      return r.data;
    } else {
      return Promise.reject(r.data);
    }
  })
}

function formatParams(data) {
  const arr = [];

  for (let name of Object.keys(data)) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  return arr.join('&');
}