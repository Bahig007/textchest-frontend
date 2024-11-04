<template>
    <div>
      <h1>Fetched Number</h1>
      <p v-if="number">Your number is: {{ number }}</p>
      <p v-else>Loading...</p>
    </div>
    <Messages :number="number"/>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
import Messages from './Messages.vue';
  
  const number = ref('');
  
  // Fetch data from the API
  const fetchData = async () => {
    // Make sure the variable you want to encode is defined

    try {
      const response = await axios.get('https://foxsoftmail.com/api/myNumber', {
        headers: {
          'Content-Type': 'application/json' // Set the content type as needed
        }
      });
      console.log(response.data)
      number.value = response.data[0].number; // Assign the response data to the reactive variable
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      number.value = 'Error fetching data'; // Display an error message if the request fails
    }
  };
  
  // Call fetchData when the component mounts
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>