<template>
  <nav id="hrview">
    <a href="hrView" class="toList">List</a>
    <button @click="logout" id="logout">Logout</button>
  </nav>
   <h2>Portal</h2>
  <div class="container-fluid">
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
                <input type="file" accept="image/*" @change="imageContainer" required="required"/> 
              </div>
              <div class="form-group right" >
                <img :src="photoUrl" alt="Upload photo" height="100">
              </div>

            </div>           
        </div>            
      </div>
      <div class="form-footer">        
          <button type="submit" class="button">Create</button>      
      </div>
    </form>    
  </div>
 
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import router from '@/router';
import { ref, toRef, toRefs } from 'vue';
import { doc, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageReference, uploadBytes, getDownloadURL } from 'firebase/storage';
import { employees } from '@/firebase';

export default ({
  setup() {
    const auth = getAuth();
    const firstName = ref();
    const lastName = ref();
    const employeeNumber = ref();
    const designation = ref();
    let photoUrl = ref();
    let preview = ref();
    let files = ref();
    let fileName = ref();
    let image = ref();   

    const logout = () => {
      signOut(auth).then(() => {
        console.log('signed out');
        router.push('/');
      })
      .catch(error => {
        console.log(error.message);
      })
    }
    // working... pushing data and image to firestore 
    const onSubmit = async () => {
      
      const storage = getStorage();
      const storageRef = storageReference(storage, 'public/' + image.name);
      //console.log(storageRef);
      uploadBytes(storageRef, image).then((snapshot) => {
          console.log('Uploaded a file!');
          getDownloadURL(storageRef).then((url) => {
            photoUrl = url;
            console.log('downLoad Url', photoUrl);  
          })
          .catch((error) => {
          alert(error.message);
          })
      })

      const test = {
        firstName: firstName.value,
        lastName: lastName.value,
        employeeNumber: employeeNumber.value,
        designation: designation.value,
        photoUrl: photoUrl  
      };  
      console.log(test);
      await addDoc(employees, test);
      alert('user was created!');
      router.push('hrView');
      console.log('recorded!');  
    }

    
    // method for getting image file
    function imageContainer(event) {
       preview = document.querySelector('img');
       const files = event.target.files;
       photoUrl = new FileReader();
       photoUrl.addEventListener('load', () => {
         preview.src = photoUrl.result;
         photoUrl = photoUrl.result;
       })
       photoUrl.readAsDataURL(files[0]);
       image = files[0];
       console.log('image:',image);
    }
    
    return { logout,  
            firstName, 
            lastName, 
            employeeNumber, 
            designation, 
            photoUrl,
            image,
            onSubmit,
            imageContainer
           };
  }

})
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
h2 {
  margin: 10px 10px;
}
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

.button {
   display:inline-block;
   padding:10px 10px;
   background-color: #1BBA93;
   font-size:17px;
   border:none;
   border-radius:5px;
   color:#bcf5e7;
   cursor:pointer;
}

.button:hover {
  background-color: #169c7b;
  color:white;
}

/* a:hover {
  background-color: rgb(161, 161, 201);
  color: white;
} */

/* nav {
  padding: 20px;
  background-color: rgb(112, 110, 110);
} */
/* nav a {
  background-color: rgb(69, 69, 128);
  color: white;
  font-size: small;
  padding: 8px 10px;
  text-decoration: none; 
  border-radius: 5px;   
} */
/* nav a:hover {
  color: rgb(206, 194, 194);
} */
#hrview {
  padding: 35px;
}
a.toList {
  display: inline-block;
  padding: 10px 20px;
  margin-top: -20px;
  top: -50px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: medium;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  background-color:rgb(69, 69, 128);
  left: -20px;
  /* transition: all 0.2s; */
}
a.toList:hover {
  background-color:#4095c6;
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
/* @media all and (max-width: 30em) {
  a.toList {
    display: block;
    margin: 0.1em auto;
  }
} */

</style>