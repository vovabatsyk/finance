import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Categories from '../views/Categories'
import DetailRecord from '../views/DetailRecord'
import History from '../views/History'
import Planning from '../views/Planning'
import Profile from '../views/Profile'
import Record from '../views/Record'
import Register from '../views/Register'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main', auth: true },
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: Login,
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main', auth: true },
      component: Categories,
    },
    {
      path: '/detail-record',
      name: 'detailRecord',
      meta: { layout: 'main', auth: true },
      component: DetailRecord,
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main', auth: true },
      component: History,
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main', auth: true },
      component: Planning,
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main', auth: true },
      component: Profile,
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main', auth: true },
      component: Record,
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'empty' },
      component: Register,
      // component: () => import('../views/Register')
    },
  ],
})
// захист route
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some((record) => record.meta.auth)
  if (requiredAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
