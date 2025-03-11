<template>
  <div v-if="locationStore.savedLocations?.length">
    <h3 class="header">Saved Cities:</h3>
    <div class="link-wrapper">
      <NuxtLink
        v-for="(item, index) in locationStore.savedLocations"
        :to="`/location/${item.city}?lat=${item.latitude}&lon=${item.longitude}&country=${item.country}`"
        :key="index"
        class="link link-reset"
      >
        {{ item.name }}
      </NuxtLink>
    </div>
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
.header {
  color: #FAF6F6;
}
.link-wrapper {
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
}
.link {
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

.link:hover {
  background-color: #1c5db1;
}
</style>
