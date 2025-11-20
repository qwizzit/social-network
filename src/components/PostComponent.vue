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
  <div class="post">
    <div class="user-post-avatar">
      <router-link :to="{name: 'Profile', params: {id: user.userId}}">
        <img
          alt=""
          class="post-avatar"
          :src="user.photoUrl"
        >
      </router-link>
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

<style lang="scss">
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

@media (max-width: 1200px) {
  .post{
    max-width: unset;
  }
}
</style>