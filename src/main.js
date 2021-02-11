import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//main.js
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import set header token
import { setHeaderToken } from '../utils/auth'

// axios
import axios from 'axios'
// default base url backend
axios.defaults.baseURL = 'http://localhost:8083/api/'

Vue.config.productionTip = false

// Proses Autorisasi token

// Ambil token di localstorage browser dan simpan ke variable token
const token = localStorage.getItem('token')

// Cek jika token ada
if(token){
  // set header token dengan token yang ada untuk autorisasi
  setHeaderToken(token)
}

// Ambil data user dengan melampirkan token yang valid dengan mengakses method get_user di store>auth.js
store.dispatch('get_user', token)
// jika berhasil
.then(()=> {
  // render vue component
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
// Jika Error
.catch((error) => {
  // tampilkan errornya di console
  console.log(error);
})
