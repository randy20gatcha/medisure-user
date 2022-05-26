<template>
 <!-- <nav>
    <a href="/register" >Register here</a> 
 </nav> -->
  <h1 id="medi">Medi<span id="sure">Sure</span><sup>Plus</sup></h1>
  <div class="main-box">
      <div class="inside-box">
        <form>
            <div class="div">
             <label for="username">User Name:</label>
             <input type="text" v-model="email"  placeholder="use your email" required/>
            </div>
            <div class="div">
             <label for="password">Password:</label>
             <input type="password" v-model="password"  placeholder="password" required/>
            </div>  
            <button @click.prevent="signIn">Login</button>
        </form>        
    </div>
  </div>
      
</template>
 
<script >
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue';
import router from '@/router';

export default ({
 setup() {
     const auth = getAuth();
     const email = ref("");
     const password = ref("");

     const signIn = () => {
         signInWithEmailAndPassword(auth, email.value, password.value)
         .then((cred) => {  
          console.log('active',cred.user);
          router.push('/hrView');
      })
      .catch(error => {
        alert('Please fill in username and password.',error.message);   
      });
     }
     return { email, password, signIn }
  }
})
</script>

<style scoped>

.main-box {
    background-color: aliceblue;
    width: 400px;
    height: 300px;
    display: inline-block;
    border-radius: 8px;
    position: relative;
}
.inside-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
label {
    font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 500;
}
input {
    border-radius: 4px;
    padding: 10px;
    font-size: large;
}
button {
    border-radius: 4px;
    margin: 10px;
    width: 80px;
    height: 40px;
    font-family: 'Roboto',Arial, Helvetica, sans-serif;
    font-size: larger;
    font-weight: 500;
}
#medi {
    color: #bdbdbd;
    margin: 50px;
}
#sure {
    color: #deded8;
}
</style>