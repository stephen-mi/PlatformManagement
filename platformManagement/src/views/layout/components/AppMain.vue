<template>
  <section class="app-main" style="flex: 1;display: flex;flex-direction: column">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view :key="getKeys()"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'AppMain',
    mounted() {
      const appHeight = document.body.offsetHeight - 84
      this.$store.dispatch('setHieght', appHeight)
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      filterKey() {
        const occurrence = _.find(this.$store.state.tagsView.cachedViews, item => item.path === this.$route.path)
        return occurrence ? occurrence.key : 0
      }
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
    },
    methods: {
      getKeys() {
        console.log(this.$route.path + this.filterKey)
        return this.$route.path + this.filterKey
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .app-main>div {
   display: flex;
   flex-direction: column;
   flex: 1;
 }
</style>
