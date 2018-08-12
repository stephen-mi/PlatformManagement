<template>
  <div class="fe-range">
    <el-form-item
      :label="title"
    >
      <div class="fe-range-content">
        <input v-model="firstValue" :type="type" :step="step" class="fe-range-input" min="0.01" :max="secondValue"/>
        <span class="fe-range-separator">——</span>
        <input v-model="secondValue" :type="type" class="fe-range-input" :min="firstValue" max="10000"/>
      </div>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    name: 'fe-range',
    props: {
      title: String,
      code: String,
      text: String,
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: String | Array
      },
      step: Number
    },
    data() {
      return {
        firstValue: 0.01,
        secondValue: 0.02,
        type: 'number'
      }
    },
    watch: {
      value: {
        handler(val) {
          if (val) {
            this.fristValue = val[0]
            this.secondValue = val[1]
          }
        },
        deep: true,
        immediate: true
      },
      firstValue: {
        handler(val) {
          if (this.secondValue && val) {
            const retVal = [val, this.secondValue]
            this.$emit('input', retVal)
          }
        },
        deep: true,
        immediate: true
      },
      secondValue: {
        handler(val) {
          if (this.firstValue && val) {
            const retVal = [this.firstValue, val]
            this.$emit('input', retVal)
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .fe-range{
    .fe-range-content{
      width: 178px;
      float: left;
      border-radius: 4px;
      box-sizing: border-box;
      color: #606266;
      border: 1px solid #dcdfe6;
      .fe-range-separator{
        width: 12px;
        float: left;
      }
      .fe-range-input{
        width: 78px;
        height: 36px;
        border: none;
        outline: none;
        float: left;
        margin-left: 3px;
        text-align: center
      }
    }
  }
</style>
