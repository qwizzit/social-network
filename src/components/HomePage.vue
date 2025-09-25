<script setup lang="ts">
import PostComponent from "./PostComponent.vue";
import {getRandomInt, randomPhoto, randomUser, usersData} from "../composition/metods.ts";
import {onMounted, ref} from "vue";
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";

const posts = ref<randomUserPost[]>([])
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
    // localStorage.removeItem("uploadedPosts");
    posts.value = usersData.getUploadedPosts()
  }
}
function randomPost() {
  const allPosts = usersData.getPosts()
  let user = {userId: -1, userName: '', photoUrl: '', post: {id: '', body: '', title: ''}}
  user.userId = getRandomInt(1, 10);
  user.userName = allUsers[user.userId - 1].name;
  const post = getRandomInt((user.userId - 1) * 10 + 1, (user.userId - 1) * 10 + 10);
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


