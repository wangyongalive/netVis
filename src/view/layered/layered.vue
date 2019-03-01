<template>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div id="container" style="width: 1000px;height:600px;"></div>
</template>

<script>
  import echarts from 'echarts';
  import 'echarts-gl';
  import data from '../../../static/mock/table.json';

  export default {
    name: "layered",
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('container'));
        var sizeValue = '57%';
        myChart.setOption({
          tooltip: {},
          grid3D: {
            viewControl: {
              // 使用正交投影。
              projection: 'orthographic'
            },
            width: '50%',
            // show:false
          },
          grid: [
            {left: '50%', width: '20%', bottom: sizeValue},
            {left: '75%', width: '20%', bottom: sizeValue},
            {left: '50%', width: '20%', top: sizeValue},
            {left: '75%', width: '20%', top: sizeValue}
          ],
          xAxis: [
            {type: 'value', gridIndex: 0, name: 'Income', axisLabel: {rotate: 50, interval: 0}},
            {
              type: 'category',
              gridIndex: 1,
              name: 'Country',
              boundaryGap: false,
              axisLabel: {rotate: 50, interval: 0}
            },
            {type: 'value', gridIndex: 2, name: 'Income', axisLabel: {rotate: 50, interval: 0}},
            {type: 'value', gridIndex: 3, name: 'Life Expectancy', axisLabel: {rotate: 50, interval: 0}}
          ],
          yAxis: [
            {type: 'value', gridIndex: 0, name: 'Life Expectancy'},
            {type: 'value', gridIndex: 1, name: 'Income'},
            {type: 'value', gridIndex: 2, name: 'Population'},
            {type: 'value', gridIndex: 3, name: 'Population'}
          ],
          xAxis3D: {
            // 因为 x 轴和 y 轴都是类目数据，所以需要设置 type: 'category' 保证正确显示数据。
            type: 'category'
          },
          yAxis3D: {
            type: 'log'
          },
          zAxis3D: {},
          visualMap: { // 将第4个维度用颜色编码
            calculable: true,
            max: 100,
            // 维度的名字默认就是表头的属性名
            dimension: 'Life Expectancy',
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          dataset: {
            source: data
          },
          series: [
            {
              type: 'scatter3D',
              symbolSize: 3,
              encode: {
                // 维度的名字默认就是表头的属性名
                x: 'Country',
                y: 'Population',
                z: 'Income',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: 2.5,
              xAxisIndex: 0,
              yAxisIndex: 0,
              encode: {
                x: 'Income',
                y: 'Life Expectancy',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: 2.5,
              xAxisIndex: 1,
              yAxisIndex: 1,
              encode: {
                x: 'Country',
                y: 'Income',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: 2.5,
              xAxisIndex: 2,
              yAxisIndex: 2,
              encode: {
                x: 'Income',
                y: 'Population',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: 2.5,
              xAxisIndex: 3,
              yAxisIndex: 3,
              encode: {
                x: 'Life Expectancy',
                y: 'Population',
                tooltip: [0, 1, 2, 3, 4]
              }
            }
          ]
        })
        myChart.on('click', function (params) {
          console.log(params);
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

</style>
