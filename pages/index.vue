<template>
  <div class="page search-page">
    <SearchForm />
    <div class="result">
      <span>city: {{ location.city }}</span>
      <br />
      <span>country: {{ location.country }}</span>
    </div>
    <div v-if="!location.error">
      location: {{ location.latitude }}, {{ location.longitude }}
    </div>
    <div v-else>error: {{ location.error }}</div>
    <ul v-if="weather?.daily">
      <li v-for="(date, i) in weather.daily.time" :key="date">
        <p><strong>date:</strong> {{ date }}</p>
        <p>
          <strong>max:</strong> {{ weather.daily.temperature_2m_max[i] }} °C
        </p>
        <p>
          <strong>min:</strong> {{ weather.daily.temperature_2m_min[i] }} °C
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SearchForm from "~/components/SearchForm.vue";
import { useLocationStore } from "~/stores/location";
import { storeToRefs } from "pinia";

const locationStore = useLocationStore();
const { location } = storeToRefs(locationStore);

const { data: weather } = await useFetch(
  "https://api.open-meteo.com/v1/forecast",
  {
    query: {
      latitude: computed(() => location.value.latitude),
      longitude: computed(() => location.value.longitude),
      daily: "temperature_2m_max,temperature_2m_min",
      current_weather: true,
    },
    watch: [() => location.value.latitude, () => location.value.longitude],
  }
);
</script>

<style scoped>
.page.search-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>
