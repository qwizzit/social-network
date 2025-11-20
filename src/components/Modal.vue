<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, unref} from "vue";

const props = defineProps<{
  imageUrl: string
}>()
const imageRef = ref<HTMLImageElement>();
const isDragging = ref(false)
const isImageGoCenter = ref(true)
const imagePosition = ref<{x: number, y: number}>({x: 0, y: 0})
const offset = ref<{x: number, y: number}>({x: 0, y: 0})
const center = ref({x: 0, y: 0})
const scale = ref(1)
const powerOfScale = ref(2)
const zoomStep = 0.3
let pressTimer: null | number = null
const pressDelay = 100
const imageStyle = computed(() => ({
  position: 'absolute',
  transform: `translate3d(${imagePosition.value.x}px, ${imagePosition.value.y}px, 0) scale3d(${scale.value}, ${scale.value}, 1)`,
  cursor: isDragging.value ? 'grabbing' : 'zoom-in',
  transition: isDragging.value || isImageGoCenter.value ? 'none' : 'ease 0.25s'
}))
const toggleScale = () =>{
  scale.value = scale.value === powerOfScale.value / 2 ? powerOfScale.value : powerOfScale.value / 2
}
const wheel =  (event : WheelEvent)=> {
  event.preventDefault()
  if (event.deltaY < 0) {
    scale.value = Math.min(powerOfScale.value, scale.value + zoomStep);
  } else {
    scale.value = Math.max(powerOfScale.value / 2, scale.value - zoomStep);
  }
}
const onMouseDown = (event: MouseEvent) => {
  pressTimer = setTimeout(() => {
    isDragging.value = true
    offset.value.x = event.clientX - imagePosition.value.x
    offset.value.y = event.clientY - imagePosition.value.y
    window.addEventListener('mousemove', onMouseMove)
  }, pressDelay)
  window.addEventListener('mouseup', onMouseUp)

}

const onMouseMove = (event: MouseEvent) => {
  if(isDragging.value){
    imagePosition.value.x = event.clientX - offset.value.x;
    imagePosition.value.y = event.clientY - offset.value.y;
  }
}


const onMouseUp = () => {
  if (pressTimer) {
    clearTimeout(pressTimer);
    pressTimer = null;
    if (!isDragging.value) {
      toggleScale();
    }
    else {
      isImageGoCenter.value = false
      imagePosition.value = {...center.value}
      setTimeout(() => {
        isImageGoCenter.value = true
      }, 300)
    }
  }
  isDragging.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);

}

function comfortableSizeImage(width: number, height: number, slightDecrease: number, middleDecrease: number, strongDecrease: number){
  if(height > 500 || width > 500){
    if(height > 750 || width > 750){
      if (height > 1000 || width > 1000){
        scale.value /= strongDecrease;
        powerOfScale.value /= strongDecrease;
      } else{
        scale.value /= middleDecrease;
        powerOfScale.value /= middleDecrease;
      }
    } else{
      scale.value /= slightDecrease;
      powerOfScale.value /= slightDecrease;
    }
  }
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});

onMounted(() => {
  imagePosition.value = {
    y: (window.innerHeight / 2) - (unref(imageRef)?.height / 2),
    x: (window.innerWidth / 2) - (unref(imageRef)?.width / 2)
  }
  if(window.innerWidth > 1200){
    comfortableSizeImage(unref(imageRef)?.width, unref(imageRef)?.height, 1.2, 2, 3)
  } else if(window.innerWidth > 780){
    comfortableSizeImage(unref(imageRef)?.width, unref(imageRef)?.height, 1.5, 2.5, 2.5)
  } else{
    comfortableSizeImage(unref(imageRef)?.width, unref(imageRef)?.height, 2.2, 2.8, 3.5)
  }
  console.log(unref(imageRef)?.height, unref(imageRef)?.width)
  center.value.x = imagePosition.value.x
  center.value.y = imagePosition.value.y
})
</script>

<template>
  <img
    ref="imageRef"
    alt="image"
    class="image"
    draggable="false"
    :src="imageUrl"
    :style="imageStyle"
    @mousedown="onMouseDown"
    @wheel.prevent="wheel"
  >
</template>

<style lang="scss">


.image{
  top: 0;
  left: 0;
  touch-action: none;
  user-select: none;
  z-index: 7;
}


</style>