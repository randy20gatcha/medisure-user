<template>
  <div class="container">
    <h1>Portal</h1>
    <router-link to="clientView">List</router-link>
    <form class="signup-form" @submit.prevent="onSubmit">
      <div class="form-header">
        <h1>Employee Enrolment</h1>
      </div>
       <div class="form-body">
         <div class="horizontal-group">
            <div class="form-group left">
                <label for="firstname" class="label-title">First name </label>
                <input type="text" id="firstname" class="form-input" placeholder="enter first name" required="required" v-model="firstName"/>
            </div>
            <div class="form-group right">
                <label for="lastname" class="label-title">Last name</label>
                <input type="text" id="lastname" class="form-input" placeholder="enter last name" v-model="lastName" required="required"/>
            </div>
            <div class="form-group left">
              <label for="employee number" class="label-title">Employee Number</label>
              <input type="text" id="employee number" class="form-input" placeholder="enter employee number" required="required" v-model="employeeNumber"/>
            </div>
            <div class="form-group right">
              <label for="designation" class="label-title">Designation</label>
              <input type="text" id="designation" class="form-input" placeholder="enter designation" required="required" v-model="designation"/>
            </div>
            <div class="horizontal-group">
              <div class="form-group left" >
                <label for="choose-file" class="label-title">Upload Profile Picture</label>
                <input type="file" id="choose-file" size="80" v-on:change="chooseFile"/>
              </div>
            </div>

        </div>            
      </div>
      <div class="form-footer">        
          <button type="submit" class="btn" >Create</button>      
      </div>
    </form>    
  </div>
  <button @click="logout">Logout</button>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import router from '@/router';
import { ref } from 'vue';
import { addDoc } from '@firebase/firestore';
import { employees } from '@/firebase';



export default {
  setup() {
    const auth = getAuth();
    const firstName = ref();
    const lastName = ref();
    const employeeNumber = ref();
    const designation = ref();
       
    const logout = () => {
      signOut(auth).then(() => {
        console.log('signed out');
        router.push('/');
      })
      .catch(error => {
        console.log(error.message);
      })
    }
    // working... pushing data to firestore
    const onSubmit = async () => {
      await addDoc(employees, {
        firstName: firstName.value,
        lastName: lastName.value,
        employeeNumber: employeeNumber.value,
        designation: designation.value
      });
      alert('user was created!');
      router.push('clientView');
      console.log('recorded!');

      // .then(() => {
      //   console.log('recorded?');
      //   alert('user was created!');
        
      // })
      // .catch((error) => {
      //   alert('Error:', error);
      // })
    }
        
    return { logout, 
    firstName, 
    lastName, 
    employeeNumber, 
    designation, 
    onSubmit };
  }

}
</script>

<style scoped>
.signup-form {
  font-family: "Roboto", sans-serif;
  width:650px;
  margin:30px auto;
  background:linear-gradient(to right, #ffffff 0%, #fafafa 50%, #ffffff 99%);
  border-radius: 10px;
}

.form-header  {
  background-color: #EFF0F1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.form-header h1 {
  font-size: 30px;
  text-align:center;
  color:#666;
  padding:20px 0;
  border-bottom:1px solid #cccccc;
}

.form-body {
  padding:10px 40px;
  color:rgb(129, 127, 127);
}

.form-group{
  margin-bottom:20px;
}

.form-body .label-title {
  color:#384441;
  font-size: 17px;
  font-weight: bold;
  display: block;
  float: left;
}

.form-body .form-input {
    font-size: 17px;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    padding-left: 10px;
    padding-right: 10px;
    color: #333333;
    text-align: left;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    background: white;
    outline: none;
    display: block;
}

.horizontal-group .left{
  float:left;
  width:49%;
}

.horizontal-group .right{
  float:right;
  width:49%;
}

input[type="file"] {
 outline: none;
 cursor:pointer;
 font-size: 17px;
}

::-webkit-input-placeholder {
 color:#d9d9d9;
}

.form-footer {
 clear:both;
}

.signup-form .form-footer  {
  background-color: #EFF0F1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding:10px 40px;
  text-align: right;
  border-top: 1px solid #cccccc;
}

.form-footer span {
  float:left;
  margin-top: 10px;
  color:#999;  
  font-style: italic;
  font-weight: thin;
}

.btn {
   display:inline-block;
   padding:10px 10px;
   background-color: #1BBA93;
   font-size:17px;
   border:none;
   border-radius:5px;
   color:#bcf5e7;
   cursor:pointer;
}

.btn:hover {
  background-color: #169c7b;
  color:white;
}
a {
  background-color: #999;
  color: white;
  padding: 10px 25px;
  border-radius: 5px;
  text-decoration: none;
}
a:hover {
  background-color: rgb(161, 161, 201);
  color: white;
}
</style>