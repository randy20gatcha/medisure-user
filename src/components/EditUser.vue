<template>
<nav id="editUser">
  <router-link :to="{ path: `/hrView` }" class="edit">Back to List</router-link>
</nav>
<div class="container">
  <div class="row h-100 justify-conten-center align-items-center">
      <form class="signup-form" @submit.prevent="update">
      <div class="form-header">
          <h2>update details</h2>
      </div>
          <div class="form-group">
              <label for="text">First Name:</label>
              <input type="text" v-model="store.firstName" style="width: 200px;">
          </div>
           <div class="form-group">
              <label for="text">Last Name:</label>
              <input type="text"  v-model="store.lastName" style="width: 200px;">
          </div>
           <div class="form-group">
              <label for="text">Designation:</label>
              <input type="text"  v-model="store.designation" style="width: 200px;">
          </div>
           <div class="form-footer">        
              <button type="submit" class="button">Update</button>      
           </div>
      </form>
  </div>
</div>
</template>

<script>
import { useStore } from '@/stores/userStore';

export default {
    setup() {
        const store = useStore();
        const fill = store.fill();

        const update = () => {
            console.log('update me!');
        }

        return {
            store,
            fill,
            update
        }
    }
}
</script>

<style>
.container {
    margin-top: -80px;
}
input {
    margin-left: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
}
.button {
    border: none;
    font-size: medium;
    color: rgb(46, 44, 44);
    background-color: rgb(184, 177, 177);
}
.button:hover {
    background-color: rgb(128, 122, 122);
}
.signup-form {
  font-family: "Roboto", sans-serif;
  width:500px;
  margin:20px auto;
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
</style>