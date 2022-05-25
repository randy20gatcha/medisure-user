<template>
  <div class="home">
      <LoginAdmin />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginAdmin from '@/components/LoginAdmin.vue';


export default ({  
  name: 'HomeView',
  components: {
    LoginAdmin,
  } 
})
</script>
