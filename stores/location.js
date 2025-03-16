import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useLocationStore = defineStore('location', {
    state: () => ({
        location: {
            latitude: null,
            longitude: null,
            city: '',
            country: '',
            error: null
        },
        //could've been Map
        savedLocations: []
    }),
    actions: {
        removeLocation(nameLoc = null) {
            const { $notify } = useNuxtApp()
            const name = nameLoc || (`${this.location.city} ${this.location.country}`)
            // todo: move to fn
            const alreadySaved = this.savedLocations.some(
                (item) =>
                    item.name === name
            )
            if (alreadySaved) {
                this.savedLocations = this.savedLocations.filter(loc => loc.name !== name)
                $notify({ title: `${name} removed`, type: 'success' })
                console.log("Removed!", { name })
            } else {
                $notify({ title: `${name} not found`, type: 'warn' })
            }
        },
        saveLocation() {
            const { $notify } = useNuxtApp()
            const name = `${this.location.city} ${this.location.country}`;
            //todo: move logics to upper lvl
            // todo: move to fn
            const alreadySaved = this.savedLocations.some(
                (item) =>
                    item.name === name
            )
            if (!alreadySaved) {
                this.savedLocations.push({ ...this.location, name });
                $notify({ title: `${name} added`, type: 'success' })
                console.log("Added!", { name })
            } else {
                $notify({ title: `${name} already saved`, type: 'warn' })
                console.warn('Already saved')
            }
        },
        setLocation(params) {
            this.location = {
                ...this.location,
                ...params
            }
        },
        setError(errorMessage) {
            this.location.error = errorMessage
        },
    }
})
