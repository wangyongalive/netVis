import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/view/layout/layout';
import Heatmap from '@/view/heatMap/heatmap';
import webglLayered from '@/view/webglLayered/webglLayered';
import {mapState} from 'vuex';

Vue.use(Router)
let redirectPath = 'webglLayered';
try {
  if (localStorage.layout) {
    redirectPath = localStorage.layout
  }
} catch (e) {
}

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
    {
      path: '/webglLayered',
      name: 'webglLayered',
      component: webglLayered,
      meta: {keepAlive: true, title: 'webglLayered'} // 页面的名称
    },
    {
      path: '/',
      redirect: redirectPath
    }
  ]
})
