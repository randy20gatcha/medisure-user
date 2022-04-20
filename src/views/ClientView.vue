<template>
 <h1>Employee List</h1>  
   <!-- <input type="text" placeholder="Enter employee id" > -->
   <!-- <button @click="getUser">Click</button> -->
   <div v-if="users">
     <div v-for="user in users" :key="user.firstName">
       <p>{{ user.firstName }}</p> 
       <p>{{ user.designation }}</p>        
     </div>
   </div>
   <div v-else>
     <h3>Loading data...</h3>
   </div>

</template>

<script>
import { ref } from '@vue/reactivity';
import { getDocs } from 'firebase/firestore';
import { employees, getUsers, useLoadUsers } from '@/firebase';

export default {  
    name: "clientView",
    components: {},
    data() {
      return {
        users: []
      }
    },
    methods: {
      async getData() {
        const fetchData = await getDocs(employees);
        let users = [];
        fetchData.forEach((user) => {
          let userId = user.data();
          userId.id = user.id;
          users.push(userId);
          
        })
        console.log(users);
        this.users = users;
      }
    },
    created() {
      this.getData();
    }
   
}
</script>

<style>

</style>