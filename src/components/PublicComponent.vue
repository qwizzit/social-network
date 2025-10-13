<script setup lang="ts">
import {UserDto} from "../Models/Dto/UserDto.ts";
import {usersData} from "../composition/metods.ts";
import {onMounted, ref} from "vue";
import axios from "axios";
import {AccessApi} from "../Api/AccessApi.ts";

const enteredEmail = ref('');
const enteredPassword = ref('');
async function fetchData() {
  const regUsers = await axios.get('https://jsonplaceholder.typicode.com/users')
  localStorage.setItem('users', JSON.stringify(regUsers.data))
}
onMounted(fetchData);
function checkEmail() {
  let userId = -1;
  usersData.getUsers().find((account : UserDto) => {
    if(account.email === enteredEmail.value){
      console.log(account.id)
      userId = account.id
    }
  });
  return userId;
}
function handleInput(data: 'password' | 'email', event: Event) {
  if(data === 'email'){
    enteredEmail.value = (event.target as HTMLInputElement).value

  } else if(data === 'password'){
    enteredPassword.value = (event.target as HTMLInputElement).value
  }
}
function isDataRight(){
  const isId = checkEmail()
  if(isId !== -1){
    AccessApi.logIn(isId)
  } else{
    console.log('Invalid email')
  }
}

</script>

<template>
  <div class="page">
    <div class="fields">
      <div class="input-fields">
        <div class="welcome-block">
          <span class="text1">Sign In</span>
          <span class="text2">Great to have you onboard!</span>
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
  </div>
</template>

<style lang="scss">
.page{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .fields {
    padding: 30px;
    max-height: 800px;
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
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
        .text1{
          font-size: 40px;
          color: rgba(var(--color-font), 1);
        }
        .text2{
          text-align: center;
          font-size: 20px;
          color: rgba(var(--color-font), 1);
        }
      }
      .input{
        color: rgba(var(--color-font), 1);
        padding-left: 20px;
        background-color: rgba(var(--color-input-background), 1);
        border: 1px solid rgba(var(--color-border-main), 0.38);
        max-width: 500px;
        max-height: 50px;
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
    .login {
      color: rgba(var(--color-font), 1);
      border: none;
      background-color: rgba(var(--color-btn-background), 1);
      max-width: 500px;
      max-height: 50px;
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
}
@media (max-width: 1200px) {
  .page{
    .fields {
      max-width: 900px;
      max-height: 700px;
      .input-fields {
        .input{
          max-width: 450px;
        }

      }
      .login{
        max-width: 450px
      }
    }
  }
}
@media (max-width: 992px) {
  .page{
    .fields {
      max-width: 800px;
      max-height: 700px;
      .input-fields {
        max-width: 450px;
        max-height: 400px;
        .input{
          max-width: 350px;
        }

      }
      .login{
        max-width: 350px
      }
    }
  }
}
@media (max-width: 768px) {
  .page{
    .fields {
      max-width: 600px;
      max-height: 600px;
      .input-fields {
        max-width: 500px;
        max-height: 350px;
        .input{
          max-width: 350px;
        }

      }
      .login{
        max-width: 350px
      }
    }
  }
}
@media (max-width: 600px) {
  .page{
    .fields {
      max-width: 500px;
      max-height: 500px;
      .input-fields {
        max-width: 500px;
        max-height: 300px;
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
}



</style>

