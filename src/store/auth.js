import axios from "axios"
import { removeHeaderToken, setHeaderToken } from "../../utils/auth"

export default{
    state:{
        // default user sebelum login data belum ada/null
        user : null,
        // default login adalah false
        isLoggedIn: false
    },

    // digunakan untuk memanipulasi state
    mutations:{
        // masukkan data ke state diatas ketika berhasil login
        set_user (state, data){
            // isi state user dengan data yang sedang login
            state.user = data
            // isi state isLoggedIn dengan true untuk memberikan status login menjadi true
            state.isLoggedIn = true
        },

        // reset data ketika logout
        reset_user (state){
            // reset state
            state.user = null
            state.isLoggedIn = false
        }
    },

    // getters digunakan untuk mengakses property state
    // yang akan digunakan untuk mengirim data user login ke komponen dan view yang membutuhkan 
    getters:{

        isLoggedIn (state){
            return state.isLoggedIn
        },

        user (state){
            return state.user
        }
    },

    actions: {
        // Proses login
        login({ dispatch, commit }, data){
            // mengirim data ke backend dan mengambil data balik berupa data user
            return new Promise((resolve, reject) => {
                // proses login dan kirim datanya untuk login
                axios.post('login', data)
                // jika berhasil
                .then(response => {
                    // ambil data tokennya
                    const token = response.data.token
                    // masukkan token ke local storage browser
                    localStorage.setItem('token', token)
                    // set headernya dengan token yang didapat
                    setHeaderToken(token)
                    // rubah state get user dengan dispatch
                    dispatch('get_user')
                    // kembalikan data user
                    resolve(response)
                })

                // jika gagal
                .catch(err => {
                    // jalankan property reset_user yang ada di mutation di atas
                    commit('reset_user')
                    // hapus token yang ada di local storage user
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },

        // get user mendapatkan data dari login
        async get_user({commit}){
            // jika token di local storage kosong
            if(!localStorage.getItem('token')){
                // kembalikan 
                return
            }

            // jika token ada
            try{
                // ambil data user dari backend
                let response = await axios.get('user')
                    // ambil data login dan rubah property sert user di mutation diatas
                    commit('set_user', response.data.data)
            
            }
            // jika token tidak ada
            catch (error){
                // jalankan property reset_user di mutation
                commit('reset_user')
                // jalankan remove header token untuk menghapus token di file utils>auth.js
                removeHeaderToken()
                // hapus token di localstorage
                localStorage.removeItem('token')
                // tampilkan error ke console
                return console.error();
            }
        },
        
        // Proses Logout
        logout({commit}){
            // Mengirim data ke Backend
            return new Promise((resolve) => {
                // proses logout ke backend, agar menghapus token dan tidak bisa digunakan kembali
                axios.post('logout')
                // jalankan property reset_user dimutation
                commit('reset_user')
                // hapus token do localStorage
                localStorage.removeItem('token')
                // remove token dari header
                removeHeaderToken()
                resolve()
            })
        },

        // Proses Register
        register({commit}, data){
            // Mengirim data ke backend dan mendapat respon balik
            return new Promise((resolve, reject) => {
                // proses register ke backend dan mengirim data yang ingin di register
                axios.post('register', data)
                // Jika berhasil
                .then(response => {
                    resolve(response)
                })
                // Jika gagal
                .catch(err => {
                    // jalankan property reset_user dimutation
                    commit('reset_user')
                    reject(err)
                })
            })
        }
    }
}