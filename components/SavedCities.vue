<template>
  <div v-if="locationStore.savedLocations?.length">
    <h3 class="header">Saved Cities:</h3>
    <div class="links-container">
      <div
        class="link-wrapper"
        v-for="(item, index) in locationStore.savedLocations"
      >
        <NuxtLink
          :to="`/location/${item.city}?lat=${item.latitude}&lon=${item.longitude}&country=${item.country}`"
          :key="index"
          class="link link-reset"
        >
          <span>
            {{ item.name }}
          </span>
        </NuxtLink>
        <!-- mobile UI/UX -->
        <button class="link-remove" @click.stop.prevent="remove(item.name)">
          ✖
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocationStore } from "~/stores/location";

const locationStore = useLocationStore();

// unused
function remove(name) {
  locationStore.removeLocation(name);
}
</script>

<style scoped>
.header {
  color: #faf6f6;
}
.links-container {
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
}
.link-wrapper {
  display: flex;
  gap: 8px;
}
.link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto;
}
.link-remove {
  cursor: pointer;
  padding: 0 12px;
  color: #fff;
  outline: none;
  border: none;
}
.link,
.link-remove {
  background-color: #2f80ed;
  border-radius: 6px;
}

.link:hover,
.link-remove:hover {
  background-color: #1c5db1;
}
</style>
