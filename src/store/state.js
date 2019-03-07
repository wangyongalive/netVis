// 防止用户浏览器异常问题
let defaultLayout = 'webglLayered'
try {
  if (localStorage.layout) {
    defaultLayout = localStorage.layout
  }
} catch (e) {
}


export default {
  layout: defaultLayout,
  nodesLinks: {},
  scale: '',
  translate: ''
}
