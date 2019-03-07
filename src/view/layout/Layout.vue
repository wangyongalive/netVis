<template>
  <div id="layout" style="height: 100%; width: 100%;" refs="layout">
    <el-button-group>
      <el-button type="info"
                 size="small"
                 title="表格操作"
      >
        <el-dropdown size="mini"
                     @command="operation"
                     placement="bottom-start"
        >
          <span class="iconfont icon-biaoge"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="导入数据">导入数据</el-dropdown-item>
            <el-dropdown-item command="清空表格">清空表格</el-dropdown-item>
            <el-dropdown-item command="取消选择" divided>取消选择</el-dropdown-item>
            <el-dropdown-item command="反选">反选</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
      <el-button type="info"
                 @click="changefish"
                 class="iconfont icon-FishEyeCamera- "
                 size="small"
                 title="鱼眼"
      ></el-button>
      <el-button type="info"
                 @click="setNer"
                 class="iconfont icon-fujin"
                 size="small"
                 title="获取邻居节点"
      ></el-button>
      <el-button type="info"
                 @click="getForm"
                 class="iconfont icon-tool-DataMatrix"
                 size="small"
                 title="领接矩阵"
      ></el-button>
      <el-button type="info"
                 @click="changeMethod"
                 class="iconfont icon-change"
                 size="small"
                 title="变换基本方法"
      ></el-button>
      <el-button type="info"
                 @click="changeDrag"
                 class="iconfont icon-import_drag"
                 size="small"
                 title="拖拽"
      ></el-button>
      <el-button type="info"
                 @click="shortPath"
                 class="iconfont icon-path"
                 size="small"
                 title="最短路径"
      ></el-button>
      <el-button type="info"
                 size="small"
                 title="子图查找"
      >
        <el-dropdown size="mini"
                     @command="findsubgraph"
                     placement="bottom-start"
        >
          <span class="iconfont icon-find-color"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="开始查找">开始查找</el-dropdown-item>
            <el-dropdown-item command="下一个子图" :disabled="subIndex==subGraph.length-1 || subGraph.length==0">下一个子图
            </el-dropdown-item>
            <el-dropdown-item command="上一个子图" :disabled="subIndex==0">上一个子图</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
      <el-button type="info"
                 size="small"
                 title="子图构建"
      >
        <el-dropdown size="mini"
                     @command="buildgraph"
                     placement="bottom-start"
        >
          <span class="iconfont icon-builda3"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="创建网络">创建网络</el-dropdown-item>
            <el-dropdown-item command="清空网络" divided>清空网络</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
      <el-button type="info"
                 size="small"
                 title="网络分层"
      >
        <el-dropdown size="mini"
                     @command="handleCommand"
                     placement="bottom-start"
        >
          <span class="iconfont icon-_division"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="最顶层">最顶层</el-dropdown-item>
            <el-dropdown-item command="上一层" divided :disabled="lay ===0">上一层</el-dropdown-item>
            <el-dropdown-item command="下一层" divided :disabled="lay === lays-1">下一层</el-dropdown-item>
            <el-dropdown-item command="最底层" divided>最底层</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
    </el-button-group>
    <div id="svg-wrap"></div>
    <!--异步获取数据，直接获取数据为空-->
    <subgraph-heatmap :width="250|toPx" :height="250|toPx" :datas="subMapData"
                      v-if="subMapData.length"
    ></subgraph-heatmap>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import {build, getNodeLinkData, emptyNodeLinkData, isempty} from '@/util/index'
  import {flatten} from '@/util/utils'
  import matrix from './matrix'
  import subgraphHeatmap from './subgraphHeatmap'

  export default {
    name: "Layout",
    components: {
      subgraphHeatmap
    },
    data() {
      return {
        obj: {"fish": false, "drag": false, "state": "rect_contain", "shortPath": 'true', 'build': false}, // 对象里面保存的是图的信息
        nodes: [],
        links: [],
        brushLink: [],
        shortNode: [],
        degree: [],
        lays: 0,
        lay: 0, // 默认从第0层开始
        neribor: [],
        shortPathList: '',
        subGraph: [],
        subIndex: 0,
        showLable: false,
        isNer: false,
        curNodeId: '',
        curLinkId: '',
        dataObj: {},
        dataObjLink: {},
        subMapData: []
        // allNodes: [],
        // allLinks: []
      }
    },
    mounted() {

      if (localStorage.nodesLinks) {
        let data = JSON.parse(localStorage.nodesLinks);
        this.nodes = data.nodes;
        this.links = data.links;
      } else {
        this.nodes = this.$store.state.nodesLinks.nodes;
        this.links = this.$store.state.nodesLinks.links;
      }
      this.renderChart()
      this.nodes.forEach((item) => {
        this.dataObj[item.id] = item
      })
      this.links.forEach((item) => {
        this.dataObjLink[item.id] = item
      })

      // 订阅消息
      // 回调函数用箭头函数
      PubSub.subscribe('getNode', (msg, index) => {
        this.resetNode()
        index.forEach((item) => this.selectNode(item))
      })
    },
    methods: {
      renderChart() { // 绘制力导向图

        let self = this
        // const width = 1200,
        //   height = 650
        console.log(self.$refs.layout);
        console.log(document.getElementById('layout').style);
        const width = self.$refs.layout.offsetWidth,
          height = self.$refs.layout.offsetHeight;

        let resultLasso // 索套

        let force = d3.layout.force()
          .nodes(this.nodes)	//设定顶点数组
          .links(this.links)	//设定边数组
          .size([width, height])	//设定作用范围
          .linkDistance(25)	//设定边的距离
          .charge(-25)	//设定顶点的电荷数
          .start();	//开启布局计算

        this.obj.force = force

        if (d3.select('.mainsvg')) { // 如果已经有了画布 先移除
          d3.select('.mainsvg').remove()
        }

        let svg = d3.select('#layout')
          .append('svg')
          .attr("class", "mainsvg")
          .attr('width', width)
          .attr('height', height)

        // 动态添加属性 鱼眼
        this.obj.mainsvg = svg


        let color = d3.scale.category20c()
        let zoom = d3.behavior.zoom()
          .scaleExtent([0, 10])
          .on("zoom", zoomed);

        svg.append("rect")
          .attr("class", "rect_contain")
          .attr("width", width)
          .attr("height", height)
          .style("opacity", 0)
          .call(zoom);

        function zoomed() {
          svg_g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        // 把所有的圆和线都放到一个g元素中
        let svg_g = d3.select('svg')
          .append('g')
          .attr("class", "g_cirLink")


        let lines = svg_g.selectAll(".forceLine")
          .data(this.links)
          .enter()
          .append("line")
          .attr("id", d => `link_${d.id}`)
          .attr("class", "forceLine")
          .attr("stroke-width", d => d.weight)
          .attr("stroke", d => d.color)
          .attr("stroke-opacity", d => d.opacity)
          .on('click', d => {
            this.selectOneLink(d.id);
            (this.$parent.$children)[0].updateLink(d);
            this.curLinkId = d.id
          })
          .on('mouseover', function () {
            d3.select(this).attr("stroke-width", d => d.weight * 2);
          })
          .on('mouseout', function () {
            d3.select(this).attr("stroke-width", d => d.weight);
          })


        //绘制节点
        // 给节点 边 标签 添加交互
        // 节点大小 颜色 边框
        // 边的粗细 颜色 方向 形状
        // 标签的颜色 大小
        // 一个节点标签 包括 circle text
        let svg_nodes_g = svg_g.selectAll(".nodes")
          .data(this.nodes)
          .enter()
          .append("g")
          .attr("id", function (d) {
            return "node_" + d.id;
          })

        let selectNode;
        let circles = svg_nodes_g
          .append("circle")
          .attr("class", "forceCircle")
          .attr("r", 5)
          .attr("id", d => d.id)
          .attr('stroke-width', d => d.strokeWidth) // 默认stroke都为0
          .attr('stroke', d => d.stroke)
          .attr("fill", (d) => d.color = color(d.group))
          .attr('opacity', d => d.opacity)
          .on("dblclick", (d) => {
            d3.select(document.getElementById(d.id))
              .attr('r', 10)
            if (this.shortNode.length == 2) {
              d3.select(document.getElementById(this.shortNode[0]))
                .attr('r', '5')
              this.shortNode.shift()
            }
            this.shortNode.push(d.id)
          })
          .on('click', function (d) {
            // 更新节点的静态信息
            self.$parent.$children[0].updated(d); // control 组件
            // 更新选中节点的样式
            self.selectOneNode(d.id)
            selectNode = d3.select(this)
            self.curNodeId = d.id
          })
          .on('mouseover', function (d) {
            self.nodeHight(d3.select(this))
            if (self.isNer) {
              self.getNeribor2tab(d)
            }
            if (selectNode) {  // 防止当在找邻居的时候目标丢失
              self.nodeHight(selectNode);

            }
          })
          .on('mouseout', function () {
            self.nodeDark(d3.select(this))
            if (self.isNer) {
              self.leaveNode()
            }
            if (selectNode) {
              self.nodeHight(selectNode)
            }
          })
          .on('contextmenu', function (d) { // 右键来获取相连的节点
            d3.event.preventDefault();
            self.getNeribor2tab(d)
          })
          .call(force.drag);


        // 标签  默认不显示
        let lables = svg_nodes_g
          .append('text')
          .attr("cursor", "default")
          .attr("fill", "#FFFAFA")
          .attr("font-size", 8)
          .attr('text-anchor', 'start') // 不要使用middle 不然会由于字体太大使得无法接触到click
          .attr("opacity", 1)
          .attr('dy', '0.5em')
          .attr("visibility", "hidden")
          .attr("font-family", "sans-serif")
          .text(d => d.id)


        force.drag()
          .on("dragstart", d => {
            d.fixed = true;  // 拖拽开始后设定被拖拽对象为固定
          })
          .on("dragend", function (d) {
            // 拖拽结束后变为原来的颜色
            d3.select(this).style("fill", color(d.group));
          })
          .on("drag", function () {
            // 拖拽中对象变为黄色
            d3.select(this).style("fill", "yellow");
          });

        // 这个由两个作用 一个是当鼠标悬浮的时候 显示标题
        // 另外一个是筛选的时候可以选出数据
        circles.append("title")
          .text(d => `${d.id}`)


        // tick事件的监听器
        force.on("tick", () => {
          // if (force.alpha() <= 0.01) {  // 足够稳定时，才渲染一次
          //更新连线的端点坐标
          lines.attr("x1", d => d.source.x)
          lines.attr("y1", d => d.source.y)
          lines.attr("x2", d => d.target.x)
          lines.attr("y2", d => d.target.y)

          //更新节点坐标
          circles.attr("cx", d => d.x)
          circles.attr("cy", d => d.y)

          // 标签的坐标
          // 标签坐标默认不参与计算 来加快速度
          if (this.showLable) {
            lables.attr('x', d => d.x)
            lables.attr('y', d => d.y)
          }

          if (force.alpha() <= 0.01) {
            self.subMapData = self.nodes
          }

          // force.stop(); // 渲染完成后立即停止刷新
          // }
        });


        // 添加动态属性
        this.obj.lines = lines
        this.obj.circles = circles
        this.obj.lables = lables


        // 索套
        // Lasso
        // Lasso functions to execute while lassoing
        let lasso_start = function () {
          lasso.items()
            .classed({"not_possible": true, "selected": false}) // style as not possible
        };
        let lasso_draw = function () {
          // Style the possible dots
          lasso.items().filter(function (d) {
            return d.possible === true
          }).classed({"not_possible": false, "possible": true});
          // Style the not possible dot
          lasso.items().filter(function (d) {
            return d.possible === false
          })
            .classed({"not_possible": true, "possible": false});
        };

        // lasso结束的回调函数  写成箭头函数
        let lasso_end = () => {
          let name = [], resultLink = [];
          resultLasso = lasso.items().filter(function (d) {
            return d.selected === true
          })
            .classed({"not_possible": false, "possible": false})
            .attr("opacity", '1.0')

          // Reset the style of the not selected dots
          lasso.items().filter(function (d) {
            return d.selected === false
          })
            .classed({"not_possible": false, "possible": false})
            .attr("opacity", '0.6')
          resultLasso = flatten(resultLasso)  // 数组扁平化

          resultLasso = resultLasso.map((item) => {
            return item.textContent
          })

          // 弄清楚框选中的节点的链接关系 结果保存在resultLink中
          resultLasso.forEach((item) => {
            name = []
            let group
            // tojson(item)
            force.links().forEach((value) => {
              // 这里保存的是source开始的有向图
              if (value.source.id === item && resultLasso.includes(value.target.id)) { // 目标节点和源节点都在result中
                name.push({'id': value.target.id, 'group': value.target.group})
                group = value.source.group
              } else if (value.target.id === item && resultLasso.includes(value.source.id)) { // 目标节点和源节点都在result中
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
          // 把结果赋值给brushLink
          this.$data.brushLink = resultLink
          // 发布消息
          let result = this.nodes.filter((item) => {
            return resultLasso.includes(item.id) ? true : false
          })
          PubSub.publish('find', result)
        };

        // Create the area where the lasso event can be triggered
        let lasso_area = svg.append("rect")
          .attr("class", "rect_lasso")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none");

        // Define the lasso
        let lasso = d3.lasso()
          .closePathDistance(75) // max distance for the lasso loop to be closed
          .closePathSelect(true) // can items be selected by closing the path?
          .hoverSelect(true) // can items by selected by hovering over them?
          .area(lasso_area) // area where the lasso can be started
          .on("start", lasso_start) // lasso start function
          .on("draw", lasso_draw) // lasso draw function
          .on("end", lasso_end) // lasso end function
          .items(d3.selectAll(".forceCircle")) // lasso对象
        // Init the lasso on the svg:g that contains the dots
        svg.call(lasso);

        // 鱼眼
        var fisheye = d3.fisheye.circular()
          .radius(200)
          .distortion(2);

        // 添加动态属性
        this.obj.fisheye = fisheye


        this.selectInitNode(this.nodes[0].id)
        this.selectInitLink(this.links[0].id)
        this.curNodeId = this.nodes[0].id
        this.curLinkId = this.links[0].id
      },
      getForm() { // 将框选部分转变为可以使用的v3格式
        if (this.brushLink.length == 0) {
          this.$dlg.alert('数据为空,无法进行转化', {
            messageType: 'warning',
            language: 'cn'
          });
          return
        }
        let params = qs.stringify({
          data: JSON.stringify(this.brushLink)
        })
        axios.post('/get/formresult', params).then((response) => {
          this.$dlg.modal(matrix, {
            width: 500 + 12 * response.data.nodes.length,
            height: 500 + 12 * response.data.nodes.length,
            title: '邻接矩阵',
            params: {
              dataLink: response.data
            },
          });
        })
      },
      changefish() {
        if (this.obj.fish) {
          // 禁止使用fisheye
          // svg.on("mousemove",null)
          this.obj.fish = !this.obj.fish
          this.obj.mainsvg.on("mousemove", null)
        } else {
          this.obj.fish = !this.obj.fish
          let that = this
          this.obj.mainsvg.on("mousemove", function () {

            that.obj.fisheye.focus(d3.mouse(this));

            that.obj.circles.each(function (d) {
              d.fisheye = that.obj.fisheye(d);
            })
              .attr("cx", function (d) {
                return d.fisheye.x;
              })
              .attr("cy", function (d) {
                return d.fisheye.y;
              })
              .attr("r", function (d) {
                return d.fisheye.z * 5;
              })

            that.obj.lines.attr("x1", function (d) {
              return d.source.fisheye.x;
            })
              .attr("y1", function (d) {
                return d.source.fisheye.y;
              })
              .attr("x2", function (d) {
                return d.target.fisheye.x;
              })
              .attr("y2", function (d) {
                return d.target.fisheye.y;
              })
              .attr("stroke", function (d) {
                return d.source.fisheye.z != 1 && d.target.fisheye.z != 1 ? '#fff' : '#303030'
              })
          });
        }
      },
      changeMethod() {
        if (this.obj.state == 'rect_contain') {
          this.obj.state = 'rect_lasso'
          d3.select(".rect_contain")
            .style("fill", "none")
            .style("opacity", "initial")
          d3.select(".rect_lasso")
            .style("opacity", "0")
            .style("fill", "initial")
        } else {
          this.obj.state = "rect_contain"
          d3.select(".rect_lasso")
            .style("fill", "none")
            .style("opacity", "initial")
          d3.select(".rect_contain")
            .style("opacity", "0")
            .style("fill", "initial")
        }
      },
      changeDrag() {
        if (this.obj.drag) {
          this.obj.drag = !this.obj.drag
          // 禁用drag
          //   下面两种写法都一样
          //   selection.on("mousedown.drag", null).on("touchstart.drag", null);
          //   selection.on(".drag", null).on(".drag", null);
          this.obj.circles.on(".drag", null);
        } else {
          this.obj.drag = !this.obj.drag
          this.obj.circles.call(this.obj.force.drag);
        }
      },
      shortPath() { // 最短路径
        if (this.obj.shortPath) { // 开启最短路径
          this.obj.shortPath = !this.obj.shortPath
          axios.get('/get/shortpath', {
            params: {
              path: JSON.stringify([this.shortNode[1], this.shortNode[0]])
            }
          }).then((response) => {
            this.shortPathList = response
            response.data['node'].forEach((item) => {
              // d3 直接选取数字id会报错
              d3.select(document.getElementById(item))
                .transition() // 启动过渡效果
                .delay(100)
                .duration(200)
                .ease("bounce")
                .attr('r', 8)
                .attr('stroke', "#eee")
                .attr('stroke-width', 2)
                .attr('opacity', 1)
            })

            response.data['link'].forEach((item) => {
              // d3 直接选取数字id会报错
              d3.select('#link_' + item)
                .transition() // 启动过渡效果
                .delay(100)
                .duration(200)
                .ease("bounce")
                .attr('stroke-width', 6)
                .attr('stroke-opacity', 1)
            })
          })
        } else { //  关闭最短路径
          this.obj.shortPath = !this.obj.shortPath

          this.shortPathList.data['node'].forEach((item) => {
            // d3 直接选取数字id会报错
            d3.select(document.getElementById(item))
              .transition() // 启动过渡效果
              .delay(100)
              .duration(200)
              .ease("bounce")
              .attr('r', 5)
              .attr('stroke-width', 0)
              .attr('opacity', (d) => d.opacity)
          })
          this.shortPathList.data['link'].forEach((item) => {
            d3.select('#link_' + item) // d3 直接选取数字id会报错
              .transition() // 启动过渡效果
              .delay(100)
              .duration(200)
              .ease("bounce")
              .attr('stroke-width', d => d.weight)
              .attr('stroke-opacity', (d) => d.opacity)
          })
        }
      },
      findsubgraph(command) {
        switch (command) {
          case '开始查找':
            if (isempty()) {
              this.$message({
                message: '创建的网络为空',
                showClose: true,
                type: 'warning'
              })
              return
            }
            let params = qs.stringify({
              skeleton: JSON.stringify(getNodeLinkData())
            })
            document.getElementById("loading").setAttribute("style", "display:block"); // loading
            document.getElementById("over").setAttribute("style", "display:block");
            axios.post('/get/findsubgraph', params)
              .then((response) => {
                document.getElementById("loading").setAttribute("style", "display:none"); // none
                document.getElementById("over").setAttribute("style", "display:none");
                if (this.subGraph[this.subIndex]) {
                  this.subGraph[this.subIndex].forEach((item) => {
                    d3.select('#link_' + item)
                      .attr('stroke', (d) => d.color)
                      .attr('stroke-width', (d) => d.weight)
                      .attr('stroke-opacity', (d) => d.opacity)
                  })
                }
                this.subGraph = response.data.link_data
                this.subIndex = 0
                this.subGraph[0].forEach((item) => {
                  d3.select('#link_' + item)
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 8)
                    .attr('stroke-opacity', 1)
                })


                // let point = {
                //   x: Math.floor(Math.random() * this.subWidth),
                //   y: Math.floor(Math.random() * this.subHeight),
                //   value: val,
                //   // radius configuration on point basis
                //   radius: radius
                // }
              })
            break
          case'下一个子图':
            this.subGraph[this.subIndex].forEach((item) => {
              d3.select('#link_' + item)
                .attr('stroke', (d) => d.color)
                .attr('stroke-width', (d) => d.weight)
                .attr('stroke-opacity', (d) => d.opacity)
            })

            this.subGraph[++this.subIndex].forEach((item) => {
              d3.select('#link_' + item)
                .attr('stroke', '#fff')
                .attr('stroke-width', 8)
                .attr('stroke-opacity', 1)
            })
            break
          case '上一个子图':
            this.subGraph[this.subIndex].forEach((item) => {
              d3.select('#link_' + item)
                .attr('stroke', (d) => d.color)
                .attr('stroke-width', (d) => d.weight)
                .attr('stroke-opacity', (d) => d.opacity)
            })
            this.subGraph[--this.subIndex].forEach((item) => {
              d3.select('#link_' + item)
                .attr('stroke', '#fff')
                .attr('stroke-width', 8)
                .attr('stroke-opacity', 1)
            })
            break
        }

      },
      buildgraph(command) {
        if (command === '创建网络') {
          if (d3.select('#svg-wrap').select('svg')) {
            d3.select('#svg-wrap').select('svg').remove()
          }
          build()
        } else {
          emptyNodeLinkData()
          document.getElementById("buildGraph").innerHTML = ""
        }
      },
      // community() {
      //   axios.get('/get/community').then((response) => {
      //     console.log(response);
      //   })
      //     .catch(function (error) {
      //       console.log('获取数据出错: ' + error)
      //     })
      // },
      // getDegree() {
      //   // 网络分层
      //   let s = new Set()
      //   this.nodes.map((item) => {
      //     s.add(item.degree)
      //   })
      //   // 根据度来分组
      //   this.degree = [...s].map((item) => parseInt(item))
      //   this.degree = this.degree.sort((a, b) => a - b)
      //   this.lays = this.degree.length
      //   this.allNodes = this.nodes
      //   this.allLinks = this.links
      // },
      // division(index) {
      //   let showDegree = [] // 要显示的节点
      //   this.allNodes.forEach((value) => {
      //     if (value.degree == this.degree[index]) {
      //       showDegree.push(value.id)
      //     }
      //   });
      //   // 如何知道showDegree之间节点的连接关系 在后台处理
      //   let params = qs.stringify({
      //     data: JSON.stringify(showDegree)
      //   })
      //   axios.post('/get/division', params).then((response) => {
      //     this.nodes = response.data.nodes
      //     this.links = response.data.links
      //     this.renderChart()
      //   })
      //     .catch(function (error) {
      //       console.log('获取数据出错: ' + error)
      //     })
      // },
      handleCommand(command) {
        switch (command) {
          case '最顶层':
            this.lay = 0
            this.division(this.lay)
            break
          case '上一层':
            this.lay--
            this.division(this.lay)
            break
          case '下一层':
            this.lay++
            this.division(this.lay)
            break
          case '最底层':
            this.lays = this.lay
            this.division(this.lays - 1)
            break
        }
      },
      getNeribor2tab(d) {
        axios.get('/get/neibor', {
          params: {
            ID: d.id
          }
        }).then((response) => {
          this.neribor = response.data
          response.data.nodeId.forEach((item) => {
            // d3 直接选取数字id会报错
            d3.select(document.getElementById(item))
              .attr('stroke', d => d.color = 'yellow')
              .attr('stroke-width', 2)
              .attr('opacity', 1)
          })
          let result = this.neribor.nodeId.map((item) => {
            return this.dataObj[+item]
          })
          PubSub.publish('find', result) //
        })
          .catch(function (error) {
            console.log(error)
          })
      },
      leaveNode() {
        if (this.neribor.length == 0) {
          return
        }
        this.neribor.nodeId.forEach((item) => {
          d3.select(document.getElementById(item))    // d3 直接选取数字id会报错
            .attr('stroke-width', 0)
            .attr('opacity', (d) => d.opacity)
        })
      },
      selectNode(item) {
        d3.select(document.getElementById(item))
          .attr('r', 8)
          .attr('stroke', "#eee")
          .attr('stroke-width', 2)
          .attr('opacity', 1)
      },
      resetNode() {
        this.obj.circles
          .attr('r', 5)
          .attr('stroke-width', (d) => d.strokeWidth)
          .attr('opacity', (d) => d.opacity)
      },
      resetLink() {
        this.obj.lines
          .attr('stroke', d => d.color)
          .attr('stroke-width', d => d.weight)
          .attr('stroke-opacity', (d) => d.opacity)
      },
      operation(command) {
        (this.$parent.$children)[2].operation(command)
      },
      selectOneNode(item) {
        this.resetNode()
        this.nodeHight(d3.select(document.getElementById(item)))
      },
      selectInitNode(item) {
        this.nodeHight(d3.select(document.getElementById(item)))
      },
      selectOneLink(item) {
        this.resetLink()
        d3.select('#link_' + item)
          .attr('stroke', "#eee")
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 1)
      },
      nodeHight(item) {
        item
          .attr('stroke', "#eee")
          .attr('stroke-width', 2)
          .attr('opacity', 1)
      },
      nodeDark(item) {  // 节点变暗
        item
          .attr('stroke', "#eee")
          .attr('stroke-width', 0)
          .attr('opacity', 1)
      },
      selectInitLink(item) {
        d3.select('#link_' + item)
          .attr('stroke', "#eee")
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 1)
      },
      setLabelType(value) {
        switch (value) {
          case "编号":
            this.obj.lables
              .text((d) => d.id)
            break;
          case "度":
            this.obj.lables.text(d => d.degree)
            break;
          case "度中心性":
            this.obj.lables.text(d => d.degree_centrality)
            break;
          case "接近中心性" :
            this.obj.lables.text(d => d.closeness_centrality)
            break;
          case
          "介数中心性":
            this.obj.lables.text(d => d.betweness_centrality)
            break;
          case "特征向量中心性":
            this.obj.lables.text(d => d.eigenvector_centrality)
            break;
          case
          "聚类系数":
            this.obj.lables.text(d => d.clustering)
            break;
          case "端口":
            this.obj.lables.text(d => d.port)
            break;
          case "连续属性":
            this.obj.lables.text((d) => d.continuous)
            break;
          case "离散属性":
            this.obj.lables.text(d => d.discrete)
            break;
        }
      },
      setLabelShow(value) {
        this.showLable = value;
        this.obj.lables
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .attr("visibility", () => value ? 'visible' : 'hidden')
      },
      setLabelSize(value) {
        this.obj.lables
          .attr("font-size", value)
      },
      setLabelOpacity(value) {
        this.obj.lables
          .attr("opacity", value)
      },
      setLabelColor(value) {
        this.obj.lables
          .attr("fill", value)
      },
      setEdgeWidth(value, islinkAll) {
        if (islinkAll) {
          this.obj.lines.attr("stroke-width", d => d.weight = value);
        } else {
          d3.select('#link_' + this.curLinkId)
            .attr("stroke-width", d => d.weight = value)
        }
      },
      setEdgeColor(value, islinkAll) {
        if (islinkAll) {
          this.obj.lines.attr("stroke", d => d.color = value);
        } else {
          d3.select('#link_' + this.curLinkId)
            .attr("stroke", d => d.color = value)
        }
      },
      setEdgeOpacity(value, islinkAll) {
        if (islinkAll) {
          this.obj.lines.attr("opacity", d => d.opacity = value);
        } else {
          d3.select('#link_' + this.curLinkId)
            .attr("opacity", d => d.opacity = value)
        }
      },
      setNodeStroke(value, isnodeAll) {
        if (isnodeAll) {
          this.obj.circles.attr("stroke", d => d.stroke = value)
        } else {
          d3.select(document.getElementById(this.curNodeId))
            .attr("stroke", d => d.stroke = value)
        }
      },
      setNodeSize(value, isnodeAll) {
        if (isnodeAll) {
          this.obj.circles.attr("r", d => d.size = value)
        } else {
          d3.select(document.getElementById(this.curNodeId))
            .attr("r", d => d.size = value)
        }
      },
      setNodeColor(value, isnodeAll) {
        if (isnodeAll) {
          this.obj.circles.attr("fill", d => d.color = value)
        } else {
          d3.select(document.getElementById(this.curNodeId))
            .attr("fill", d => d.color = value)
        }
      },
      setNodeOpacity(value, isnodeAll) {
        if (isnodeAll) {
          this.obj.circles.attr("opacity", d => d.opacity = value)
        } else {
          d3.select(document.getElementById(this.curNodeId))
            .attr("opacity", d => d.opacity = value) // 更新内存中的属性值
        }
      },
      setNer() {
        this.isNer = !this.isNer
      }
    },
    // 声明一个本地的过滤器
    filters: {
      toPx(value) {
        return value + 'px'
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      document.title = to.meta.title
      from.meta.keepAlive = true
      next();
    }
  }
</script>

<style lang="less" scoped>
  @import "Layout.less";
</style>
