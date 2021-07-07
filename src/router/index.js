import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Guest from '../views/Guest.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Guest',
    component: Guest,
    children:[
      {
        path:'login', 
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../components/Auth/Login')
      },
      {
        path:'register', 
        name: 'Register',
        component: () => import(/* webpackChunkName: "about" */ '../components/Auth/Register')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
