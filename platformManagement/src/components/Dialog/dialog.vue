<template>
  <el-dialog title="说明" :visible.sync="centerDialogVisible" width="30%" center>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      type: 0
    }
  },
  created() {
    this.$eventBus.$on(
      'dialogShow',
      function(type) {
        this.type = type
        this.centerDialogVisible = true
      }.bind(this)
    )
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
