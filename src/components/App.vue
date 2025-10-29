<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const darkTheme = ref(false);
function applyTheme() {
  if(darkTheme.value) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else{
    document.documentElement.setAttribute('data-theme', 'light');
  }
}
function currentTheme() {
  if(localStorage.getItem('theme') === 'dark'){
    darkTheme.value = true;
  } else if(localStorage.getItem('theme') !== 'dark'){
    darkTheme.value = false;
  } else if(localStorage.getItem('theme') === null){
    localStorage.setItem('theme', 'dark');
    darkTheme.value = true;
  }
}
watch(darkTheme,() => {
  applyTheme()
}, {immediate: true})

onMounted(() => {
  currentTheme();
});
</script>

<template>
  <!--  <TEST /> -->
  <RouterView v-model:darkTheme="darkTheme" />
</template>