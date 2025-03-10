import { ref } from 'vue'

export function useLocation() {
  const coords = ref(null)
  const error = ref(null)
  const loading = ref(false)

  function getLocation() {
    if (!('geolocation' in navigator)) {
      error.value = 'Geolocation is not supported on this browser. You can enter city manually.'
      return
    }

    loading.value = true
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.value = position.coords
        loading.value = false
      },
      (err) => {
        error.value = err.message
        loading.value = false
      }
    )
  }

  return { coords, error, loading, getLocation }
}
