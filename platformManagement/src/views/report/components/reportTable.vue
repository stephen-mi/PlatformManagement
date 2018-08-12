<template>
  <div
    class="report-table"
    :style="{height: height}"
  >
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      height="100%"
      style="width:100%;overflow:auto;height:100%;"
      :cell-style=bodyStyle
      :header-cell-style=headerStyle
      @sort-change="handlerSort"
      @cell-click="handlerCellClick"
      highlight-current-row
      :row-key="getRowKeys"
      @selection-change = "handleCurrentChange"
      @row-click="selectRow"
      @select="handlerSelect"
      @select-all="handlerSelectAll"
      @current-change="handlerCurrent"
    >

      <!--<el-table-column-->
        <!--v-for="(column,index) in tableColumns"-->
        <!--v-if="!column.hidden"-->
        <!--:key="index"-->
        <!--:prop="column.name"-->
        <!--:label="column.title"-->
        <!--align="right"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <report-column
      v-for="(column,$index) in tableColumns"
      v-if="!column.hidden"
      :key="$index"
      v-bind="column"
      @refresh="refresh"
      ></report-column>
    </el-table>
  </div>
</template>
<script>
  import reportColumn from './reportColumn.vue'
  export default {
    name: 'report-table',
    props: {
      tableColumns: {
        type: Array
      },
      tableData: {
        type: Array
      },
      paramsHeight: {
        type: Number
      },
      reportCode: {
        type: String
      },
      loading: {
        type: Boolean
      },
      currentPage: {
        type: String | Number
      },
      pageSize: {
        type: String | Number
      },
      indexH: {
        type: String
      }
    },
    components: {
      reportColumn
    },
    data() {
      return {
        bodyStyle: {
          'font-size': '12px',
          'padding': '0'
        },
        height: '0px',
        styleObject: {
          height: '0px'
        },
        headerStyle: {
          'font-size': '12px',
          'background-color': '#fff',
          'color': 'rgba(49, 65, 86, 0.82)',
          'padding': '0'
        },
        multipleSelection: []
      }
    },
    computed: {
      mainHeight() {
        return this.$store.state.app.height
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (!this.indexH) {
          this.height = (this.mainHeight - 82 - Math.ceil(this.paramsHeight / 3) * 85) + 'px'
        } else {
          this.height = (this.indexH - 82 - Math.ceil(this.paramsHeight / 3) * 85) + 'px'
        }
      })
    },

    created() {
    },
    methods: {
      refresh(index) {
        this.tableData.splice(index, 1)
        this.$emit('refresh')
      },
      handlerSort(col) { // 排序
        this.$emit('sort', {
          'order': this.getSort(col.order),
          'prop': col.prop
        })
      },
      getSort(order) {
        if (!order) {
          return ''
        }
        if (order.indexOf('desc') > -1) {
          return 'desc'
        }
        if (order.indexOf('asc') > -1) {
          return 'asc'
        }
        return ''
      },
      handlerCellClick(row, column, cell, event) {},
      handleCurrentChange(val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
        this.$eventBus.$emit('checkoutbox', this.multipleSelection)
      },
      selectRow(row, event, column) {},
      handlerSelect(selection, row) {},
      handlerSelectAll(selection) {},
      handlerCurrent(currentRow, oldCurrentRow) {},
      getRowKeys(row) {
        return row.index
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  $height: 32px;
  .report-table{
    flex:1;
    display: flex;
    .el-table{
      height: none !important;
    }
  }
</style>
