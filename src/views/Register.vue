//Register.vue
<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          Register
        </div>
        <div class="card-body">
          <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
            {{ error[0] }}
          </div>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="Name..">
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input v-model="form.username" type="username" class="form-control" placeholder="Username..">
            </div>
            <div class="form-group">
              <label for="username">Email address</label>
              <input v-model="form.email" type="email" class="form-control" placeholder="Email Address..">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Password..">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        name: '',
        username: '',
        emai: '',
        password: '',
      },
      errors: null,
    }
  },

  methods: {
    register: function(){
      // proses register dilakukkan dengan vuex store pada file  store>auth.js
      // dan lampirkan data yang akan di register pada form
      this.$store.dispatch('register', this.form)
      // jika berhasil
      .then(response => {
        response
        // arahkan ke halaman login
        this.$router.push('login')
      })
      // jika gagal
      .catch(error => {
        this.errors = error.response.data.errors
      })
    }
  }
}
</script>