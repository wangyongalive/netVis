import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// 导出一个仓库
// 将当前的布局状态保存到vuex中
export default new Vuex.Store({
  state, // 放公用数据
  mutations, // 放异步操作或者批量处理同步操作 (简单情况可跳过action直接到mutations)
  actions
})
