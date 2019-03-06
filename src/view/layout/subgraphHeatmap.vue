<template>
  <div id="subHeatmap" :style="{width: width,height: height}" ref="subHeatmap">

  </div>
</template>

<script>
  import Heatmap from 'heatmap.js'

  export default {
    name: "subgraphHeatmap",
    mounted() {
      this.drawHeatMap();
      this.drawNode(10,10,10);
    },
    data() {
      return {
        subWidth: 0, // 图大小  Number
        subHeight: 0,
        padding: {top: 2, bottom: 2, left: 2, right: 2}
      }
    },
    props: {
      width: {
        type: String,
        default: '100px'
      },
      height: {
        type: String,
        default: '100px'
      },
      datas: {
        type: Array,
        default: []
      }
    },
    methods: {
      drawHeatMap() {
        let self = this;
        let heatmapInstance = Heatmap.create({
          container: document.querySelector('#subHeatmap'),
          // radius: 100,
          gradient: {
            0.25: "rgb(0,0,255)",
            0.50: "rgb(0,255,0)",
            0.75: "yellow",
            1: "rgb(255,0,0)"
          },
          blur: .75, // blur决定外圆与内圆的占比大小,值为0-1;值越大,外圆占比越大.
        })

        // 比例尺
        let x_scale = d3.scale.linear().domain(d3.extent(self.datas, function (d) {
          return d.x;
        })).range([self.padding.left, parseInt(self.width) - self.padding.right]);

        let y_scale = d3.scale.linear().domain(d3.extent(self.datas, function (d) {
          return d.y;
        })).range([self.padding.top, parseInt(self.width) - self.padding.bottom]);

        let points = [];
        this.datas.forEach(function (item) {
          let point = {
            x: parseInt(x_scale(item.px)),
            y: parseInt(y_scale(item.py)),
            value: 3,
            // radius configuration on point basis
            radius: 6
          };
          points.push(point);
        })
        // heatmap data format
        let data = {
          max: 5,
          data: points
        };
        heatmapInstance.setData(data);
      },
      drawNode(x, y, radius) {
        let nodeCanvas = document.getElementsByClassName('heatmap-canvas')[0]
        let nodeCtx = nodeCanvas.getContext('2d');
        nodeCtx.beginPath();
        nodeCtx.arc(x, y, radius, 0, 2 * Math.PI);
        nodeCtx.stroke();
      },
    }
  }
</script>

<style scoped lang="less">
  @import "subgraphHeatMap.less";
</style>
