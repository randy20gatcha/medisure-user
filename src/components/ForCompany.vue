<template>
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