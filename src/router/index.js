import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import User from '../views/User.vue'
import Guest from '../views/Guest.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children:[
      {
        path:'/', 
        name: 'Map',
        component: () => import( '../components/GoogleMap')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children:[
      {
        path:'profile', 
        name: 'Profile',
        component: () => import( '../components/User/Profile')
      }
    ]
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
