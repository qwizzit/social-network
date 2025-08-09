<script setup lang="ts">
import {ref} from "vue";
import {User} from "../Models/User.ts";
import axios from "axios";

const allUsers = ref<User[]>([]);
console.log(allUsers.value);
async function fetchData() {
  const regUsers= await axios.get('https://jsonplaceholder.typicode.com/users')
  regUsers.data.forEach((user: User) => {
    allUsers.value.push(user)
  })
}
fetchData()

</script>

<template>
<RouterView :allUsers="allUsers"/>
</template>

<style lang="scss">

</style>
