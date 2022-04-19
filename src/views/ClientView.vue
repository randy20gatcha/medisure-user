<template>
 <h1>Employee List</h1>  
   <!-- <input type="text" placeholder="Enter employee id" > -->
   <!-- <button @click="getUser">Click</button> -->
   <div>
     <div v-for="user in getUser()" :key="user.id" class="user">
       <p>{{ user.firstName }}</p> 
     </div>
   </div>

</template>

<script>
import { ref } from '@vue/reactivity';
import { getDocs } from 'firebase/firestore';
import { employees } from '@/firebase';

export default {
    setup() {
      const users = [];
          
       const getUser = () => {
         getDocs(employees).then((snapshot) => {          
           snapshot.docs.forEach((doc) => {
             users.push({ ...doc.data(), id: doc.id });
           })
           console.log(users);
         })        
       }
       return { users, getUser }
    }
   
}
</script>

<style>

</style>