import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import NotFound from './views/NotFound.vue'

import GlobalSettings from './views/GlobalSettings.vue'
import TableList from './views/TableList.vue'
import TableAdd from './views/TableAdd.vue'
import TableDelete from './views/TableDelete.vue'
import CategoryList from './views/CategoryList.vue'

import Security from './views/Security.vue'

Vue.use(Router)
// 整个项目的路由词典：访问路径 <=> 视图组件
export default new Router({
  routes: [
    { path: '/', redirect: 'login' },
    { path: '/login', component: Login },
    {
      path: '/main',
      component: Main,
      children: [
          { path: '/', redirect: '/category/list' },
        { path: '/settings', component: GlobalSettings },
        { path: '/table/list', component: TableList },
        { path: '/table/add', component: TableAdd },
        { path: '/table/delete', component: TableDelete },
        { path: '/category/list', component: CategoryList },

        { path: '/security', component: Security },
      ]
    },
    { path: '*', component: NotFound },
  ]
})
