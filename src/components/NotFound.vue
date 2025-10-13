<script setup lang="ts">

import {onMounted, ref} from "vue";

const currentComponent = ref(false)

onMounted(() => {
  currentComponent.value = localStorage.getItem('token') === null
})
</script>

<template>
  <div class="error-page">
    <div class="error">
      <span class="text-error">404</span>
    </div>
    <div v-if="!currentComponent" class="main-page-router">
      <router-link class="router token-style" :to="{name: 'Content'}">
        Return home
      </router-link>
    </div>
    <div v-if="currentComponent" class="main-page-router">
      <router-link class="router token-style" :to="{name: 'PublicComponent'}">
        Return SignIn
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.error-page {
  display: flex;
  flex-direction: column;
  justify-content:  space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: calc(var(--gap-page) * 2);
  .error {
    .text-error {
      font-size: 200px;
      color: rgba(var(--color-font), 1);
    }
  }
  .main-page-router{
    display: flex;
    text-decoration: unset;
    font-size: 50px;

  }
}
</style>

