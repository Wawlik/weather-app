<template>
  <div class="location-page">
    <WeatherViewer v-if="latitude && longitude"/>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useLocationStore } from "~/stores/location";
import WeatherViewer from "~/components/WeatherViewer.vue";

const locationStore = useLocationStore()

const route = useRoute()
const latitude = route.query.lat
const longitude = route.query.lon

const city = route.params.city
const country = route.query.country
const location = {
  city,
  country,
  latitude,
  longitude,
};
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
