<template>
    <div v-if="locationStore.savedLocations?.length">
      <h2>Saved Locations</h2>
      <ul>
        <li v-for="(item, index) in locationStore.savedLocations" :key="index">
          <NuxtLink :to="`/location/${item.city}?lat=${item.latitude}&lon=${item.longitude}&country=${item.country}`">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
</template>

<script setup>

import { useLocationStore } from '~/stores/location'

const locationStore = useLocationStore()

function remove(lat, lon) {
  locationStore.removeLocation(lat, lon)
}
</script>