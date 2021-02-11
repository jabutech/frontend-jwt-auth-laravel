//Navbar.vue
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Navbar</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <template v-if="isLoggedIn">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
      </template>
      <ul class="navbar-nav">
        <!-- Cek Apakah isLoggedIn status true -->
        <template v-if="isLoggedIn">
          <!-- Jika true tampilkan data user yang login -->
          <li class="nav-item">
            <!-- Tampilkan data user ambil dari method computed dibawah -->
            <router-link class="nav-link" to="#">{{user.name}}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </template>
        <!-- isLoggedIn status false tampilkan link login atau register -->
        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
 // import mapGetters
  import {  mapGetters } from "vuex"

  export default {

    computed: {
      // akses data pada state dengan mapGetters
      ...mapGetters({
        // ambil status loggin dari state
        isLoggedIn: 'isLoggedIn',
        // ambil data user yang login dari state
        user : 'user'
      })
    },

    methods: {
      logout: function(){
        // jalankan method logout dari store>auth.js pada method action
        this.$store.dispatch('logout').then(() => {
          // jika berhasil reload halaman setelah 1 detik, agar proses logout di backend berjalan dan menghapus token
          setTimeout(function(){
            location.reload()
          }, 1000)
        })
      }
    }
  }
</script>