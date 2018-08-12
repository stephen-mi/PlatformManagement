<template>
  <div class="report-params">
    <el-form ref="form" :model="valueClone" class="form" label-width="120px" :label-position="labelPosition">
      <div
        class="report-params-item"
        v-for="(item, $index) in paramsModel"
        v-if="!item.isHidden"
        :key="$index"
      >
        <component
          :is="getComponentName(item)"
          :code="code"
          v-model="valueClone[item.name]"
          v-bind="item"
        ></component>
      </div>
    </el-form>
  </div>
</template>
<script>
  import { inputModel } from '../../../utils/report.js'
  import input from '@/components/FromBase/input.vue'
  import textArea from '@/components/FromBase/textArea.vue'
  import select from '@/components/FromBase/select.vue'
  import feSwitch from '@/components/FromBase/switch.vue'
  import checkbox from '@/components/FromBase/checkbox.vue'
  import datePicker from '@/components/FromBase/datePicker.vue'
  import doubleDatePicker from '@/components/FromBase/doubleDatePicker.vue'
  import commonTree from '@/components/FromBase/commonTree.vue'
  import range from '@/components/FromBase/range.vue'
  import inputDia from '@/components/FromBase/inputDia.vue'
  import _ from 'lodash'

  export default {
    name: 'report-params',
    components: {
      'fe-input': input,
      'fe-text': textArea,
      'fe-select': select,
      'fe-switch': feSwitch,
      'fe-checkbox': checkbox,
      'fe-single-date-picker': datePicker,
      'fe-double-date-picker': doubleDatePicker,
      'fe-common-tree': commonTree,
      'fe-range': range,
      'fe-inputDia': inputDia
    },
    props: {
      code: String,
      resouceType: String,
      paramsModel: {
        type: Array
      },
      value: Object
    },
    data() {
      return {
        labelPosition: 'right',
        showAll: false,
        valueClone: {},
        paramsModelClone: [],
        backupValue: {},
        inputModel
      }
    },
    watch: {
      value: {
        handler(val) {
          console.log(val)
          this.valueClone = _.cloneDeep(val)
          console.log(this.valueClone)
          if (!this.backupValue) {
            this.backupValue = _.cloneDeep(val)
          }
        },
        deep: true,
        immediate: true
      },
      paramsModel: {
        handler(val) {
          this.paramsModelClone = _.cloneDeep(val)
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      console.log(this.paramsModel)
      this.$bus.$on('submit' + this.resouceType + this.code, this.confirm)
    },
    beforeDestroy() {
      this.$bus.$off('submit' + this.resouceType + this.code)
    },
    methods: {
      confirm(event) {
        // 应该是查询调用这里
        this.$emit('input', this.valueClone)
        this.$nextTick(() => {
          this.$emit('confirm', event)
        })
      },
      getComponentName(item) {
        const inputModel = item.inputModel
        const componentName = this.inputModel[inputModel]
        return componentName
      },
      getSendValue(name) {
        return this.valueClone[name]
      },
      reset() {
        this.valueClone = _.cloneDeep(this.backupValue)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .report-params {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-left: 20px;
    flex-wrap: wrap;
    .form {
      width: 100%;
      .report-params-item{
        width: 30%;
        margin-top: 15px;
        float: left;
      }
    }
  }
</style>
