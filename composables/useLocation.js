import { ref } from 'vue'

import { useNuxtApp } from '#app'

export function useLocation() {
  const coords = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const { $notify } = useNuxtApp()

  function getLocation() {
    if (!('geolocation' in navigator)) {
      error.value = 'Geolocation is not supported on this browser.'
      $notify({ title: error.value, type: 'error' })
      setTimeout(() => {
        const infoMsg = 'Try to search city manually'
        $notify({ title: infoMsg, type: 'info' })
      }, 1000);

      return Promise.reject(error.value)
    }
    loading.value = true
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = position.coords
          loading.value = false
          resolve(position)
        },
        (err) => {
          error.value = err.message
          loading.value = false
          reject(err)
        }
      )
    })
  }

  return { coords, error, loading, getLocation }
}
