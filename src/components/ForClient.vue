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
export default {

}
</script>

<style>

</style>