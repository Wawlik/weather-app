<template>
  <div class="location-page">
    <div>
      <button @click="goBack()">back</button>
    </div>
    <h2>Weather for {{ location.city }} {{ location.country }}</h2>
      <WeatherViewer v-if="latitude && longitude"/>
    <!-- <WeatherViewer v-if="latitude" :location="location" /> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLocationStore } from "~/stores/location";
import WeatherViewer from "~/components/WeatherViewer.vue";

const locationStore = useLocationStore()

const route = useRoute()

const city = route.params.city
const country = route.query.country
const latitude = route.query.lat
const longitude = route.query.lon

const router = useRouter()
function goBack() {
  router.back()
}
console.log({country})

const location = {
  city,
  country,
  latitude,
  longitude,
};
console.log({location})
console.log({q:route.query})
locationStore.setLocation(location)
</script>

<style scoped>
.location-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
