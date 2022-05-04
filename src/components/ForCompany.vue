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
           <qrcode-vue v-if="str" :value="str"  level="H"/> 
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
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import   QrcodeVue  from 'qrcode.vue';

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
      str: null     
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
      this.str = 'http://192.168.1.4:8080/forClient/' + this.userId;  
      //console.log(this.str)  
    }, 
    noSignIn() {
      const auth = getAuth();
      signInAnonymously(auth).then(() => {
        console.log('signed in anonymously');
        if(auth) {
          //console.log('not shown in public');
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    userStatus() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          //console.log('state changed:',uid);
        } else {
          console.log('signed out');
        }
      });
    },
    // regulate() {
    //   if(this.noSignIn) {
    //     console.log('not logged in');
    //   }
    // } 
  },
  created() {
    let userId = this.$route.params.userId;
    this.userId = userId; 
    this.getUser();
    this.noSignIn();
    this.userStatus();
    // //console.log('created');
    // this.regulate();
  },
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
 top: 58%;
 left: 50%;
 transform: translate(-50%, -50%);
}

</style>