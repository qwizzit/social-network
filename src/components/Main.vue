<script setup lang="ts">
import {onMounted, ref} from "vue";
import {AccessApi} from "../Api/AccessApi.ts";
import axios from "axios";
import {Album} from "../Models/UserAlbums.ts";
import {Photo} from "../Models/AlbumPhotos.ts";
import userCircle from "/src/assets/icons/user-circle-svgrepo-com.svg"
import bell from "/src/assets/icons/bell-svgrepo-com.svg"
import chatUnread from "/src/assets/icons/chat-round-svgrepo-com.svg"
import contentFire from "/src/assets/icons/fire-minimalistic-svgrepo-com.svg"
import news from "/src/assets/icons/mailbox-svgrepo-com.svg"
import interviews from "/src/assets/icons/microphone-svgrepo-com.svg"
import home from "/src/assets/icons/star-svgrepo-com.svg"
import contacts from "/src/assets/icons/users-group-rounded-svgrepo-com.svg"
const isAvatar = ref(false)


async function fetchData() {
  const albums = await axios.get('https://jsonplaceholder.typicode.com/albums')
  const photos = await axios.get('https://jsonplaceholder.typicode.com/photos')
  const processedAlbums = <Album[]>[]
  albums.data.forEach((album : Album, index : number) => {
    processedAlbums[index] = new Album(album.userId, album.id, album.title)
  })
  const processedPhotos = <Photo[]>[]
  photos.data.forEach((photo : Photo, index : number) => {
    processedPhotos[index] = new Photo(photo.albumId, photo.id,
        photo.title, photo.url, photo.thumbnailUrl)
  })
  // сделать асинхронным загрузку данных (albums, photos), после получения данных отправляется в localstorage
  // сделать все классы в interface и в отдельную папку {entity}Dto
  localStorage.setItem('albums', JSON.stringify(processedAlbums));
  localStorage.setItem('photos', JSON.stringify(processedPhotos));
}

onMounted(fetchData);
</script>

<template>
  <div class="full-page">
    <nav class="top-navigation-bar">
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
        <bell class="bell" />
        <div class="avatar-menu">
          <userCircle class="avatar" @click="isAvatar = !isAvatar" />
          <ul v-if="isAvatar" class="drop-down-list">
            <li class="btn-list">
              <button class="btn">
                asd
              </button>
              <button class="btn" @click="AccessApi.logOut()">
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="page">
      <nav id="navigation" class="navigation">
        <RouterLink
          class="phones-router"
          to="/"
        >
          <home class="icon-router" />
          Home
        </RouterLink>
        <RouterLink
          class="phones-router"
          to="/messages"
        >
          <chatUnread class="icon-router" />
          Messages
        </RouterLink>
        <RouterLink
          class="router"
          to=""
        >
          <interviews class="icon-router" />
          Interviews
        </RouterLink>
        <RouterLink class="phones-router" to="">
          <news class="icon-router" />
          News
        </RouterLink>
        <RouterLink class="router" to="">
          <contentFire class="icon-router" />
          Content
        </RouterLink>
        <RouterLink class="phones-router" to="">
          <contacts class="icon-router" />
          Contacts
        </RouterLink>
      </nav>
      <main class="content">
        <RouterView />
      <!--        <div class="short-pictures-content"> -->
      <!--          <img -->
      <!--            alt="" -->
      <!--            class="short-content" -->
      <!--            src="" -->
      <!--          > -->
      <!--          <img -->
      <!--            alt="" -->
      <!--            class="short-content" -->
      <!--            src="" -->
      <!--          > -->
      <!--          <img -->
      <!--            alt="" -->
      <!--            class="short-content" -->
      <!--            src="" -->
      <!--          > -->
      <!--        </div> -->
      <!--        <div class="all-info"> -->
      <!--          11 -->
      <!--        </div> -->
      </main>
      <div class="additional-content">
        123
      </div>
    </div>
  </div>
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
        max-width: 30px;
        width: 100%;
        height: 100%;
      }
      .avatar-menu{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        max-width: 60px;
        position: relative;
        .avatar{
          @extend %token-style;
          border-radius: unset;
          background: unset;
          max-width: 50px;
        }
        .drop-down-list{
          @extend %token-style;
          position: absolute;
          top: 50px;
          padding: unset;
          min-width: 200px;
          min-height: 400px;
          border: 2px solid var(--border);
          //max-width: 300px;
          //max-height: 300px;
          list-style: none;
          background: var(--main-background-color);
          .btn-list{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: space-evenly;
            align-items: center;
            .btn{
              @extend %token-style;
              background: var(--btn-background-color);
              max-width: 150px;
              max-height: 50px;
            }

          }
        }
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
    .navigation {
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
        display: flex;
        text-decoration: none;
        gap: 10px;
        padding-left: 20px;
        align-items: center;
        align-content: center;
        min-width: 150px;
        max-width: 250px;
        max-height: 50px;
        background: var(--secondary-background-color);
        .icon-router{
          max-width: 25px;
          width: 100%;
          height: 100%;
        }
      }
      .phones-router{
        @extend %token-style;
        display: flex;
        gap: 10px;
        padding-left: 20px;
        align-content: center;
        min-width: 150px;
        text-decoration: none;
        user-select: none;
        align-items: center;
        max-width: 250px;
        max-height: 50px;
        background: var(--secondary-background-color);
        .icon-router{
          max-width: 25px;
          width: 100%;
          height: 100%;
        }
      }
    }

    .content {
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
    .top-navigation-bar{
      justify-content: center;
    }
    .page{
      justify-content: flex-start;
      .content {
        max-width: 650px;
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
      gap: 20px;
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
      min-width: 400px;
      .content {
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
      background: var(--secondary-background-color);
      justify-content: center;
      .search-content {
        max-width: 380px;

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
        max-width: 55px;

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

      .content {
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
          max-height: 150px;

          .short-content {
            @extend %token-style;
            border-radius: unset;
            max-width: 125px;
            max-height: 125px;
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

      #navigation {
        max-width: none;
        max-height: 60px;
        flex-direction: row;
        align-items: flex-end;

        .phones-router {
          padding-left: unset;
          min-width: unset;

          justify-content: center;
          border-radius: unset;
          border-top: 1px solid var(--border);
          background: var(--secondary-background-color);
          text-indent: -9999px;
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
        min-width: 200px;
        max-width: 300px;
        padding-left: 15px;
      }
      .user-implecation {
        .avatar-menu{
          .drop-down-list {
            left: -140px
          }
        }
      }
    }
    .page{
      min-width: 200px;
      .content{
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
      .content{
        .all-info{
          max-width: 350px;
          max-height: 415px;
        }
      }
    }
  }
}
</style>