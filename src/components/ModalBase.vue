<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="watch-modal" @click.self="emit('close')">
    <div class="modal-content" @click.self="emit('close')">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.watch-modal {
  position: fixed;
  overflow-y: auto;
  display: flex;
  inset: 0;
  justify-content: center;
  align-items: center;
  z-index: 6;
  padding: var(--padding-left-and-right-content);
  background: rgba(var(--color-main-bg), .5);
}

.modal-content {
  display: flex;
  margin: auto;
  //justify-content: center;
  //align-items: center;
}
</style>