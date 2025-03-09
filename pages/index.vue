<template>
    <div class="page search-page">
        <div class="search-wrapper">
            <input v-model="query" type="text" @input="handleInput">
            <button @click="searchOnce()">search</button>
        </div>
        <div class="result">
            <span>city: {{ cityFound }}</span>
            <br/>
            <span>country: {{ countryFound }}</span>
        </div>
        <!-- todo: pending state, empty state -->
        <ul v-if="weather?.daily">
            <li v-for="(date, i) in weather.daily.time" :key="date">
                <p><strong>Date:</strong> {{ date }}</p>
                <p><strong>Max:</strong> {{ weather.daily.temperature_2m_max[i] }} °C</p>
                <p><strong>Min:</strong> {{ weather.daily.temperature_2m_min[i] }} °C</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import debounce from 'lodash.debounce'
const query = ref('');
const weather = ref({})
const cityFound = ref('')
const countryFound = ref('')

// not watch cause i want to call it manually also and not use more resources
const handleInput = debounce(searchOnce, 500)

async function searchOnce() {
    // todo: highlight field
    if(!query.value) return;
    const city = query.value;
    try {
      const geocodeData = await $fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      if (!geocodeData.results || !geocodeData.results.length) {
        throw new Error("City not found");
      }
      const { latitude, longitude, name, country } = geocodeData.results[0];

      cityFound.value = name;
      countryFound.value = country
      weather.value = await $fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true`
      );
    } catch (err) {
        throw new Error({ statusCode: 500, message: err.message });
    }
}
</script>
<style scoped>
    .search-page {
        display: flex;
        flex-flow: column nowrap;
        gap:10px;
        overflow: scroll;
        align-items: center;
        justify-content: center;
    }
    .search-wrapper {
        display: flex;
        flex-flow: row nowrap;
        gap: 4px;
    }
</style>
