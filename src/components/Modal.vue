<script setup lang="ts">
import {computed, onUnmounted, ref} from "vue";

const props = defineProps<{
  imageUrl: string
}>()
const isDragging = ref(false)
const imagePosition = ref<{x: number, y: number}>({x: 0, y: 0})
const offset = ref<{x: number, y: number}>({x: 0, y: 0})

const imageStyle = computed(() => ({
  position: 'absolute',
  // transform: `translate3d(${imagePosition.value.x}px, ${imagePosition.value.y}px, 0) scale3d(1, 1, 1)`,
  left: `${imagePosition.value.x}px`,
  top: `${imagePosition.value.y}px`,
  cursor: isDragging.value ? 'grabbing' : 'grab',
}))

const onMouseDown = (event: MouseEvent) => {
  isDragging.value = true
  offset.value.x = event.clientX - imagePosition.value.x
  offset.value.y = event.clientY - imagePosition.value.y
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event: MouseEvent) => {
  if(isDragging.value){
    let newX = event.clientX - offset.value.x;
    let newY = event.clientY - offset.value.y;
    newX = Math.max(0, newX);
    newY = Math.max(0, newY);
    imagePosition.value.x = newX;
    imagePosition.value.y = newY;
  }
}

const onMouseUp = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});
</script>

<template>
  <div class="watch">
    <img
      alt="image"
      class="image"
      draggable="false"
      :src="imageUrl"
      :style="imageStyle"
      @mousedown="onMouseDown"
    >
  </div>
</template>

<style lang="scss">
.watch{
  display: flex;
  align-items: center;
  justify-content: center;
  .image{
    touch-action: none;
    user-select: none;
    z-index: 7;
  }
}

</style>