<script setup lang="ts">
import {randomPhoto} from "../Api/AccessApi.ts";
import {getRandomInt} from "../composition/metods.ts";
import {UserDto} from "../Models/Dto/UserDto.ts";
const props = defineProps<{
  user: UserDto
}>()
let userPhoto = ''
randomPhoto(getRandomInt(0, 10))
    .then(resp => {
      userPhoto = resp
    })
</script>

<template>
  <div class="user-profile-avatar">
    <img alt="user-avatar" :src="userPhoto">
  </div>
  <div class="addresses default-block">
    <a
      class="contact-info my-website token-style"
      :href="user.website"
    >{{ user.website }}</a>
    <span class="contact-info token-style">{{ user.email }}</span>
    <div class="address">
      <span class="contact-info token-style">City: {{ user.address.city }}</span>
      <span class="contact-info token-style">Street: {{ user.address.street }}</span>
      <span class="contact-info token-style">Suite: {{ user.address.suite }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.addresses{
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap-text) / 2);
  max-width: var(--max-width-info-blocks);
  max-height: var(--size-blocks-user-profile);
  .address{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .contact-info{
    max-width: var(--max-width-info-blocks);
    padding: 10px;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 40px;
    display: flex;
    align-items: center;
  }
}
.user-profile-avatar{
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  background: white;
  border-radius: 50%;
  width: var(--size-blocks-user-profile);
  height: var(--size-blocks-user-profile);
  box-shadow: 0 0 20px blue;
}
@media (max-width: 768px) {
  .user-profile-avatar{
    width: 200px;
    height: 200px;
  }
}
@media (max-width: 600px) {
  .addresses{
    .contact-info{
      max-width: calc(var(--max-width-info-blocks));
    }
  }
  .user-profile-avatar{
    width: 150px;
    height: 150px;
  }
}
</style>