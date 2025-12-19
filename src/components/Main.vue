<script setup lang="ts">
import MainHeader from "./MainHeader.vue";

const emit =  defineEmits<{
  (e: 'update:darkTheme', value: typeof props.darkTheme): void
}>()
const props = defineProps<{
  darkTheme: boolean,
}>()

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
      <MainHeader
        :darkTheme="darkTheme"
        @changeTheme="changeTheme"
      />
    </div>
    <div class="page">
      <router-view />
    </div>
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