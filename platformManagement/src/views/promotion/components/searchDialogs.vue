<template>
  <el-dialog title="" :visible.sync="centerDialogVisible" width="75%" center>
    <dialog-item  :path="path" :isHeight="H" class="dialog-report"></dialog-item>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closedialog">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialogItem from '@/views/config/index.vue'
export default {
  name: 'searchdialog',
  props: {
    suretype: {
      type: Number
    },
    path: {
      type: String
    },
    showHidden: {
      type: Boolean
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      H: '600',
      checkboxData: [] // 弹层回显值
    }
  },
  components: { dialogItem },
  created() {
    this.$eventBus.$on('checkoutbox', (data) => {
      this.checkboxData = []
      // 如果是勾选的话push 如果是去掉勾选去掉之前的值splice
      this.checkboxData = data
    })
  },
  watch: {
    showHidden(newValue, oldValue) {
      if (newValue) {
        this.centerDialogVisible = true
      } else {
        this.centerDialogVisible = false
      }
    },
    centerDialogVisible(newValue, oldValue) {
      if (!newValue) {
        this.$emit('closedialog')
      }
    }
  },
  methods: {
    closedialog() {
      this.$emit('closedialog')
      this.checkboxData = []
    },
    sure() {
      debugger
      if (this.suretype === 1) { // 出资方规则名称
        this.$emit('RuleEvent', 'investorRuleEvent', this.checkboxData)
      } else if (this.suretype === 2) { // 砍级规则名称
        this.$emit('RuleEvent', 'CandyRuleEvent', this.checkboxData)
      } else { // 优惠券类型规则名称
        this.$emit('RuleEvent', 'discountsTypeEvent', this.checkboxData)
      }
      this.$emit('closedialog')
    }
  }
}
</script>
<style lang="scss">
.el-dialog__wrapper{
  overflow: hidden;
  .el-dialog--center {
    display: flex;
    flex-direction: column;
    height: 80%
  }
  .dialog-report {
    height: 80%;
    .el-dialog__body {
      .dialog-report {
        height: 500px !important;
        .el-pagination {
          margin-top: 20px;
        }
      }
    }
    .el-dialog__footer {
      margin-top: 100px;
      text-align: right;
    }
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.dialogsearch /deep/ .el-dialog__body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.dialogsearch /deep/ .dialog-report {
    flex: 1;
    display: flex;
}
</style>
