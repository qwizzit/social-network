<script setup lang="ts">
import {onMounted, ref } from "vue";
import {AccessApi} from "../Api/AccessApi.ts";
import axios from "axios";
import {AlbumDto} from "../Models/Dto/AlbumDto.ts";
import userCircle from "/src/assets/icons/user-circle-svgrepo-com.svg"
import bell from "/src/assets/icons/bell-svgrepo-com.svg"

import {isUser} from "../composition/metods.ts";

const isAvatar = ref(false)
const emit =  defineEmits<{
  (e: 'update:darkTheme', value: typeof props.darkTheme): void
}>()
const props = defineProps<{
  darkTheme: boolean,
}>()

function changeTheme() {
  if(!props.darkTheme){
    localStorage.setItem('theme', 'dark');
    emit('update:darkTheme', true);
  } else {
    localStorage.setItem('theme', 'light');
    emit('update:darkTheme', false);
  }
}

function fetchData() {
  axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(resp => localStorage.setItem('posts', JSON.stringify(resp.data)));

  axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(resp => localStorage.setItem('albums', JSON.stringify(resp.data)));

  axios.get<AlbumDto[]>('https://jsonplaceholder.typicode.com/photos')
      .then(resp => localStorage.setItem('photos', JSON.stringify(resp.data)));
 }

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="full-page">
    <div class="top-navigation-bar">
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
        <div class="user-implecation">
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
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.token-style {
  color: rgba(var(--color-font), 1);
  background: rgba(var(--color-main-bg), 1);
  border-radius: 15px;
  text-decoration: none;
  width: 100%;
  height: 100%;
}
.full-page {

  display: flex;
  height: 100%;
  justify-content: center;
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
      border-bottom: 1px solid rgba(var(--color-border-blocks), 1);
      background: rgba(var(--color-second-bg), 1);
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
          display: block;
          background: rgba(var(--color-btn-background), 1);
          box-shadow: -1px 2px rgba(var(--color-box-shadow-btn), 0.5);
          width: 140px;
          height: 40px;
          border: unset;
          border-radius: 15px;
        }

        .assistant {
          display: block;
          background: rgba(var(--color-btn-background), 1);
          box-shadow: -1px 2px rgba(var(--color-box-shadow-btn), 0.5);
          width: 140px;
          height: 40px;
          border: unset;
          border-radius: 15px;
        }
      }
      .user-implecation {
        display: flex;
        max-width: 150px;
        width: 100%;
        height: 100%;
        gap: 30px;
        justify-content: end;
        align-items: center;

        .bell {
          display: block;
          background: unset;
          color: rgba(var(--color-font), 1);
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
            background: rgba(var(--color-main-bg), 1);

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
                background: rgba(var(--color-btn-background), 1);
                max-width: 150px;
                height: 50px;
              }
            }
          }
        }
      }
    }
  }
  .page {
    display: grid;
    width: var(--width-page);
    gap: var(--gap-page);
    padding-top: 10px;
    margin-top: calc(var(--gap-page) + var(--size-top-navigation));
    justify-content: center;
    grid-template-columns: calc(var(--width-page) / 5 ) 1fr;
    .navigation {
      //max-width: 300px;
      display: flex;
      padding-left: var(--padding-left-router);
      flex-direction: column;
      gap: var(--gap-navigation);
      align-items: center;
      height: 100%;
      width: 100%;
      .router {
        display: flex;
        text-decoration: none;
        gap: var(--gap-picture);
        padding-left: var(--padding-left-router);
        align-items: center;
        align-content: center;
        min-width: 150px;
        max-width: var(--max-size-router);
        height: 50px;
        background: rgba(var(--color-second-bg), 1);
        .icon-router{
          width: 25px;
          height: 25px;
        }
      }
      .phones-router{
        display: flex;
        gap: var(--gap-picture);
        padding-left: var(--padding-left-router);
        align-content: center;
        min-width: 150px;
        text-decoration: none;
        user-select: none;
        align-items: center;
        max-width: var(--max-size-router);
        height: 50px;
        background: rgba(var(--color-second-bg), 1);
        .icon-router{
          width: 25px;
          height: 25px;
        }
      }
    }
    .main-info{
      display: flex;
      flex-direction: row;
      gap:  var(--gap-page);
      max-width: calc(var(--width-page) - var(--width-page) / 4);
      width: 100%;
      //width: calc(var(--width-page) / 2);
      .content {
        color: rgba(var(--color-font), 1);
        padding: 0 10px;
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .additional-content {
        padding: 0 10px;
        max-width: calc(var(--width-page) / 4);
        width: 100%;
        .asd{
          background: rgba(var(--color-second-bg), 1);
          aspect-ratio:  1 / 1;
        }
      }
    }
  }

}
@media (max-width: 1480px) {
  .full-page {
    .top-navigation-bar {
      .top-navigation {
        .user-implecation {
          .avatar-menu {
            .drop-down-list {
              right: 10px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .full-page{
    .top-navigation-bar {
      .navigation {
        gap: calc(var(--gap-top-navigation) / 2);
        .user-implecation {
          max-width: unset;
          width: auto;
        }
      }
    }
    .page{
      justify-content: flex-start;
      .additional-content{
        display: none;
      }
    }
  }
}
@media (max-width: 992px) {
  .full-page {
    .top-navigation-bar {
      .top-navigation {
        .home {
          width: 150px;
        }
        .search-content {
          gap: 20px;
        }
        .user-implecation {
          padding-right: unset;
          max-width: 55px;
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
      }
    }
  }
}
@media (max-width: 768px) {
  .full-page {
    .top-navigation-bar {
      .top-navigation {
        gap: 10px;
        .home {
          max-width: unset;
          width: auto;
        }
        .user-implecation {
          .avatar-menu {
            .drop-down-list {
              right: 10px;
            }
          }
          .bell {
            display: none;
          }
        }
      }
    }
    .page {
      grid-template-columns: 1fr;
      justify-content: center;
      .content {
        grid-row-start: 1;
        max-width: none;
      }
      .additional-content {
        display: none;
      }
      #navigation {
        padding: unset;
        position: fixed;
        max-height: var(--size-phones-router);
        border-top: 1px solid rgba(var(--color-border-main), 0.38);
        bottom: 0;
        z-index: 3;
        max-width: none;
        flex-direction: row;
        align-items: flex-end;
        gap: unset;
        .phones-router {
          padding-left: unset;
          min-width: unset;
          height: 100%;
          justify-content: center;
          border-radius: unset;
          background: rgba(var(--color-second-bg), 1);
          .router-text{
            display: none;
          }
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
}
</style>