<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import ModalBase from "./ModalBase.vue";
import {useWindowSize} from "@vueuse/core";
const emit = defineEmits<{
  (e: 'close'): void
}>()
const props = defineProps<{
  imageUrl: string
}>()

const {width, height} = useWindowSize()
const imageRef = ref<HTMLImageElement>();
const isDragging = ref(false)
const isImageTransition = ref(true)
const imagePosition = ref<{x: number, y: number}>({x: 0, y: 0})
const offset = ref<{x: number, y: number}>({x: 0, y: 0})
const center = ref({x: 0, y: 0})
const scale = ref(1)
const powerOfScale = ref(2)
const zoomStep = 0.3
const imageStyle = computed(() => ({
  transform: `translate3d(${imagePosition.value.x}px, ${imagePosition.value.y}px, 0) scale3d(${scale.value}, ${scale.value}, 1)`,
  cursor: isDragging.value ? 'grabbing' : 'zoom-in',
  transition: isDragging.value || isImageTransition.value ? 'none' : 'ease 0.25s'
}))
const toggleScale = () =>{
  scale.value = scale.value === powerOfScale.value / 2 ? powerOfScale.value : powerOfScale.value / 2
}
const isOverflowing = computed(() => {
  if (!imageRef.value) return false;
  const scaledWidth = imageRef.value.width * scale.value;
  const scaledHeight = imageRef.value.height * scale.value;

  return scaledWidth > width.value || scaledHeight > height.value;
});
const {
  onMouseDown,
  onMouseUp,
  onMouseMove,
  wheel
} = (()=>{
  const wheel = (event: WheelEvent)=> {
    event.preventDefault()
    isImageTransition.value = false
    if (event.deltaY < 0) {
      scale.value = Math.min(powerOfScale.value, scale.value + zoomStep);
    } else {
      scale.value = Math.max(powerOfScale.value / 2, scale.value - zoomStep);
    }
  }
  const onMouseDown = (event: MouseEvent) => {
    isDragging.value = true
    offset.value.x = event.clientX - imagePosition.value.x
    offset.value.y = event.clientY - imagePosition.value.y
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

  }

  const onMouseMove = (event: MouseEvent) => {
    if(isDragging.value){
      imagePosition.value.x = event.clientX - offset.value.x;
      imagePosition.value.y = event.clientY - offset.value.y;
    }
  }

  const onMouseUp = () => {
    isImageTransition.value = false
    if(imagePosition.value.x === center.value.x && imagePosition.value.y === center.value.y) {
      toggleScale()
    } else if(!isOverflowing.value ||
        Math.abs(imagePosition.value.x - center.value.x) > 900 ||
        Math.abs(imagePosition.value.y - center.value.y) > 900) {
      imagePosition.value = {...center.value}
    }
    isDragging.value = false
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  return {
    wheel,
    onMouseDown,
    onMouseMove,
    onMouseUp
  }
})();

const {
  init
} = (() => {
  function setCurrentSize() {
    if (imageRef.value) {
      const currentSize = {
        width: imageRef.value.naturalWidth,
        height: imageRef.value.naturalHeight,
      };
      const heightDifference = currentSize.height / height.value;
      const widthDifference = currentSize.width / width.value;
      // console.log('Высота картинки', currentSize.height, 'Высота экрана', height.value);
      // console.log('Длина картинки', currentSize.width, 'Длина экрана', width.value);
      // console.log('Разница высоты: ', heightDifference, 'Разница длины: ', widthDifference);
      if (heightDifference > 0.9) {
        currentSize.height = currentSize.height / heightDifference - 80;
        // console.log('Получаемая высота картинки', currentSize.height);
      }
      if (widthDifference > 0.9) {
        currentSize.width = currentSize.width / widthDifference - 100;
        // console.log('Получаемая длина картинки', currentSize.width);
      }
      imageRef.value.width = currentSize.width;
      imageRef.value.height = currentSize.height;
    }
  }
  return {
    init: setCurrentSize
  }
})()

onUnmounted(() => {
  document.documentElement.style.overflowY = 'auto'
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('resize', init);
});

onMounted(() => {
  document.documentElement.style.overflowY = 'hidden'
  window.addEventListener('resize', init);
})
</script>

<template>
  <ModalBase @close="emit('close')">
    <img
      ref="imageRef"
      alt="image"
      class="image"
      draggable="false"
      :src="imageUrl"
      :style="imageStyle"
      @load="init"
      @mousedown="onMouseDown"
      @wheel.prevent="wheel"
    >
  </ModalBase>
</template>

<style lang="scss">

.image{
  touch-action: none;
  user-select: none;
  z-index: 7;
}


</style>