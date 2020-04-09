import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {layout: 'main'},
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            meta: {layout: 'empty'},
            component: Login
        },
        {
            path: '/categories',
            name: 'categories',
            meta: {layout: 'main'},
            component: Categories
        },
        {
            path: '/detail-record',
            name: 'detailRecord',
            meta: {layout: 'main'},
            component: DetailRecord
        },
        {
            path: '/history',
            name: 'history',
            meta: {layout: 'main'},
            component: History
        },
        {
            path: '/planning',
            name: 'planning',
            meta: {layout: 'main'},
            component: Planning
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {layout: 'main'},
            component: Profile
        },
        {
            path: '/record',
            name: 'record',
            meta: {layout: 'main'},
            component: Record
        },
        {
            path: '/register',
            name: 'register',
            meta: {layout: 'empty'},
            component: Register
            // component: () => import('../views/Register')
        }
    ]
})
