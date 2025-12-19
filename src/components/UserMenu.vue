<script setup lang="ts">
import {isUser} from "../composition/metods.ts";
import {AccessApi} from "../Api/AccessApi.ts";
import {computed, onMounted, ref, watch, onUnmounted} from "vue";
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

const avatarRef = ref();
const position = ref({top: 0, right: 0})

const downDropList = computed(() => ({
  top: `${position.value.top}px`,
  right: `${position.value.right}px`,
}))

const getElementCoordinates = () => {
  if(avatarRef.value){
    const element = avatarRef.value.$el;
    if (element && typeof element.getBoundingClientRect === 'function') {
      const rect = element.getBoundingClientRect()
      position.value.top = rect.top + rect.height
      position.value.right = window.innerWidth - rect.right - 80;
    }
  }
}

const resize = () => {
  getElementCoordinates();
};

watch(isAvatar, (isOpened) => {
  if (isOpened) {
    window.addEventListener('resize', resize);
    getElementCoordinates();
  } else {
    window.removeEventListener('resize', resize);
  }
});

onMounted(() => {
  getElementCoordinates();
});
onUnmounted(() => {
  window.removeEventListener('resize', resize);
})
</script>

<template>
  <bell class="bell" />
  <div class="avatar-menu">
    <userCircle
      ref="avatarRef"
      class="avatar token-style"
      
      @click="isAvatar = !isAvatar"
    />
    <teleport to="body">
      <ul
        v-if="isAvatar"
        class="drop-down-list token-style"
        :style="downDropList"
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
    </teleport>
  </div>
</template>

<style lang="scss">
.drop-down-list {
  //right: calc();
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


}
@media (max-width: 1400px) {
  .drop-down-list {
    right: 10px !important;
  }
}
@media (max-width: 992px) {
  .drop-down-list {
    min-width: 180px;
    .btn-list {
      .btn {
        max-width: 150px;
      }
    }
  }
  .bell {
    display: none;
  }
}
</style>