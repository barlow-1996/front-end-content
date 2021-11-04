import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home.vue'
import head from '../components/main/head.vue'
import body from '../components/main/body.vue'
import login from '../components/subcom/login.vue'
import register from '../components/subcom/register.vue'
import error404 from '../components/404.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/head',
          name: 'head',
          component: head
        },
        {
          path: '/body',
          name: 'body',
          component: body,
          children: [
            {
              path: '/login',
              name: 'login',
              component: login
            },
            {
              path: '/register',
              name: 'register',
              component: register
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
