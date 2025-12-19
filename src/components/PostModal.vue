<script setup lang="ts">
import ModalBase from "./ModalBase.vue";
import {randomUserPost} from "../Models/InterfaceRandomUserPost.ts";
import PostComment from "./PostComment.vue";
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import {getRandomInt} from "../composition/metods.ts";
import {InterfaceCommentInPost} from "../Models/InterfaceCommentInPost.ts";
import whiteLikeIcon from "/src/assets/icons/heart-svgrepo-com.svg"
import commentIcon from "/src/assets/icons/comment-icon.svg"
import shareIcon from "/src/assets/icons/share-svgrepo-com.svg"
import {BriefUserDto} from "../Models/Dto/BriefUserInformationDto.ts";
import {randomPhoto, UserApi} from "../Api/AccessApi.ts";

const emit =  defineEmits<{
  (e: 'changeLikeColor'): void
  (e: 'close'): void
}>()

const props = defineProps<{
  userPost: randomUserPost,
  postLikes: number,
  currentColor: string
}>()
UserApi.getUser(parseInt(localStorage.getItem('token')!))
    .then(res => {
      mainUser.value.id = res.id
      mainUser.value.name = res.name
      return res
    })
    .catch(res => {
      console.log('User ID', res.id)
      console.log('User name', res.name)
    })
    .then(() =>{
      randomPhoto(mainUser.value.id)
          .then(res => {
            mainUser.value.photoUrl = res
          })
    })

const mainUser = ref<BriefUserDto>({id: -1, name: '', photoUrl: ''})
const postComments = ref<InterfaceCommentInPost[]>([{
  briefUserInfo: {id: -1, name: 'example', photoUrl: ''},
  comment: {id: -1, body: 'example', tittle: 'example'},
  commentLikes: getRandomInt(1, 100)
}])
const comment = ref('')
const inputRef = ref<HTMLInputElement>()
const commentsContainerRef = ref<HTMLInputElement>()
async function sendComment(text: string) {
  if (text.trim().length < 1) return;

  const newComment: InterfaceCommentInPost = {
    briefUserInfo: { ...mainUser.value },
    comment: {
      id: Date.now(),
      body: text,
      tittle: 'New comment'
    },
    commentLikes: getRandomInt(1, 100)
  }
  postComments.value.push(newComment);
  comment.value = '';

  await nextTick();

  const modalWrapper = document.querySelector('.watch-modal');
  if (modalWrapper) {
    modalWrapper.scrollTo({
      top: modalWrapper.scrollHeight,
      behavior: 'smooth'
    });
  }
}
onMounted(() =>{
  inputRef.value?.focus()
  document.documentElement.style.overflowY = 'hidden'
})
onUnmounted(() =>{
  document.documentElement.style.overflowY = 'auto'
})
</script>

<template>
  <ModalBase @click.self="emit('close')">
    <div class="post-and-comments-modal">
      <div class="post-modal">
        <router-link class="user-post-link-modal" :to="{name: 'Profile', params: {id: userPost.userId}}">
          <div class="user-post-profile-modal">
            <img
              alt=""
              class="post-avatar-modal"
              :src="userPost.photoUrl"
            >
            {{ userPost.userName }}
          </div>
        </router-link>
        <div class="post-info-modal">
          {{ userPost.post.body }}
        </div>
        <div class="post-interactive-modal">
          <div class="post-like-modal">
            <span>{{ postLikes }}</span>
            <whiteLikeIcon
              class="post-icon-modal"
              :stroke="currentColor"
              @click="emit('changeLikeColor')"
            />
          </div>
          <div class="post-share-modal">
            <shareIcon class="post-icon-modal" />
            <span>Share</span>
          </div>
        </div>
      </div>
      <div class="comments-window-modal">
        <div ref="commentsContainerRef" class="watch-comments-container-modal">
          <PostComment
            v-for="item in postComments"
            :key="item"
            :currentColor="currentColor"
            :user="item"
            @changeLikeColor="emit('changeLikeColor')"
          />
        </div>
        <div class="write-comment-container-modal">
          <input
            ref="inputRef"
            v-model="comment"
            class="write-comment-modal"
            placeholder="Write comment..."
            type="text"
            @keyup.enter="sendComment(comment)"
          >
          <commentIcon class="send-comment-modal" @click="sendComment(comment)" />
        </div>
      </div>
    </div>
  </ModalBase>
</template>

<style lang="scss">
.post-and-comments-modal{
  display: flex;
  margin: auto;

  flex-direction: column;
  max-width: 700px;
  border: 2px solid rgba(var(--color-border-blocks), 1);
  color: rgb(var(--color-font));
  border-radius: 15px;
  background: rgba(var(--color-second-bg), 1);
  gap: var(--gap-posts);

  .post-modal{
    display: flex;
    flex-direction: column;

    gap: var(--gap-posts);
    padding: 15px 15px 0;

    .user-post-link-modal{
      width: fit-content;
      color: rgb(var(--color-font));
      text-decoration: none;
      .user-post-profile-modal{
        display: flex;
        gap: var(--gap-picture);
        align-items: center;
        .post-avatar-modal{
          width: 40px;
          height: 40px;
        }
      }
    }
    .post-interactive-modal{
      display: flex;
      gap: 20px;
      max-height: 30px;
      .post-like-modal{
        display: flex;
        gap: 10px;
        align-items: center;
        .post-icon-modal{
          cursor: pointer;
          width: 25px;
          height: 25px;
          transition: stroke 0.2s, transform 0.1s;
        }
        .post-icon-modal:active{
          stroke: tomato;
          transform: scale(0.88);
        }
      }
      .post-share-modal{
        display: flex;
        gap: 10px;
        align-items: center;
        .post-icon-modal{
          height: 25px;
          width: 25px;
        }
      }
    }
  }
  .post-modal::after{
    content: '';
    height: 2px;
    background: rgb(var(--color-border-blocks));
    width: 100%;
  }
  .comments-window-modal{
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px;
    gap: var(--gap-posts);
    .write-comment-container-modal{
      display: flex;
      gap: var(--gap-post-comments);
      width: 100%;
      .write-comment-modal{
        width: 100%;
        height: var(--size-write-comment);
        padding: 0 10px;
        color: rgb(var(--color-font));
        background: rgb(var(--color-main-bg));
        border-radius: 12px;
        border: unset;
      }
      .send-comment-modal{
        width: var(--size-write-comment);
        height: var(--size-write-comment);
        cursor: pointer;
      }
    }
    .watch-comments-container-modal{
      display: flex;
      flex-direction: column;
      gap: var(--gap-post-comments)
    }
    .watch-comments-container-modal::after{
      content: '';
      height: 2px;
      background: rgb(var(--color-border-blocks));
      width: 100%;
    }
  }
}

</style>

