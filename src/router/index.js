import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Guest from '../views/Guest.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Guest',
    component: Guest,
    children:[
      {
        path:'login', 
        name: 'Login',
        component: () => import( '../components/Auth/Login')
      },
      {
        path:'register', 
        name: 'Register',
        component: () => import('../components/Auth/Register')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
