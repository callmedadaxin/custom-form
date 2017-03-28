import Vue from 'vue'
import VueX from 'vuex'
import actions from './action.js';

Vue.use(VueX)

//初始状态
const state = {
  baseData: {},
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  SETDATA (state, data) {
  	state.baseData = data;
  },
}

const getters = {
	baseData: state => state.baseData,
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new VueX.Store({
  state,
  mutations,
  actions,
  getters
})