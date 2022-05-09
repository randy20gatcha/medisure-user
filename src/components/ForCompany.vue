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
          <div >
           <qrcode-vue v-if="str" :value="str"  level="H" id="noQr"/> 
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script >
import { employees } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';
import   QrcodeVue  from 'qrcode.vue';
import { useRoute } from 'vue-router';

export default {
  name: "ForCompany",
  components: {
    QrcodeVue
  },
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
      // value provider for qr code
      this.str = 'https://medisure-crud.web.app/forClient/' + this.userId;  
      //console.log(this.str)  
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
<style>
/* body {
    background-color: #eee
} */
.container {
    height: 100vh
}
.card {
    width: 400px;
    border: none
}
img {
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  border-radius: 50%;
}
#app {
  position: relative;
}
.card {
 height: 700px;
 position: absolute;
 top: 58%;
 left: 50%;
 transform: translate(-50%, -50%);
}

</style>