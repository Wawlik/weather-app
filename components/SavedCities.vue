<template>
  <div v-if="locationStore.savedLocations?.length" class="saved-cities-wrapper">
    <NuxtLink
      v-for="(item, index) in locationStore.savedLocations"
      :to="`/location/${item.city}?lat=${item.latitude}&lon=${item.longitude}&country=${item.country}`"
      :key="index"
      class="saved-city link-reset"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { useLocationStore } from "~/stores/location";

const locationStore = useLocationStore();

function remove(lat, lon) {
  locationStore.removeLocation(lat, lon);
}
</script>

<style scoped>
.saved-cities-wrapper {
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
}
.saved-city {
  background-color: #2f80ed;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block;
  margin: 0 auto;
}

.saved-city:hover {
  background-color: #1c5db1;
}
</style>
