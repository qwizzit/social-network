<script setup lang="ts">
import PostComponent from "./PostComponent.vue";
import {getRandomInt, randomPhoto, randomUser, usersData} from "../composition/metods.ts";
import {onMounted, ref} from "vue";
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";

// localStorage.removeItem('uploadedPosts');
const posts = ref<randomUserPost[]>([])
// const uploadedPosts = ref<string[]>([])
const allUsers = usersData.getUsers()
const userAndPhoto = randomPhoto(randomUser());
function fetchPosts() {
  const requiredNumberOfPosts = 20
  const isPosts = localStorage.getItem("uploadedPosts");
  if (!isPosts) {
    if(posts.value.length !== requiredNumberOfPosts) {
      for (let numberOfPost = 0; posts.value.length < requiredNumberOfPosts; numberOfPost++) {
        posts.value[numberOfPost] = randomPost()
      }
      localStorage.setItem("uploadedPosts", JSON.stringify(posts.value));
    }
  } else{
    posts.value = usersData.getUploadedPosts()
  }
}
function randomPost() {
  // могут загрузиться несколько раз одни и те же посты - исправить это
  const allPosts = usersData.getPosts()
  let user = {userId: -1, userName: '', photoUrl: '', post: {id: -1, body: '', title: ''}}
  user.userId = getRandomInt(1, 10);
  user.userName = allUsers[user.userId - 1].name;
  const post = getRandomInt((user.userId - 1) * 10 + 1, (user.userId - 1) * 10 + 10);
  console.log(allPosts[post]);
  user.post = allPosts[post];
  return user
}
onMounted(fetchPosts)
</script>

<template>
  <div class="short-pictures-content token-style">
    <img
      alt="1"
      class="short-content token-style"
      :src="userAndPhoto"
    >
    <img
      alt="2"
      class="short-content token-style"
      :src="userAndPhoto"
    >
    <img
      alt="3"
      class="short-content token-style"
      :src="userAndPhoto"
    >
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
    //min-width: 100px;
    //max-width: 200px;

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
    .short-content {
      //min-width: unset;
      //max-width: 110px;
    }
  }
}
</style>

