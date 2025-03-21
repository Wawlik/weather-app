<template>
  <div class="search">
    <div class="search-wrapper">
      <input
        v-model="query"
        name="query"
        autocomplete="query"
        type="text"
        @input="handleInput"
        placeholder="Search for a city..."
        @focus="setFocus(true)"
        @blur="setFocus(false)"
      />
      <!-- todo: rework as native or imported components -->
      <img
        @click="onSearch"
        class="icon-search"
        src="~/assets/icons/search.svg"
        alt="Search icon"
      />
      <img
        @click="onGetLocation"
        title="Get your current location"
        class="icon-location"
        src="~/assets/icons/location.svg"
        alt="Search icon"
      />
      <div v-if="results.length && dropdownVisible" class="search-dropdown">
        <NuxtLink
          v-for="(item, index) in results"
          :key="index"
          @mousedown.prevent
          class="link-reset"
          :to="`/location/${item.name}?lat=${item.latitude}&lon=${item.longitude}&country=${item.country}`"
        >
          {{ item.name }} ({{ item.country }})
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import debounce from "lodash.debounce";
import { useLocation } from "~/composables/useLocation";
import { useLocationStore } from "~/stores/location";
import { fetchCityByCoords } from "~/services/locationService";

import { useRouter } from "vue-router";
const router = useRouter();

const query = ref("");
const results = ref([]);
const loadingLocation = ref(false)

const { coords, getLocation, loading } = useLocation();
const locationStore = useLocationStore();
const dropdownVisible = ref(false);

async function searchOnce() {
  if (!query.value) return;
  try {
    const geocodeData = await $fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query.value}&count=5`
    );
    if (!geocodeData.results || !geocodeData.results.length) {
      results.value = [];
      setFocus(false);
      throw new Error("City not found");
    }
    setFocus(true);
    results.value = geocodeData.results.map((item) => ({
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name,
      country: item.country,
    }));
  } catch (err) {
    locationStore.setError(err.message);
  }
}

const handleInput = debounce(searchOnce, 500);

function setFocus(val) {
  dropdownVisible.value = val;
}

function onSearch() {
  searchOnce();
}

function onGetLocation() {
  if(loadingLocation.value) return;
  loadingLocation.value = true;
  getLocation()
    .then(() => {
      if (coords.value) {
        fetchCityByCoords(coords.value.latitude, coords.value.longitude)
          .then((result) => {
            router.push(
              `/location/${result.city}?lat=${coords.value.latitude}&lon=${coords.value.longitude}&country=${result.country}`
            );
          })
          .catch((err) => {
            console.error("Error fetching city:", err);
          })
      }
    })
    .catch((err) => {
      console.error("Error getting location:", err);
      console.warn("Try to search city manually")
    })
    .finally(()=>{
      loadingLocation.value = false;
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

.search {
  width: clamp(200px, 100%, 600px);
}
.search-wrapper {
  position: relative;
  height: 40px;
}

.search-wrapper input {
  width: 100%;
  height: 100%;
  padding: 0 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  z-index: 1;
}

.search-wrapper .icon-location {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  z-index: 1;
  cursor: help;
}

.search-wrapper .icon-search {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  z-index: 2;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 3;
  display: flex;
  flex-flow: column nowrap;
}

.search-dropdown.active {
  display: block;
}

.search-dropdown a {
  padding: 10px;
  cursor: pointer;
}

.search-dropdown a:hover {
  background: #f0f0f0;
}
</style>
