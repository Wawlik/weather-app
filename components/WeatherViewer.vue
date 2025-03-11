<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="weather" class="weather-container">
      <div class="header">
        <div>
          <h2 class="city">{{ locacomp.city }}, {{ locacomp.country }}</h2>
          <p class="date">{{ formatFullDate(weather.current.time) }}</p>
        </div>
        <button class="save-btn" @click="saveLocation">Save Location</button>
      </div>

      <div class="current-weather" v-if="weather.current">
        <div :title="getWeatherStatus(weather.current.weathercode).label" class="weather-icon weather-icon-main">
          {{ getWeatherStatus(weather.current.weathercode).icon }}
        </div>
        <div class="temp-block">
          <div class="temp">{{ weather.current.temperature }}°</div>
          <div class="condition">
            {{ getWeatherStatus(weather.current.weathercode).label }}
          </div>
        </div>
        <div v-if="weather.dailyForecast.length" class="stats">
          <div class="stat-item">
            <span class="stat">{{ weather.dailyForecast[0].max }}°</span>
            <span class="caption">High</span>
          </div>
          <div class="stat-item">
            <span class="stat">{{ weather.dailyForecast[0].min }}°</span>
            <span class="caption">Low</span>
          </div>

          <div class="stat-item">
            <span class="stat"
              >{{ weather.dailyForecast[0].wind_speed_max }}%</span
            >
            <span class="caption">Wind</span>
          </div>
          <!-- todo: add -->
          <div class="stat-item">
            <span class="stat">{{ weather.dailyForecast[0].pressure }}%</span>
            <span class="caption">Pressure</span>
          </div>
          <!-- todo: add -->
          <div class="stat-item">
            <span class="stat">{{ weather.dailyForecast[0].humidity }}%</span>
            <span class="caption">Humidity</span>
          </div>

          <div class="stat-item">
            <span class="stat">
              {{ weather.dailyForecast[0].precipitation_sum }}%
            </span>
            <span class="caption">Precipitation</span>
          </div>
        </div>
      </div>
      <div v-if="weather.hourlyToday" class="today-weather">
        <h3>Today's weather</h3>
        <div class="hourly">
          <div
            v-for="(hour, i) in weather.hourlyToday"
            :key="i"
            class="hour-item"
          >
            <p>{{ formatHour(hour.time) }}</p>
            <span class="weather-icon" v-if="hour.weathercode">
              <span v-if="hour.weathercode" :title="getWeatherStatus(hour.weathercode).label" class="stat weather-icon">
                {{ getWeatherStatus(hour.weathercode).icon }}
              </span>
            </span>
            <p>{{ hour.temperature }}°</p>
          </div>
        </div>
      </div>
      <div v-if="weather.dailyForecast" class="next-days">
        <h3>Next 3 days</h3>
        <div class="days">
          <div
            v-for="(day, i) in weather.dailyForecast"
            :key="i"
            class="day-item"
          >
            <div class="date-info">
              <p class="day-of-week">{{ formatDate(day.date).dayOfWeek }}</p>
              <p class="full-date">{{ formatDate(day.date).formattedDate }}</p>
            </div>
            <div class="stat-item">
              <span class="stat">
              <span v-if="day.weathercode" :title="getWeatherStatus(day.weathercode).label" class="stat weather-icon">
                {{ getWeatherStatus(day.weathercode).icon }}
              </span>
              </span>
            </div>
            <div class="stat-item">
              <span class="stat">{{ day.min }}°</span>
              <span class="caption">Min</span>
            </div>
            <div class="stat-item">
              <span class="stat">{{ day.max }}°</span>
              <span class="caption">Max</span>
            </div>
            <div class="stat-item">
              <span class="stat">{{ day.rain }}%</span>
              <span class="caption">Humidity</span>
            </div>
            <div class="stat-item">
              <span class="stat">{{ day.wind_speed_max }}mph</span>
              <span class="caption">Wind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFetch } from "#app";
import { useLocationStore } from "~/stores/location";

import { formatDate, formatFullDate } from "~/utils/formatters";
import { transformWeatherData } from "~/utils/mappers";

// aiscrapped
const getWeatherStatus = (code) => {
  if (code === 0) return { icon: "☀️", label: "Sunny" };
  if ([1, 2, 3].includes(code)) return { icon: "☁️", label: "Cloudy" };
  if ([45, 48].includes(code)) return { icon: "🌫️", label: "Fog" };
  if ([51, 53, 55].includes(code)) return { icon: "🌦️", label: "Light Rain" };
  if ([61, 63, 65].includes(code)) return { icon: "🌧️", label: "Rain" };
  if ([66, 67].includes(code)) return { icon: "🌨️", label: "Ice Rain" };
  if ([71, 73, 75].includes(code)) return { icon: "❄️", label: "Snow" };
  if ([80, 81, 82].includes(code)) return { icon: "⛈️", label: "Heavy Rain" };
  if ([95, 96, 99].includes(code)) return { icon: "🌩️", label: "Thunderstorm" };
  return { icon: "❓", label: "Unknown" };
};

const locationStore = useLocationStore();

function saveLocation() {
  locationStore.saveLocation();
}

const locacomp = computed(() => locationStore.location);

const lat = computed(() => locationStore.location.latitude);
const lon = computed(() => locationStore.location.longitude);

const {
  data: weather,
  pending,
  error,
} = useFetch(
  () => {
    if (!lat || !lon) return null;
    return "https://api.open-meteo.com/v1/forecast";
  },
  {
    query: {
      latitude: lat,
      longitude: lon,
      hourly:
        "temperature_2m,precipitation,weathercode,wind_speed_10m,relative_humidity_2m",
      daily:
        "temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,wind_speed_10m_max",
      current_weather: true,
      timezone: "auto",
    },
    watch: [lat, lon],
    lazy: true,
    transform: (data) => transformWeatherData(data),
  }
);
</script>

<style scoped>
.weather-container {
  color: #fff;
  border-radius: 8px;
  padding: 20px;
  font-family: sans-serif;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-flow: row wrap;
}
.city {
  font-size: 24px;
  margin: 0;
}
.date {
  margin: 4px 0 0;
  font-size: 14px;
}
.save-btn {
  background-color: #ffd700;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}
.current-weather {
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
  flex-flow: row wrap;
}
.temp-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.temp {
  font-size: 48px;
  font-weight: bold;
  margin: 0;
}
.condition {
  margin-top: 4px;
  font-size: 18px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 колонки */
  gap: 10px;
}
.today-weather {
  margin-bottom: 20px;
}
.hourly {
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
}
.hour-item,
.day-item {
  background-color: rgba(0, 0, 0, 0.19);
  border-radius: 6px;
  padding: 10px;
  width: 70px;
  text-align: center;
}
.hour-item p,
.day-item p {
  margin: 4px 0;
  font-size: 14px;
}

.next-days {
  margin-top: 20px;
  width: 100%;
}
.days {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.day-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 12px;
  width: 100%;
}
.stat-item {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.stat-item .caption {
  color: #8090b4;
}
.date-info {
  display: flex;
  flex-direction: column;
}
.day-of-week {
  font-weight: bold;
  margin: 0;
}
.full-date {
  margin: 4px 0 0;
  font-size: 14px;
  opacity: 0.9;
}
.weather-icon {
  font-size: 32px;
  cursor: help;
}
.weather-icon.weather-icon-main {
  font-size: 64px;
}
</style>
