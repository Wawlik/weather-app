<template>
  <div class="page search-page">
    <SearchForm />
    <SavedCities />
  </div>
</template>

<script setup>
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
