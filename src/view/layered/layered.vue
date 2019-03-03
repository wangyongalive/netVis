<template>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div id="container"></div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import echarts from 'echarts';
  import 'echarts-gl';
  // import data from '../../../static/mock/table.json';
  import data from '../../../static/mock/node.json';

  export default {
    name: "layered",
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 基于准备好的dom，初始化echarts实例
        let self = this;
        var myChart = echarts.init(document.getElementById('container'));
        myChart.setOption({
          tooltip: {
            formatter: function (datas) {
              let res = ''
              res += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${datas.color};"></span><br>`
              for (let i in datas.data) {
                if (['id', 'level'].includes(i))
                  res += `-  ${i} : ${datas.data[i]}<br>`;
              }
              return res;
            }
          },
          // 需要注意的是我们不能跟 grid 一样省略 grid3D
          grid3D: {
            viewControl: {
              // 使用正交投影。
              projection: 'orthographic'
            },
            // width: '50%',
            show: false
          },
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value'
          },
          visualMap: { // 将第4个维度用颜色编码
            type: 'continuous',
            min: 1,
            max: 7,
            text:
              ['顶层', '底层'],
            calculable: true,
            dimension: 'level',
            textStyle: {
              color: '#fff'
            },
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090'],
              symbolSize: [1, 7]
            }
          },
          dataset: {
            source: data
          },
          series: [
            {
              type: 'scatter3D',
              symbolSize: 8,
              dimensions: ['x', 'y', 'level'],
              encode: {
                x: 'x',
                y: 'y',
                z: 'level'
              }
            }
          ]
        })
        myChart.on('click', function (params) {
          let showItems = self.$store.state.nodesLinks.nodes.filter((item) => item.level === params.data.level ? true : false);
          let showIds = showItems.map((item) => item.id);
          let param = qs.stringify({
            data: JSON.stringify(showIds)
          })
          axios.post('/get/division', param).then((response) => {
            // this.nodes = response.data.nodes
            // this.links = response.data.links
            // this.renderChart()
          })
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      document.title = to.meta.title
      from.meta.keepAlive = true
      next();
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
    height: 100%;
  }
</style>
