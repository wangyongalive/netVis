import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout/layout'
import Webgl from '@/view/webgl/webgl'
import Heatmap from '@/view/heatMap/heatmap'

Vue.use(Router)

export default new Router({
  routes: [
    {

      path: '/layout',
      name: 'Layout',
      component: Layout,
      meta: {keepAlive: true, title: 'Layout'} // keepAlive是否缓存 页面的名称
    },
    {
      path: '/webgl',
      name: 'Webgl',
      component: Webgl,
      meta: {keepAlive: true, title: 'Webgl'} // 页面的名称
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: Heatmap,
      meta: {keepAlive: true, title: 'heatmap'} // 页面的名称
    },
    {
      path: '/',
      redirect: '/webgl'
    }
  ]
})
