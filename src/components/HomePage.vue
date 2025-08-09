<script setup lang="ts">
import {User} from "../Models/User.ts";

const props = defineProps<{
  allUsers: User[]
}>()
</script>

<template>
  <button class="home-page" @click="$router.push('/signIn')">LogOut</button>
</template>

<style lang="scss">
.home-page {
  width: 50%;
  height: 50%;
}
</style>