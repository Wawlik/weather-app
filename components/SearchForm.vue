<template>
    <div class="search-wrapper">
      <input v-model="query" type="text" @input="handleInput" placeholder="Введите город" />
      <button @click="onSearch">search</button>
      <button @click="onGetLocation">get location</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import debounce from 'lodash.debounce'
  import { useLocation } from '~/composables/useLocation'
  import { useLocationStore } from '~/stores/location'
  
  const query = ref('')
  const { coords, getLocation } = useLocation()
  const locationStore = useLocationStore()
  
  async function searchOnce() {
    if (!query.value) return
    try {
      const geocodeData = await $fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query.value}&count=1`)
      if (!geocodeData?.results?.length) {
        throw new Error('City not found')
      }
      const { latitude, longitude, name, country } = geocodeData.results[0]
      locationStore.setLocation({ latitude, longitude, city: name, country })
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
  </style>
  