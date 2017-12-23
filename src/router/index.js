import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import FlowDefine from '../components/models/FlowDefine'
import Login from '../components/login'
import Main from '../components/main'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Main,
      children: [
        {
          path: 'flowDefine/:permissionId',
          name: 'flowDefine',
          component: FlowDefine,
          props: true
        },
        {
          path: '',
          name: 'HelloWorld',
          component: HelloWorld
        }
      ]
    }
  ]
})
