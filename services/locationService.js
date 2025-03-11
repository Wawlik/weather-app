export async function fetchCityByCoords(latitude, longitude) {

    try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
        const nominatimData = await $fetch(nominatimUrl)
        if (nominatimData?.address) {
            const city = nominatimData.address.city
                || nominatimData.address.town
                || nominatimData.address.village
                || 'Unknown'
            const country = nominatimData.address.country || 'Unknown'
            return { city, country }
        }
    } catch (err2) {
        console.error('v2 reverse error:', err2)
    }

    try {
        const openMeteoUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
        const openMeteoData = await $fetch(openMeteoUrl)
        if (openMeteoData?.results?.length) {
            const result = openMeteoData.results[0]
            return {
                city: result.name || 'Unknown',
                country: result.country || 'Unknown'
            }
        }
    } catch (err) {
        console.error('v1 reverse error:', err)
        throw new Error('Unable to find city')
    }

}
