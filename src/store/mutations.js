export default {
  // mutations放置用来改变数据的方法.更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  changeLayout(state, layout) {
    state.layout = layout
    try {
      localStorage.layout = layout
    } catch (e) {
    }
  },
  getnodesLinks(state, nodesLinks) {
    state.nodesLinks = nodesLinks
    try {
      // 保存到本地防止  刷新后vuex状态丢失
      localStorage.nodesLinks = JSON.stringify(nodesLinks)
    } catch (e) {
    }
  },
  changeScaleTrans(state, obj) {
    state.scale = obj.scale;
    state.translate = obj.translate;
  }
}
