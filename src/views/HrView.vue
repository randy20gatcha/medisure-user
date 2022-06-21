<template>
<header>
  <nav>
   <div class="divCreate">
     <a href="../portal" class="navLinks">Create</a>
   </div>
   <div class="divLogout">
     <a href="#" class="navLinks" @click="logout">Logout</a>
   </div>
   <div class="divBrand">
     <h4>Medi<span>Sure</span><sup>Plus</sup></h4>
   </div>
   <div class="divLogo">
   </div>
  </nav>
</header>
<div>
  <h2 style="position:relative;">Employee List</h2>
</div>
   <div style="position:relative;">
     <div>
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Details</th>
                </tr>
            </thead>
            <tbody v-for=" user in store.users " :key="user['.key']">
              <tr>
                <td>{{ user.firstName }}</td>
                <td>{{ user.designation }}</td>
                <td>
                  <router-link :to="{ path: `/forCompany/${ user.id }` }" id="details" target="_blank"
                  rel="noopener noreferrer">Details</router-link>
                  <button  id="delete" @click="deleteUser(user.id, user.firstName)" >Delete</button>
                  <router-link :to="{ path: `/editUser/${ user.id }` }" id="edit">Edit</router-link>
                </td>
              </tr>
            </tbody>
        </table>  
     </div>
   </div>  
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import router from '@/router';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { employees } from '@/firebase';
import { useRoute } from 'vue-router';
import { useStore } from '@/stores/userStore';

export default ({  
  name: "hrView",
  setup() {
    const auth = getAuth();
    const store = useStore();
    const staff = store.getData();

    const deleteUser = async (userId, firstName) => {   
            //console.log('this employee:',firstName); 
            let goAhead = confirm("Are you sure you want to delete " + firstName + " ?"); 
            if(goAhead) {  
                let userRef = doc(employees, userId);
                console.log('hide me:', userRef);
                await deleteDoc(userRef);
                window.location.reload();
            }
            else {
                console.log('I am safe');
            }
        }     
    
    const logout = () => {
      signOut(auth).then(() => {
        console.log('signed out');
        router.push('/');
      })
      .catch(error => {
        console.log(error.message);
      })
    }

    return {
      store, 
      deleteUser,
      logout
    }
  },
    
})
</script>

<style scoped>
h4 {
  margin-top: 10px;
  color: #384441; 
}
h2 {
  margin-top: 10px;
}
#details {
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
  margin: 5px;
  padding: 5px 8px;
  font-size: small;
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 70px;
}
#delete:hover {
  background-color: rgb(194, 78, 78);
}
#edit {
  background-color: #9da1a3;
  color: white;
  font-size: small;
  padding: 8px 15px;
  text-decoration: none; 
  border-radius: 5px;
}
#edit:hover {
  background-color: rgb(139, 130, 130);
}
nav {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: larger;
  display: grid;
  grid-template-columns: 50px 650px;
  grid-auto-rows: auto;
  grid-gap: 1em;
  align-items: center;
  text-align: center;
}
 
.divCreate {
  grid-column: 1;
  padding: 10px;
}
.divLogout {
  grid-column: 2;
  padding: 10px;
  width: 10px;
}
.divBrand {
  grid-column: 3;
  display: inline;
}
.divLogo {
  grid-column: 5;
  background-image: url("../assets/MSO_Logo.gif");
  background-size: 80px 80px;
  background-position:  150px;
  float: right;
  background-repeat: no-repeat;
  height: 10vh;
}

a.toPortal {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin:0 0.3em 0.3em 0;
  border-radius: 5px;
  box-sizing: border-box;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  font-size: medium;
  color:#FFFFFF;
  background-color:rgb(69, 69, 128);
  left: -20px;
  transition: all 0.2s;
  margin-top: -15px;
}
a.toPortal:hover {
  background-color:#4095c6;
}
@media all and (max-width: 30em) {
  a.toPortal {
    display: block;
    margin: 0.2em auto;
  }
}
#logout { 
  border-radius: 5px;
  box-sizing: border-box;
  border: none;
  box-sizing: border-box;
  font-size: medium;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  background-color:rgb(69, 69, 128);
  float: right;
  margin-top: -20px;
}

</style>