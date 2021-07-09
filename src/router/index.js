import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index";
import Dashboard from '../views/Dashboard.vue'
import User from '../views/User.vue'
import Guest from '../views/Guest.vue';
import middlewarePipeline from './middlewarePipeline';
import auth from '../middleware/auth';
import guest from '../middleware/guest';

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { middleware: [auth] },
    children:[
      {
        path:'/', 
        name: 'Map',
        component: () => import( '../components/GoogleMap'),
        meta: { middleware: [auth] },
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { middleware: [auth] },
    children:[
      {
        path:'profile', 
        name: 'Profile',
        component: () => import( '../components/User/Profile'),
        meta: { middleware: [auth] },
      }
    ]
  },
  {
    path: '/auth',
    name: 'Guest',
    component: Guest,
    meta: { middleware: [guest] },
    children:[
      {
        path:'login', 
        name: 'Login',
        component: () => import( '../components/Auth/Login'),
        meta: { middleware: [guest] },
      },
      {
        path:'register', 
        name: 'Register',
        component: () => import('../components/Auth/Register'),
        meta: { middleware: [guest] },
      }
    ]
  },
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () =>
      import( "../components/Sections/NotFound"),
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router
