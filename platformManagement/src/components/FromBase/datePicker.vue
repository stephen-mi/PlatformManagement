<template>
  <div class="fe-single-data-picker">
    <el-form-item
      :label="title"
    ></el-form-item>
    <el-date-picker
      v-model="defaultValue"
      :placeholder="placeholder"
      :value-format="format"
      :disabled="disabled"
      :type="datetype"
      class="fe-single-data-picker-input-content"
    >
    </el-date-picker>
  </div>
</template>
<script>
  export default {
    name: 'fe-single-date-picker',
    props: {
      title: String,
      code: String,
      disabled: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      placeholder: '',
      value: {
        type: String | Array
      }
    },
    data() {
      return {
        defaultValue: '',
        datetype: 'date'
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
  .fe-single-data-picker {
    width: unset;
    label {
      font-size: 12px;
      width: 100px;
      line-height: 30px;
      display: inline-block;
    }
    .fe-single-data-picker-input-content {
      width: 178px;
    }

  }
</style>
