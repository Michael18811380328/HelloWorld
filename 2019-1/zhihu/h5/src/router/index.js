import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import Detail from '@/pages/Detail'
import Discussion from '@/pages/Discussion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/discussion',
      name: 'Discussion',
      component: Discussion
    }
  ]
})
