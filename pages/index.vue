<template>
  <div class="page search-page">
    <SavedCities />
    <SearchForm />
  </div>
</template>

<script setup>
import { computed } from "vue";
import SearchForm from "~/components/SearchForm.vue";
import SavedCities from "~/components/SavedCities.vue";
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
