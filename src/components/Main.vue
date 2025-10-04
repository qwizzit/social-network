<script setup lang="ts">
import {onMounted, ref} from "vue";
import {AccessApi} from "../Api/AccessApi.ts";
import axios from "axios";
import {AlbumDto} from "../Models/Dto/AlbumDto.ts";
import userCircle from "/src/assets/icons/user-circle-svgrepo-com.svg"
import bell from "/src/assets/icons/bell-svgrepo-com.svg"
import chatUnread from "/src/assets/icons/chat-round-svgrepo-com.svg"
import contentFire from "/src/assets/icons/fire-minimalistic-svgrepo-com.svg"
import news from "/src/assets/icons/mailbox-svgrepo-com.svg"
import interviews from "/src/assets/icons/microphone-svgrepo-com.svg"
import home from "/src/assets/icons/star-svgrepo-com.svg"
import contacts from "/src/assets/icons/users-group-rounded-svgrepo-com.svg"
import {isUser} from "../composition/metods.ts";

const isAvatar = ref(false)

function fetchData() {
  axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(resp => localStorage.setItem('albums', JSON.stringify(resp.data)));

  axios.get<AlbumDto[]>('https://jsonplaceholder.typicode.com/photos')
      .then(resp => localStorage.setItem('photos', JSON.stringify(resp.data)));
 }

onMounted(fetchData);
</script>

<template>
  <div class="full-page">
    <nav class="top-navigation-bar token-style">
      <img
        alt=""
        class="logo"
        src=""
      >
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
              <button class="btn">
                asd
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
    <div class="page">
      <nav id="navigation" class="navigation">
        <RouterLink
          class="phones-router token-style"
          :to="{name: 'Home', params: {id: isUser.id()}}"
        >
          <home class="icon-router" />
          <span class="router-text">Home</span>
        </RouterLink>
        <RouterLink
          class="phones-router token-style"
          :to="{name: 'MessagesPage', params: {id: isUser.id()}}"
        >
          <chatUnread class="icon-router" />
          <span class="router-text">Messages</span>
        </RouterLink>
        <RouterLink
          class="router token-style"
          to=""
        >
          <interviews class="icon-router" />
          <span class="router-text">Interviews</span>
        </RouterLink>
        <RouterLink class="phones-router token-style" to="">
          <news class="icon-router" />
          <span class="router-text">News</span>
        </RouterLink>
        <RouterLink class="router token-style" to="">
          <contentFire class="icon-router" />
          <span class="router-text">Content</span>
        </RouterLink>
        <RouterLink class="phones-router token-style" to="">
          <contacts class="icon-router" />
          <span class="router-text">Contacts</span>
        </RouterLink>
      </nav>
      <main class="content">
        <RouterView />
      </main>
      <div class="additional-content token-style">
        <div class="asd token-style">
          123
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.token-style {
  border: rgba(var(--color-border), 0.38);
  color: rgba(var(--color-font), 1);
  background: rgba(var(--color-main-bg), 1);
  border-radius: 15px;
  width: 100%;
  height: 100%;
}
.full-page {
  overflow-y: scroll;
  background: rgba(var(--color-main-bg), 1);
  width: 100%;
  height: 100%;
  .top-navigation-bar {
    display: flex;
    border-radius: unset;
    position: fixed;
    gap: var(--gap-top-navigation);
    padding: 0 10px;
    border-bottom:  1px solid rgba(var(--color-border-blocks), 1);
    height: 60px;
    background: rgba(var(--color-second-bg), 1);
    justify-content: center;
    align-items: center;
    .logo {
      display: block;
      width: 55px;
      height:  55px;
    }

    .search-content {
      max-width: 650px;
      width: 100%;
      display: flex;
      gap: 25px;
      align-items: center;
      .search-input {
        height: 40px;
      }
      .create {
        display: block;
        background: rgba(var(--color-btn-background), 1);
        box-shadow: -1px 2px rgba(var(--color-btn-box-shadow), 0.5);
        width: 140px;
        height: 40px;
        border: unset;
        border-radius: 15px;
      }

      .assistant {
        display: block;
        background: rgba(var(--color-btn-background), 1);
        box-shadow: -1px 2px rgba(var(--color-btn-box-shadow), 0.5);
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
      justify-content: space-around;
      align-items: center;
      .bell {
        display: block;
        background: unset;
        color: rgba(var(--color-font), 1);
        border: unset;
        width: 30px;
      }
      .avatar-menu{
        display: flex;
        justify-content: center;
        width: 60px;
        .avatar{
          cursor:  pointer;
          border-radius: unset;
          background: unset;
        }
        .drop-down-list{
          max-height: 350px;
          position: fixed;
          z-index: 3;
          top: 50px;
          padding: unset;
          max-width: 200px;
          border: 2px solid rgba(var(--color-border), 0.38);
          list-style: none;
          background: rgba(var(--color-main-bg), 1);
          .btn-list{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: space-evenly;
            align-items: center;
            .btn{
              background: rgba(var(--color-btn-background), 1);
              max-width: 150px;
              height: 50px;
            }

          }
        }
      }
    }
  }

  .page {
    display: grid;
    gap: var(--gap-page);
    padding-top: 10px;
    margin-top: var(--margin-top-page);
    justify-content: center;
    grid-template-columns: 310px auto 310px;
    .navigation {
      max-width: 300px;
      display: flex;
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
        max-width: 250px;
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
        max-width: 250px;
        height: 50px;
        background: rgba(var(--color-second-bg), 1);
        .icon-router{
          width: 25px;
          height: 25px;
        }
      }
    }

    .content {

      color: rgba(var(--color-font), 1);
      padding: 0 10px;
      gap: 20px;
      display: flex;
      flex-direction: column;
      .short-pictures-content {
        width: auto;
        height: auto;
        gap: 15px;
        padding: 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        max-width: 800px;

        .short-content {
          height: auto;
          background: white;
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 100px;
          max-width: 200px;

        }
      }


      .all-info {
        display: flex;
        height: auto;
        flex-direction: column;
        gap: var(--gap-posts);
        align-items: center;
        .post{
          display: grid;
          border: 2px solid rgba(var(--color-border-blocks), 1);
          background: rgba(var(--color-second-bg), 1);
          border-radius: 15px;
          max-width: 630px;
          padding: 15px;
          gap: var(--gap-posts);
          .user-post-avatar{
            display: flex;
            gap: var(--gap-picture);
            align-items: center;
            .post-avatar{
              width: 40px;
              height: 40px;
            }
          }
          .post-interactive{
            display: flex;
            gap: 20px;
            max-height: 30px;
            .like{
              display: flex;
              gap: 10px;
              align-items: center;
              .post-icon{
                cursor: pointer;
                width: 25px;
                height: 25px;
                transition: stroke 0.2s, transform 0.1s;
              }
              .post-icon:active{
                stroke: tomato;
                transform: scale(0.88);
              }
            }
            .comment {
              display: flex;
              gap: 10px;
              align-items: center;
              .post-icon{
                height: 25px;
                width: 25px;
              }
            }
            .share{
              display: flex;
              gap: 10px;
              align-items: center;
              .post-icon{
                height: 25px;
                width: 25px;
              }
            }
          }
        }
      }
    }
    .additional-content {
      padding: 0 10px;
      .asd{
        background: rgba(var(--color-second-bg), 1);
        aspect-ratio:  1 / 1;
        }
    }
  }

}

@media (max-width: 1200px) {
  .full-page{
    .top-navigation-bar{
      gap: calc(var(--gap-top-navigation) / 2);
      justify-content: center;
      .search-content{
        max-width: 500px;
        .assistant{
          display: none;
        }
      }
    }
    .page{
      grid-template-columns: 310px auto;
      justify-content: flex-start;
      .content {
        .all-info{
          .post{
            max-width: unset;
          }
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
    .top-navigation-bar {
      justify-content: center;
      .logo{
        display: none;
      }
      .search-content {
        max-width: 500px;
        gap: 20px;
        .assistant {
          display: none;
        }

      }
      .user-implecation{
        max-width: 55px;
        .bell{
          display: none;
        }
        .avatar-menu{
          .drop-down-list {
            min-width: 180px;
            .btn-list{
              .btn{
                max-width: 150px;
              }
            }
          }
        }
      }
    }
    .page{
      justify-content: center;
      min-width: 400px;
      .content {
        .all-info {
          min-width: 350px;

        ;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .full-page {
    .top-navigation-bar {
      gap: 50px;
      background: rgba(var(--color-second-bg), 1);
      justify-content: center;
      .search-content {
        max-width: 380px;
        .search-input {
        }

        .create {
          display: none;
        }

        .assistant {
          display: none;
        }
      }

      .user-implecation {
        .avatar-menu{
          .drop-down-list {
            right: 10px;
          }
        }
        .bell {
          display: none;
        }
      }
    }

    .page {
      grid-template-columns: 1fr;
      justify-content: center;

      .content {
        grid-row-start: 1;
        max-width: none;

        .short-pictures-content {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          max-height: 150px;

          .short-content {
            max-width: 125px;
            max-height: 125px;
            background: white;
          }
        }

        .all-info {
          min-width: 100px;
          max-height: unset;
          margin-bottom: calc(var(--size-phones-router) + var(--gap-posts));
        }
      }

      .additional-content {
        display: none;
      }

      #navigation {
        position: fixed;
        max-height: var(--size-phones-router);
        border-top: 1px solid rgba(var(--color-border), 0.38);
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
      .search-content{
        width: auto;
        min-width: 200px;
        max-width: 300px;
        padding-left: 15px;
      }
      .user-implecation {
        .avatar-menu{
          .drop-down-list {
            right: 10px;
          }
        }
      }
    }
    .page{
      min-width: 200px;
      .content{
        .short-pictures-content {
          gap: 10px;
          max-height: 200px;
          .short-content {
            min-width: unset;
            max-width: 110px;
          }
        }
      }
    }
  }
}
</style>