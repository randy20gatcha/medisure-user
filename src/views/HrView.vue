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
            <tbody v-for=" user in users " :key="user">
              <tr>
                <td>{{ user.firstName }}</td>
                <td>{{ user.designation }}</td>
                <td>
                  <router-link :to="{ path: `/forCompany/${ user.id }` }">Details</router-link>
                  <!-- <button  id="delete" @click="deleteStaff">Delete</button> -->
                </td>
              </tr>
            </tbody>
        </table>  
     </div>
   </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { getDocs, doc, deleteDoc } from 'firebase/firestore';
import { employees } from '@/firebase';

export default {  
  name: "hrView",
  data() {
      return {
        users: []
      }
    },
   methods: {
      async getData() {
        try {
          const fetchData = await getDocs(employees);
          let users = [];
          fetchData.forEach((user) => {
            let userId = user.data();
            userId.id = user.id;
            users.push(userId);
            
          })
          console.log(users);
          this.users = users;
        } catch (err) {
          console.error(err);
        }
      },
      // deleteStaff() {
      //   let users = [];
      //   let userDelete = employees.doc(userId).delete();  
      // }   
    },
  created() {
       this.getData();
       //this.deleteStaff();
      //this.oldGetData();
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
#delete {
  background-color: rgb(221, 66, 66);
  color: white;
  padding: 5px 8px;
  font-size: small;
  border: none;
  height: 30px;
  width: 70px;
}
#delete:hover {
  background-color: rgb(194, 78, 78);
}
a:hover {
  background-color: rgb(67, 67, 94);
}
</style>