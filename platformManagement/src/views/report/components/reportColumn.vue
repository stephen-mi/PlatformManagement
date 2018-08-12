<template>
  <el-table-column
    :label="title"
    :prop="name"
    v-if="!type"
    :align="align"
    :flexed="flexed"
    :sortable="sortable"
  >
  </el-table-column>
  <el-table-column
    :label="title"
    :prop="name"
    :flexed="flexed"
    :align="align"
    v-else-if="type === 'button'"
  >
    <template
      slot-scope="scope"
      v-if="getType() === 'button'"
    >
      <el-button
        v-for="(button, idx) in buttons"
        :key="idx"
        size="mini"
        @click.native.prevent.stop="handleButton(scope.$index, scope.row, button)">{{button.name}}
      </el-button>
    </template>
  </el-table-column>
  <el-table-column
    :label="title"
    :prop="name"
    :flexed="flexed"
    :align="align"
    v-else-if="type === 'alertconten' || type=== 'goRouter'"
  >
    <template
      slot-scope="scope"
    >
     <span  style="color: #5F995F;cursor: pointer;" @click.prevent.stop="alertconten(scope.$index, scope.row)">{{scope.row[name]}}</span>
    </template>
  </el-table-column>
  <el-table-column
    :type="type"
    :label="title"
    :prop="name"
    :flexed="flexed"
    :align="align"
    v-else-if="type === 'radio'"
  >
    <template
      slot-scope="scope"
    >
      <el-radio style="cursor: pointer;" @click.native.prevent.stop="radio(scope.$index, scope.row)" v-model="radios" :label="scope.$index"></el-radio>
    </template>
  </el-table-column>
  <el-table-column
    :type="type"
    :label="title"
    :prop="name"
    :flexed="flexed"
    :align="align"
    width="80"
    v-else-if="type === 'selection'"
  >
  </el-table-column>
  <el-table-column
    v-else
    :type="type"
    :label="title"
    :prop="name"
    :flexed="flexed"
    :align="align"

  >

  </el-table-column>
</template>
<script>
  import { ajaxSend } from '@/api/report.js'
  import _ from 'lodash'
  export default {
    name: 'report-column',
    props: {
      flexed: {
        type: String
      },
      width: {
        type: String
      },
      hidden: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        defalut: ''
      },
      title: {
        type: String
      },
      name: {
        type: String
      },
      align: {
        type: String,
        default: 'center'
      },
      buttons: {
        type: Array,
        defalut: []
      },
      sortable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showTooltip: true,
        radios: null
      }
    },
    created() {

    },
    methods: {
      getType() {
        return this.type
      },
      updateMethod(event, row) {
        const params = event.params || []
        let query = {}
        params.forEach((item) => {
          query[item] = row[item]
        })
        query = _.merge(query, event.static || {})
        if (event.configKey) {
          event.path = '/config/' + encodeURIComponent(event.configKey)
        }
        this.$router.push({
          path: event.path,
          query: query
        })
      },
      ajaxMethod(event, row, index) {
        const that = this
        const params = event.params || []
        let query = {}
        let url = event.path
        params.forEach((item) => {
          query[item] = row[item]
          url = _.replace(url, '{' + item + '}', row[item])
        })
        query = _.merge({}, query, event)
        query.url = url
        if (event.confirm) {
          const confirm = event.confirm
          this.$confirm(confirm.message, confirm.title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            that.realSendAjax(query)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          that.realSendAjax(query, index)
        }
      },
      realSendAjax(query, index) {
        ajaxSend(query).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.message,
              showClose: true
            })
            this.$emit('refresh', index)
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              showClose: true
            })
          }
        })
      },
      handleButton(index, row, button) {
        switch (button.event.type) {
          case 'router':
            this.updateMethod(button.event, row)
            break
          case 'cancel':
            this.$router.go(-1)
            break
          case 'ajax':
            this.ajaxMethod(button.event, row, index)
            break
          default:
            this.$emit('button-method', event)
            break
        }
      },
      alertconten(index, row) {
        switch (this.type) {
          case 'alertconten':
            this.$eventBus.$emit('dialogShow', 1)
            break
          case 'goRouter':
            alert('跳转页面')
            break
          default:
            this.$emit('button-method', event)
            break
        }
      },
      radio(index, row) {
        switch (this.type) {
          case 'radio':
            this.radios = index
            this.$eventBus.$emit('radioChecked', row)
            break
          default:
            this.$emit('button-method', event)
            break
        }
      }
    }
  }
</script>
<style lang="scss">
  .el-radio__label {
    color: transparent !important;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
