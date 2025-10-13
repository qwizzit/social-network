<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {UserDto} from "../Models/Dto/UserDto.ts";
import {randomPhoto, usersData} from "../composition/metods.ts";
import {AlbumDto} from "../Models/Dto/AlbumDto.ts";
import {PhotoDto} from "../Models/Dto/PhotoDto.ts";
import leftArrow from "/src/assets/icons/left-arrow.svg";
const props = defineProps<{
  id: string,
}>()
const user = ref({mainInfo: {
    id: -1, name: '', username: '', email: '',
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
    firstAlbumId: -1,
    lastAlbumId: -1
  }
})
const photosInAlbums = ref<PhotoDto[][]>([])
const openedAlbums = ref<number[]>([])
const allPhotos = usersData.getPhotos()
const albumPreview = ref<PhotoDto[]>([])
const isMoreAlbums = ref(false)

const visibleAlbums = computed(() => {
  if (isMoreAlbums.value) {
    return Array.from({ length: photosInAlbums.value.length }, (_, i) => i)
  } else {
    return Array.from({ length: Math.min(3, photosInAlbums.value.length) }, (_, i) => i)
  }
})
const initMap = () => {
  const mapElement = document.getElementById('google-api');
    if (mapElement && window.google?.maps) {
    const options = {
      center: {lat: parseInt(user.value.mainInfo.address.geo.lat), lng: parseInt(user.value.mainInfo.address.geo.lng)},
      zoom: 4
    };

    new google.maps.Map(mapElement, options);
  }
};

const loadGoogleMaps = () => {
  if (window.google?.maps) {
    initMap();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBb8TpBdAAKD81c10mDYqZcyz04x6-Ng94';
  script.async = true;
  script.defer = true;

  script.onload = () => {
    initMap();
  };

  document.head.appendChild(script);
};
function loadPreview(){
  let indexPreviewOfAlbums = <number[]>[]
  allPhotos.forEach((photo: PhotoDto) => {
    if(photo.albumId >= user.value.albums.firstAlbumId && photo.albumId <= user.value.albums.lastAlbumId && !indexPreviewOfAlbums.includes(photo.albumId)) {
      albumPreview.value.push(photo)
      indexPreviewOfAlbums.push(photo.albumId)
    }
  })
}
function whoseUserProfile() {
  const allUsers = usersData.getUsers()
  const allAlbums = usersData.getAlbums()
  user.value.mainInfo = allUsers.find((user: UserDto) => user.id === parseInt(props.id))!
  const userAlbums = allAlbums.filter((album : AlbumDto) => album.userId === user.value.mainInfo.id)
  user.value.albums.firstAlbumId = userAlbums[0].id
  user.value.albums.lastAlbumId = userAlbums[userAlbums.length - 1].id
  for(let i = user.value.albums.firstAlbumId; i < user.value.albums.lastAlbumId; i++) {
    photosInAlbums.value.push([])
  }
  loadPreview();
}
function uploadPhotos(albumId: number) {

  const updatedPhotos = [...photosInAlbums.value];
  updatedPhotos[albumId - user.value.albums.firstAlbumId] = allPhotos.filter((photo: PhotoDto) => photo.albumId === albumId)
  // console.log(albumId - user.value.albums.firstAlbumId)
  const index = openedAlbums.value.indexOf(albumId);
  if (index > -1) {
    openedAlbums.value.splice(index, 1);
  } else {
    openedAlbums.value.push(albumId - user.value.albums.firstAlbumId);
  }
  // console.log(photosInAlbums.value)
  photosInAlbums.value = updatedPhotos;
}
function isAlbumOpened(albumId: number): boolean {
  return openedAlbums.value.includes(albumId);
}
onMounted(() => {
  whoseUserProfile();
  loadGoogleMaps();
});
</script>

<template>
  <div class="full-profile">
    <div class="main-info token-style">
      <div class="something-name">
        <router-link :to="{name: 'Content'}">
          <leftArrow style="width: 25px; height: 25px;" />
        </router-link>
        <span class="name">{{ user.mainInfo.name }}</span>
      </div>
      <div class="user-profile default-block">
        <div class="user-info">
          <div class="user-profile-avatar">
            <img alt="user-avatar" :src="randomPhoto(parseInt(id))">
          </div>
          <div class="addresses default-block">
            <a
              class="contact-info token-style"
              style="text-decoration: underline"
              :href="user.mainInfo.website"
            >{{ user.mainInfo.website }}</a>
            <span class="contact-info token-style">{{ user.mainInfo.email }}</span>
            <div class="address">
              <span class="contact-info token-style">City: {{ user.mainInfo.address.city }}</span>
              <span class="contact-info token-style">Street: {{ user.mainInfo.address.street }}</span>
              <span class="contact-info token-style">Suite: {{ user.mainInfo.address.suite }}</span>
            </div>
          </div>
        </div>
        <div id="google-api" class="google-api">
          123
        </div>
      </div>
    </div>
    <div class="additional-info">
      <div class="all-albums token-style">
        <div class="something-name">
          <span class="name">Albums</span>
        </div>
        <div class="albums-spacer">
          <div class="album-container">
            <span class="name">Posted on update</span>
            <div
              v-for="albumId in visibleAlbums"
              :key="albumId"
              class="album"
            >
              <img
                v-if="!isAlbumOpened(albumId)"
                alt="photo"
                class="album-photo"
                :src="albumPreview[albumId]?.url"
              >
              <div class="more-album-photos">
                <a
                  v-if="!isAlbumOpened(albumId)"
                  style="cursor: pointer; text-decoration: underline"
                  @click="uploadPhotos(albumId + user.albums.firstAlbumId)"
                >
                  More pictures...
                </a>
                <div v-if="isAlbumOpened(albumId)" class="photos">
                  <img
                    v-for="(photo, photoId) in photosInAlbums[albumId]"
                    :key="photoId"
                    alt="photo"
                    class="album-photo"
                    :src="photo.url"
                  >
                </div>
              </div>
            </div>
            <div v-if="!isMoreAlbums && photosInAlbums.length > 3" style="padding-left: 10px">
              <a style="cursor: pointer; text-decoration: underline" @click="isMoreAlbums = !isMoreAlbums">
                More albums... ({{ photosInAlbums.length - 3 }} left)
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="company token-style">
        <div class="something-name ">
          <span class="name">Company</span>
        </div>
        <div class="company-info">
          <div class="main-company-info">
            <img
              alt="company-avatar"
              class="company-avatar"
              src=""
            >
            <div class="company-addresses">
              <span class="company-address token-style">{{ user.mainInfo.company.name }}</span>
              <span class="company-address token-style" style="display: block; align-items: unset">
                {{ user.mainInfo.company.bs }}, {{ user.mainInfo.company.catchPhrase }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss">
.something-name{
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



.full-profile{
  padding: 0 10px;
  margin-top: calc(var(--size-top-navigation) + var(--gap-page));
  display: grid;
  width: var(--width-page);
  gap: var(--gap-page);
  grid-template-rows: 350px auto;
  justify-items: center;
  .main-info{
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
      .user-info{
        display: flex;
        gap: var(--gap-page);
        .addresses{
          display: flex;
          flex-direction: column;
          gap: calc(var(--gap-text) / 2);
          max-width: var(--max-width-info-blocks);
          max-height: var(--size-blocks-user-profile);
          .address{
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          .contact-info{
            max-width: var(--max-width-info-blocks);
            padding: 10px;
            min-width: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            height: 40px;
            display: flex;
            align-items: center;
          }
        }
        .user-profile-avatar{
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1;
          background: white;
          border-radius: 50%;
          width: var(--size-blocks-user-profile);
          height: var(--size-blocks-user-profile);
          box-shadow: 0 0 20px blue;
        }
      }

      .google-api{
        z-index: 1;
        height: 100%;
        width: 100%;
      }
    }
  }
  .additional-info{
    display: flex;
    width: 100%;
    margin-bottom: calc(var(--padding-profile-outer-blocks) + var(--padding-album-spacer));
    align-items: flex-start;
    gap: var(--gap-page);
    .all-albums{
      //max-width:  calc(var(--width-page) * 2 / 3);
      overflow: hidden;
      padding: var(--padding-profile-outer-blocks) 0;
      background:  rgba(var(--color-second-bg), 1);
      .albums-spacer{
        padding: var(--padding-album-spacer);
        .album-container{
          //background: #505050;
          gap: var(--gap-page);

          //padding-bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content:  center;
          .album{
            display: flex;
            width: 100%;
            overflow-x: auto;
            gap: var(--gap-page);
            padding: 0 15px 15px 15px;
            border-bottom: var(--border-dark-subtle);
            .album-photo{
              background: white;
              box-shadow: 0 0 20px black;
              border-radius: 12px;
              width: 135px;
              height: 135px;
            }
            .more-album-photos{
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-content: center;
              .photos{
                display: flex;
                gap: var(--gap-page);
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
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
        .main-company-info {
          padding: var(--padding-profile-inner-blocks);
          gap: var(--gap-page);
          display: flex;
          align-items: center;
          .company-addresses{
            display: flex;
            flex-direction: column;
            gap: var(--gap-page);
            .company-address{
              max-width: var(--max-width-info-blocks);
              padding: 10px;
              min-width: 0;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              height: 40px;
              display: flex;
              align-items: center;
            }
          }
          .company-avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: white;
            box-shadow: 0 0 20px black;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
@media (max-width: 1200px) {

}
@media (max-width: 992px) {

}
@media (max-width: 768px) {
  .full-profile{
    flex-direction: column;
    grid-template-rows: unset;
    .main-info{
      height: auto;
      .user-profile{
        flex-direction: column;
        height: auto;
        .user-info{
          gap: var(--gap-page);
          display: flex;


          .user-profile-avatar{
            width: 200px;
            height: 200px;
          }
        }
      }
      #google-api{
        height: 300px;
      }
    }
    .additional-info{
      .all-albums{
        //max-width: calc(var(--width-smaller-page) * 2 / 3 - 10px - var(--gap-page) / 2);
        .albums-spacer{

          .album-container{
            .album{
              min-width: 0;
              flex-shrink: 1;
            }
          }
        }
      }
      .company{
        max-width: calc(var(--width-smaller-page) / 3 - 10px - var(--gap-page) / 2);
        .company-info{
          .main-company-info{
            flex-direction: column;
            .company-addresses{
              .company-address{
                max-width: calc(var(--max-width-info-blocks) / 1.25);
              }
            }
            .company-avatar{
              width: 150px;
              height: 150px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .full-profile{
    .main-info{
      .user-profile{

        .user-info{
          flex-direction: column;
          align-items: center;

          .addresses{

            .address{

            }
            .contact-info{
              max-width: calc(var(--max-width-info-blocks));
            }
          }
          .user-profile-avatar{
            width: 150px;
            height: 150px;
          }
        }
      }
      #google-api{
        border-top: var(--border-dark-subtle);

      }
    }
    .additional-info{
      flex-direction: column;
      .all-albums{
        //max-width: 355px;
        .albums-spacer{
          .album-container{
            .album{

            }
          }
        }
      }
      .company{
        max-width: none;
        .company-info{
          .main-company-info{
            .company-addresses{
              .company-address{

              }
            }
            .company-avatar{

            }
          }
        }
      }
    }
  }
}
</style>