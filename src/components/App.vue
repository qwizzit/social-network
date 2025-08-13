<script setup lang="ts">
import {onMounted, ref} from "vue";
import {User} from "../Models/User.ts";
import axios from "axios";

const allUsers = ref<User[]>([]);
async function fetchData() {
  const regUsers= await axios.get('https://jsonplaceholder.typicode.com/users')
  localStorage.setItem('users', JSON.stringify(regUsers));
}
onMounted(fetchData);

</script>

<template>
<RouterView />
</template>

<style lang="scss">

</style>
