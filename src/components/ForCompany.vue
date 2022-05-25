<template>
<nav>
  <router-link :to="{ path: `/hrView` }" id="toHrView">Back to List</router-link>
</nav>
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
            <p>medisure-hr@medisure.com<br>
            HR mobile number: 09172346789</p>
          </div>
          <div >
           <qrcode-vue v-if="store.str" :value="store.str"  level="H" /> 
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
</template>

<script >
import { useStore } from '@/stores/userStore';
import   QrcodeVue  from 'qrcode.vue';

export default ({
  name: "ForCompany",
  components: {
    QrcodeVue
  },
  setup() {
   const store = useStore();
   const fill = store.fill();

   return {
     store,
     fill
   }
  }
})
</script>
<style scoped>
/* body {
    background-color: #eee
} */
.container {
    height: 100vh
}
.card {
    width: 400px;
    border: none;
    height: 510px;
    position: absolute;
    top: 52%;
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
#app {
  position: relative;
}

/* #toHrView {
  text-decoration: none;
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0 50px 0;
  border-radius: 5px;
  box-sizing: border-box;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  background-color:rgb(69, 69, 128);
  transition: all 0.2s;
  position: relative;
  right: 149px;
} */
#toHrView:hover {
  color:#dadee2;
}
@media all and (max-width: 30em) {
  #toHrView {
    display: block;
    margin: 0.2em auto;
  }
}

</style>