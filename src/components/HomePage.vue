<script setup lang="ts">
import {getRandomInt, usersData} from "../composition/metods.ts";
import {Album} from "../Models/UserAlbums.ts";
const asd = getPhotoUrl()
function getPhotoUrl() {
  const user = getRandomInt(1, 10)
  const randomPhotoId = getRandomInt(1, 50)
  const userAlbums = usersData.getAlbums().filter((album : Album) => album.userId === user);
  const randomAlbum = userAlbums[getRandomInt(0, userAlbums.length - 1)];
  const randomAlbumId = randomAlbum.id;

  for(let i = 0; i < usersData.getPhotos().length; i += 50){
    if(usersData.getPhotos()[i].albumId === randomAlbumId) {
      return usersData.getPhotos()[i + randomPhotoId].url
    }
  }
}

</script>

<template>
  <div class="short-pictures-content">
    <img
      alt="1"
      class="short-content"
      :src="asd"
    >
    <img
      alt="2"
      class="short-content"
      :src="asd"
    >
    <img
      alt="3"
      class="short-content"
      :src="asd"
    >
  </div>
  <div class="all-info">
    11
  </div>
</template>

<style lang="scss">

//%token-style {
//  border: var(--border);
//  color: var(--font-color);
//  background: var(--main-background-color);
//  border-radius: 15px;
//  width: 100%;
//  height: 100%;
//}
//.content {
//  @extend %token-style;
//  height: auto;
//  aspect-ratio:  1 / 1;
//  max-width: 800px;
//  min-width: 400px;
//  .short-pictures-content {
//    @extend %token-style;
//    height: auto;
//    aspect-ratio: 3 / 1;
//    display: flex;
//    justify-content: space-around;
//    align-items: center;
//    max-width: 800px;
//
//    .short-content {
//      @extend %token-style;
//      height: auto;
//      aspect-ratio: 1 / 1;
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      min-width: 100px;
//      max-width: 200px;
//
//    }
//  }
//
//  .all-info {
//    @extend %token-style;
//    background: var(--secondary-background-color);
//    height: auto;
//    aspect-ratio: 1 / 1;
//    max-width: 800px;
//    min-width: 450px;
//  }
//}
//@media (max-width: 1200px) {
//  .all-info {
//    min-width: 650px;
//    max-width: 800px;
//  }
//}
//@media (max-width: 992px) {
//  .all-info {
//    min-width: 350px;
//  }
//}
//@media (max-width: 768px) {
//  .short-pictures-content {
//    justify-content: space-evenly;
//    align-items: center;
//    max-height: 120px;
//
//    .short-content {
//      border-radius: unset;
//      max-width: 100px;
//      max-height: 100px;
//      background: white;
//    }
//  }
//
//  .all-info {
//    max-width: 600px;
//    min-width: 100px;
//    max-height: 500px;
//  }
//}
//
//@media (max-width: 600px) {
//
//  .short-pictures-content {
//    max-height: 200px;
//    .short-content {
//      max-height: 110px;
//      max-width: 110px;
//    }
//  }
//  .all-info{
//    max-height: 575px;
//    max-width: 350px;
//    aspect-ratio: 1 / 4;
//  }
//}
//@media (max-width: 420px) {
//
//  .all-info{
//    max-width: 350px;
//    max-height: 415px;
//  }
//}
</style>
