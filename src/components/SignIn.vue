<script setup lang="ts">
import {User} from "../Models/User.ts";

const props = defineProps<{
  allUsers: User[]
}>()
console.log(props.allUsers);
</script>

<template>
  <div class="fields">
    <div class="input-fields">
      <input class="input-email" type="email" placeholder="Email">
      <input class="input-password" type="password" placeholder="password">
    </div>
    <button class="login" @click="$router.push('/')" :disabled="true">гомосятина</button>
  </div>
</template>

<style lang="scss">
.fields {
  max-width: 500px;
  min-width: 300px;
  max-height:  400px;
  min-height:  300px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  gap: 35px;
  width: 100%;
  height: 100%;
  .input-fields{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    .input-email{
      color: var(--font-color);
      background-color: var(--input-background-color);
      border: 1px solid var(--btn-border);
      min-width: 100px;
      max-width: 400px;
      min-height:  25px;
      max-height: 45px;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
    .input-password{
      color: var(--font-color);
      background-color: var(--input-background-color);
      border: 1px solid var(--btn-border);
      min-width: 100px;
      max-width: 400px;
      min-height:  25px;
      max-height: 45px;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
  .login {
    color: var(--font-color);
    border: none;
    background-color: var(--btn-background-color);
    min-width: 100px;
    max-width: 400px;
    min-height:  25px;
    max-height: 45px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
}
</style>

