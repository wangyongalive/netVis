<template>
  <div style="height: 100%; width: 100%;">
    <div class="demo-wrapper" style="height: 100%; width: 90%;" ref="wrapper">
      <div id="heatmap" style="height: 100%; width: 100%;">
        <!--<canvas class="heatmap-canvas" width="1209" height="662" style="position: absolute; left: 0px; top: 0px;"></canvas>-->
        <!--<el-button-group>-->
          <!--<el-button type="info"-->
                     <!--@click="removeSvg"-->
                     <!--class="iconfont icon-remove "-->
                     <!--size="small"-->
                     <!--title="移除"-->
          <!--&gt;-->

          <!--</el-button>-->
          <!--<el-button type="info"-->
                     <!--@click="getForm"-->
                     <!--class="iconfont icon-tool-DataMatrix"-->
                     <!--size="small"-->
                     <!--title="邻接矩阵"-->
          <!--&gt;-->
          <!--</el-button>-->
          <!--<el-button type="info"-->
                     <!--size="small"-->
                     <!--title="显示节点/边"-->
          <!--&gt;-->
            <!--<el-dropdown size="mini"-->
                         <!--@command="showNodeLink"-->
                         <!--placement="bottom-start"-->
            <!--&gt;-->
              <!--<span class="iconfont icon-relitu"></span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item command="显示节点">显示节点</el-dropdown-item>-->
                <!--<el-dropdown-item command="隐藏节点" divided>隐藏节点</el-dropdown-item>-->
                <!--<el-dropdown-item command="显示边" divided>显示边</el-dropdown-item>-->
                <!--<el-dropdown-item command="隐藏边" divided>隐藏边</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</el-button>-->
          <!--<el-button type="info"-->
                     <!--@click="openBrush"-->
                     <!--class="iconfont icon-formatbrush"-->
                     <!--size="small"-->
                     <!--title="刷子"-->
          <!--&gt;-->
          <!--</el-button>-->
        <!--</el-button-group>-->
      </div>
    </div>
    <!--<div class="block">-->
      <!--<el-slider-->
        <!--v-model="value9"-->
        <!--range-->
        <!--show-stops-->
        <!--:max="88"-->
        <!--@change="changeValue"-->
      <!--&gt;-->
      <!--</el-slider>-->
    <!--</div>-->
    <div class="legend-area">
      <!--<h4>热力图图例</h4>-->
      <span id="rangeS" ref="rangeS">范围:</span>
      <span id="min"></span>
      <span id="max"></span>
      <img id='gradient' style="width:100%">
    </div>
    <div class="tooltip"></div>
  </div>

</template>

<script>
  import PubSub from 'pubsub-js'
  import Heatmap from 'heatmap.js'
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'heatmap',
    data() {
      return {
        dataNodes: [],
        dataLinks: [],
        brushLink: [],
        flagBrush: false,
        points: [], // 热力图中的数据
        heatmapInstance: {},
        value9: [0, 88]
      }
    },
    mounted() {
      if (localStorage.nodesLinks) {
        let data = JSON.parse(localStorage.nodesLinks);
        this.dataNodes = data.nodes;
        this.dataLinks = data.links;

      } else {
        this.dataNodes = this.$store.state.nodesLinks.nodes;
        this.dataLinks = this.$store.state.nodesLinks.links;
      }
      this.renderChart()
    },
    methods: {
      renderChart() {
        const width = 1200,
          height = 600;

        //2.转换数据
        var force = d3.layout.force()
          .nodes(this.dataNodes)	//设定顶点数组
          .links(this.dataLinks)	//设定边数组
          .size([width, height])	//设定作用范围
          .linkDistance(20)	//设定边的距离
          .charge(-20)	//设定顶点的电荷数
          .start();	//开启布局计算


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


        this.heatmapInstance = Heatmap.create({
          container: document.querySelector('#heatmap'),
          // radius: 100,
          gradient: {
            0.25: "rgb(0,0,255)",
            0.50: "rgb(0,255,0)",
            0.75: "yellow",
            1: "rgb(255,0,0)"
          },
          blur: .75, // blur决定外圆与内圆的占比大小,值为0-1;值越大,外圆占比越大.
          // maxOpacity: .9,
          // // minimum opacity. any value > 0 will produce
          // // no transparent gradient transition
          // minOpacity: 0,
          onExtremaChange: function (data) {
            updateLegend(data);
          }
        })


        force.on("tick", () => {
          if (force.alpha() <= 0.01) {  // 足够稳定时，才渲染一次
            this.points = []
            this.$data.dataNodes.forEach((item) => {
              let radius = item.degree == 1 ? 0 : 16
              this.points.push({
                x: Math.floor(item.x),
                y: Math.floor(item.y),
                // value: item.degree, // 这个value不合理
                value: 44, // 这个value不合理
                id: item.id,
                radius: 16
              })
            })
            let data1 = {
              max: 88,
              data: this.points
            };
            this.heatmapInstance.setData(data1);
            force.stop()
          }
        })


        let demoWrapper = document.querySelector('.demo-wrapper');
        let tooltip = document.querySelector('.tooltip');

        function updateTooltip(x, y, value) {
          // + 15 for distance to cursor
          let transl = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
          tooltip.style.webkitTransform = transl
          tooltip.innerHTML = value
        }

        demoWrapper.onmousemove = (ev) => {
          let x = ev.layerX
          let y = ev.layerY
          // legendCtx.getImageData()
          // getValueAt gives us the value for a point p(x/y)
          let value = this.heatmapInstance.getValueAt({
            x: x,
            y: y
          });
          tooltip.style.display = 'block'
          updateTooltip(x, y, value)
        };
        // hide tooltip on mouseout
        demoWrapper.onmouseout = function () {
          tooltip.style.display = 'none'
        }


        let x = d3.scale.linear()
          .domain([0, width])
          .range([0, width]) // 刷子的范围

        let y = d3.scale.linear()
          .domain([0, height])
          .range([0, height]) // 刷子的范围

        const brushed = () => {
          let result = []  // 过滤后的数据
          let resultId = []  // 过滤后的数据的id
          let resultLink = [] // 数据的连接关系
          let s = brush.extent(),
            x0 = s[0][0],
            y0 = s[0][1],
            x1 = s[1][0],
            y1 = s[1][1],
            dx = x1 - x0,
            dy = y1 - y0;
          if (dx && dy) {
            let name = []
            // result是过滤后的数据
            result = force.nodes().filter((item) =>
              (item.x > x0 && item.x < x1 && item.y > y0 && item.y < y1) ? true
                : false
            )
            // 过滤后的id
            resultId = result.map((item) => {
              return item.id
            })
            // 弄清楚框选中的节点的链接关系
            resultId.forEach((item) => {
              let group, name = []
              force.links().forEach((value) => {
                // 这里保存的是source开始的有向图
                if (value.source.id === item && resultId.includes(value.target.id)) { // 目标节点和源节点都在result中
                  name.push({'id': value.target.id, 'group': value.target.group})
                  group = value.source.group
                }
                else if (value.target.id === item && resultId.includes(value.source.id)) { // 目标节点和源节点都在result中
                  name.push({'id': value.source.id, 'group': value.target.group})
                  group = value.target.group
                }
              })
              resultLink.push({
                'id': item,
                [item]: name,
                'group': group
              })
            })
          }
          this.brushLink = resultLink
          // 发布消息
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


        var brush = d3.svg.brush()
          .x(x)
          .y(y)
          .on("brush", debounce(brushed, 500))

        d3.select("#heatmap").append('svg')
          .attr("class", "brushsvg")
          .attr("width", 1200)
          .attr("height", 600)
          .append("g")
          .attr("class", "brush")
          .call(brush)


      },
      tomatrix(miserables) {
        let margin = {top: 50, right: 0, bottom: 10, left: 100},
          width = 600,
          height = 600;

        let x = d3.scale.ordinal().rangeBands([0, width]),
          z = d3.scale.linear().domain([0, 4]).clamp(true),
          c = d3.scale.category10().domain(d3.range(10));

        let svg = d3.select("#heatmap").append("svg")
          .attr("class", 'mysvg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style({
            "margin-left": margin.left + "px",
            "font": "13px sans-serif"
          })
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function (d) {
            return `<strong>degree:</strong> <span style='color:red'> ${d.z / 2} </span></br>`
          })

        svg.call(tip);

        // 这里的json的数据格式必须匹配
        let matrix = [],
          nodes = miserables.nodes,
          n = nodes.length;

        // Compute index per node.
        nodes.forEach(function (node, i) {
          node.index = i;
          node.count = 0;
          matrix[i] = d3.range(n).map(function (j) {
            return {x: j, y: i, z: 0};
          });
        });

        // Convert links to matrix; count character occurrences.
        miserables.links.forEach(function (link) {
          matrix[link.source][link.target].z += link.value;
          matrix[link.target][link.source].z += link.value;
          matrix[link.source][link.source].z += link.value;
          matrix[link.target][link.target].z += link.value;
          nodes[link.source].count += link.value;
          nodes[link.target].count += link.value;
        });

        // Precompute the orders.
        let orders = {
          id: d3.range(n).sort(function (a, b) {
            return d3.ascending(nodes[a].id, nodes[b].id);
          }),
          count: d3.range(n).sort(function (a, b) {
            return nodes[b].count - nodes[a].count;
          }),
          group: d3.range(n).sort(function (a, b) {
            return nodes[b].group - nodes[a].group;
          })
        };

        // The default sort order.
        x.domain(orders.id);

        svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height);

        var row = svg.selectAll(".row")
          .data(matrix)
          .enter().append("g")
          .attr("class", "row")
          .attr("transform", function (d, i) {
            return "translate(0," + x(i) + ")";
          })
          .each(row);

        row.append("line")
          .attr("x2", width);

        row.append("text")
          .attr("x", -6)
          .attr("y", x.rangeBand() / 2)
          .attr("dy", ".32em")
          .attr("text-anchor", "end")
          .text(function (d, i) {
            return nodes[i].id;
          })
          .attr("stroke", "white")

        var column = svg.selectAll(".column")
          .data(matrix)
          .enter().append("g")
          .attr("class", "column")
          .attr("transform", function (d, i) {
            return "translate(" + x(i) + ")rotate(-90)";
          });

        column.append("line")
          .attr("x1", -width);

        column.append("text")
          .attr("x", 6)
          .attr("y", x.rangeBand() / 2)
          .attr("dy", ".32em")
          .attr("text-anchor", "start")
          .text(function (d, i) {
            return nodes[i].id;
          })
          .attr("stroke", "white")

        function row(row) {
          var cell = d3.select(this).selectAll(".cell")
            .data(row.filter(function (d) {
              return d.z;
            }))
            .enter().append("rect")
            .attr("class", "cell")
            .attr("x", function (d) {
              return x(d.x);
            })
            .attr("width", x.rangeBand())
            .attr("height", x.rangeBand())
            .style("fill-opacity", function (d) {
              return z(d.z);
            })
            .style("fill", function (d) {
              return nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null;
            })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
        }


        d3.select("#order").on("change", function () {
          clearTimeout(timeout);
          order(this.value);
        });

        function order(value) {
          x.domain(orders[value]);

          var t = svg.transition().duration(2500);

          t.selectAll(".row")
            .delay(function (d, i) {
              return x(i) * 4;
            })
            .attr("transform", function (d, i) {
              return "translate(0," + x(i) + ")";
            })
            .selectAll(".cell")
            .delay(function (d) {
              return x(d.x) * 4;
            })
            .attr("x", function (d) {
              return x(d.x);
            });

          t.selectAll(".column")
            .delay(function (d, i) {
              return x(i) * 4;
            })
            .attr("transform", function (d, i) {
              return "translate(" + x(i) + ")rotate(-90)";
            });
        }
      },
      removeSvg() {
        d3.select(".mysvg").remove()
      },
      getForm() { // 将框选部分转变为可以使用的v3格式 并绘制邻接矩阵
        let params = qs.stringify({
          data: JSON.stringify(this.$data.brushLink)
        })
        axios.post('/get/formresult', params).then((response) => {
          this.tomatrix(response.data)
        })
      },
      openBrush() {
        this.flagBrush = !this.flagBrush
        if (this.flagBrush) {
          d3.select('.brushsvg').style({
            'z-index': '98'
          })
        } else {
          d3.select('.brushsvg').style({
            'z-index': '-1'
          })
        }
      },
      showNodeLink(command) {
        let nodeCanvas = document.getElementsByClassName('heatmap-canvas')[0];
        let nodeCtx = nodeCanvas.getContext('2d');
        switch (command) {
          case '显示节点':
            this.points.forEach((item) => {
              this.drawNode(nodeCtx, Math.floor(item.x), Math.floor(item.y), 2)
            })
            break
          case '显示边':
            this.dataLinks.forEach((item) => {
              this.drawLink(nodeCtx, item.source.x, item.source.y, item.target.x, item.target.y)
            })
            break
          case '隐藏边':
          case '隐藏节点':
            nodeCtx.clearRect(0, 0, 1200, 600);
            let data2 = {
              max: 100,
              data: this.points
            };
            this.heatmapInstance.setData(data2)
        }
      },
      drawLink(Ctx, x1, y1, x2, y2) {
        Ctx.moveTo(x1, y1)
        Ctx.lineTo(x2, y2)
        Ctx.lineWidth = 1
        Ctx.lineCap = "round";        //向线条的每个末端添加圆形线帽
        Ctx.strokeStyle = 'rgba(230,230,230,0.4)';
        Ctx.stroke()
      },
      drawNode(Ctx, x, y, radius) {
        Ctx.beginPath();
        Ctx.arc(x, y, radius, 0, 2 * Math.PI);
        Ctx.stroke();
      },
      changeValue(val) {
        let nodeCanvas = document.getElementsByClassName('heatmap-canvas')[0]
        let nodeCtx = nodeCanvas.getContext('2d')
        nodeCtx.clearRect(0, 0, 1200, 600);
        let newData = this.points.filter((item) => {
          if (item.value >= val[0] && item.value <= val[1]) {
            return true
          }
        })
        let data2 = {
          max: 88,
          data: newData
        };
        this.heatmapInstance.setData(data2)
        this.$refs.rangeS.innerText = `范围：${val[0]}-${val[1]}`
      }
    },
    beforeRouteLeave(to, from, next) {
      document.title = to.meta.title
      from.meta.keepAlive = true
      next();
    }
  }
</script>

<style lang="less" scoped>
  @import "heatmap.less";
</style>
