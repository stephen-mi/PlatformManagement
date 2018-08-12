<template>
  <div>
    <el-form-item
      :label="title"
    >
      <el-switch
        v-model="defaultValue"
        :disabled="disabled"
      ></el-switch>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    name: 'fe-switch',
    props: {
      code: String,
      title: String,
      disabled: {
        type: Boolean,
        default: false
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
<style type="text/scss" lang="scss" scoped>

</style>
