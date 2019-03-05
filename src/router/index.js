import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout/layout'
// import Webgl from '@/view/webgl/webgl'
import Heatmap from '@/view/heatMap/heatmap'
// import  Layered from '@/view/layered/layered';
import  webglLayered from '@/view/webglLayered/webglLayered';

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
      path: '/heatmap',
      name: 'heatmap',
      component: Heatmap,
      meta: {keepAlive: true, title: 'heatmap'} // 页面的名称
    },
    // {
    //   path: '/layered',
    //   name: 'layered',
    //   component: Layered,
    //   meta: {keepAlive: true, title: 'layered'} // 页面的名称
    // },
    // {
    //   path:'/',
    //   redirect:'/layered'
    // },
    {
      path: '/webgllayered',
      name: 'webglLayered',
      component: webglLayered,
      meta: {keepAlive: true, title: 'webglLayered'} // 页面的名称
    },
    {
      path:'/',
      redirect:'/webgllayered'
    }
  ]
})
