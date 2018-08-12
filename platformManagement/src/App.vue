<template>
	<div id="app">
		<router-view></router-view>
    <dialog-dom></dialog-dom>
    <search-dialog></search-dialog>
	</div>
</template>

<script>
  export default{
    name: 'APP',
    created() {
      const _this = this
      this.$router.beforeEach(function(to, from, next) {
        const keyPath = to.path
        _this.$store.dispatch('addVisitedMap', {
          key: keyPath,
          val: from,
          query: to.query
        })
        next()
      })
    }
  }

</script>
