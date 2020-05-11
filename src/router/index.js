import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CopClass from '@/components/EnterPage'
import insert from '@/components/insert'
import showbug from '@/components/showbug'
import indexshow from '@/components/indexshow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'CopName',
      component: CopClass
    }
    ,
    {
      path: '/insert',
      name: 'insert',
      component: insert
    },{
      path: '/showbug',
      name: 'showbug',
      component: showbug
    },{
      path: '/indexshow',
      name: 'indexshow',
      component: indexshow
    }
  ]
})
