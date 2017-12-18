import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FlowDefine from '../components/models/FlowDefine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/flowDefine',
      name: 'flowDefine',
      component: FlowDefine
    }
  ]
})
