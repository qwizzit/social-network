<script setup lang="ts">
  import {watch} from "vue";
  const props = defineProps<{
    userGeo: {
      lat: string,
      lng: string
    }
  }>()
  const initMap = () => {
    const mapElement = document.getElementById('google-api');
    if (mapElement && window.google?.maps) {
      const options = {
        center: {lat: parseInt(props.userGeo.lat), lng: parseInt(props.userGeo.lng)},
        zoom: 4
      };
      new google.maps.Map(mapElement, options);
    }
  };
  const loadGoogleMaps = () => {
    if (window.google?.maps) {
      initMap();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBb8TpBdAAKD81c10mDYqZcyz04x6-Ng94';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
  };
watch(() => props.userGeo, () => {
  loadGoogleMaps()
})

</script>

<template>
  <div id="google-api" class="google-api">
    123
  </div>
</template>

<style lang="scss">
  .google-api{
    z-index: 1;
    height: 100%;
    width: 100%;
  }
  @media (max-width: 768px) {
    #google-api{
      height: 300px;
    }
  }
  @media (max-width: 600px) {
    #google-api{
      border-top: var(--border-dark-subtle);
    }
  }
</style>