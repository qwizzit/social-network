<script setup lang="ts">
import { ref} from "vue";
import {getRandomInt} from "../composition/metods.ts";
import whiteLikeIcon from "/src/assets/icons/heart-svgrepo-com.svg"
import shareIcon from "/src/assets/icons/share-svgrepo-com.svg"
import commentIcon from "/src/assets/icons/password-minimalistic-svgrepo-com.svg"
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";
const props = defineProps<{
  user: randomUserPost
}>()
const postLikes = ref(0)
const currentColor = ref('white')

postLikes.value = getRandomInt(1, 100)
function changeColor(){
  if(currentColor.value === 'white'){
    currentColor.value = 'red'
    postLikes.value++
  } else{
    currentColor.value = 'white'
    postLikes.value--

  }
}
// randomPost()
</script>

<template>
  <div>
    <div class="user-post-avatar">
      <img
        alt=""
        class="post-avatar"
        :src="user.photoUrl"
      >
      {{ user.userName }}
    </div>
    <div class="post-info">
      {{ user.post.body }}
    </div>
    <div class="post-interactive">
      <div class="like">
        <span>{{ postLikes }}</span>
        <whiteLikeIcon
          class="post-icon"
          :stroke="currentColor"
          @click="changeColor"
        />
      </div>
      <div class="comment">
        <commentIcon class="post-icon" />
        <span>Comment</span>
      </div>
      <div class="share">
        <shareIcon class="post-icon" />
        <span>Share</span>
      </div>
    </div>
  </div>
</template>

