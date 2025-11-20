<script setup lang="ts">

import {isUser} from "../composition/metods.ts";
import {AccessApi} from "../Api/AccessApi.ts";
import {ref} from "vue";
import bell from "/src/assets/icons/bell-svgrepo-com.svg"
import userCircle from "/src/assets/icons/user-circle-svgrepo-com.svg"

const isAvatar = ref(false)
const emit = defineEmits<{
  (e: 'changeTheme', value: typeof props.darkTheme): void
}>()
const props = defineProps<{
  darkTheme: boolean
}>()
function changeTheme(){
  emit('changeTheme', !props.darkTheme)
}
</script>

<template>
  <bell class="bell" />
  <div class="avatar-menu">
    <userCircle class="avatar token-style" @click="isAvatar = !isAvatar" />
    <!--          <teleport to="body"> -->
    <ul
      v-if="isAvatar"
      class="drop-down-list token-style"
    >
      <li class="btn-list">
        <router-link class="btn token-style" :to="{name: 'Profile', params: {id: isUser.id()}}">
          Profile
        </router-link>
        <button class="btn token-style" @click="changeTheme">
          ChangeTheme
        </button>
        <button class="btn token-style" @click="AccessApi.logOut()">
          LogOut
        </button>
      </li>
    </ul>
    <!--          </teleport> -->
  </div>
</template>

<style lang="scss">
.bell {
  display: block;
  background: unset;
  color: rgb(var(--color-font));
  border: unset;
  width: 30px;
  height: 30px;
}

.avatar-menu {
  display: flex;
  justify-content: center;
  width: 60px;

  .avatar {
    cursor: pointer;
    border-radius: unset;
    background: unset;
  }

  .drop-down-list {
    max-height: 350px;
    position: fixed;
    z-index: 3;
    top: 50px;
    padding: unset;
    max-width: var(--size-drow-down-list);
    border: 2px solid rgba(var(--color-border-main), 0.38);
    list-style: none;
    background: rgb(var(--color-main-bg));

    .btn-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: space-evenly;
      align-items: center;

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(var(--color-btn-background));
        max-width: 150px;
        height: 50px;
      }
    }
  }
}
@media (max-width: 1480px) {
  .avatar-menu {
    .drop-down-list {
      right: 10px;
    }
  }
}
@media (max-width: 992px) {
  .bell {
    display: none;
  }
  .avatar-menu {
    .drop-down-list {
      min-width: 180px;
      .btn-list {
        .btn {
          max-width: 150px;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .avatar-menu {
    .drop-down-list {
      right: 10px;
    }
  }
}
</style>