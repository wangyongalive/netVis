<template>
  <div id="info_table" ref="table">
    <el-table
      ref="multipleTable"
      :data="showData.filter(data => !search || data[value].toLowerCase().includes(search.toLowerCase()))"
      border
      tooltip-effect="dark"
      style="width: 100%"
      :max-height="maxHeight"
      stripe
      :default-sort="{prop: 'id', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        sortable
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="com"
        label="连通子图"
        sortable
        width="135"
      >
      </el-table-column>
      <el-table-column
        prop="group"
        label="组别"
        sortable
        :filters="filterData"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="degree"
        label="度"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="degree_centrality"
        label="度中心性"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="betweness_centrality"
        label="介数中心性"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="clustering"
        label="聚类系数"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="closeness_centrality"
        label="接近度中心性"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="eigenvector_centrality"
        label="特征向量中心性"
        sortable
      >
      </el-table-column>
    </el-table>
    <div class="blockInfo">
      <div class="blockL">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData3.length">
        </el-pagination>
      </div>
      <div class="blockR">
        <el-select
          v-model="value"
          placeholder="请选择"
          size="mini"
          clearable
          :disabled="tableData3.length==0"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          size="mini"
          placeholder="输入关键字搜索"
          clearable
          v-model="search"
          :disabled="tableData3.length==0"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <el-dropdown
          size="mini"
          placement="top-start"
          @command="handleCommand"
        >
          <el-button type="primary" size="mini">
            <span class="el-icon-download"></span>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :disabled="tableData3.length==0"
              command="excel"
              divided
            >
              导出excel
            </el-dropdown-item>
            <el-dropdown-item
              :disabled="tableData3.length==0"
              command="json"
              divided
            >
              导出json
            </el-dropdown-item>
            <el-dropdown-item
              :disabled="tableData3.length==0"
              command="csv"
              divided
            >
              导出csv
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import {saveAs} from 'file-saver';
  import axios from 'axios'
  import qs from 'qs'
  import Papa from 'papaparse'

  export default {
    data() {
      return {
        tableData3: [], // 所有数据
        showData: [], // 当前列表显示的数据
        multipleSelection: [], // 多选的结果
        filterData: [],
        nodes: [],
        currentPage: 1,
        pageSize: 10, // 每页的个数
        pageSizes: [10, 50, 100, 400],
        maxHeight: 250,
        search: '',
        options: [{
          value: 'id',
          label: 'id'
        }, {
          value: 'com',
          label: '连通子图'
        }, {
          value: 'group',
          label: '组别'
        }, {
          value: 'degree',
          label: '度'
        }, {
          value: 'degree_centrality',
          label: '度中心性'
        }, {
          value: 'betweness_centrality',
          label: '介数中心性'
        }, {
          value: 'clustering',
          label: '聚类系数'
        }, {
          value: 'closeness_centrality',
          label: '接近度中心性'
        }, {
          value: 'eigenvector_centrality',
          label: '特征向量中心性'
        },
        ],
        value: '', // 选择input的值
        itemList: []
      }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case  'excel':
            this.exportExcel('#info_table')
            break;
          case  'json':
            this.saveAsJson();
            break;
          case  'csv':
            this.saveAsCsv();
            break;
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.showData = this.tableData3.slice(0, val)
      },
      handleCurrentChange(val) {
        this.showData = this.tableData3.slice(this.pageSize * val - this.pageSize, this.pageSize * val)
      },
      operation(command) {
        switch (command) {
          case '导入数据':
            PubSub.publish('find', this.nodes)
            break;
          case '清空表格':
            PubSub.publish('find', [])
            break;
          case '取消选择':
            this.$refs.multipleTable.clearSelection(); // 清空用户的选择
            break;
          case '反选':
            this.multipleSelection = this.tableData3.filter((item) => {
              return !this.multipleSelection.includes(item)
            })
            break;
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let result = this.multipleSelection.map((item) => item.id)
        PubSub.publish('getNode', result) // layout
      },
      filterTag(value, row) {
        return row.group === value;
      },
      exportExcel(id) { // 导出当前页显示的数据
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector(id));
        /* get binary string as output */
        let wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], {
              type: 'application/octet-stream'
            }),
            `data_${this.getDate()}.xlsx`
          );
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout);
        }
        return wbout;
      },
      saveAsJson() { // 导出选中的数据
        let params = qs.stringify({
          nodeId: JSON.stringify(this.getnodeLink())
        })
        axios.post('/get/nodeLink', params).then(response => {
          // map不会改变原来的对象的值
          response.data.nodeId = response.data.nodeId.map((item) => this.$parent.$children[1].dataObj[+item])
          response.data.edgeId = response.data.edgeId.map((item) => this.$parent.$children[1].dataObjLink[+item])
          let blob = new Blob([JSON.stringify({
            'node': response.data.nodeId,
            'link': response.data.edgeId
          })], {type: "application/json"});
          saveAs(blob, `data_${this.getDate()}.json`);
        })
      },
      saveAsCsv() { // 导出选中的数据
        let params = qs.stringify({
          nodeId: JSON.stringify(this.getnodeLink())
        })
        let itemList = [];
        axios.post('/get/nodeLink', params).then(response => {
          // map不会改变原来的对象的值
          response.data.edgeId = response.data.edgeId.map((item) => this.$parent.$children[1].dataObjLink[+item])
          response.data.edgeId.forEach(item => {
            itemList.push({
              'source': item.source.id,
              'target': item.target.id,
            })
          })
          let csv = Papa.unparse(itemList);
          //定义文件内容，类型必须为Blob 否则createObjectURL会报错
          let content = new Blob([csv]);
          //生成url对象
          let urlObject = window.URL || window.webkitURL || window;
          let url = urlObject.createObjectURL(content);
          //生成<a></a>DOM元素
          let el = document.createElement("a");
          //链接赋值
          el.href = url;
          el.download = `data_${this.getDate()}.csv`;
          //必须点击否则不会下载
          el.click();
          //移除链接释放资源
          urlObject.revokeObjectURL(url);
        })
      },
      getnodeLink() {
        return this.multipleSelection.map(item => item.id)
      },
      //获取当前时间(作为保存文件名)
      getDate() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        date = date.getFullYear() + '-' + month + '-' + strDate +
          "-" + date.getHours() + date.getMinutes() +
          date.getSeconds();
        return date;
      }
    },
    mounted() {
      // 订阅消息
      // 回调函数用箭头函数
      PubSub.subscribe('find', (msg, index) => {
        this.tableData3 = index
        this.showData = this.tableData3.slice(0, 10)
        // let filter = new Set()
        // this.tableData3.forEach((item) => {
        //   filter.add(item.group)
        // })
        // // 分组筛选
        // this.filterData = []
        // Array.from(filter).forEach((item) => {
        //   this.filterData.push({
        //     value: item,
        //     text: item
        //   })
        // })
      })

      if (localStorage.nodesLinks) {
        let data = JSON.parse(localStorage.nodesLinks);
        this.nodes = data.nodes;
      } else {
        this.nodes = this.$store.state.nodesLinks.nodes;
      }
      this.maxHeight = this.$refs.table.offsetHeight - 42
    }
  }
</script>

<style lang="less">
  @import "infotable.less";
</style>

