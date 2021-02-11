import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import module store untuk data state
import store from '../store/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    // Ijinkan akses halaman ini
    meta: {
      // Jika status user adalah guest = true
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    // Ijinkan akses halaman ini
    meta: {
      // Jika status user adalah guest = true
      guest: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    // Ijinkan akses halaman ini
    meta: {
      // Jika status auth = true
      auth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // Ijinkan akses halaman ini
    meta: {
      // Jika status auth = true
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Proses Proteksi halaman
router.beforeEach((to, from, next)=> {

  if(to.matched.some(record => record.meta.auth)){
    if(store.getters.isLoggedIn && store.getters.user){
      next()
      return
    }
    next('/login')
  }

  if(to.matched.some(record => record.meta.guest)){
    if(!store.getters.isLoggedIn){
      next()
      return
    }
    next('/')
  }
  
  next()
})

export default router
