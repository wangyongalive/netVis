<template>
  <div id="control" ref="control">
  </div>
</template>

<script>
  import * as dat from 'dat.gui'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "control",
    mounted() {

      if (localStorage.nodesLinks) {
        let data = JSON.parse(localStorage.nodesLinks);
        this.characterData = data
        this.info = data.info
        this.init(this.characterData.nodes, this.info)
        this.characterData.nodes.forEach((item) => {
          this.dataObj[item.id] = item
        })
      } else {
        let data = this.$store.state.nodesLinks;
        this.characterData = data
        this.info = data.info
        this.init(this.characterData.nodes, this.info)
        this.characterData.nodes.forEach((item) => {
          this.dataObj[item.id] = item
        })
      }
    },
    data() {
      return {
        characterData: [],
        width: '',
        sub_width: '',
        sub_height: '',
        step_number: '',
        histogram: '',
        padding: '',
        padding_width: '',
        padding_height: '',
        y_scale: '',
        step: '',
        x_scale: '',
        item_list: {},
        options: null,
        info: '',
        dataObj: {},
        nodeAll: false, //   标记是修改所有的节点还是选中的节点 默认是修改选中的节点
        linkAll: false
      }
    },
    computed: {
      ...mapState(['layout'])
    },
    methods: {
      // async getData() {
      //   await axios.get('/get/handledata').then((response) => {
      //     this.characterData = response.data.nodes
      //     this.info = response.data.info
      //     this.init(this.characterData, this.info)
      //   })
      //     .catch(function (error) {
      //       console.log('获取数据出错: ' + error)
      //     })
      // },
      init(character_data, info) {

        d3.select('#control')
          .append('div')
          .attr('id', 'list_container')


        // 每一个小的div
        this.width = document.getElementById('list_container').offsetWidth;
        this.sub_width = this.width - 10;
        this.sub_height = 100;
        this.step_number = 30;
        this.histogram = d3.layout.histogram()
          .bins(this.step_number)
          .frequency(true);

        this.padding = {left: 5, right: 5, bottom: 10, top: 20};
        this.padding_width = this.sub_width - this.padding.left - this.padding.right;
        this.padding_height = this.sub_height - this.padding.top - this.padding.bottom;
        this.y_scale = d3.scale.sqrt().range([this.padding_height, 0]);
        this.step = this.padding_width / this.step_number;
        this.x_scale = d3.scale.linear().domain([0, this.step_number]).range([0, this.padding_width]);


        this.item_list = {
          "degree": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          },
          "degree_centrality":
            {
              "data": [],
              "flag": false,
              "select_data": [],
              "brush": d3.svg.brush().x(this.x_scale)
            },
          "closeness_centrality": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          },
          "betweness_centrality": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          },
          "eigenvector_centrality": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          },
          "clustering": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          },
          "continuous": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          },
          "discrete": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          },
          "port": {
            "data": [],
            "flag": false,
            "select_data": [],
            "brush": d3.svg.brush().x(this.x_scale)
          }
        };


        // 不用箭头函数的话  this不会指向vue
        character_data.forEach((item) => {
          this.item_list.degree.data.push(+item.degree);
          this.item_list.continuous.data.push(+item.continuous);
          this.item_list.discrete.data.push(+item.discrete);
          this.item_list.port.data.push(+item.port);
          this.item_list.degree_centrality.data.push(+item.degree_centrality);
          this.item_list.closeness_centrality.data.push(+item.closeness_centrality);
          this.item_list.betweness_centrality.data.push(+item.betweness_centrality);
          this.item_list.eigenvector_centrality.data.push(+item.eigenvector_centrality);
          this.item_list.clustering.data.push(+item.clustering);

        });

        let self = this

        let Options = function () {
          this['节点总量'] = info.nnodes
          this['边总量'] = info.nedges
          this['图密度'] = info.density
          this['平均度'] = info.average_degree
          this.change = self.layout // 默认值
          this.feature = '特征类别'
          this['修改所有节点'] = false
          this['节点尺寸'] = +self.characterData.nodes[0].size // 节点大小
          this['节点边线'] = self.characterData.nodes[0].stroke
          this['节点填充'] = self.characterData.nodes[0].color
          this['节点透明度'] = +self.characterData.nodes[0].opacity
          this['修改所有边'] = false
          this['边宽度'] = +self.characterData.links[0].weight
          this['边填充'] = self.characterData.links[0].color
          this['边透明度'] = +self.characterData.links[0].opacity
          this['边编号'] = self.characterData.links[0].id
          this['标签类别'] = "编号"
          this['标签显示'] = false
          this['标签填充'] = "#FFFFFF"
          this['标签尺寸'] = 8
          this['标签透明度'] = 1
          this['节点编号'] = self.characterData.nodes[0].id
          this['连续属性'] = +self.characterData.nodes[0].continuous
          this['离散属性'] = +self.characterData.nodes[0].discrete
          this['节点端口'] = +self.characterData.nodes[0].port
          this['度'] = self.characterData.nodes[0].degree
          this['度中心性'] = self.characterData.nodes[0].degree_centrality
          this['接近中心性'] = self.characterData.nodes[0].closeness_centrality
          this['介数中心性'] = self.characterData.nodes[0].betweness_centrality
          this['特征向量中心性'] = self.characterData.nodes[0].eigenvector_centrality
          this['聚类系数'] = self.characterData.nodes[0].clustering
        }
        let options = new Options()
        const gui = new dat.GUI()

        this.options = options

        let f0 = gui.addFolder('图信息');
        f0.add(options, '节点总量').listen()
        f0.add(options, '边总量').listen()
        f0.add(options, '图密度').listen()
        f0.add(options, '平均度').listen()

        let f1 = gui.addFolder('节点样式');
        let node_all = f1.add(options, '修改所有节点').listen();
        let node_stroke = f1.addColor(options, '节点边线').listen()
        let node_size = f1.add(options, '节点尺寸').min(2).max(10).step(0.1).listen()
        let node_color = f1.addColor(options, '节点填充').listen()
        let node_opacity = f1.add(options, '节点透明度').min(0).max(1).step(0.05).listen()

        /*节点信息监听*/
        node_all.onFinishChange((value) => {
          this.nodeAll = value
        });
        node_stroke.onFinishChange((value) => {
          this.$parent.$children[1].setNodeStroke(value, this.nodeAll);
        });
        node_size.onFinishChange((value) => {
          this.$parent.$children[1].setNodeSize(value, this.nodeAll);
        });
        node_color.onFinishChange((value) => {
          this.$parent.$children[1].setNodeColor(value, this.nodeAll);
        });
        node_opacity.onFinishChange((value) => {
          this.$parent.$children[1].setNodeOpacity(value, this.nodeAll);
        });


        let f2 = gui.addFolder('边样式');
        let edge_all = f2.add(options, '修改所有边').listen()
        let edge_width = f2.add(options, '边宽度').min(1).max(4).step(0.1).listen()
        let edge_color = f2.addColor(options, '边填充').listen()
        let edge_opacity = f2.add(options, '边透明度').min(0).max(1).step(0.05).listen()
        let edge_id = f2.add(options, '边编号').listen()
        /*禁止用户更改*/
        edge_id.__input.disabled = true;
        /*边信息监听*/
        edge_all.onFinishChange((value) => {
          this.linkAll = value
        });
        edge_width.onFinishChange((value) => {
          this.$parent.$children[1].setEdgeWidth(value, this.linkAll);
        });
        edge_color.onFinishChange((value) => {
          this.$parent.$children[1].setEdgeColor(value, this.linkAll);
        });
        edge_opacity.onFinishChange((value) => {
          this.$parent.$children[1].setEdgeOpacity(value, this.linkAll);
        });


        let f3 = gui.addFolder('标签样式');
        let label_type = f3.add(options, '标签类别', ['编号', '端口', '连续属性', '离散属性', '度', '度中心性', '接近中心性', '介数中心性', '特征向量中心性', '聚类系数']).listen();
        let label_show = f3.add(options, '标签显示').listen();
        let label_size = f3.add(options, '标签尺寸').min(5).max(18).step(1);
        let label_color = f3.addColor(options, '标签填充');
        let label_opacity = f3.add(options, '标签透明度').min(0).max(1).step(0.05);
        /*标签信息监听*/
        label_type.onFinishChange((value) => {
          this.$parent.$children[1].setLabelType(value)
        });
        label_show.onFinishChange(value => {
          this.$parent.$children[1].setLabelShow(value)
        });
        label_size.onFinishChange((value) => {
          this.$parent.$children[1].setLabelSize(value)
        });
        label_color.onFinishChange((value) => {
          this.$parent.$children[1].setLabelColor(value);
        });
        label_opacity.onFinishChange((value) => {
          this.$parent.$children[1].setLabelOpacity(value)
        });


        let f4 = gui.addFolder('节点固有属性')
        f4.add(options, '节点编号').listen()
        f4.add(options, '连续属性').listen()
        f4.add(options, '离散属性').listen()
        f4.add(options, '节点端口').listen()

        let f5 = gui.addFolder('节点静态属性')

        f5.add(options, '度').listen();
        f5.add(options, '度中心性').listen();
        f5.add(options, '接近中心性').listen();
        f5.add(options, '介数中心性').listen();
        f5.add(options, '特征向量中心性').listen();
        f5.add(options, '聚类系数').listen();


        let change = gui.add(options, 'change', ['webgl', 'layout', 'heatmap'])
        change.onFinishChange((value) => this.pushShow(value))

        // 分布
        let feature = gui.add(options, 'feature', ['特征类别', '度分布', '度中心性分布', '接近中心性分布', '介数中心性分布', '特征向量中心性分布', '聚类系数分布', '端口分布', '连续属性分布', '离散属性分布'])
        feature.onFinishChange((value) => {
          this.drawGraph(value);
        })

        document.getElementById('control').insertBefore(gui.domElement, document.getElementById('list_container'))
        /*禁止用户输入*/
        d3.select("#control").selectAll("input").attr("readonly", "readonly").attr('disabled', 'true')
      },
      pushShow(layout) {
        this.changeLayout(layout)
        this.$router.push(`/${layout}`)
      },
      drawGraph(type) {
        let item_div;
        switch (type) {
          case "度分布":
            if (!this.item_list.degree.flag) {
              item_div = d3.select('#list_container')
                .append("div")
                .attr("class", "item_div")
                .attr("id", "info_degree")
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.degree.flag = false;
                  this.item_list.degree.select_data = [];
                  this.item_list.degree.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.degree.brush.empty()) {
                    this.item_list.degree.brush.clear();
                    this.item_list.degree.brush(d3.select(".brush." + "info_degree").transition());
                    this.item_list.degree.brush.event(d3.select(".brush." + "info_degree").transition().delay(500));
                  }
                });
              this.item_list.degree.flag = true;
              this.drawOneGraph(this.item_list.degree.data, "info_degree", "度");
            }
            break;
          case "度中心性分布":
            if (!this.item_list.degree_centrality.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_degree_centrality");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.degree_centrality.flag = false;
                  this.item_list.degree_centrality.select_data = [];
                  this.item_list.degree_centrality.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.degree_centrality.brush.empty()) {
                    this.item_list.degree_centrality.brush.clear();
                    this.item_list.degree_centrality.brush(d3.select(".brush." + "info_degree_centrality").transition());
                    this.item_list.degree_centrality.brush.event(d3.select(".brush." + "info_degree_centrality").transition().delay(500));
                  }
                });
              this.item_list.degree_centrality.flag = true;
              this.drawOneGraph(this.item_list.degree_centrality.data, "info_degree_centrality", "度中心性");
            }
            break;
          case  "接近中心性分布":
            if (!this.item_list.closeness_centrality.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_closeness_centrality");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.closeness_centrality.flag = false;
                  this.item_list.closeness_centrality.select_data = [];
                  this.item_list.closeness_centrality.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.closeness_centrality.brush.empty()) {
                    this.item_list.closeness_centrality.brush.clear();
                    this.item_list.closeness_centrality.brush(d3.select(".brush." + "info_closeness_centrality").transition());
                    this.item_list.closeness_centrality.brush.event(d3.select(".brush." + "info_closeness_centrality").transition().delay(500));
                  }
                });
              this.item_list.closeness_centrality.flag = true;
              this.drawOneGraph(this.item_list.closeness_centrality.data, "info_closeness_centrality", "接近中心性");
            }
            break;
          case  "介数中心性分布":
            if (!this.item_list.betweness_centrality.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_betweness_centrality");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.betweness_centrality.flag = false;
                  this.item_list.betweness_centrality.select_data = [];
                  this.item_list.betweness_centrality.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.betweness_centrality.brush.empty()) {
                    this.item_list.betweness_centrality.brush.clear();
                    this.item_list.betweness_centrality.brush(d3.select(".brush." + "info_betweness_centrality").transition());
                    this.item_list.betweness_centrality.brush.event(d3.select(".brush." + "info_betweness_centrality").transition().delay(500));
                  }
                });
              this.item_list.betweness_centrality.flag = true;
              this.drawOneGraph(this.item_list.betweness_centrality.data, "info_betweness_centrality", "介数中心性");
            }
            break;
          case  "特征向量中心性分布":
            if (!this.item_list.eigenvector_centrality.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_eigenvector_centrality");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.eigenvector_centrality.flag = false;
                  this.item_list.eigenvector_centrality.select_data = [];
                  this.item_list.eigenvector_centrality.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.eigenvector_centrality.brush.empty()) {
                    this.item_list.eigenvector_centrality.brush.clear();
                    this.item_list.eigenvector_centrality.brush(d3.select(".brush." + "info_eigenvector_centrality").transition());
                    this.item_list.eigenvector_centrality.brush.event(d3.select(".brush." + "info_eigenvector_centrality").transition().delay(500));
                  }
                });
              this.item_list.eigenvector_centrality.flag = true;
              this.drawOneGraph(this.item_list.eigenvector_centrality.data, "info_eigenvector_centrality", "特征向量中心性");
            }
            break;
          case "聚类系数分布":
            if (!this.item_list.clustering.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_clustering");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.clustering.flag = false;
                  this.item_list.clustering.select_data = [];
                  this.item_list.clustering.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.clustering.brush.empty()) {
                    this.item_list.clustering.brush.clear();
                    this.item_list.clustering.brush(d3.select(".brush." + "info_clustering").transition());
                    this.item_list.clustering.brush.event(d3.select(".brush." + "info_clustering").transition().delay(500));
                  }
                });
              this.item_list.clustering.flag = true;
              this.drawOneGraph(this.item_list.clustering.data, "info_clustering", "聚类系数");
            }
            break;
          case "端口分布":
            if (!this.item_list.port.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_port");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.port.flag = false;
                  this.item_list.port.select_data = [];
                  this.item_list.port.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.port.brush.empty()) {
                    this.item_list.port.brush.clear();
                    this.item_list.port.brush(d3.select(".brush." + "info_port").transition());
                    this.item_list.port.brush.event(d3.select(".brush." + "info_port").transition().delay(500));
                  }
                });
              this.item_list.port.flag = true;
              this.drawOneGraph(this.item_list.port.data, "info_port", "端口");
            }
            break;
          case "连续属性分布":
            if (!this.item_list.continuous.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_continuous");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.continuous.flag = false;
                  this.item_list.continuous.select_data = [];
                  this.item_list.continuous.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.continuous.brush.empty()) {
                    this.item_list.continuous.brush.clear();
                    this.item_list.continuous.brush(d3.select(".brush." + "info_continuous").transition());
                    this.item_list.continuous.brush.event(d3.select(".brush." + "info_continuous").transition().delay(500));
                  }
                });
              this.item_list.continuous.flag = true;
              this.drawOneGraph(this.item_list.continuous.data, "info_continuous", "连续属性");
            }
            break;
          case "离散属性分布":
            if (!this.item_list.discrete.flag) {
              item_div = d3.select('#list_container').append("div").attr("class", "item_div").attr("id", "info_discrete");
              item_div.append("img")
                .attr("class", "info_close")
                .attr("src", "../static/img/close.png")
                .attr("title", "关闭")
                .on("click", () => {
                  item_div.remove();
                  this.item_list.discrete.flag = false;
                  this.item_list.discrete.select_data = [];
                  this.item_list.discrete.brush.clear();
                  this.restore();
                });
              item_div.append("img")
                .attr("class", "info_trash")
                .attr("src", "../static/img/eraser.png")
                .attr("title", "清空选定")
                .on("click", () => {
                  if (!this.item_list.discrete.brush.empty()) {
                    this.item_list.discrete.brush.clear();
                    this.item_list.discrete.brush(d3.select(".brush." + "info_discrete").transition());
                    this.item_list.discrete.brush.event(d3.select(".brush." + "info_discrete").transition().delay(500));
                  }
                });
              this.item_list.discrete.flag = true;
              this.drawOneGraph(this.item_list.discrete.data, "info_discrete", "离散属性");
            }
            break;
        }
      },
      drawOneGraph(data, div_id, text) {
        let extent = d3.extent(data)
        this.histogram.range(extent)
        let his_data = this.histogram(data)
        let brush_extent = [0, 0]
        this.y_scale.domain([0, d3.max(his_data, function (d) {
          return d.y
        })])
        let svg = d3.select("#" + div_id)
          .append('svg')
          .attr('width', () => {
            return this.sub_width
          })
          .attr('height', () => {
            return this.sub_height
          })
        svg.append('text')
          .attr('class', 'item_text')
          .attr('x', 5)
          .attr('y', 14)
          .text(text)

        let tip_label = svg.append('text')
          .attr('class', 'tip_label')
          .attr('x', 90)
          .attr('y', 14)

        let svg_g = svg.append('g')
          .attr('transform', "translate(" + this.padding.left + "," + this.padding.top + ")")

        svg_g.selectAll(".bar")
          .data(his_data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d, i) => {
            return this.x_scale(i)
          })
          .attr('width', this.step - 1)
          .attr('y', (d) => {
            return this.y_scale(d.y)
          })
          .attr('height', (d) => {
            return this.padding_height - this.y_scale(d.y)
          })


        let now_brush;
        switch (div_id) {
          case "info_degree":
            now_brush = this.item_list.degree.brush;
            break;
          case "info_degree_centrality":
            now_brush = this.item_list.degree_centrality.brush;
            break;
          case  "info_closeness_centrality":
            now_brush = this.item_list.closeness_centrality.brush;
            break;
          case  "info_betweness_centrality":
            now_brush = this.item_list.betweness_centrality.brush;
            break;
          case  "info_eigenvector_centrality":
            now_brush = this.item_list.eigenvector_centrality.brush;
            break;
          case "info_clustering":
            now_brush = this.item_list.clustering.brush;
            break;
          case "info_port":
            now_brush = this.item_list.port.brush;
            break;
          case  "info_discrete":
            now_brush = this.item_list.discrete.brush;
            break;
          case  "info_continuous":
            now_brush = this.item_list.continuous.brush;
            break;
        }


        let brushEnd = () => {
          let extent = now_brush.extent();
          extent = [Math.round(extent[0]), Math.round(extent[1])];
          /*transition 会造成在进行一次brushstart brush brushend 的响应 形成死循环*/
          if (brush_extent[0] !== extent[0] || brush_extent[1] !== extent[1]) {
            brush_extent = extent;
            // 拖选范围
            now_brush.extent(brush_extent);
            now_brush(d3.select(".brush." + div_id).transition());
            // 在设置范围之后分发拖选事件
            now_brush.event(d3.select(".brush." + div_id).transition().delay(500));
            if (!now_brush.empty()) {
              let true_range = [his_data[extent[0]].x, his_data[extent[0]].x + (extent[1] - extent[0]) * his_data[0].dx];
              let error_range = [true_range[0] - his_data[0].dx / 1000, true_range[1] + his_data[0].dx / 1000];//刚好相等时候由于很小的错误导致无法筛选
              switch (div_id) {
                case "info_degree":
                  this.item_list.degree.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.degree >= error_range[0] && value.degree <= error_range[1]) {
                      this.item_list.degree.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.degree.select_data.length + " 范围：" + Math.ceil(true_range[0]) + " ~ " + Math.floor(true_range[1]));
                  break;
                case "info_degree_centrality":
                  this.item_list.degree_centrality.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.degree_centrality >= error_range[0] && value.degree_centrality <= error_range[1]) {
                      this.item_list.degree_centrality.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.degree_centrality.select_data.length + " 范围：" + true_range[0].toExponential(2) + " ~ " + true_range[1].toExponential(2));
                  break;
                case  "info_closeness_centrality":
                  this.item_list.closeness_centrality.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.closeness_centrality >= error_range[0] && value.closeness_centrality <= error_range[1]) {
                      this.item_list.closeness_centrality.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.closeness_centrality.select_data.length + " 范围：" + true_range[0].toExponential(2) + " ~ " + true_range[1].toExponential(2));
                  break;
                case  "info_betweness_centrality":
                  this.item_list.betweness_centrality.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.betweness_centrality >= error_range[0] && value.betweness_centrality <= error_range[1]) {
                      this.item_list.betweness_centrality.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.betweness_centrality.select_data.length + " 范围：" + true_range[0].toExponential(2) + " ~ " + true_range[1].toExponential(2));
                  break;
                case  "info_eigenvector_centrality":
                  this.item_list.eigenvector_centrality.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.eigenvector_centrality >= error_range[0] && value.eigenvector_centrality <= error_range[1]) {
                      this.item_list.eigenvector_centrality.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.eigenvector_centrality.select_data.length + " 范围：" + true_range[0].toExponential(2) + " ~ " + true_range[1].toExponential(2));
                  break;
                case "info_clustering":
                  this.item_list.clustering.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.clustering >= error_range[0] && value.clustering <= error_range[1]) {
                      this.item_list.clustering.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.clustering.select_data.length + " 范围：" + true_range[0].toExponential(2) + " ~ " + true_range[1].toExponential(2));
                  break;
                case  "info_port":
                  this.item_list.port.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.port >= error_range[0] && value.port <= error_range[1]) {
                      this.item_list.port.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.port.select_data.length + " 范围：" + Math.ceil(true_range[0]) + " ~ " + Math.floor(true_range[1]));
                  break;
                case  "info_continuous":
                  this.item_list.continuous.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.continuous >= error_range[0] && value.continuous <= error_range[1]) {
                      this.item_list.continuous.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.continuous.select_data.length + " 范围：" + Math.ceil(true_range[0]) + " ~ " + Math.floor(true_range[1]));
                  break;
                case "info_discrete":
                  this.item_list.discrete.select_data = [];
                  this.characterData.nodes.forEach((value) => {
                    if (value.discrete >= error_range[0] && value.discrete <= error_range[1]) {
                      this.item_list.discrete.select_data.push(value.id);
                    }
                  });
                  tip_label.text("数量：" + this.item_list.discrete.select_data.length + " 范围：" + Math.ceil(true_range[0]) + " ~ " + Math.floor(true_range[1]));
                  break;
              }
            } else {
              switch (div_id) {
                case "info_degree":
                  this.item_list.degree.select_data = [];
                  break;
                case "info_degree_centrality":
                  this.item_list.degree_centrality.select_data = [];
                  break;
                case  "info_closeness_centrality":
                  this.item_list.closeness_centrality.select_data = [];
                  break;
                case  "info_betweness_centrality":
                  this.item_list.betweness_centrality.select_data = [];
                  break;
                case  "info_eigenvector_centrality":
                  this.item_list.eigenvector_centrality.select_data = [];
                  break;
                case "info_clustering":
                  this.item_list.clustering.select_data = [];
                  break;
                case "info_port":
                  this.item_list.port.select_data = [];
                  break;
                case  "info_continuous":
                  this.item_list.continuous.select_data = [];
                  break;
                case  "info_discrete":
                  this.item_list.discrete.select_data = [];
                  break;
              }
              tip_label.text("");
            }
            this.restore();
          } else {
            return false;
          }
        }

        now_brush.on("brushend", brushEnd);
        let brush_g = svg_g.append("g").attr("class", "brush " + div_id);
        brush_g.call(now_brush).selectAll("rect").attr("height", () => {
          return this.padding_height
        });

      },
      updated(item) { // 更新节点的信息
        this.options['节点编号'] = item.id;
        this.options['度'] = item.degree;
        this.options.连续属性 = item.continuous;
        this.options.离散属性 = item.discrete;
        this.options.节点端口 = item.port;
        this.options.度中心性 = item.degree_centrality;
        this.options.接近中心性 = item.closeness_centrality;
        this.options.介数中心性 = item.betweness_centrality;
        this.options.特征向量中心性 = item.eigenvector_centrality;
        this.options.聚类系数 = item.clustering;
        this.options['节点尺寸'] = +item.size; // 节点大小
        this.options['节点边线'] = item.stroke;
        this.options['节点填充'] = item.color;
        this.options['节点透明度'] = +item.opacity;


      },
      restore() { // 根据刷新的结果 更新
        if (this.item_list.degree.brush.empty()
          && this.item_list.degree_centrality.brush.empty()
          && this.item_list.clustering.brush.empty()
          && this.item_list.closeness_centrality.brush.empty()
          && this.item_list.eigenvector_centrality.brush.empty()
          && this.item_list.betweness_centrality.brush.empty()
          && this.item_list.port.brush.empty()
          && this.item_list.continuous.brush.empty()
          && this.item_list.discrete.brush.empty()) {
          PubSub.publish('find', []) // info
          PubSub.publish('getNode', []) // layout
        } else {

          let multiple_result =
            [...this.item_list.degree.select_data, ...this.item_list.degree_centrality.select_data,
              ...this.item_list.closeness_centrality.select_data, ...this.item_list.betweness_centrality.select_data,
              ...this.item_list.clustering.select_data, ...this.item_list.port.select_data,
              ...this.item_list.continuous.select_data, ...this.item_list.discrete.select_data
            ]
          let result = d3.set(multiple_result).values();
          PubSub.publish('getNode', result) // layout
          // 根据id过滤节点
          result = result.map((item) => {
            return this.dataObj[item]
          })

          PubSub.publish('find', result) // info
        }
      },
      updateLink(d) { // 更新边的样式 要设置listen才可以触发
        this.options.边宽度 = 2;
        this.options.边填充 = d.color;
        this.options.边透明度 = +d.opacity;
        this.options.边编号 = d.id;
      },
      ...mapMutations(['changeLayout'])
    },
  }
</script>

<style lang="less">
  @import "./control.less";
</style>
