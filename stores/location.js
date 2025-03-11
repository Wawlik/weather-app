import { defineStore } from 'pinia'

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
        removeLocation() {
            const name = `${this.location.city} ${this.location.country}`
            const ind = this.savedLocations.findIndex(loc => loc.name === name)
            if (~ind) {
                this.savedLocations.splice(ind, 1);
                console.log("Removed!", { name })
            }
        },
        saveLocation() {
            const name = `${this.location.city} ${this.location.country}`;
            //todo: move logics to upper lvl
            const alreadySaved = this.savedLocations.some(
                (item) =>
                    item.name === name
            )
            if (!alreadySaved) {
                this.savedLocations.push({ ...this.location, name });
                console.log("Added!", { name })
            } else {
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
