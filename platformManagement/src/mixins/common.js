import { mapMutations, mapState } from 'vuex'
const commonMixin = {
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews,
      visitedMap: state => state.app.visitedMap
    })
  },
  methods: {
    ...mapMutations({
      delMyself: 'DEL_VISITED_VIEWS'
    }),
    goBack() {
      this.distoryTagView()
    },
    getFromRoute(key) {
      return this.visitedMap[key]
    },
    distoryTagView() {
      const activeItem = this.isActive(this.$route)
      this.$store.dispatch('delVisitedViews', activeItem)
      // const latestView = this.visitedViews.slice(-1)[0]
      const routerFrom = this.getFromRoute(this.$route.path)
      if (routerFrom) {
        this.$router.push({ 'path': routerFrom.path, 'query': routerFrom.query })
      } else {
        this.$router.push('/')
      }
    },
    isActive(route) {
      let activeItem
      this.visitedViews.forEach((item, index) => {
        if (item.path === this.$route.path || item.name === this.$route.name) {
          activeItem = item
        }
      })
      return activeItem
    }
  }
}
export default commonMixin
