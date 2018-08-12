<template>
  <div class="fe-common-tree">
    <el-popover
      v-model="showTree"
    >
      <el-tree
        class="fe-el-tree"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255,255,.9)"
        :load="loadData"
        :lazy="lazy"
        node-key="id"
        ref="tree"
        :highlight-current="highlightCurren"
        @node-click="getChecked"
        :show-checkbox="showCheckbox"
        :expand-on-click-node="expand"
        :check-strictly="strictly"
        @check="check"
        :props="treeProps">
      </el-tree>
      <el-button
        type="primary"
        @click.stop="sureMethod"
        size="small"
        class="tree-button"
      >
        确认
      </el-button>
      <el-button
        @click.stop="cancel"
        size="small"
      >
        取消
      </el-button>
      <el-form-item
        slot="reference"
        :label="title"
      >
        <el-input
          :placeholder="placeholder"
          :prefix-icon="icon"
          v-model="textValue"
          disable
          class="fe-input-content"
        ></el-input>

      </el-form-item>
    </el-popover>
  </div>
</template>
<script type="text/ecmascript-6">
  import request from '@/utils/request'

  export default {
    name: 'fe-common-tree',
    props: {
      title: String,
      code: String,
      text: String,
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String
      },
      multi: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String
      },
      placeholder: String,
      path: String, // 获取异步加载树 数据接口
      baseParams: {
        type: Object,
        default: {}
      },
      params: {
        type: Array,
        default: []
      },
      vField: {
        type: String,
        default: 'id'
      },
      value: {
        type: String | Array
      }
    },
    data() {
      const defaultValue = this.multi ? '' : []
      return {
        textValue: '',
        defaultValue: defaultValue,
        treeProps: {
          children: 'children',
          label: 'text',
          isLeaf: 'leaf'
        },
        emptyText: '无数据',
        highlightCurren: true,
        lazy: true,
        loadingText: '加载中...',
        showCheckbox: true,
        showTree: false,
        expand: false,
        strictly: true
      }
    },
    watch: {
      value: {
        handler(val) {
          this.defaultValue = val
        },
        immediate: true,
        deep: true
      },
      defaultValue: {
        handler(val) {
          // this.$emit('input', val)
        },
        deep: true,
        immediate: true
      },
      text: {
        handler(val) {
          this.textValue = val
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      loadData(node, resolve) { // @todo 获取树懒加载数据
        let params = this.baseParams
        if (node.level !== 0) {
          params = {}
          this.params.forEach((item) => {
            params[item] = node[item]
          })
        }
        this.getNodeAjax(this.path, params).then((res) => {
          const data = res.data.data
          resolve(data)
        })
      },
      getNodeAjax(url, params) {
        return request({
          url: url,
          method: 'get',
          data: params
        })
      },
      getChecked(data) { // @todo checkbox 点击时候的回调
      },
      check(data, checkObj) {
        const checkedKyes = checkObj.checkedKeys
        const checkedNodes = checkObj.checkedNodes
        if (this.multi) {
          this.defaultValue = checkedKyes
          const checkedNodes = checkedNodes
          let endStr = ''
          checkedNodes.forEach(item => {
            endStr += ',' + item[this.treeProps.label]
          })
          this.textValue = endStr
        } else {
          const newOne = checkedKyes[checkedKyes.length - 1]
          const lastOne = checkedNodes[checkedNodes.length - 1]
          this.$refs.tree.setCheckedKeys([newOne])
          this.defaultValue = newOne
          this.textValue = lastOne[this.treeProps.label]
        }
      },
      sureMethod() { // @todo 回填数据确认
        this.$emit('input', this.defaultValue)
        this.showTree = false
      },
      cancel() {
        if (this.multi) {
          this.defaultValue = []
        } else {
          this.defaultValue = ''
        }
        this.$refs.tree.setCheckedKeys([])
        this.showTree = false
      } // @todo 取消
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .fe-el-tree{
    width: 220px;
    height: 300px;
    overflow: auto;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    margin-top: 10px;
    padding-top: 10px;
  }
  .tree-button{
    margin-left: 40px;
    margin-top: 8px;
  }
  .fe-common-tree {
    width: unset;

    label {
      font-size: 12px;
      width: 100px;
      line-height: 30px;
      display: inline-block;
    }

    .fe-input-content {
      width: 178px;
    }

  }
</style>
