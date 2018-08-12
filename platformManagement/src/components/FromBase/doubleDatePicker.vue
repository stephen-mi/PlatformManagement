<template>
  <div class="fe-double-data-picker">
    <el-form-item
      :label="title"
    ></el-form-item>
    <el-date-picker
      v-model="defaultValue"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :value-format="format"
      :type="datetype"
      :disabled="disabled"
      class="fe-double-data-picker-input-content"
    >
    </el-date-picker>
  </div>
</template>
<script>
  export default {
    name: 'fe-double-date-picker',
    props: {
      title: String,
      code: String,
      disabled: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        default: 'yyyy-MM-dd hh:mm:ss'
      },
      rangeSeparator: String,
      startPlaceholder: String,
      endPlaceholder: String,
      value: {
        type: String | Array
      }
    },
    data() {
      return {
        defaultValue: [],
        datetype: 'datetimerange'
      }
    },
    watch: {
      value: {
        handler(val) {
          this.defaultValue = val
        },
        deep: true,
        immediate: true
      },
      defaultValue(val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fe-double-data-picker {
    width: unset;
    label {
      font-size: 12px;
      width: 100px;
      line-height: 30px;
      display: inline-block;
    }
    .el-form-item{
      float: left;
    }
    .fe-double-data-picker-input-content {
      // width: 178px;
    }

  }
</style>
