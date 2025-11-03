<script setup lang="ts">

import Main from "./Main.vue";
import chatUnread from "/src/assets/icons/chat-round-svgrepo-com.svg"
import contentFire from "/src/assets/icons/fire-minimalistic-svgrepo-com.svg"
import news from "/src/assets/icons/mailbox-svgrepo-com.svg"
import interviews from "/src/assets/icons/microphone-svgrepo-com.svg"
import home from "/src/assets/icons/star-svgrepo-com.svg"
import contacts from "/src/assets/icons/users-group-rounded-svgrepo-com.svg"
const emit = defineEmits<{
  (e: 'update:isImageWatching', value: typeof props.isImageWatching): void
}>()
const props = defineProps<{
  isImageWatching: {
    url: string,
    toggle: boolean
  }
}>()
function zoomImage(giveImage: {url: string, toggle: boolean}){
  emit('update:isImageWatching', giveImage)
}
</script>

<template>
  <div class="page">
    <nav id="navigation" class="navigation">
      <router-link
        class="phones-router token-style"
        :to="{name: 'Content'}"
      >
        <home class="icon-router" />
        <span class="router-text">Home</span>
      </router-link>
      <router-link
        class="phones-router token-style"
        :to="{name: 'Messages'}"
      >
        <chatUnread class="icon-router" />
        <span class="router-text">Messages</span>
      </router-link>
      <router-link
        class="router token-style"
        to=""
      >
        <interviews class="icon-router" />
        <span class="router-text">Interviews</span>
      </router-link>
      <router-link class="phones-router token-style" to="">
        <news class="icon-router" />
        <span class="router-text">News</span>
      </router-link>
      <router-link class="router token-style" to="">
        <contentFire class="icon-router" />
        <span class="router-text">Content</span>
      </router-link>
      <router-link class="phones-router token-style" to="">
        <contacts class="icon-router" />
        <span class="router-text">Contacts</span>
      </router-link>
    </nav>
    <main class="main-info">
      <div class="content">
        <RouterView :isImageWatching="isImageWatching" @zoomPhoto="zoomImage" />
      </div>
      <div class="additional-content token-style">
        <div class="asd token-style">
          123
        </div>
      </div>
    </main>
  </div>
</template>

