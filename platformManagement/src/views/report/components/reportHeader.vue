<template>
  <div class="report-header">
    <div class="report-title">
      <span class="logo"></span>
      <span class="title">{{title}}</span>
    </div>
    <div class="report-button-warpper">
      <el-button
        v-for="(item, $index) in buttons"
        :type="getButtonType(item.event)"
        @click.stop="clickButton(item.event)"
        :key="$index"
        size="small">
        {{item.name}}
      </el-button>
    </div>
  </div>
</template>
<script>
  import commonMixin from '@/mixins/common.js'

  export default {
    name: 'report-header',
    mixins: [commonMixin],
    props: {
      title: {
        type: String
      },
      buttons: {
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {
      clickButton(event, $event) {
        switch (event.type) {
          case 'router':
            if (event.configKey) {
              event.path = '/config/' + encodeURIComponent(event.configKey)
            }
            this.$router.push({
              path: event.path
            })
            break
          case 'cancel':
            this.goBack()
            this.delMyself({ path: this.$route.path })
            break
          default:
            this.$emit('button-method', event)
            break
        }
      },
      getButtonType(item, index) {
        if (item.type === 'router' || item.type === 'ajax' || item.type === 'submit' || item.type === 'add' || item.type === 'import' || item.type === 'batchUpdate' ||
          item.type === 'ajaxBatchUpdate' || item.type === 'saveToForm' || item.type === 'saveToRep' || item.type ===
          'alternative' || item.type === 'reset') {
          return 'primary'
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .report-header {
    width: 100%;
    height: 52px;
    border-bottom: 1px solid #ccc;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;

  .report-title {
    float: left;
    line-height: 52px;
    white-space: nowrap;

  .title {
    font-size: 18px;
    position: relative;
    top: 2px;
    left: 0px;
    white-space: nowrap;
  }

  .logo {
    color: #409EFF;
    background-color: rgb(64, 158, 255);
    margin: 5px;
    white-space: nowrap;
    width: 5px;
    height: 16px;
    display: inline-block;
    position: relative;
    left: 0;
    top: 8px;
  }

  }
  .report-button-warpper {
    float: right;
    line-height: 52px;
  }

  }
</style>
