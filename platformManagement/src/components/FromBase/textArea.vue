<template>
  <div class="fe-text">
    <el-form-item
      :label="title"
    >
      <el-input
        type="textarea"
        :placeholder="placeholder"
        :prefix-icon="icon"
        v-model="defaultValue"
        :rows="rows"
        class="fe-text-content"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    name: 'fe-text',
    props: {
      title: String,
      required: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String
      },
      rows: {
        type: String,
        default: '2'
      },
      value: {
        type: String | Array
      }
    },
    data() {
      return {
        defaultValue: ''
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
  .fe-text {
    width: unset;

  label {
    font-size: 12px;
    width: 100px;
    line-height: 30px;
  }

  .fe-text-content {
    width: 178px;
  }

  }
</style>
