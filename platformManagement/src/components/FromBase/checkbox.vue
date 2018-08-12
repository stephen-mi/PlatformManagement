<template>
  <div class="fe-checkbox">
    <el-form-item
      :label="title"
    >
      <el-checkbox-group
        v-model="defaultValue"
        class="fe-checkbox-content"
        @change="dealData"
        :disabled="disabled"
      >
        <el-checkbox
          v-for="item in options"
          :key="item.value"
          v-bind="item"
        >
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </div>
</template>
<script>
  import _ from 'lodash'
  export default {
    name: 'fe-checkbox',
    props: {
      title: String,
      code: String,
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String
      },
      options: Array,
      value: {
        type: String | Array
      }
    },
    data() {
      return {
        defaultValue: []
      }
    },
    watch: {
      value: {
        handler(val) {
          if (val) {
            const v = this.dataLabel(val)
            this.defaultValue = v
          } else {
            this.defaultValue = []
          }
        },
        deep: true,
        immediate: true
      },
      defaultValue(val) {
        // this.$emit('input', val)
      }
    },
    methods: {
      validate() {
      },
      dataLabel(val) {
        const retValue = []
        this.defaultValue.forEach((item) => {
          const ret = _.find(this.options, function(o) { return o.value === item })
          retValue.push(ret.label)
        })
        return retValue
      },
      dealData() {
        const retValue = []
        this.defaultValue.forEach((item) => {
          const ret = _.find(this.options, function(o) { return o.label === item })
          retValue.push(ret.value)
        })
        this.$emit('input', retValue)
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .fe-checkbox {
    width: unset;
    label {
      font-size: 12px;
      width: 100px;
      line-height: 30px;
      display: inline-block;
    }
    .fe-checkbox-content {
      width: 178px;
    }
  }
</style>
