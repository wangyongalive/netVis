// 防止用户浏览器异常问题
let defaultLayout = 'webgl'
try {
  if (localStorage.layout) {
    defaultLayout = localStorage.layout
  }
} catch (e) {}


export default {
  layout: defaultLayout,
  nodesLinks:{}
}
