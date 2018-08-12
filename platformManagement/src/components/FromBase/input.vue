<template>
  <div class="fe-input">
    <el-form-item
      :label="title"
    >
      <el-input
        :placeholder="placeholder"
        :prefix-icon="icon"
        v-model="defaultValue"
        class="fe-input-content"
        :disabled="disabled"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    name: 'fe-input',
    props: {
      title: String,
      required: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String
      },
      icon: {
        type: String
      },
      value: {
        type: String | Number
      },
      disabled: {
        type: Boolean,
        default: false
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
  .fe-input {
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
