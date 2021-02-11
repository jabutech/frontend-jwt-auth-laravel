//Login.vue
<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <!-- Error -->
          <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
            {{ error[0] }}
          </div>
          <!-- Method login -->
          <form @submit.prevent="userLogin">
            <div class="form-group">
              <label for="username">Username</label>
              <input v-model="form.username" type="username" class="form-control" placeholder="Username..">
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
    return {
      form: {
        username: 'letenk',
        password: '12345678',
      },
      errors: null
    }
  },

  methods: {
    userLogin(){
      // memanggil method login dan mengirim data ke store>auth.js
      this.$store.dispatch('login', this.form)
      // jika berhasil
      .then(response => {
        // tampilkan responsenya
        response
        // ketika berhasil login reload halaman dan arahkan ke home
        location.reload()
      })
      // jika gagal
      .catch(error => {
        console.log(error);
        // kirim errornya ke property error
        this.errors = error.response.data.errors
      })
    }
  }
}
</script>