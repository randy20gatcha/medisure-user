<template>
  <div class="home">
    <nav>
     <!-- <router-link to="register">Register</router-link> -->
     <a v-bind:href="name">Register</a>
    </nav>
    <LoginAdmin />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginAdmin from '@/components/LoginAdmin.vue'


export default {
  name: 'HomeView',
  data() {
    return {
      name: 'register'
    }
  },
  components: {
    LoginAdmin
  }
}
</script>
