<script setup lang="ts">
import chatUnread from "/src/assets/icons/chat-round-svgrepo-com.svg"
import contentFire from "/src/assets/icons/fire-minimalistic-svgrepo-com.svg"
import news from "/src/assets/icons/mailbox-svgrepo-com.svg"
import interviews from "/src/assets/icons/microphone-svgrepo-com.svg"
import home from "/src/assets/icons/star-svgrepo-com.svg"
import contacts from "/src/assets/icons/users-group-rounded-svgrepo-com.svg"


</script>

<template>
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
      <RouterView v-slot="{ Component }">
        <keep-alive include="Content">
          <component
            :is="Component"
          />
        </keep-alive>
      </RouterView>
    </div>
    <div class="additional-content token-style">
      <div class="asd token-style">
        123
      </div>
    </div>
  </main>
</template>

<style lang="scss">

.navigation {
  max-width: 300px;
  display: flex;
  //padding-left: var(--padding-left-router);
  flex-direction: column;
  gap: var(--gap-navigation);
  align-items: center;
  height: 100%;
  width: 100%;
  .router {
    display: flex;
    text-decoration: none;
    gap: var(--gap-picture);
    padding-left: var(--padding-left-router);
    align-items: center;
    align-content: center;
    min-width: 150px;
    max-width: var(--max-size-router);
    height: 50px;
    background: rgb(var(--color-second-bg));
    .icon-router{
      width: 25px;
      height: 25px;
    }
  }
  .phones-router{
    display: flex;
    gap: var(--gap-picture);
    padding-left: var(--padding-left-router);
    align-content: center;
    min-width: 150px;
    text-decoration: none;
    user-select: none;
    align-items: center;
    max-width: var(--max-size-router);
    height: 50px;
    background: rgb(var(--color-second-bg));
    .icon-router{
      width: 25px;
      height: 25px;
    }
  }
}
.main-info{
  display: flex;
  flex-direction: row;
  gap:  var(--gap-page);
  max-width: var(--max-width-main-info);
  width: 100%;
  height: 100%;
  //width: calc(var(--width-page) / 2);
  .content {
    color: rgb(var(--color-font));
    padding: 0 var(--padding-left-and-right-content);
    gap: 20px;
    display: flex;
    flex-direction: column;
  }
  .additional-content {
    padding: 0 10px;
    max-width: calc(var(--width-page) / 4);
    width: 100%;
    .asd{
      background: rgb(var(--color-second-bg));
      aspect-ratio:  1 / 1;
    }
  }
}
@media (max-width: 1200px) {
  .additional-content{
    display: none;
  }
}
@media (max-width: 768px) {
  .content {
    grid-row-start: 1;
    max-width: none;
  }
  .additional-content {
    display: none;
  }
  #navigation {
    padding: unset;
    position: fixed;
    max-height: var(--size-phones-router);
    border-top: 1px solid rgba(var(--color-border-main), 0.38);
    bottom: 0;
    z-index: 3;
    max-width: none;
    flex-direction: row;
    align-items: unset;
    gap: unset;
    .phones-router {
      padding-left: unset;
      min-width: unset;
      height: 100%;
      justify-content: center;
      border-radius: unset;
      background: rgb(var(--color-second-bg));
      .router-text{
        display: none;
      }
    }
    .router {
      display: none;
    }
  }
}
</style>