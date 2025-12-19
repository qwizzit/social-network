<script setup lang="ts">
import {imageUrlAlt} from "../composition/metods.ts";
import {computed, onMounted, ref} from "vue";
import {AlbumsApi} from "../Api/AccessApi.ts";
import ImgModal from "./ImgModal.vue";

const props = defineProps<{
  id: number;
  numbersOfAlbums: {
    firstAlbumId: number,
    lastAlbumId: number
  }
}>()
const imageSrc = ref<string>();
const openedAlbums = ref<number[]>([])
const albumPreview = ref<string[]>([])
const isMoreAlbums = ref(false)
const albums = ref<{ title: string, id: number, userId: number, images: string[] }[]>([])

const visibleAlbums = computed(() => {
  if (isMoreAlbums.value) {
    return albums.value
  } else {
    return albums.value.slice(0, 3)
  }
})
function loadPreview(){
  albums.value.forEach((album: {title: string, userId: number, images: string[]}) => {
    if(!albumPreview.value.includes(album.images[0])) {
      albumPreview.value.push(album.images[0])
    }
  })
}
function uploadAlbum(albumId: number) {
  AlbumsApi.getUserAlbum(props.id, albumId)
      .then(resp => {
        albums.value.push(resp)
      })
}

function remainingAlbums(indexFirstAlbum: number, indexLastAlbum: number){
  uploadedNeededAlbums(indexFirstAlbum, indexLastAlbum)
  isMoreAlbums.value = !isMoreAlbums.value
}
function isAlbumOpened(albumId: number): boolean {
  return openedAlbums.value.includes(albumId);
}
function uploadedNeededAlbums(indexFirstAlbum: number, indexLastAlbum: number){
  for(let albumId = indexFirstAlbum; albumId < indexLastAlbum; albumId++){
    uploadAlbum(albumId)
  }
  loadPreview();
}
function toggleAlbum(albumId: number) {
  const index = openedAlbums.value.indexOf(albumId);
  if (index > -1) {
    openedAlbums.value.splice(index, 1);
  } else {
    openedAlbums.value.push(albumId);
  }
}
function watchImage(event: Event){
  imageSrc.value = (event.target as HTMLImageElement).src
}
function closeModal() {
  imageSrc.value = undefined
}
onMounted(() => uploadedNeededAlbums(props.numbersOfAlbums.firstAlbumId, props.numbersOfAlbums.firstAlbumId + 3))
</script>

<template>
  <div
    v-for="album in visibleAlbums"
    :key="album.id"
    class="album-container"
  >
    <span class="name">{{ album.title }}</span>
    <div class="album">
      <img
        v-if="!isAlbumOpened(album.id)"
        alt="photo"
        class="album-photo"
        :src="album.images[0]"
        @click="watchImage"
        @error="imageUrlAlt"
      >
      <div class="more-album-photos">
        <a
          v-if="!isAlbumOpened(album.id)"
          class="btn-more-albums"
          @click="toggleAlbum(album.id)"
        >
          More pictures...
        </a>
        <div v-if="isAlbumOpened(album.id)" class="photos">
          <img
            v-for="photo in album.images"
            :key="photo"
            alt="photo"
            class="album-photo"
            :src="photo"
            @click="watchImage"
            @error="imageUrlAlt"
          >
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isMoreAlbums">
    <a class="btn-more-albums" @click="remainingAlbums(numbersOfAlbums.firstAlbumId + 2, numbersOfAlbums.lastAlbumId)">
      More albums... ({{ numbersOfAlbums.lastAlbumId - numbersOfAlbums.firstAlbumId + 1 - visibleAlbums.length }} left)
    </a>
  </div>
  <teleport to="body">
    <transition name="modal-drop">
      <ImgModal
        v-if="!!imageSrc"
        :imageUrl="imageSrc"
        @close="closeModal"
      />
    </transition>
  </teleport>
</template>

<style lang="scss">

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
    padding: 10px;
    border-bottom: var(--border-dark-subtle);
    .album-photo{
      cursor: pointer;
      box-shadow: 0 0 10px rgba(var(--color-box-shadow-avatars), 1);
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
@media (max-width: 768px) {
  .album{
    .album-container{
      min-width: 0;
      flex-shrink: 1;
    }
  }
}
</style>