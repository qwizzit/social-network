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
const imageSrc = ref<string>()
function updateImageWatching(image: isImageWatchingInterface){
  imageSrc.value = image.url
}
function changeTheme(theme: boolean) {
  if (theme){
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
  emit('update:darkTheme', theme);
}

function closeModal() {
  imageSrc.value = undefined
}
</script>

<template>
  <div class="full-page">
    <div class="top-navigation-bar">
      <MainHeader
        class="asdfasdfasdf"
        :darkTheme="darkTheme"
        @changeTheme="changeTheme"
      />
    </div>
    <div class="page">
      <router-view @isImageWatching="updateImageWatching" />
    </div>
  </div>

  <Modal
    v-if="!!imageSrc"
    :imageUrl="imageSrc"
    @close="closeModal"
  />
  <div
    v-if="imageSrc"
    class="watch-image"
    @click.self="imageSrc = undefined"
  />
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