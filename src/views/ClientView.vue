<template>
 <h1>Employee List</h1>  
   <!-- <input type="text" placeholder="Enter employee id" > -->
   <!-- <button @click="getUser">Click</button> -->
   <div>
     <div v-for="user in users" :key="user.firstName">
       <p>{{ user.firstName }}</p> 
         
     </div>
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
        const users = [];
        fetchData.forEach((user) => {
          users.push(user.data());
        })
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