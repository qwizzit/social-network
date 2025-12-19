<script setup lang="ts">
import whiteLikeIcon from "/src/assets/icons/heart-svgrepo-com.svg"
import shareIcon from "/src/assets/icons/share-svgrepo-com.svg"
import {InterfaceCommentInPost} from "../Models/InterfaceCommentInPost.ts";
const emit =  defineEmits<{
  (e: 'changeLikeColor'): void
}>()
const props = defineProps<{
  user: InterfaceCommentInPost
  currentColor: string
}>()
</script>

<template>
  <div class="comment">
    <router-link class="user-comment-link-modal" :to="{name: 'Profile', params: {id: user.briefUserInfo.id}}">
      <div class="user-comment-profile-modal">
        <img
          alt=""
          class="comment-avatar-modal"
          :src="user.briefUserInfo.photoUrl"
        >
        {{ user.briefUserInfo.name }}
      </div>
    </router-link>
    <div class="comment-info-modal">
      {{ user.comment.body }}
    </div>
    <div class="comment-interactive-modal">
      <div class="comment-like-modal">
        <span>{{ user.commentLikes }}</span>
        <whiteLikeIcon
          class="comment-icon-modal"
          :stroke="currentColor"
          @click="emit('changeLikeColor')"
        />
      </div>
      <div class="comment-share-modal">
        <shareIcon class="comment-icon-modal" />
        <span>Share</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.comment {
  display: flex;
  flex-direction: column;

  gap: var(--gap-posts);
  padding: 15px 15px 0;

  .user-comment-link-modal{
    width: fit-content;
    color: rgb(var(--color-font));
    text-decoration: none;
    .user-comment-profile-modal{
      display: flex;
      gap: var(--gap-picture);
      align-items: center;
      .comment-avatar-modal{
        width: 40px;
        height: 40px;
      }
    }
  }
  .comment-info-modal{
  }
  .comment-interactive-modal{
    display: flex;
    gap: 20px;
    max-height: 30px;
    .comment-like-modal{
      display: flex;
      gap: 10px;
      align-items: center;
      .comment-icon-modal{
        cursor: pointer;
        width: 25px;
        height: 25px;
        transition: stroke 0.2s, transform 0.1s;
      }
      .comment-icon-modal:active{
        stroke: tomato;
        transform: scale(0.88);
      }
    }
    .comment-share-modal{
      display: flex;
      gap: 10px;
      align-items: center;
      .comment-icon-modal{
        height: 25px;
        width: 25px;
      }
    }
  }
}
</style>