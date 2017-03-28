// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import router from './router.js'
// import 'common/scss/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI)

//toast
import Toast from 'lib/toast/index.js'
Vue.use(Toast);

Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
};

Vue.http.options.emulateJSON = true;

new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: {
    App
  }
})