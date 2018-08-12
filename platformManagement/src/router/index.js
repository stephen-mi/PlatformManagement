import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    hidden: true,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/config',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [{
      path: '/config/:path',
      component: _import('config/index'),
      name: '统一管理',
      hidden: true,
      alwaysShow: false,
      props: true
    }]
  },
  {
    path: '/report',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [{
      path: '/report/:code',
      component: _import('report/index'),
      name: '报表管理',
      hidden: true,
      alwaysShow: false,
      props: true
    }]
  },
  {
    path: '/form',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [{
      path: '/form/:code',
      component: _import('baseForm/index'),
      name: '表单管理',
      hidden: true,
      alwaysShow: false,
      props: true
    }]
  },
  {
    path: '/promotion',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/promotion/addtemplate',
        component: _import('promotion/addtemplate'),
        name: '新建模板',
        hidden: true,
        alwaysShow: false,
        props: true
      },
      {
        path: '/promotion/pushvolume',
        component: _import('promotion/pushvolume'),
        name: '推劵管理',
        hidden: true,
        alwaysShow: false,
        props: true
      },
      {
        path: '/promotion/candyruleAdd',
        component: _import('promotion/candyruleAdd'),
        name: '坎级规则添加',
        hidden: true,
        alwaysShow: false,
        props: true
      }
    ]
  },
  // 权限管理
  {
    path: '/authorization',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/authorization/index',
        component: _import('authorization/index'),
        name: '权限管理',
        hidden: true,
        alwaysShow: false,
        props: true
      }
    ]
  },
  // 顾客详情
  {
    path: '/customerDetails',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/customerDetails/index',
        component: _import('customerDetails/index'),
        name: '顾客详情',
        hidden: true,
        alwaysShow: false,
        props: true
      }
    ]
  },
  {
    path: '/details',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/details/index',
        component: _import('details/index'),
        name: '订单详情',
        hidden: true,
        alwaysShow: false,
        props: true
      }
    ]
  },
  {
    path: '/couponReceive',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/couponReceive/index',
        component: _import('couponReceive/index'),
        name: '领券管理',
        hidden: false,
        alwaysShow: false,
        props: true
      }
    ]
  },
  {
    path: '/setOrderTime',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/setOrderTime/index',
        component: _import('setOrderTime/index'),
        name: '订单时间设置',
        hidden: false,
        alwaysShow: false,
        props: true
      }
    ]
  },
  {
    path: '/contributiveRule',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/contributiveRule/index',
        component: _import('contributiveRule/index'),
        name: '出资方规则',
        hidden: false,
        alwaysShow: false,
        props: true
      }
    ]
  },
  {
    path: '/financeManage',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/financeManage/index',
        component: _import('financeManage/index'),
        name: '财务管理',
        hidden: false,
        alwaysShow: false,
        props: true
      }
    ]
  },
  {
    path: '/appliyObjectRule',
    component: Layout,
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: '/appliyObjectRule/index',
        component: _import('appliyObjectRule/index'),
        name: '适用对象规则新增',
        hidden: false,
        alwaysShow: false,
        props: true
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [{
  //     path: 'index',
  //     component: _import('documentation/index'),
  //     name: 'documentation',
  //     meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //   }]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   meta: { roles: ['admin'] }, // you can set roles in root nav
  //   children: [{
  //     path: 'index',
  //     component: _import('permission/index'),
  //     name: 'permission',
  //     meta: {
  //       title: 'permission',
  //       icon: 'lock',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: _import('svg-icons/index'),
  //     name: 'icons',
  //     meta: { title: 'icons', icon: 'icon', noCache: true }
  //   }]
  // },
  //
  // {
  //   path: '/components',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'component-demo',
  //   meta: {
  //     title: 'components',
  //     icon: 'component'
  //   },
  //   children: [
  //     { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
  //     { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
  //     { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
  //     { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
  //     { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
  //     { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
  //     { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
  //     { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
  //     { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
  //     { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
  //     { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
  //   ]
  // },
  //
  // {
  //   path: '/charts',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'charts',
  //   meta: {
  //     title: 'charts',
  //     icon: 'chart'
  //   },
  //   children: [
  //     { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
  //     { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
  //     { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
  //   ]
  // },
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table/complex-table',
  //   name: 'example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: '/example/table',
  //       component: _import('example/table/index'),
  //       redirect: '/example/table/complex-table',
  //       name: 'Table',
  //       meta: {
  //         title: 'Table',
  //         icon: 'table'
  //       },
  //       children: [
  //         { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
  //         { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
  //         { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
  //         { path: 'tree-table', component: _import('example/table/treeTable/treeTable'), name: 'treeTable', meta: { title: 'treeTable' }},
  //         { path: 'custom-tree-table', component: _import('example/table/treeTable/customTreeTable'), name: 'customTreeTable', meta: { title: 'customTreeTable' }},
  //         { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
  //       ]
  //     },
  //     { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'form',
  //   meta: {
  //     title: 'form',
  //     icon: 'form'
  //   },
  //   children: [
  //     { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
  //     { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
  //     { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
  //   ]
  // },
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
  //     { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
  //     { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  // },
  //
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  // },

  { path: '*', redirect: '/404', hidden: true }
]