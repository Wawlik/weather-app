<template>
    <div class="search-wrapper">
      <input v-model="query" name="query" autocomplete="query" type="text" @input="handleInput" placeholder="Введите город" />
      <button @click="onSearch">Search</button>
      <button @click="onGetLocation">Get Location</button>
      <ul v-if="results.length">
        <li v-for="(item, index) in results" :key="index">
          <NuxtLink :to="`/location/${item.name}?lat=${item.latitude}&lon=${item.longitude}&country=${item.country}`">
            {{ item.name }} ({{ item.country }})
          </NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import debounce from 'lodash.debounce'
  import { useLocation } from '~/composables/useLocation'
  import { useLocationStore } from '~/stores/location'
  
  const query = ref('')
  const results = ref([])
  
  const { coords, getLocation } = useLocation()
  const locationStore = useLocationStore()
  
  async function searchOnce() {
    if (!query.value) return
    try {
      const geocodeData = await $fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query.value}&count=5`)
      if (!geocodeData.results || !geocodeData.results.length) {
        results.value = []
        throw new Error('City not found')
      }
      results.value = geocodeData.results.map(item => ({
        latitude: item.latitude,
        longitude: item.longitude,
        name: item.name,
        country: item.country
      }))
    } catch (err) {
      locationStore.setError(err.message)
    }
  }
  
  const handleInput = debounce(searchOnce, 500)
  
  function onSearch() {
    searchOnce()
  }
  
  function onGetLocation() {
    getLocation()
      .then(() => {
        if (coords.value) {
          locationStore.setLocation({
            latitude: coords.value.latitude,
            longitude: coords.value.longitude,
          })
        }
      })
      .catch((err) => {
        locationStore.setError(err.message)
      })
  }
  </script>
  
  <style scoped>
  .search-wrapper {
    display: flex;
    gap: 4px;
  }
  li {
    margin: 4px 0;
  }
  </style>
  