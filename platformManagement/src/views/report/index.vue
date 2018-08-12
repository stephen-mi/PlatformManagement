<template>
  <div class="report-container">
    <div
      ref="report-mask"
      class="report-mask"
      :code="code"
      :loading="loading"
    >
    </div>
    <div
      ref="report-warrper"
      :reportCode="code"
      @keyup.enter="submitMethod"
      class="report-warrper"
    >
      <report-header
        :title="title"
        :buttons="buttons"
        @button-method="buttonMethod"
      ></report-header>
      <report-params
        ref="queryParams"
        :code="code"
        :paramsModel="params"
        :type="type"
        v-model="searchData"
        :resouceType="report = 'report'"
        @confirm="refresh"
      ></report-params>
      <report-table
        :tableColumns="columns"
        :tableData="gridData"
        :paramsHeight="params.length"
        :indexH="configH"
        :reportCode="code"
        :loading=loadingData
        :current-page="pageNo"
        :page-size="pageSize"
        @refresh="refresh"
        @sort="handlerSort"
      >
      </report-table>
      <div class="report-info-all">
      <report-info-bar
        v-if="testInfoData"
        :data="testInfoData"
      ></report-info-bar>
      <report-pagination
        ref="pagination"
        :current-page=pageNo
        :page-size="pageSize * 1"
        :page-sizes=pageSizes
        :total=totalRows
        :layout="defaultLayout"
        @sizeChange="handlerSizeChange"
        @currentChange="handlerCurrentChange"
      ></report-pagination>
      </div>
      <Dialog></Dialog>
    </div>
  </div>
</template>
<script>
  import reportHeader from './components/reportHeader.vue'
  import { getReportMetaData, getReportData } from '@/api/report.js'
  import reportParams from './components/reportParams.vue'
  import reportTable from './components/reportTable.vue'
  import reportPagination from './components/reportPagination.vue'
  import reportInfoBar from './components/reportInfo.vue'
  import _ from 'lodash'
  export default {
    name: 'report',
    props: {
      code: {
        type: String
      },
      title: String,
      buttons: Array,
      params: Array,
      columns: Array,
      path: String,
      configH: String,
      value: String,
      type: String
    },
    components: {
      'report-header': reportHeader,
      reportParams,
      reportTable,
      reportPagination,
      reportInfoBar
    },
    data() {
      return {
        loading: true,
        loadingData: true,
        reportData: {},
        gridData: [],
        searchData: {},
        paramsHeight: 0,
        sort: '',
        pageSize: 20,
        pageSizes: [20, 50, 100],
        pageNo: 1,
        totalRows: 0,
        defaultLayout: 'total, sizes, prev, pager, next, jumper', // 分页默认布局
        testInfoData: {}
      }
    },
    activated() {
      this.$bus.$on('refresh-grid', this.getData)
    },
    deactivated() {
      this.$bus.$off('refresh-grid', this.getData)
    },
    beforeDestroy() {
      this.$bus.$off('refresh-grid', this.getData)
    },
    mounted() {
      this.paramsHeight = this.$refs.pagination.$el.offsetHeight
      this.$bus.$emit('reisize-report-' + this.code, this.paramsHeight)
    },
    watch: {
      path: {
        handler(val) {
          this.$nextTick(() => {
            this.getData()
          })
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      buttonMethod(event) {
        const type = event.type
        this[type + 'Method'] && this[type + 'Method'](event)
      },
      submitMethod() {
        this.$bus.$emit('submitreport' + this.code)
      },
      resetMethod() {
        this.$refs.queryParams.reset()
      },
      refresh() {
        this.getData()
      },
      getMetaData() {
        const params = {
          code: this.code
        }
        getReportMetaData(params).then((res) => {
          const data = res.data.meta
          this.title = data.title
          this.buttons = data.buttons
          this.params = data.params
          this.columns = data.columns
          this.$nextTick(() => {
            this.getData()
          })
        })
      },
      getData() {
        this.loadingData = true
        let params = {
          code: this.code,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          sort: this.sort
        }
        params = _.merge({}, params, this.searchData)
        getReportData(this.path, params).then(res => {
          const data = res.data
          this.gridData = data.data
          this.totalRows = data.totalRows
          this.pageNo = data.pageNo
          this.$nextTick(() => {
            this.loadingData = false
          })
        })
      },
      dealQueryData(row) {
        const model = {}
        this.params.forEach((item, index) => {
          model[item.name] = item.value || ''
        })
        this.searchData = model
      },
      handlerSizeChange(val) {
        window.localStorage.setItem(this.$route.path, val)
        this.pageSize = val
        this.getData()
      },
      // 当前展示的页数
      handlerCurrentChange(val) {
        this.pageNo = val
        this.getData()
      },
      handlerSort(val) {
        this.sort = ''
        if (val && val.prop) {
          // this.sort[val.prop] = val.order
          this.sort = val.prop + ' ' + val.order
        }
        this.getData()
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .report-container{
    /*height: 100%;*/
    display: flex;
    flex-direction: column;
    flex:1;
    .report-warrper{
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .report-info-all{
      display: flex;
    }
    .report-box{
      font-family: Tahoma, "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
      font-size: 12px;
      height: 100%;
      position: relative;
      background-color: #F6F7F8;
      padding: 0 20px;
    }
  }
</style>
