<script setup lang="ts">
import {User} from "../Models/User.ts";
import {debounce, getUsers} from "../composition/metods.ts";
import InputLogIn from "./InputLogIn.vue";
import {ref} from "vue";
// function checkEmail(enteredEmail: string) {
//   debounce(3000, () =>{
//     let isFoundEmail = false;
//     users.data.forEach((account: User) => {
//       if(account.email === enteredEmail) {
//         isFoundEmail = true;
//       }
//     })
//     isRightEmail.value = isFoundEmail;
//
//   })()
// }
const isRightEmail = ref(false);
const enteredEmail = ref('');
const users = getUsers();

const checkEmail = debounce(600, () => {
  isRightEmail.value = users.data.some((account : User) => account.email === enteredEmail.value);
  console.log(enteredEmail.value);
  console.log(isRightEmail.value);
});

function handleInput(text: string) {
  enteredEmail.value = text;
  checkEmail();
}
</script>

<template>
  <div class="fields">
    <InputLogIn @asd="handleInput"/>
    <button class="login" @click="$router.push('/')">Sign In</button>
  </div>
</template>

<style lang="scss">
.fields {
  padding: 30px;
  min-width: 200px;
  max-width: 300px;
  min-height: 300px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;

  .login {
    color: var(--font-color);
    border: none;
    background-color: var(--btn-background-color);
    min-width: 100px;
    max-width: 400px;
    min-height: 25px;
    max-height: 45px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
}
@media (min-width: 600px) {
  .fields {
    max-width: 500px;
    max-height: 500px;
  }
}
@media (min-width: 768px) {
  .fields {
    max-width: 600px;
    max-height: 600px;
  }
}
@media (min-width: 992px) {
  .fields {
    max-width: 800px;
    min-width: 500px;
    max-height: 600px;
    min-height: 500px;
  }
}
@media (min-width: 1200px) {
  .fields {
    max-width: 1000px;
  }
}
</style>

