<template>
<div class="container">
  <h1>Details</h1>
  <div class="row">
    <div class="column">
      <div class="card">
        <img src="@/assets/logo.png" alt="picture">
        <div class="container">
          <h2>{{ firstName}} {{ lastName }}</h2>
          <p>{{ designation }}</p>
          <p>Employee Number: {{ employeeNumber }}</p>
          <p>medisure-hr@medisure.com</p>
          <p>mobile number: 09172346789</p>
           <qrcode-vue v-if="employeeNumber" :value="employeeNumber"  level="H"/>
         
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { employees } from '@/firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import  QrcodeVue  from 'qrcode.vue';
export default {
  data() {
    return {      
      userId: null,
      docRef: null,
      firstName: null,
      lastName: null,
      designation: null,
      employeeNumber: null
    }
  },
  methods: {
    async getUser () {
      let userRef = doc(employees, this.userId);
      this.docRef = userRef;
      let user = await getDoc(this.docRef);
      let userData = user.data();
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.designation = userData.designation;
      this.employeeNumber = userData.employeeNumber;
    }
  },
  created() {
    let userId = this.$route.params.userId;
    this.userId = userId;
    this.getUser();
    console.log('created');
  },
  components: {
    QrcodeVue
  }
  
}
</script>

<style scoped>
body {
    background-color: #eee
}
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
 top: 63%;
 left: 50%;
 transform: translate(-50%, -50%);
}

</style>