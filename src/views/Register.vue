<template>
  <nav>
    <a href="/" >Back to Login</a>
  </nav> 
  <h1>Register here!</h1>
  <form>  
    <p><input type="email" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click.prevent="signup">Submit</button></p>
 </form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { ref } from 'vue';
import router from '@/router';

export default { 
  
setup() {
 const auth = getAuth();
 const email = ref("");
 const password = ref("");

 const signup = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {  
        router.push('/portal');
      })
      .catch(error => {
        console.log(error.code); 
        alert('Please fill up the details');  
      });
    }
      return { email , password, signup }
  }
}   
</script>

<style scoped>
h1 {
  margin: 20px;
}
</style>