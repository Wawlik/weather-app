export async function fetchCityByCoords(latitude, longitude) {
    const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`;
    try {
        const data = await $fetch(url);
        if (data && data.results && data.results.length > 0) {
            const location = data.results[0];
            return {
                city: location.name,
                country: location.country,
            };
        } else {
            throw new Error("City not found");
        }
    } catch (err) {
        console.error('Error reciving city by coords, try manually:', err);
        throw err;
    }
}
