<script setup lang="ts">
import { ref} from "vue";
import {getRandomInt} from "../composition/metods.ts";
import whiteLikeIcon from "/src/assets/icons/heart-svgrepo-com.svg"
import shareIcon from "/src/assets/icons/share-svgrepo-com.svg"
import commentIcon from "/src/assets/icons/password-minimalistic-svgrepo-com.svg"
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";
import PostModal from "./PostModal.vue";

const props = defineProps<{
  user: randomUserPost
}>()

const isPostModal = ref(false)
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
</script>

<template>
  <div class="post">
    <router-link class="user-post-link" :to="{name: 'Profile', params: {id: user.userId}}">
      <div class="user-post-profile">
        <img
          alt=""
          class="post-avatar"
          :src="user.photoUrl"
        >
        {{ user.userName }}
      </div>
    </router-link>
    <div class="post-info" @click="isPostModal = !isPostModal">
      {{ user.post.body }}
    </div>
    <div class="post-interactive">
      <div class="post-like">
        <span>{{ postLikes }}</span>
        <whiteLikeIcon
          class="post-icon"
          :stroke="currentColor"
          @click="changeColor"
        />
      </div>
      <div class="post-comment" @click="isPostModal = !isPostModal">
        <commentIcon class="post-icon" />
        <span>Comment</span>
      </div>
      <div class="post-share">
        <shareIcon class="post-icon" />
        <span>Share</span>
      </div>
    </div>
  </div>
  <div>
    <teleport to="body">
      <transition name="modal-drop">
        <PostModal
          v-if="isPostModal"
          :currentColor="currentColor"
          :postLikes="postLikes"
          :userPost="user"
          @changeLikeColor="changeColor"
          @close="isPostModal = !isPostModal"
        />
      </transition>
    </teleport>
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
  .user-post-link{
    width: fit-content;
    color: rgb(var(--color-font));
    text-decoration: none;
    .user-post-profile{
      display: flex;
      gap: var(--gap-picture);
      align-items: center;
      .post-avatar{
        width: 40px;
        height: 40px;
      }
    }
  }
  .post-interactive{
    display: flex;
    color: rgb(var(--color-font));
    gap: 20px;
    max-height: 30px;
    .post-like{
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
    .post-comment {
      display: flex;
      gap: 10px;
      align-items: center;
      .post-icon{
        height: 25px;
        width: 25px;
      }
    }
    .post-share{
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