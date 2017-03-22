import Vue from 'vue';


/**
 * 图片预加载方法
 */
export const preLoad = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();

    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  })
}

/**
 * 异步上传文件
 * @type {Object}
 */
export const xhr4File = function() {
  this.xhr = new XMLHttpRequest();
}

xhr4File.prototype = {
  init(cfg) {
    this.cfg = cfg;
  },

  send(file) {
    this.xhr = new XMLHttpRequest();
    this.xhr.open('post', this.cfg.url, true);
    this.bindEvents();
    this.xhr.send(file);
  },

  bindEvents() {
    this.progress();
    this.load();
  },

  progress() {
    var onProgress = this.cfg.onProgress;

    if (onProgress) {
      this.xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
          var p = parseInt(e.loaded / e.total * 100);
          if (p > 15 && p < 100) {
            onProgress(p);
          }
        }
      }, false);
    }
  },

  load() {
    var xhr = this.xhr,
      that = this,
      onLoad = this.cfg.onLoad;

    xhr.addEventListener('load', function(r) {
      if (this.readyState == 4 && this.status == 200) {
        try {
          var json = JSON.parse(xhr.responseText);
        } catch (e) {
          var json = {
            'code': 500,
            message: '服务器异常，请重试'
          };
        }

        if (json.code == 200) {
          onLoad && onLoad(json);
        } else {
          that.error(json);
        }
      } else {
        that.error({
          message: '网络异常，请重试'
        });
      }
    })
  },

  error(msg) {
    var onError = this.cfg.onError;

    onError && onError(msg);
  }
}

export const erlize = function(url) {
  var result = {};

  url = url.substr(url.indexOf("?") + 1);
  var args = url.split("&");
  for (var i = 0, len = args.length; i < len; i++) {
    var arg = args[i];
    var item = arg.split('=');
    result[item[0]] = item[1];
  }
  return result;
};

export const formatParams = (data) => {
  const arr = [];

  for (let name of Object.keys(data)) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  return arr.join('&');
}