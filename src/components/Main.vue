<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";
import MainHeader from "./MainHeader.vue";
import {isImageWatchingInterface} from "../Models/isImageWatchingInterface.ts";

const emit =  defineEmits<{
  (e: 'update:darkTheme', value: typeof props.darkTheme): void
}>()
const props = defineProps<{
  darkTheme: boolean,
}>()
const isImageWatching = ref({url: '', toggle: false})
function updateImageWatching(image: isImageWatchingInterface){
  isImageWatching.value = image;
}
function changeTheme(theme: boolean) {
  if (theme){
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
  emit('update:darkTheme', theme);
}
</script>

<template>
  <div class="full-page">
    <div class="top-navigation-bar">
      <MainHeader :darkTheme="darkTheme" @changeTheme="changeTheme" />
    </div>
    <div class="page">
      <router-view @isImageWatching="updateImageWatching" />
    </div>
  </div>
  <div
    v-if="isImageWatching.toggle"
    class="watch-image"
    @click.self="isImageWatching.toggle = !isImageWatching.toggle"
  >
    <Modal
      :imageUrl="isImageWatching.url"
    />
  </div>
</template>

<style lang="scss">
.token-style {
  color: rgb(var(--color-font));
  background: rgb(var(--color-main-bg));
  border-radius: 15px;
  text-decoration: none;
  width: 100%;
  height: 100%;
}
.watch-image{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 6;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(var(--color-main-bg), 0.3);

}
.full-page {
  display: flex;
  height: 100%;
  justify-content: center;
  .page {
    display: flex;
    width: var(--width-page);
    gap: var(--gap-page);
    padding-top: 10px;
    margin-top: calc(var(--gap-page) + var(--size-top-navigation));
    justify-content: center;
  }
}

@media (max-width: 1200px) {
  .full-page{
    .page{
      justify-content: flex-start;
    }
  }
}
@media (max-width: 768px) {
  .full-page {
    .page {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
}
</style>