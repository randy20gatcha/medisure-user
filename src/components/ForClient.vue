<template>
 <div class="container">
  <div class="row">
    <div class="column">
      <div class="card">
        <div>
        <img :src="image" alt="picture" id="myImg">
        </div>
        <div class="container">
          <h2 ><p>{{ firstName }} {{ lastName }}</p></h2>
          <p>{{ designation }}</p>
          <p>Employee Number: {{ employeeNumber }}</p>
          <p>medisure-hr@medisure.com</p>
          <p>HR mobile number: 09172346789</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { employees } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';

export default {
 data() {
    return {       
      userId: null,
      docRef: null,
      firstName: null,
      lastName: null,
      designation: null,
      employeeNumber: null,
      photoUrl: null,
      image: null,
      str: null,  
    }
  },
  methods: {
    async getUser() {
      let userRef = doc(employees, this.userId);
      this.docRef = userRef;  
      let user = await getDoc(this.docRef);
      let userData = user.data();
      this.photoUrl = userData.photoUrl
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.designation = userData.designation;
      this.employeeNumber = userData.employeeNumber;
      this.image = this.photoUrl;
    }, 
  }, 
  created() {
    let userId = this.$route.params.userId;
    this.userId = userId; 
    this.getUser();
   //console.log('created');
  },
  
}
</script>

<style scoped>
img {
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  border-radius: 50%;
}
.container {
    height: 100vh;
}
.card {
    width: 400px;
    border: none
}
</style>  