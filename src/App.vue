<script setup>


import HelloWorld from './components/HelloWorld.vue'
import PhoneNumber from './components/PhoneNumber.vue'





</script>

<template>
<div class="maincontainer">

<h1>Fox Soft</h1>
<!-- <div class="phoneNumberContianer">
Number : 
</div> -->
<PhoneNumber/>
</div>


</template>

<style scoped>
.maincontainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.phoneNumberContianer{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
