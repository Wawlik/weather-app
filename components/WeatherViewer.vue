<template>
  <div>
    <div v-if="pending">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else-if="weather">
      <button @click="saveLocation">save</button>
      <div v-if="weather.current_weather">
        <p>Temperature: {{ weather.current_weather.temperature }} °C</p>
        <p>Wind Speed: {{ weather.current_weather.windspeed }} km/h</p>
      </div>
      <ul v-if="weather.daily">
        <li v-for="(date, i) in weather.daily.time" :key="date">
          <p><strong>Date:</strong> {{ date }}</p>
          <p>
            <strong>Max:</strong> {{ weather.daily.temperature_2m_max[i] }} °C
          </p>
          <p>
            <strong>Min:</strong> {{ weather.daily.temperature_2m_min[i] }} °C
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFetch } from "#app";
import { useLocationStore } from "~/stores/location";

const locationStore = useLocationStore();

function saveLocation() {
  locationStore.saveLocation();
}

const lat = computed(() => locationStore.location.latitude);
const lon = computed(() => locationStore.location.longitude);
const {
  data: weather,
  pending,
  error,
} = useFetch(
  () => {
    console.log({lat,lon})
    if (!lat || !lat) return null;
    return "https://api.open-meteo.com/v1/forecast";
  },
  {
    query: {
      latitude: lat,
      longitude: lon,
      daily: "temperature_2m_max,temperature_2m_min",
      current_weather: true,
      timezone: "auto",
    },
    watch: [lat, lon],
    lazy: true,
    pick: ["latitude", "latitude", "daily"],
  }
);
</script>
