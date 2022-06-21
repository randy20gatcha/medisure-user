<template>
 <div id="title">
  <h4 id="medi">Medi<span id="sure">Sure</span><sup>Plus</sup></h4>
 </div>
 <div class="container">
  <div class="row">
    <div class="column">
      <div class="card">
        <div>
        <img :src="store.photoUrl" alt="picture" id="myImg">
        </div>
        <div class="container">
          <h2 ><p>{{ store.firstName }} {{ store.lastName }}</p></h2>
          <p>{{ store.designation }}</p>
          <p>Employee Number: {{ store.employeeNumber }}</p>
          <div>
            <p>mso.admin@medisureonline.com<br>
            HR mobile number: +639201562291</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useStore } from '@/stores/userStore';

export default ({
  setup() {
   const store = useStore();
   const fill = store.fill();

   return {
     store,
     fill
   }
  }
//  data() {
//     return {       
//      provider,
//      photoUrl: null,
//      image: null,
//     }
//   },

//   methods: {
//     async getUser() {
//       let userRef = doc(employees, this.userId);
//       this.docRef = userRef;  
//       let user = await getDoc(this.docRef);
//       let userData = user.data();
//       this.photoUrl = userData.photoUrl;
//       this.provider.firstName = userData.firstName;
//       this.provider.lastName = userData.lastName;
//       this.provider.designation = userData.designation;
//       this.provider.employeeNumber = userData.employeeNumber;
//       this.image = this.photoUrl;   
//     }
//   },
 
//   created() {
//     let userId = this.$route.params.userId;
//     this.userId = userId; 
//     this.getUser();
//    //console.log('created');
//   },
  
})
</script>

<style scoped>
#title {
  margin-top: 30px;
}
#medi {
    color: #bdbdbd;
}
#sure {
    color: #deded8;
}
.container {
    height: 100vh
}
.card {
    width: 400px;
    border: none;
    height: 490px;
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
}
img {
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  border-radius: 50%;
}
</style>  