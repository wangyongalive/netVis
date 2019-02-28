<template>
  <div id="layout1" style="height: 100%; width: 100%;">
    <div id="heatmapContain">
      <aside>
        <el-tag :color="'#f3f3f3'" :type="'info'" :hit="true">Order:</el-tag>
        <el-select v-model="value" id="order" @change="changeVal">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </aside>
      <showlegend :items="items" :width="'15px'" :height="'15px'"></showlegend>
    </div>
  </div>
</template>

<script>
  import showlegend from './showlegend'

  export default {
    name: "matrix",
    mounted() {
      this.tomatrix(this.params.dataLink, this.params.dataLink.nodes.length)
    },
    components: {
      showlegend
    },
    data() {
      return {
        options: [{
          value: 'name',
          label: 'by Name'
        }, {
          value: 'count',
          label: 'by Frequency'
        }, {
          value: 'group',
          label: 'by Cluster'
        }],
        value: 'group',
        order: null,
        items: []
      }
    },
    props: {params: Object},
    methods: {
      tomatrix(miserables, nodeLength) {
        let margin = {top: 50, right: 10, bottom: 10, left: 50},
          width = nodeLength * 12,
          height = nodeLength * 12;

        let x = d3.scale.ordinal().rangeBands([0, width]),
          z = d3.scale.linear().domain([0, 4]).clamp(true),
          c = d3.scale.category10().domain(d3.range(10));

        let svg = d3.select("#layout1")
          .append("svg")
          .attr("class", 'matrixSvg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style({
            "margin-left": margin.left + "px",
            "text-shadow": "0 -1px 0 #111"
          })
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);


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

        let setNode = Array.from(new Set(nodes.map((item) => item.group))).sort((a, b) => a - b)
        this.items = setNode.map((item) => {
          return {
            'group': '组别' + item,
            'color': c(item)
          }
        })


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
          name: d3.range(n).sort(function (a, b) {
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
        x.domain(orders.group);
        // x.domain(orders.id);

        svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height);

        // 行
        // 一个节点就是一个rect
        let row = svg.selectAll(".row")
          .data(matrix)
          .enter().append("g")
          .attr("class", "row")
          .attr("transform", (d, i) => `translate(0,${x(i)})`)
          .each(funRow);

        row.append("line")
          .attr("x2", width);

        row.append("text")
          .attr("x", -6)
          .attr("y", x.rangeBand() / 2)
          .attr("dy", ".32em")
          .attr("text-anchor", "end")
          .text((d, i) => nodes[i].id)
          .attr("stroke", "#eee")

        // 列
        let column = svg.selectAll(".column")
          .data(matrix)
          .enter()
          .append("g")
          .attr("class", "column")
          .attr("transform", (d, i) => `translate(${x(i)})rotate(-90)`)

        column.append("line")
          .attr("x1", -width);

        column.append("text")
          .attr("x", 6)
          .attr("y", x.rangeBand() / 2)
          .attr("dy", ".32em")
          .attr("text-anchor", "start")
          .text((d, i) => nodes[i].id)
          .attr("stroke", "#eee")


        function funRow(row) {
          d3.select(this)
            .selectAll(".cell")
            .data(row.filter(d => d.z)) // 保留d.z不为0的
            .enter().append("rect")
            .attr("class", "cell")
            .attr("cursor", "pointer")
            .attr("x", d => x(d.x))
            .attr("width", x.rangeBand())
            .attr("height", x.rangeBand())
            .style("fill-opacity", d => z(d.z))
            .style("fill", (d) => nodes[d.x].group == nodes[d.y].group ? c(nodes[d.x].group) : null)
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
        }


        this.order = function (value) {
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
      changeVal(val) {
        this.order(val)
      }
    }
  }
</script>

<style lang="less">
  @import "matrix.less";
</style>
