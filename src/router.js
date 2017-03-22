import VueRouter from 'vue-router';

const routes = [
  { path: '/', redirect: '/page1' },
  {
    path: '/page1',
    component: resolve => require(['./views/page1/index'], resolve)
  },

  {
    path: '/page2',
    component: resolve => require(['./views/page2/index'], resolve),
  }
]

export default new VueRouter({
  routes
});