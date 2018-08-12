<template>
  <div class="fe-input">
    <el-form-item
      :label="title"
    >
      <el-input
        :placeholder="placeholder"
        :prefix-icon="icon"
        v-model="defaultValue"
        @focus="showDialog()"
        class="fe-input-content"
        :title="tips"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    name: 'fe-inputDia',
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
      configKey: {
        type: String
      }
    },
    data() {
      return {
        defaultValue: '',
        tips: '',
        values: [],
        storageData: [],
        orderUser: new Date().getTime() + this.configKey,
        radioOrCheckbox: ''
      }
    },
    watch: {
      defaultValue() {
        if (this.radioOrCheckbox === 'radio') {
          this.$emit('input', this.storageData[0][this.storageData[this.storageData.length - 1].returnValue])
        } else if (this.radioOrCheckbox === 'checkbox') {
          this.$emit('input',
            this.storageData[0].map((item, index) => {
              console.log(item)
              console.log(item[this.storageData[this.storageData.length - 1].returnValue])
              return this.values.push(item[this.storageData[this.storageData.length - 1].returnValue])
            })
          )
        }
      }
    },
    created() {
      this.$eventBus.$on(this.orderUser, (data, type) => {
        if (this.configKey === localStorage.getItem('inputType')) {
          this.storageData = data
          var len = data.length
          this.radioOrCheckbox = type
          if (this.radioOrCheckbox === 'radio') {
            this.defaultValue = data[0][data[len - 1].returnDisplay]
          } else if (this.radioOrCheckbox === 'checkbox') {
            data[0].map((item, index) => {
              if (index === 0) {
                this.defaultValue = item[data[len - 1].returnDisplay] + '...'
              }
              this.tips += item[data[len - 1].returnDisplay]
            })
          }
          console.log(this.defaultValue)
          localStorage.removeItem('inputType')
        }
      })
    },
    methods: {
      showDialog() {
        this.$eventBus.$emit('searchDialogShow', this.configKey, this.orderUser)
        localStorage.setItem('inputType', this.configKey)
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
