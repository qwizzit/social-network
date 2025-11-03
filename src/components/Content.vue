<script setup lang="ts">
import PostComponent from "./PostComponent.vue";
import {getRandomInt, imageUrlAlt, randomUser} from "../composition/metods.ts";
import {onMounted, ref} from "vue";
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";
import {PostApi, randomPhoto, UserApi} from "../Api/AccessApi.ts";
const emit = defineEmits<{
  (e: 'zoomPhoto', value: typeof props.isImageWatching): void
}>()
const props = defineProps<{
  isImageWatching: {
    url: string,
    toggle: boolean
  }
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
    url: event.target.src,
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
      class="post"
      :user="userPost"
    />
  </div>
</template>

<style lang="scss">
.short-pictures-content {
  gap: 15px;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .short-content {
    height: auto;
    background: white;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 0;
    max-width: calc((var(--max-width-main-info) - var(--width-page) / 4 - var(--padding-home-pictures) * 2 - var(--gap-home-pictures) * 2 - var(--gap-page) - var(--padding-left-and-right-content) * 2) / 3);

  }
}
.all-info {
  display: flex;
  margin-bottom: var(--gap-posts);
  height: auto;
  flex-direction: column;
  gap: var(--gap-posts);
  align-items: center;
  .post{
    display: grid;
    border: 2px solid rgba(var(--color-border-blocks), 1);
    background: rgba(var(--color-second-bg), 1);
    border-radius: 15px;
    width: 100%;
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
@media (max-width: 1200px) {
  .all-info{
    .post{
      max-width: unset;
    }
  }
}

@media (max-width: 992px) {
  .all-info {
    min-width: 350px;
  }
}
@media (max-width: 768px) {
  .short-pictures-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    //max-height: 150px;
    .short-content {
      //max-width: 125px;
      //max-height: 125px;
      background: white;
    }
  }
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

