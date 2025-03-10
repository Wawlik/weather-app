import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', {
    state: () => ({
      location: {
        latitude: null,
        longitude: null,
        city: '',
        country: '',
        error: null
      }
    }),
    actions: {
      setLocation(params) {
        console.log({params})
        this.location = {
          ...this.location,
          ...params
        }
      },
      setError(errorMessage) {
        this.location.error = errorMessage
      }
    }
  })
  