<template>
  <div class="form-container">
    <div
      ref="form-mask"
      class="form-mask"
      :code="code"
      :loading="loading"
    >
    </div>
    <div
      ref="form-warrper"
      :formCode="code"
      class="form-warrper"
    >
      <form-header
        :title="title"
        :buttons="buttons"
        @button-method="buttonMethod"
        @destroy="destroy"
      >
      </form-header>
      <form-body
        :paramsModel="items"
        v-model="submitData"
        :resouceType="report = 'form'"
        :code="code"
        @confirm="submitThisForm"
      >
      </form-body>
    </div>
  </div>
</template>
<script>
  import reportHeader from '@/views/report/components/reportHeader.vue'
  import reportParams from '@/views/report/components/reportParams.vue'
  import { getFromMetaData, submitForm, getFormData } from '@/api/form.js'
  import formMixin from './mixins/formMixin'
  import commonMixin from '../../mixins/common.js'
  import _ from 'lodash'
  export default {
    name: 'base-form',
    components: {
      'form-header': reportHeader,
      'form-body': reportParams
    },
    mixins: [commonMixin, formMixin],
    props: {
      code: {
        type: String
      },
      title: String,
      items: Array,
      buttons: Array,
      path: String
    },
    data() {
      return {
        loading: false,
        loadingData: false,
        submitData: {},
        status: 'add',
        disable: false
      }
    },
    watch: {
      path: {
        handler(val) {
          if (val) {
            const method = this.$route.query && this.$route.query.method
            if (method) {
              const query = this.$route.query
              let tempUrl = _.cloneDeep(val)
              for (const i in query) {
                tempUrl = _.replace(tempUrl, '{' + i + '}', query[i])
              }
              this.$nextTick(() => {
                getFormData(tempUrl, this.$route.query).then((res) => {
                  this.dealDetailData(res)
                })
                if (method === 'detail') {
                  this.disableAllInput()
                }
              })
            }
          }
        },
        immediate: true,
        deep: true
      },
      items: {
        handler() {
          this.dealSubmitData()
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      destroy() {
        this.$nextTick(() => {
          this.$destroy()
        })
      },
      dealDetailData(res) {
        if (res.code === 0) {
          this.submitData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            showClose: true
          })
        }
      },
      disableAllInput() {
        this.items.forEach((item) => {
          item.disabled = true
        })
      },
      submitThisForm(event) {
        const params = _.merge({}, { code: this.code }, this.submitData)
        submitForm(event.path, params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.message,
              showClose: true
            })
            this.goBack()
            this.delMyself({ path: this.$route.path })
            this.$nextTick(() => {
              this.$bus.$emit('refresh-grid', event)
            })
          }
        })
      },
      getMeatData: function() {
        const params = {
          code: this.code
        }
        getFromMetaData(params).then((res) => {
          const data = res.data
          const meta = data.meta
          this.title = meta.title
          this.items = meta.items
          this.buttons = meta.buttons
          this.dealSubmitData()
          this.$nextTick(() => {
            this.loading = false
          })
        })
      },
      submitMethod(event) {
        this.$bus.$emit('submitform' + this.code, event)
      },
      dealSubmitData() {
        const model = {}
        this.items.forEach((item, index) => {
          model[item.name] = item.value || ''
        })
        this.submitData = model
      },
      buttonMethod(event) {
        const type = event.type
        this[type + 'Method'] && this[type + 'Method'](event)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">

</style>
