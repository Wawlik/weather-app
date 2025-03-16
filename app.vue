<script setup lang="ts">
import Notifications from "./components/helpers/Notifications.vue";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Notifications />
</template>

<style>
html {
  overflow: hidden;
  width: 100vh;
  height: 100vh;
  font-family: sans-serif;
}
#__nuxt {
  width: 100%;
  height: 100vh;
}
html,
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
div {
  box-sizing: border-box;
}
p,
button {
  margin: 0;
  padding: 0;
}
button {
  border: none;
  outline: none;
}
.layout,
.page {
  width: 100%;
  height: 100%;
}
.link-reset {
  text-decoration: none;
  color: inherit;
}
.status-message {
  color: #e6e6f0;
  max-width: 90vw;
  word-break: break-all;
}

body vercel-live-feedback {
  /* the only proper use of important */
  display: none!important;
}
</style>
