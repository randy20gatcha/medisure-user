<template>
<div class="container">
  <div class="row">
    <div class="column">
      <div class="card">
        <div>
        <img :src="image" alt="picture" id="myImg">
        </div>
        <div class="container">
          <h2 ><p>{{ provider.firstName }} {{ provider.lastName }}</p></h2>
          <p>{{ provider.designation }}</p>
          <p>Employee Number: {{ provider.employeeNumber }}</p>
          <div>
            <p>medisure-hr@medisure.com<br>
            HR mobile number: 09172346789</p>
          </div>
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
import { employees, provider } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';
import   QrcodeVue  from 'qrcode.vue';

export default {
  name: "ForCompany",
  components: {
    QrcodeVue
  },
 data() {
    return {       
     provider,
     photoUrl: null,
     image: null,
    }
  },
  methods: {
    async getUser() {
      let userRef = doc(employees, this.userId);
      this.docRef = userRef;  
      let user = await getDoc(this.docRef);
      let userData = user.data();
      this.photoUrl = userData.photoUrl;
      this.provider.firstName = userData.firstName;
      this.provider.lastName = userData.lastName;
      this.provider.designation = userData.designation;
      this.provider.employeeNumber = userData.employeeNumber;
      this.image = this.photoUrl;  
       // value provider for qr code
      this.str = 'https://medisure-crud.web.app/forClient/' + this.userId; 
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