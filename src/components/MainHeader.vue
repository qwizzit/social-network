<script setup lang="ts">
import UserMenu from "./UserMenu.vue";
const emit = defineEmits<{
  (e: 'changeTheme', value: typeof props.darkTheme): void
}>()
const props = defineProps<{
  darkTheme: boolean
}>()
function changeTheme(theme: boolean){
  emit('changeTheme', theme)
}
</script>

<template>
  <nav class="top-navigation token-style">
    <router-link class="home token-style" :to="{name: 'Content', params: {}}">
      <img
        alt=""
        class="logo"
        src=""
      >
    </router-link>
    <div class="search-content">
      <input class="search-input token-style">
      <button class="create token-style">
        Create
      </button>
      <button class="assistant token-style">
        Assistant
      </button>
    </div>
    <div class="user-implication">
      <UserMenu :darkTheme="darkTheme" @changeTheme="changeTheme" />
    </div>
  </nav>
</template>

<style lang="scss">
.top-navigation-bar{
  top: 0;
  display: flex;
  justify-content: center;
  background: rgb(var(--color-second-bg));
  height: var(--size-top-navigation);
  position: fixed;
  z-index: 5;
  width: 100%;
  .top-navigation {
    display: flex;
    gap: var(--gap-page);
    border-radius: unset;
    width: var(--width-page);
    padding: 0 calc(10px + var(--padding-left-router));
    border-bottom: 1px solid rgb(var(--color-border-blocks));
    background: rgb(var(--color-second-bg));
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    .home{
      display: flex;
      justify-content: start;
      background: none;
      max-width: 150px;
      height: 100%;
      width: 100%;
      align-items: center;
      .logo {
        display: block;
        width: 55px;
        height:  55px;
      }
    }
    .search-content {
      max-width: 650px;
      width: 100%;
      display: flex;
      padding: 0 10px;
      gap: 25px;
      align-items: center;
      .search-input {
        max-width: 550px;
        border: unset;
        height: 40px;
      }
      .create {
        background: rgb(var(--color-btn-background));
        box-shadow: -1px 2px rgba(var(--color-box-shadow-btn), 0.5);
        width: 140px;
        height: 40px;
        border: unset;
        border-radius: 15px;
      }
      .assistant {
        background: rgb(var(--color-btn-background));
        box-shadow: -1px 2px rgba(var(--color-box-shadow-btn), 0.5);
        width: 140px;
        height: 40px;
        border: unset;
        border-radius: 15px;
      }
    }
    .user-implication {
      display: flex;
      max-width: 150px;
      width: 100%;
      height: 100%;
      gap: 30px;
      justify-content: end;
      align-items: center;
    }
  }
}
@media (max-width: 1200px) {
  .top-navigation-bar{
    .top-navigation {
      .home {
        width: 150px;
      }
      .search-content {
        gap: 20px;
      }
      .user-implication {
        padding-right: unset;
      }
    }
  }
}
@media (max-width: 992px) {
  .top-navigation-bar{
    .top-navigation {
      .home {
        width: 150px;
      }
      .search-content {
        gap: 20px;
      }
      .user-implication {
        padding-right: unset;
        max-width: 55px;
      }
    }
  }
}
@media (max-width: 768px) {
  .top-navigation-bar{
    .top-navigation {
      gap: 10px;
      .home {
        max-width: 55px;
        width: auto;
      }
    }
  }
}
@media (max-width: 600px) {
  .top-navigation-bar{
    .top-navigation {
      .search-content {
        min-width: 200px;
        max-width: 400px;
        .create {
          display: none;
        }
        .assistant {
          display: none;
        }
      }
    }
  }
}
</style>