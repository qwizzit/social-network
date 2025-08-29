<script setup lang="ts">
import {User} from "../Models/User.ts";
import {usersData} from "../composition/metods.ts";
import {onMounted, ref} from "vue";
import SpanSignIn from "./SpanSignIn.vue";
import axios from "axios";
import {AccessApi} from "../Api/AccessApi.ts";

const enteredEmail = ref('');
const enteredPassword = ref('');
async function fetchData() { // не нужно загружать когда залогинин
  const regUsers = await axios.get('https://jsonplaceholder.typicode.com/users')
  const processedUsers = <User[]>[]
  regUsers.data.forEach((user : User, index : number) => {
    processedUsers[index] = new User(user.id, user.name,
        user.username, user.email,
        user.address, user.phone,
        user.website, user.company);
  })
  localStorage.setItem('users', JSON.stringify(processedUsers))
  console.log(localStorage)
}
onMounted(fetchData);
const checkEmail = () => {
  return usersData.getUsers().some((account : User) => account.email === enteredEmail.value);
};
function handleInput(data: 'password' | 'email', event: Event) {
  if(data === 'email'){
    enteredEmail.value = (event.target as HTMLInputElement).value

  } else if(data === 'password'){
    enteredPassword.value = (event.target as HTMLInputElement).value
  }
}
function isDataRight(){
  const isRightEmail = checkEmail()
  if(isRightEmail){
    AccessApi.logIn()
  } else{
    console.log('Invalid email')
  }
}

</script>

<template>
  <div class="fields">
    <div class="input-fields">
      <div class="welcome-block">
        <SpanSignIn />
      </div>
      <input
        class="input"
        placeholder="Email"
        type="email"
        value="Shanna@melissa.tv"
        @input="handleInput('email', $event)"
      >
      <input
        class="input"
        placeholder="Password"
        type="password"
        @input="handleInput('password', $event)"
      >
    </div>
    <button class="login" @click="isDataRight">
      Sign In
    </button>
  </div>
</template>

<style lang="scss">
.fields {
  padding: 30px;
  min-width: 300px;
  max-width: 400px;
  min-height: 300px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  .input-fields {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    min-width: 250px;
    max-width: 300px;
    min-height: 300px;
    max-height: 450px;
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
      max-width: 250px;
      min-height: 25px;
      max-height: 40px;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
  .login {
    color: var(--font-color);
    border: none;
    background-color: var(--btn-background-color);
    min-width: 150px;
    max-width: 250px;
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
    .input-fields {
      min-width: 400px;
      max-width: 500px;
      min-height: 200px;
      max-height: 300px;
      .input{
        max-width: 350px;
        max-height: 45px;
      }

    }
    .login{
      max-width: 300px
    }
  }
}
@media (min-width: 768px) {
  .fields {
    max-width: 600px;
    max-height: 600px;
    .input-fields {
      min-width: 400px;
      max-width: 500px;
      min-height: 250px;
      max-height: 350px;
      .input{
        max-width: 350px;
        max-height: 45px;
      }

    }
    .login{
      max-width: 300px
    }
  }
}
@media (min-width: 992px) {
  .fields {
    max-width: 800px;
    min-width: 500px;
    max-height: 600px;
    min-height: 500px;
    .input-fields {
      min-width: 350px;
      max-width: 450px;
      min-height: 300px;
      max-height: 400px;
      .input{
        max-width: 350px;
        max-height: 45px;
      }

    }
    .login{
      max-width: 350px
    }
  }
}
@media (min-width: 1200px) {
  .fields {
    max-width: 1000px;
    .input-fields {
      min-width: 400px;
      max-width: 500px;
      min-height: 350px;
      max-height: 450px;
      .input{
        max-width: 400px;
        max-height: 45px;
      }

    }
    .login{
      max-width: 400px
    }
  }
}
</style>

