<template>
<nav id="editUser">
  <router-link :to="{ path: `/hrView` }" class="edit">Back to List</router-link>
</nav>
<div class="container">
  <div class="row h-100 justify-conten-center align-items-center">
      <form class="signup-form" @submit.prevent="changeDetails">
      <div class="form-header">
          <h2>update details</h2>
      </div>
           <div class="horizontal-group">
              <div class="form-group right" >
                <img :src="store.photoUrl" alt="Upload photo" height="100">
              </div>
            </div>    
          <div class="form-group ">
              <label for="text">First Name:</label>
              <input type="text" v-model="store.firstName" style="width: 200px;">
          </div>
           <div class="form-group ">
              <label for="text">Last Name:</label>
              <input type="text"  v-model="store.lastName" style="width: 200px;">
          </div>
           <div class="form-group ">
              <label for="text">Designation:</label>
              <input type="text"  v-model="store.designation" style="width: 200px;">
          </div>
           <div class="form-footer">        
              <button type="submit" class="update">Update</button>      
           </div>
      </form>
  </div>
</div>
</template>

<script>
import { useStore } from '@/stores/userStore';
import { doc, updateDoc } from "firebase/firestore";
import router from '@/router';
import { employees } from '../firebase';

export default {
    setup() {
        const store = useStore();        
        const fill = store.fill();

        const changeDetails = async () => { 
              let path = window.location.href;
              let userId = path.split("/").pop();
              let docRef = doc(employees, userId);
              await updateDoc(docRef, {
                firstName: store.firstName,
                lastName: store.lastName,
                designation: store.designation
                });
              alert('user was updated!');
              router.push('/hrView');    
              console.log('update me!', docRef);
        }

        return {
            store,
            fill,
            changeDetails
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: -80px;
}
input {
    margin-left: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
}
.update {
    border: none;
    border-radius: 5px;
    font-size: medium;
    padding: 7px 10px;
    color: rgb(46, 44, 44);
    background-color: rgb(184, 177, 177);
}
.update:hover {
    background-color: rgb(128, 122, 122);
}
.signup-form {
  font-family: "Roboto", sans-serif;
  width:500px;
  height: 360px;
  margin:20px auto;
  margin-top: 150px;
  background:linear-gradient(to right, #e6e3e3 0%, #ebe8e8 50%, #f0ecec 99%);
  border-radius: 10px;
}
.form-header  {
  background-color: #EFF0F1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0 -12px;
}
.form-header h2 {
  font-size: 20px;
  text-align:center;
  color:#666;
  padding:20px 0;
  border-bottom:1px solid #cccccc;
}
img {
    margin-bottom: 10px;
}
</style>