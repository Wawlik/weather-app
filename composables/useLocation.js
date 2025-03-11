import { ref } from 'vue'

export function useLocation() {
  const coords = ref(null)
  const error = ref(null)
  const loading = ref(false)

  function getLocation() {
    if (!('geolocation' in navigator)) {
      error.value = 'Geolocation is not supported on this browser.'
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
