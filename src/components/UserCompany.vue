<script setup lang="ts">

const props = defineProps<{
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}>()
</script>

<template>
  <div class="main-company-info">
    <img
      alt="company-avatar"
      class="company-avatar"
      src=""
    >
    <div class="company-addresses">
      <span class="company-address token-style">{{ company.name }}</span>
      <span id="need-an-ellipsis" class="company-address token-style">
        {{ company.bs }}, {{ company.catchPhrase }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.main-company-info {
  padding: var(--padding-profile-inner-blocks);
  gap: var(--gap-page);
  display: flex;
  align-items: center;
  .company-addresses{
    display: flex;
    flex-direction: column;
    gap: var(--gap-page);
    .company-address{
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
  .company-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: white;
    box-shadow: 0 0 20px rgba(var(--color-box-shadow-avatars), 1);
    border-radius: 50%;
  }
}
@media (max-width: 768px) {
  .main-company-info{
    flex-direction: column;
    .company-addresses{
      .company-address{
        max-width: calc(var(--max-width-info-blocks) / 1.25);
      }
    }
    .company-avatar{
      width: 150px;
      height: 150px;
    }
  }
}
</style>