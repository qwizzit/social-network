<script setup lang="ts">
import SpanSignIn from "./SpanSignIn.vue";

const emit = defineEmits<{
  (e: 'asd', value: string): void
}>()

function handleInput(event: any) {
  emit('asd', event.target.value)

}
</script>

<template>

  <div class="input-fields">
    <div class="welcome-block">
      <SpanSignIn/>
    </div>
    <input class="input" type="email" placeholder="Email" value="Shanna@melissa.tv" @input="handleInput">
    <input class="input" type="password" placeholder="Password">
  </div>
</template>

<style lang="scss">
.input-fields {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  .welcome-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  .input{
    color: var(--font-color);
    padding-left: 20px;
    background-color: var(--input-background-color);
    border: 1px solid var(--border);
    min-width: 100px;
    max-width: 400px;
    min-height: 25px;
    max-height: 45px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

}

</style>