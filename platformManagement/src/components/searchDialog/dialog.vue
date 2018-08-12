<template>
  <el-dialog title="" :visible.sync="centerDialogVisible" width="75%" center>
    <dialog-item v-model="meta" :path="type" :isHeight="H" class="dialog-report"></dialog-item>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialogItem from '@/views/config/index.vue'
export default {
  data() {
    return {
      centerDialogVisible: false,
      type: '',
      H: '600',
      selectedVal: '', // 单选
      checkboxVal: [], // 复选
      meta: {}, // 弹层回显值
      orderUser: ''
    }
  },
  components: { dialogItem },
  created() {
    this.$eventBus.$on('radioChecked', (data) => {
      this.selectedVal = data
    })
    this.$eventBus.$on('checkoutbox', (data) => {
      this.checkboxVal = data
      console.log(this.checkboxVal)
    })
    this.$eventBus.$on(
      'searchDialogShow',
      function(type, orderUser) {
        console.log(orderUser)
        this.type = type
        this.orderUser = orderUser
        this.centerDialogVisible = true
      }.bind(this)
    )
  },
  methods: {
    sure() {
      console.log(this.meta)
      if (this.selectedVal) {
        var throwArr = [this.selectedVal, this.meta]
        this.$eventBus.$emit(this.orderUser, throwArr, 'radio')
      } else {
        var throwCheckbox = [this.checkboxVal, this.meta]
        this.$eventBus.$emit(this.orderUser, throwCheckbox, 'checkbox')
      }
      this.centerDialogVisible = false
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
