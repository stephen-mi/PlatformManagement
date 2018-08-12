<template>
  <div>
    <component
      :is="type"
      v-bind="meta"
      :configH="isHeight"
    ></component>
  </div>
</template>
<script>
  import { getConfig } from '@/api/common.js'
  import report from '@/views/report/index.vue'
  import form from '@/views/baseForm/index.vue'
  export default {
    name: 'fe-common',
    props: {
      path: {
        type: String
      },
      isHeight: {
        type: String
      }
    },
    components: {
      'report': report,
      'base-form': form
    },
    data() {
      return {
        type: '',
        meta: {}
      }
    },
    watch: {
      path: {
        handler(val) {
          this.getConfigByPath(val)
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      getConfigByPath(path) {
        getConfig(path).then(res => {
          console.log(res)
          this.type = res.data.meta.type ? res.data.meta.type : 'report'
          this.meta = res.data.meta
          this.$emit('input', this.meta)
        })
      }
    }
  }
</script>
<style>

</style>
