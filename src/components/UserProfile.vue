<script setup lang="ts">
import { onMounted, ref} from 'vue';
import leftArrow from "/src/assets/icons/left-arrow.svg";
import {AlbumsApi, UserApi} from "../Api/AccessApi.ts";
import UserMainInfo from "./UserMainInfo.vue";
import GoogleApi from "./GoogleApi.vue";
import UserAlbums from "./UserAlbums.vue";
import {isImageWatchingInterface} from "../Models/isImageWatchingInterface.ts";
import UserCompany from "./UserCompany.vue";

const emit = defineEmits<{
  (e: 'isImageWatching', value: isImageWatchingInterface): void
}>()
const props = defineProps<{
  id: string,
}>()

const user = ref({
  mainInfo: {
    id: parseInt(props.id), name: '', username: '', email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    },
  },
  albums: {
    firstAlbumId: 5,
    lastAlbumId: 5
  }
})
async function whoseUserProfile() {
  await UserApi.getUser(parseInt(props.id))
      .then(resp => {
        user.value.mainInfo = resp
      })
  await AlbumsApi.getAllUserAlbums(parseInt(props.id))
      .then(resp => {
        user.value.albums.firstAlbumId = resp[0].id
        user.value.albums.lastAlbumId = resp[resp.length - 1].id
      })
}
function zoomImage(giveImage: {url: string, toggle: boolean}){
  emit('isImageWatching', giveImage)
}
onMounted(whoseUserProfile)

</script>

<template>
  <div class="full-profile">
    <div class="main-user-info token-style">
      <div class="something-name-with-svg">
        <router-link class="go-home" :to="{name: 'Content'}">
          <leftArrow class="go-home" />
        </router-link>
        <span class="name">{{ user.mainInfo.name }}</span>
      </div>
      <div class="user-profile default-block">
        <UserMainInfo :user="user.mainInfo" />
        <GoogleApi :userGeo="user.mainInfo.address.geo" />
      </div>
    </div>
    <div class="additional-info">
      <div class="all-albums token-style">
        <span class="name">Albums</span>
        <div class="albums">
          <UserAlbums
            :id="user.mainInfo.id"
            :numbersOfAlbums="user.albums"
            @zoomPhoto="zoomImage"
          />
        </div>
      </div>
      <div class="company token-style">
        <span class="name">Company</span>
        <div class="company-info">
          <UserCompany :company="user.mainInfo.company" />
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss">
.something-name-with-svg{
  display: flex;
  align-items: center;
  padding: 0 0 10px 10px;
  max-height: 60px;
  border-bottom: 1px solid rgba(var(--color-border-main), 1);
}
.name{
  padding: 10px;
}
.default-block{
  background: rgba(var(--color-second-bg), 1);
  width: 100%;
  height: 100%;
}
.go-home{
  width: 25px;
  height: 25px;
}
.my-website{
  text-decoration: underline;
}
.btn-more-albums{
  padding-left: 10px;
  cursor: pointer;
  text-decoration: underline;
}
#need-an-ellipsis{
  display: block;
}

.full-profile{
  padding: 0 10px;
  display: grid;
  max-width: var(--width-page);
  width: 100%;
  gap: var(--gap-page);
  grid-template-rows: 350px auto;
  justify-items: center;
  .main-user-info{
    background: rgba(var(--color-second-bg), 1);
    padding: var(--padding-profile-outer-blocks) 0;
    display: flex;
    flex-direction:  column;
    .user-profile{
      display: flex;
      gap: var(--gap-page);
      padding: var(--padding-profile-inner-blocks);
      justify-content: center;
      align-items: center;
    }
  }
  .additional-info{
    display: flex;
    width: 100%;
    overflow: hidden;
    margin-bottom: calc(var(--padding-profile-outer-blocks) + var(--padding-album-spacer));
    align-items: flex-start;
    gap: var(--gap-page);
    .all-albums{
      //max-width:  calc(var(--width-page) * 2 / 3);
      overflow: hidden;
      padding: var(--padding-profile-outer-blocks) 0;
      background:  rgba(var(--color-second-bg), 1);
      .albums {
        padding: var(--padding-album-spacer);
      }
    }
    .company {
      height: auto;
      padding: var(--padding-profile-outer-blocks) 0;
      background:  rgba(var(--color-second-bg), 1);
      max-width:  calc(var(--width-page) / 3);
      .company-info {
        height: 100%;
        padding: 10px 0;

      }
    }
  }
}

@media (max-width: 768px) {
  .full-profile{
    grid-template-rows: unset;
    .main-user-info{
      height: auto;
      .user-profile{
        flex-direction: column;
        height: auto;
      }
    }
    .additional-info{
      .company{
        max-width: calc(var(--width-smaller-page) / 3 - 10px - var(--gap-page) / 2);
      }
    }
  }
}
@media (max-width: 600px) {
  .full-profile{
    .additional-info{
      flex-direction: column;
      .company{
        max-width: none;
      }
    }
  }
}
</style>