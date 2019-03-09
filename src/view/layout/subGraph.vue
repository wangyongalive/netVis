<template>
  <div id="svg-wrap" :style="[Layout]"></div>
</template>

<script>
  // getNodeLinkData isempty 本身就已经是一个方法了  没有必要再注册方法  直接在父组件中调用
  import {build, emptyNodeLinkData} from '@/util/index';

  export default {
    name: "subGraph",
    props: {
      Layout: {
        type: Object,
        //  样式对象  包括位置 布局
        default: function () {
          return {
            position: 'absolute',
            right: 0,
            top: 0,
            width: '236px',
            height: '236px',
            border: 'solid gray',
            'z-index': '1000',
            'border-width': '0 0 1px 1px'
          }
        }
      },
    },
    methods: {
      buildgraph(command) {
        if (command === '创建网络') {
          if (d3.select('#svg-wrap').select('svg')) {
            d3.select('#svg-wrap').select('svg').remove()
          }
          build()
        } else {
          emptyNodeLinkData();
          document.getElementById("buildGraph").innerHTML = ""
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "subGraph";
</style>
