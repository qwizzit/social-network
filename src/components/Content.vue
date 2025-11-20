<script setup lang="ts">
import PostComponent from "./PostComponent.vue";
import {getRandomInt, imageUrlAlt, randomUser} from "../composition/metods.ts";
import {onMounted, ref} from "vue";
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";
import {PostApi, randomPhoto, UserApi} from "../Api/AccessApi.ts";
import {isImageWatchingInterface} from "../Models/isImageWatchingInterface.ts";
const emit = defineEmits<{
  (e: 'zoomPhoto', value: isImageWatchingInterface): void
}>()

const posts = ref<randomUserPost[]>([])
const postsId = <number[]>[]
let userPhoto = ''
randomPhoto(randomUser())
    .then(resp => {
      userPhoto = resp
    })
async function fetchPosts() {
  const requiredNumberOfPosts = 20
  if(posts.value.length !== requiredNumberOfPosts) {
    for (let numberOfPost = 0; posts.value.length < requiredNumberOfPosts; numberOfPost++) {
      await randomPost()
          .then(resp => {
            if (resp) {
              posts.value[numberOfPost] = resp
            } else {
              numberOfPost--
            }
          })
    }
  }
}
async function randomPost() {
  let user = {userId: -1, userName: '', photoUrl: '', post: {id: -1, body: '', title: ''}}
  user.userId = getRandomInt(1, 10);
  const userInfo = UserApi.getUser(user.userId)
  const postInfo = PostApi.getAllUserPosts(user.userId)
  let isReturn = undefined
  await Promise.all([userInfo, postInfo])
      .then(([respUser, respPost]) => {
        user.userName = respUser.name
        const {userId, ...post} = respPost[getRandomInt(0, 10)];
        user.post = {...post}
      }).then(() => {
        if(!postsId.includes(user.post.id)){
          postsId.push(user.post.id);
          isReturn = true
        }
  })
  if(isReturn){
    return user
  }
  return isReturn
}
function zoomImage(event: Event){
  const giveImage = {
    url: (event.target as HTMLImageElement).src,
    toggle: true
  }
  emit('zoomPhoto', giveImage)
}
onMounted(fetchPosts)
</script>

<template>
  <div class="short-pictures-content token-style">
    <img
      v-for="n in 3"
      :key="n"
      class="short-content token-style"
      :alt="n.toString()"
      :src="userPhoto"
      @click="zoomImage"
      @error="imageUrlAlt"
    >
    <!--    @error="imageUrlAlt" -->
  </div>
  <div class="all-info">
    <PostComponent
      v-for="userPost in posts"
      :key="userPost.userId"
      :user="userPost"
    />
  </div>
</template>

<style lang="scss">
.short-pictures-content {
  gap: 15px;
  padding: 5px;
  display: flex;
  height: auto;
  justify-content: space-around;
  align-items: center;
  .short-content {
    height: auto;
    background: white;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    min-width: 0;
    //max-width: calc((var(--max-width-main-info) - var(--width-page) / 4 - var(--padding-home-pictures) * 2 - var(--gap-home-pictures) * 2 - var(--gap-page) - var(--padding-left-and-right-content) * 2) / 3);

  }
}
.all-info {
  display: flex;
  margin-bottom: var(--gap-posts);
  height: auto;
  flex-direction: column;
  gap: var(--gap-posts);
  align-items: center;
}
@media (max-width: 1200px) {
  .short-pictures-content{
    //max-height: 320px;
  }
}

@media (max-width: 992px) {
  .all-info {
    min-width: 350px;
  }
}
@media (max-width: 768px) {
  .all-info {
    min-width: 100px;
    max-height: unset;
    margin-bottom: calc(var(--size-phones-router) + var(--gap-posts));
  }
}
@media (max-width: 600px) {
  .short-pictures-content {
    gap: 10px;
    max-height: 200px;
  }
}
</style>

