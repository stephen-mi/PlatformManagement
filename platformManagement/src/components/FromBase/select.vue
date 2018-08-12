<template>
  <div class="fe-select">
    <el-form-item
      :label="title"
    >
      <el-select
        v-model="defaultValue"
        :placeholder="placeholder"
        class="fe-select-content"
        :disabled="disabled"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          v-bind="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    name: 'fe-select',
    props: {
      code: String,
      title: String,
      placeholder: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      options: Array,
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
    },
    methods: {
      validate() {
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .fe-select {
    width: unset;
    label {
      font-size: 12px;
      width: 100px;
      line-height: 30px;
      display: inline-block;
    }
    .fe-select-content {
      width: 178px;
    }
  }
</style>
