<template>
  <!--<div class="menu-wrapper">-->
    <!--<template v-for="item in routes" v-if="!item.hidden&&item.children">-->

      <!--<router-link v-if="item.children.length===1 && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">-->
        <!--<el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">-->
          <!--<svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>-->
          <!--<span v-if="item.children[0].meta&&item.children[0].meta.title">{{generateTitle(item.children[0].meta.title)}}</span>-->
        <!--</el-menu-item>-->
      <!--</router-link>-->

      <!--<el-submenu v-else :index="item.name||item.path" :key="item.name">-->
        <!--<template slot="title">-->
          <!--<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>-->
          <!--<span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>-->
        <!--</template>-->

        <!--<template v-for="child in item.children" v-if="!child.hidden">-->
          <!--<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>-->

          <!--<router-link v-else :to="item.path+'/'+child.path" :key="child.name">-->
            <!--<el-menu-item :index="item.path+'/'+child.path">-->
              <!--<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>-->
              <!--<span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
        <!--</template>-->
      <!--</el-submenu>-->

    <!--</template>-->
  <!--</div>-->
  <!--<div>-->
  <div class="menu-wrapper" :style="{'margin-left': '0'}" ref="menuWrapper" @click.stop.prevent>
    <!--一级没有子菜单-->
    <el-menu-item
      v-for="(item,index) in routes"
      v-if="!item.hidden&& (!item.children || item.children.length == 0)"
      :index="item.path"
      :key="index"
      @click="clickRouter(item)"
    >
      <svg-icon :icon-class="getIcon(item)"></svg-icon>
      <el-tooltip class="item" effect="dark" :content="item.menuName" placement="top-start" v-if="getLayout()">
        <span v-if="item.menuName">{{item.menuName}}</span>
      </el-tooltip>
      <template v-else>
        <span v-if="item.menuName">{{item.menuName}}</span>
      </template>
    </el-menu-item>
    <!--一级有子菜单-->
    <el-submenu
      v-else="!item.hidden&&item.children&&item.children.length > 0"
      :index="item.path + item.id"
      :key="index"
      @click="clickMenuRouter(item)"
    >
      <!--一级菜单标题-->
      <template slot="title">
        <svg-icon :icon-class="getIcon(item)"></svg-icon>
        <el-tooltip class="item" effect="dark" :content="item.menuName" placement="top-start" v-if="getLayout()">
          <span v-if="item.menuName">{{item.menuName}}</span>
        </el-tooltip>
        <template v-else>
          <span v-if="item.menuName">{{item.menuName}}</span>
        </template>
      </template>
      <sidebar-item
        :is-nest="true"
        :routes="item.children"
        :key="index"></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle,
    getIcon(item) {
      let iconItem = null
      if (!item.icon) {
        if (item.level === 1) {
          iconItem = 'documentation'
        } else if (item.level === 2) {
          iconItem = 'clipboard'
        } else if (item.level === 3) {
          iconItem = 'table'
        } else {
          iconItem = 'excel'
        }
      } else {
        iconItem = item.icon
      }
      return iconItem
    },
    getLayout() {
      return true
    },
    clickRouter(item) {
      if (item.configKey) {
        item.path = '/config/' + encodeURIComponent(item.configKey)
      }
      this.$router.push(item)
    }
  }
}
</script>

