import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/index.vue'
import layout from '../views/Layout/Layout.vue'
import go404 from  '../views/404.vue'
import  dashboard from '../views/dashboard/index.vue'
import form from '../views/form/index.vue'
import  table from '../views/table/index.vue'
import tree from  '../views/tree/index.vue'
import user from '../views/table/user.vue'
import  role from '../views/role/index.vue'
import  interFace from '../views/tools/interface.vue'
import  theme from  '../views/tools/theme.vue'
import  edit from  '../views/edit/index.vue'
import markdown from '../views/edit/markdown.vue'
import  interif from '../views/tools/interfaceForm.vue'
import  permission from  '../views/role/permission.vue'
Vue.use(Router)
//vue 中 如果想嵌套多层自定义vue 只能有一个顶层标签 其余不能包含在div内


  export const constantRouterMap = [
    { path: '/login',
    component: login,
    hidden: true },
    { path: '/404',
      component: go404,
      hidden: true
    },
    {
      path: '/',
      component: layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: true,
      children: [{
        path: 'dashboard',
        component: dashboard
      }]
    },

    {
      path: '/itemcfg',
      component: layout,
      redirect: '/example/table',
      name: '栏目配置',
      meta: { title: '栏目配置', icon: 'example' },
      children: [
        {
          path: 'table',
          name: '轮播栏',
          component: table,
          meta: { title: '轮播栏', icon: 'table' }
        },
        {
          path: 'tree',
          name: '栏目列表',
          component: tree,
          meta: { title: '栏目列表', icon: 'tree' }
        }
      ]
    },
    {
      path:'/interface',
      name:'快速工具',
      component: layout,
      meta: { title: '快速工具', icon: 'form'},
      children:[
        {
          path: 'jsoneditor',
          name: '接口配置',
          component: interFace,
          meta: { title: '接口配置', icon: 'tree' },
        },
        {
          path: 'theme',
          name: '主题配置',
          component: theme,
          meta: { title: '主题配置', icon: 'tree' }
        },
        {
          path:'edit',
          name:'编辑器',
          component:edit,
          meta:{title:'编辑器',icon:'tree'}
        },
        {
          path:'markdown',
          name:'MarkDown',
          component:markdown,
          meta:{title:'MarkDown',icon:'tree'}
        }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]

export default new Router({
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/user',
    component: layout,
    //redirect: '/form/form',
    name:'用户管理',
    meta: { title: '用户管理', icon: 'form', roles: ['admin']},
    children:[
      {
        path: 'user',
        name: '账号配置',
        component: user,
        meta: { title: '账号配置', icon: 'tree' }
      },
      {
        path: 'role',
        name: '权限配置',
        component: role,
        meta: { title: '权限配置', icon: 'form' },
        // children:[{
        //   path: 'permission',
        //   name: '角色权限',
        //   component:permission,
        //   meta: { title: '角色权限', icon: 'form' },
        // }]
      },

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
