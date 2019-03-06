<template>
  <div>
    <div class="legend-area">
      <span id="min"></span>
      <span id="max"></span>
      <img id='gradient' style="width:100%">
    </div>
    <div class='container' :style="{width: width,height: height}">
      <div class="demo-wrapper" :style="{width: width,height: height}" ref="wrapper">
        <div id="subHeatmap" :style="{width: width,height: height}" ref="subHeatmap"></div>
        <div class="tooltip"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Heatmap from 'heatmap.js'

  export default {
    name: "subgraphHeatmap",
    mounted() {
      this.drawHeatMap();
      this.showtoolTip();
      this.getCtx();
      this.drawNode(10, 10, 10);
    },
    data() {
      return {
        subWidth: 0, // 图大小  Number
        subHeight: 0,
        padding: {top: 2, bottom: 2, left: 2, right: 2},
        Ctx: null,
        heatmapInstance: {},
        points: [], // 热力图中的数据
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
      getCtx() {
        let Canvas = document.getElementsByClassName('heatmap-canvas')[0];
        this.Ctx = Canvas.getContext('2d');
      },
      drawHeatMap() {
        let self = this;
        this.heatmapInstance = Heatmap.create({
          container: document.querySelector('#subHeatmap'),
          gradient: {
            0.25: "rgb(0,0,255)",
            0.50: "rgb(0,255,0)",
            0.75: "yellow",
            1: "rgb(255,0,0)"
          },
          blur: .75, // blur决定外圆与内圆的占比大小,值为0-1;值越大,外圆占比越大.
          onExtremaChange: function (data) {
            updateLegend(data);
          }
        })

        /*  start legend code */
        // we want to display the gradient, so we have to draw it
        let legendCanvas = document.createElement('canvas');
        legendCanvas.width = 200;
        legendCanvas.height = 10;
        let min = document.querySelector('#min');
        let max = document.querySelector('#max');
        let gradientImg = document.querySelector('#gradient');
        let legendCtx = legendCanvas.getContext('2d');
        let gradientCfg = {};

        function updateLegend(data) {
          // the onExtremaChange callback gives us min, max, and the gradientConfig
          // so we can update the legend
          min.innerHTML = data.min;
          max.innerHTML = data.max;
          // regenerate gradient image
          if (data.gradient != gradientCfg) {
            gradientCfg = data.gradient;
            let gradient = legendCtx.createLinearGradient(0, 0, 200, 0);
            for (let key in gradientCfg) {
              gradient.addColorStop(key, gradientCfg[key]);
            }
            legendCtx.fillStyle = gradient;
            legendCtx.fillRect(0, 0, 200, 10);
            legendCtx.stroke()
            gradientImg.src = legendCanvas.toDataURL();
          }
        };
        /* legend code end */

        // 比例尺
        let x_scale = d3.scale.linear().domain(d3.extent(self.datas, function (d) {
          return d.x;
        })).range([self.padding.left, parseInt(self.width) - self.padding.right]);

        let y_scale = d3.scale.linear().domain(d3.extent(self.datas, function (d) {
          return d.y;
        })).range([self.padding.top, parseInt(self.width) - self.padding.bottom]);

        this.points = [];
        this.datas.forEach((item) => {
          let point = {
            x: parseInt(x_scale(item.px)),
            y: parseInt(y_scale(item.py)),
            value: 3,
            // radius configuration on point basis
            radius: 6
          };
          this.points.push(point);
        })
        // heatmap data format
        let data = {
          max: 5,
          data: this.points
        };
        this.heatmapInstance.setData(data);
      },
      showtoolTip() {
        /* 提示框开始*/
        let demoWrapper = document.querySelector('.demo-wrapper');
        let tooltip = document.querySelector('.tooltip');

        function updateTooltip(x, y, value) {
          let transl = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
          tooltip.style.webkitTransform = transl
          tooltip.innerHTML = value
        }

        demoWrapper.onmousemove = (ev) => {
          let x = ev.layerX
          let y = ev.layerY
          let value = this.heatmapInstance.getValueAt({
            x: x,
            y: y
          });
          tooltip.style.display = 'block'
          updateTooltip(x, y, value)
        };
        demoWrapper.onmouseout = function () {
          tooltip.style.display = 'none'
        }
        /* 提示框结束*/
      },
      drawNode(x, y, radius) {
        this.Ctx.beginPath();
        this.Ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.Ctx.stroke();
      },
      redraw(x, y, radius) {
        this.Ctx.clearRect(0, 0, parseInt(this.width), parseInt(this.height));
        let data = {
          max: 5,
          data: this.points
        };
        this.heatmapInstance.setData(data);
        this.drawNode(x, y, radius);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "subgraphHeatMap.less";
</style>
