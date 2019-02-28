<template>
  <div id="webglContain" width="100%" height="100%">
    <el-button-group>
      <el-button type="info"
                 @click="removeSvg"
                 class="iconfont icon-remove "
                 size="small"
                 title="移除"
      >
      </el-button>
      <el-button type="info"
                 @click="change"
                 class="iconfont icon-Zoomoutplace"
                 size="small"
                 title="禁用/开启zoom"
      ></el-button>
    </el-button-group>
    <div id="graph" width="100%" height="100%">

    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import data from '../../../static/mock/blocks';

  export default {
    name: "Webgl",
    data() {
      return {
        zoomState: true,
        svgState: false,
        color: '', // color用来保存节点的颜色
        Graph: ''
      }
    },
    mounted() {

      const elem = document.getElementById('graph');

      let highlightLink = null
      let centerPoint = {x: 0, y: 0} // 保存中心点的坐标
      let width = document.getElementById('main').clientWidth
      let height = document.getElementById('main').clientHeight
      // link绑定的数据是边的数据
      // node绑定的数据是点的数据


      this.Graph = ForceGraph()(elem)
        .backgroundColor('#101020')
        .width(width)
        .height(height)
        .nodeRelSize(8)
        .nodeAutoColorBy('user') // 节点的颜色
        .nodeLabel(node => `id:${node.id} name:${node.name}`) // 悬浮在节点的时候显示的信息
        .onNodeHover((node, prevNode) => {
          if (node) { // color写在外面的时候 颜色不会变为原来的颜色
            this.color = node.color
            node.color = '#303030'
            console.log(`x=${node.x}   y:${node.y}`);
          } else {
            prevNode.color = this.color
          }
        })
        .onNodeClick(node => { // 点击节点后 将视图切换到屏幕中央
          // Center/zoom on node
          this.Graph.centerAt(node.x, node.y, 1000);
          // zoom([num], [ms])
          this.Graph.zoom(1, 1000);
        })
        .linkColor(() => 'rgba(255,255,255,0.2)') // 边的颜色
        .linkCurvature('curvature') // 边的形状
        .linkSource('source')
        .linkTarget('target')
        .linkDirectionalArrowLength(15) // source --> target  箭头
        .onLinkHover(link => { // 悬浮的边
          highlightLink = link;
        })
        .linkWidth(link => link === highlightLink ? 5 : 1) // 这遍历的数据还是非常快的
        .linkDirectionalParticles(4)
        .linkDirectionalParticleWidth(link => link === highlightLink ? 4 : 0)
        .enablePointerInteraction(false) // 取消鼠标事件
        .enableZoomPanInteraction(this.zoomState)
        .linkHoverPrecision(8)
        .graphData(data)


      const brushed = () => {
        centerPoint = this.Graph.centerAt()
        console.log(centerPoint)
        x.domain([-width / 2 + centerPoint.x, width / 2 + centerPoint.x])
        y.domain([-height / 2 + centerPoint.y, height / 2 + centerPoint.y])

        var result = []
        var resultId = []
        var resultLink = []
        var s = brush.extent(),
          x0 = s[0][0],
          y0 = s[0][1],
          x1 = s[1][0],
          y1 = s[1][1],
          dx = x1 - x0,
          dy = y1 - y0;


        if (dx && dy) {
          var name = []
          result = this.Graph.graphData().nodes.filter((item) => { // result是刷新后的数据
            if (item.x > x0 && item.x < x1 && item.y > y0 && item.y < y1)
              return true
            else
              return false
          })
          console.log(result);
          resultId = result.map((item) => { // 过滤后的name
            return item.id
          })
          console.log(resultId);
          result.forEach((item) => { // 弄清楚框选中的节点的链接关系
            name = []
            this.Graph.graphData().links.forEach((value) => {
              // 这里保存的是保存的是source开始的有向图
              if (value.source.id === item.id && resultId.includes(value.target.id)) { // 目标节点和源节点都在result中
                name.push(value.target.id)
              }
              // else if (value.target.id === item.id && resultId.includes(value.source.id)) { // 目标节点和源节点都在result中
              //   name.push(value.source.id)
              // }
            })
            resultLink.push({
              [item.id]: name
            })

          })
          console.log(resultLink);
        }
        this.$data.brushLink = resultLink
        // 发布消息(deleteTodo)
        PubSub.publish('find', result)
      }


      // 防抖
      function debounce(fn, delay) {
        // 维护一个 timer
        let timer = null;
        return function () {
          // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
          let context = this;
          let args = arguments;

          clearTimeout(timer);
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        }
      }

      // node的坐标是正常的3倍
      var x = d3.scale.linear()
        .range([0, width])
      // .domain([-window.innerWidth/2, window.innerWidth/2]) // 刷子的范围

      var y = d3.scale.linear()
        .range([0, height])
      // .domain([-window.innerHeight/2, window.innerHeight/2]) // 刷子的范围

      var brush = d3.svg.brush()
        .x(x)
        .y(y)
        .on("brush", debounce(brushed, 500))

      d3.select("#graph").append('svg')
        .attr("class", "brushsvg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class", "brush")
        .call(brush)


    },
    methods: {
      async getData() {
        await axios.get('/get/handledata').then((response) => {
          this.data = response.data
          console.log(response.data);
        })
          .catch(function (error) {
            console.log('获取数据出错: ' + error)
          })
      },
      removeSvg() {
        this.svgState = !this.svgState
        console.log(this.svgState);
        if (this.svgState) {
          d3.select('.brushsvg').style({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "z-index": 90
          })
        } else {
          d3.select('.brushsvg').style({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "z-index": -1
          })
        }
      },
      change() { // 禁止zoom事件
        this.zoomState = !this.zoomState
        console.log(this.zoomState);
        this.Graph.enableZoomPanInteraction(this.zoomState)
      }
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      document.title = to.meta.title // 更改标题
      to.meta.keepAlive = false; // 从webgl出发的都要设置为false
      next();
    }
  }
</script>

<style lang="less" scoped>
  @import "webgl.less";
</style>
