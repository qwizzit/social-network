<script setup lang="ts">
import {ref} from "vue";
import {AccessApi} from "../Api/AccessApi.ts";

const isAvatar = ref(false)
</script>

<template>
  <div class="full-page">
    <div class="top-navigation-bar">
      <img
        alt=""
        class="logo"
        src=""
      >
      <div class="search-content">
        <input class="search-input">
        <button class="create">
          Create
        </button>
        <button class="assistant">
          Assistant
        </button>
      </div>
      <div class="user-implecation">
        <button class="bell">
          123
        </button>
        <div class="avatar-menu">
          <img
            alt=""
            class="avatar"
            src=""
            @click="isAvatar = !isAvatar"
          >
          <div
            v-if="isAvatar"
            class="menu"
            @click="AccessApi.logOut()"
          >
            1
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <div id="phone-under-navigation-bar" class="left-navigation-bar">
        <div class="phones-router">
          Home
        </div>
        <div class="phones-router">
          Messages
        </div>
        <div class="router">
          Interviews
        </div>
        <div class="phones-router">
          News
        </div>
        <div class="router">
          Content
        </div>
        <div class="phones-router">
          Contacts
        </div>
      </div>
      <div class="main-content">
        <div class="short-pictures-content">
          <img
            alt=""
            class="short-content"
            src=""
          >
          <img
            alt=""
            class="short-content"
            src=""
          >
          <img
            alt=""
            class="short-content"
            src=""
          >
        </div>
        <div class="all-info">
          11
        </div>
      </div>
      <div class="additional-content">
        123
      </div>
    </div>
  </div>
<!--  <button class="home-page" @click="AccessApi.logOut()"> -->
<!--    Log Out -->
<!--  </button> -->
</template>

<style lang="scss">
%token-style {
  border: var(--border);
  color: var(--font-color);
  background: var(--main-background-color);
  border-radius: 15px;
  width: 100%;
  height: 100%;
}

.full-page {
  display: grid;
  background: var(--main-background-color);
  grid-template-rows: 60px 1fr;
  width: 100%;
  gap: 30px;
  height: 100%;
  .top-navigation-bar {
    display: flex;
    @extend %token-style;
    border-radius: unset;
    background: var(--secondary-background-color);
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    .logo {
      display: block;
      max-width: 55px;
      max-height:  55px;
      width: 100%;
      height: 100%;
    }

    .search-content {
      max-width: 650px;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .search-input {
        @extend %token-style;
        max-height: 40px;
        max-width: 400px;
      }
      .create {
        @extend %token-style;
        display: block;
        background: var(--btn-background-color);
        box-shadow: -1px 2px var(--btn-box-shadow);
        max-width: 100px;
        max-height: 40px;
        border: unset;
        border-radius: 15px;
      }

      .assistant {
        @extend %token-style;
        display: block;
        background: var(--btn-background-color);
        box-shadow: -1px 2px var(--btn-box-shadow);
        max-width: 100px;
        max-height: 40px;
        border: unset;
        border-radius: 15px;
      }
    }

    .user-implecation {
      display: flex;
      max-width: 150px;
      width: 100%;
      height: 100%;
      justify-content: space-around;
      align-items: center;
      .bell {
        display: block;
        background: unset;
        color: var(--font-color);
        border: unset;
        max-width: 50px;
        max-height: 50px;
        width: 100%;
        height: 100%;
      }
      .avatar{
        @extend %token-style;
        border-radius: unset;
        max-width: 55px;
        max-height:  55px;
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 40px;
    background: unset;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    .left-navigation-bar {
      max-width: 300px;
      display: flex;
      max-height: 500px;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
      width: 100%;

      .router {
        @extend %token-style;
        display: block;
        padding-left: 20px;
        align-content: center;
        min-width: 150px;
        max-width: 250px;
        max-height: 50px;
        background: var(--secondary-background-color);
      }
      .phones-router{
        @extend %token-style;
        display: block;
        padding-left: 20px;
        align-content: center;
        min-width: 150px;

        max-width: 250px;
        max-height: 50px;
        background: var(--secondary-background-color);
      }
    }

    .main-content {
      @extend %token-style;
      height: auto;
      aspect-ratio:  1 / 1;
      max-width: 800px;
      min-width: 400px;
      .short-pictures-content {
        @extend %token-style;
        height: auto;
        aspect-ratio: 3 / 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        max-width: 800px;

        .short-content {
          @extend %token-style;
          height: auto;
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 100px;
          max-width: 200px;

        }
      }


      .all-info {
        @extend %token-style;
        background: var(--secondary-background-color);
        height: auto;
        aspect-ratio: 1 / 1;
        max-width: 800px;
        min-width: 450px;
      }
    }
    .additional-content {
      @extend %token-style;
      background: var(--secondary-background-color);
      height: auto;
      aspect-ratio:  1 / 1;
      min-width: 400px;
      max-width: 600px;
      max-height: 700px;
    }
  }

}




@media (max-width: 1200px) {
  .full-page{
    .page{
      justify-content: flex-start;
      .main-content {
        max-width: 600px;
        .all-info{
          min-width: 650px;
          max-width: 800px;
        }
      }
      .additional-content{
        display: none;
      }
    }
  }
}
@media (max-width: 992px) {
  .full-page{
    gap: unset;
    .top-navigation-bar {
      .logo{
        display: none;
      }
      .user-implecation{
        .bell{
          display: none;
        }
      }
    }
    .page{
      min-width: 400px;
      .main-content {
        .all-info {
          min-width: 350px;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .full-page {
    .top-navigation-bar {
      display: flex;
      background: var(--secondary-background-color);
      height: 100%;
      width: 100%;

      .logo {
        display: none;
      }

      .search-content {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: space-around;

        .search-input {
          @extend %token-style;
          max-width: 350px;
          max-height: 40px;
        }

        .create {
          display: none;
        }

        .assistant {
          display: none;
        }
      }

      .user-implecation {
        display: flex;
        max-width: 150px;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        align-items: center;

        .avatar {
          max-width: 50px;
          max-height: 50px;
          width: 100%;
          border-radius: 20px;
          height: 100%;
        }

        .bell {
          display: none;
        }
      }
    }

    .page {
      display: flex;
      gap: unset;
      aspect-ratio: unset;
      justify-content: space-between;
      flex-direction: column-reverse;
      width: 100%;
      height: 100%;

      .main-content {
        display: flex;
        min-width: unset;
        max-width: none;
        max-height: 875px;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .short-pictures-content {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          max-height: 120px;
          height: 100%;
          width: 100%;

          .short-content {
            @extend %token-style;
            border-radius: unset;
            max-width: 100px;
            max-height: 100px;
            background: white;
          }
        }

        .all-info {
          min-width: 100px;
          max-height: 500px;
          max-width: 600px;
        }
      }

      .additional-content {
        display: none;
      }

      #phone-under-navigation-bar {
        max-width: none;
        max-height: 60px;
        flex-direction: row;
        align-items: flex-end;

        .phones-router {
          padding-left: unset;
          max-width: none;
          min-width: unset;

          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: unset;
          border: 1px solid var(--border);
          background: var(--secondary-background-color);
        }

        .router {
          display: none;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .full-page{
    .top-navigation-bar {
      .search-content{
        padding-left: 15px;
      }
    }
    .page{
      min-width: 200px;
      .main-content{

        .short-pictures-content {
          max-height: 200px;
          .short-content {
            max-height: 110px;
            max-width: 110px;
          }
        }
        .all-info{
          max-height: 575px;
          max-width: 350px;
          aspect-ratio: 1 / 4;
        }
      }
    }
  }

}
@media (max-width: 420px) {
  .full-page{
    .page{
      .main-content{
        .all-info{
          max-width: 350px;
          max-height: 415px;
        }
      }
    }
  }
}
</style>