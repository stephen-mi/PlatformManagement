<template>
  <p class="report-info-bar">
    <template v-for="(value, key) in data">
      <lable class="report-info-label">{{ key }} : </lable>
      <span>{{ value }}</span>
    </template>
  </p>
</template>
<script>
  export default {
    name: 'report-info-bar',
    props: {
      data: Object
    },
    computed: {}
  }
</script>
<style type="text/scss" lang="scss">
  .report-info-bar {
    flex: 1;
    display: flex;
    font-size: 12px;
    line-height: 8px;
    .report-info-label {
      margin-left: 15px;
    }
    span {
      flex: 1;
    }
  }
</style>
