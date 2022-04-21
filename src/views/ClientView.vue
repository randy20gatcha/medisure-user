<template>
 <h1>Employee List</h1>  
   <!-- <input type="text" placeholder="Enter employee id" > -->
   <!-- <button @click="getUser">Click</button> -->
   <div>
     <div>
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Details</th>
                </tr>
            </thead>
            <tbody v-for="user in users" :key="user.firstName">
              <tr>
                <td>{{ user.firstName }}</td>
                <td>{{ user.designation }}</td>
                <td><router-link :to="{ path: `/details/${ user.id }` }">Details</router-link></td>
              </tr>
            </tbody>
        </table>  
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

<style scoped>
a {
  background-color: rgb(69, 69, 128);
  color: white;
  font-size: small;
  padding: 8px 10px;
  text-decoration: none; 
  border-radius: 5px; 
}
a:hover {
  background-color: rgb(67, 67, 94);
}
</style>