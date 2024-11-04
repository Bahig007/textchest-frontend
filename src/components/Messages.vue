<template>
  <div class="box">
    <div v-for="(company, index) in sms" :key="index" class="subBox">
      <h4>{{ company.company }}</h4>
      <p v-for="(msg, index) in company.messages" :key="index">{{ msg.msg }}</p>
      <br />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";

// Define props
const props = defineProps({
  number: {
    type: String,
    required: true,
  },
});

// Define local state
const sms = ref("");

// Fetch data from the API
const fetchData = async (number) => {
  try {
    if (number) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/SmS/${number}`,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type as needed
          },
        }
      );
      console.log(response.data);
      sms.value = response.data; // Assume the response data is what you want to show
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    sms.value = "Error fetching data"; // Display an error message if the request fails
  }
};

// Watch for changes to the number prop
watch(
  () => props.number,
  (newValue) => {
    fetchData(newValue);
  }
);

// Call fetchData on initial mount with the initial prop value
fetchData(props.number);

// const messages = ref([]); // Reactive array to store incoming messages
const yourCompanyName = ref("Yahoo"); // Example reactive variable for company name
const yourPhoneNumber = ref("17623829488"); // Example reactive variable for phone number

// // Watch for changes in yourCompanyName or yourPhoneNumber and listen for messages
// watch([yourCompanyName, yourPhoneNumber], (newValues) => {
//   const [newCompanyName, newPhoneNumber] = newValues;

//   // Clean up previous channel if necessary
//   if (window.Echo) {
//     window.Echo.leave(`CompanyUpdated${newCompanyName}${newPhoneNumber}`);
//   }

//   // Rejoin the channel with the updated values
//   window.Echo.channel(`CompanyUpdated${newCompanyName}${newPhoneNumber}`)
//     .listen('Message', (event) => {
//       console.log('Incoming message:', event.message);
//       messages.value.push(event.message); // Add the message to the messages array
//     });
// }, { immediate: true }); // Run the watcher immediately upon component mount
function updateSmsArray(incomingMessage) {
  // Find the relevant company in the sms array
  const companyIndex = sms.value.findIndex(
    (item) => item.company === incomingMessage.companyName
  );

  // Prepare the new message structure to match existing messages
  const newMessage = {
    msg: incomingMessage.message,
    ts: Date.now(), // or incomingMessage.ts if it's provided
  };

  // If the company is found, push the new message to the messages array
  if (companyIndex !== -1) {
    sms.value[companyIndex].messages.push(newMessage);
  }
  //   else {
  //     // If the company is not found, you could optionally add it as a new entry
  //     sms.value.push({
  //       company: incomingMessage.companyName,
  //       messages: [newMessage]
  //     });
  //   }
}

onMounted(() => {
  // Listening for the MessageSent event
  // window.Echo.channel(`CompanyUpdated.${yourCompanyName}.${yourPhoneNumber}`) // replace with your dynamic values
  window.Echo.channel("CompanyUpdated") // replace with your dynamic values
    .listen("Message", (event) => {
      // Ensure this matches your event name
      // Log the incoming message to the console
      console.log("Incoming event:", event);
      console.log("Incoming message:", event.message);
      updateSmsArray(event);

      // Add the message to the messages array
    });
});
</script>

<style scoped>
.box {
  border: 1px solid blue;
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
}
.subBox {
  border: 1px solid blue;
  width: 30%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
