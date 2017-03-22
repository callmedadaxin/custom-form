/**
 * 统一提示处理，包含吐司消息，以及临时的loading
 * 挂载全局
 * 吐司 this.$toast(msg)
 * loading this.$showLoading() 
 * @Author   wangweixin
 * @DateTime 2017-02-07T17:09:46+0800
 */

import Vue from 'vue';
import Toast from './index.vue';

const div = document.createElement('div');

div.setAttribute('id', 'm-toast');

document.body.appendChild(div);

const Modal = Vue.extend(Toast);

let instance = new Modal().$mount('#m-toast');

const toast = function (msg) {
	console.log(msg);
	instance.msg = msg;
	instance.showToast();
}

const showLoading = function (msg) {
	instance.showLoading();
}


const hideLoading = function (msg) {
	instance.hideLoading();
}

export default {
	install : function () {
		Vue.toast = toast;
		Vue.showLoading = showLoading;
		Vue.hideLoading = hideLoading;

		Vue.prototype.$toast = toast;
		Vue.prototype.$showLoading = showLoading;
		Vue.prototype.$hideLoading = hideLoading;
	}
}

