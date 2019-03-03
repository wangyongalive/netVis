<template>
  <div>
    <div id="over">
      <div class="loading" id="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!--保证先出现control;-->
    <control></control>
    <div id="main">
      <!--将keep-alive和router-view配合使用-->
      <!--keepAlive为true的就要缓存，为false的就缓存-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <infotable></infotable>
  </div>
</template>

<script>
  import control from './components/control'
  import infotable from './components/infotable'
  import kscreenshot from 'kscreenshot' // 截图
  import api from '@/api/index'

  export default {
    name: 'App',
    components: {control, infotable},
    mounted() {
      //65指键盘中的A
      new kscreenshot({
        key: 65,
        needDownload: true
      })
    },
    created() {
      api.getData().then((res) => {
        // 更新vuex

        this.$store.dispatch('getnodesLinks', res.data);
      })
    }
  }
</script>

<!--这里要指定lang,不然会无法使用less-->
<!--在main.js中使用less会报错，在App组件中就不会报错-->
<style lang="less">
  @import "assets/App.less";
  @import "assets/all.less";
  /*做一个loading组件  但是处理速度太快 没法使用*/
</style>
