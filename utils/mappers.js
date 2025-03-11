export const transformWeatherData = (data) => {
    if (!data || !data.hourly || !data.daily || !data.current_weather)
        return null;

    const today = new Date().toISOString().split("T")[0];
    const targetHours = [0, 3, 6, 9, 12, 15, 18];

    const hourlyToday = (data.hourly.time || [])
        .map((time, index) => {
            const [date, hourStr] = time.split("T");
            const hour = parseInt(hourStr?.split(":")[0], 10);
            if (date === today && targetHours.includes(hour)) {
                return {
                    time: time ?? "",
                    hour: hour ?? 0,
                    temperature: data.hourly.temperature_2m?.[index] ?? null,
                    precipitation: data.hourly.precipitation?.[index] ?? null,
                    weathercode: data.hourly.weathercode?.[index] ?? null,
                    wind_speed: data.hourly.wind_speed_10m?.[index] ?? null,
                    humidity: data.hourly.relative_humidity_2m?.[index] ?? null,
                };
            }
            return null;
        })
        .filter(Boolean);
    console.log({ cw: data.current_weather });
    const current = {
        temperature: data.current_weather.temperature ?? null,
        wind_speed: data.current_weather.windspeed ?? null,
        weathercode: data.current_weather.weathercode ?? null,
        is_day: data.current_weather.is_day ?? null,
        time: data.current_weather.time ?? null,
    };
    console.log({ dadily: data.daily });
    const dailyForecast = (data.daily.time || [])
        .slice(0, 3)
        .map((date, index) => ({
            date: date ?? "",
            min: data.daily.temperature_2m_min?.[index] ?? null,
            max: data.daily.temperature_2m_max?.[index] ?? null,
            precipitation_sum: data.daily.precipitation_sum?.[index] ?? null,
            wind_speed_max: data.daily.wind_speed_10m_max?.[index] ?? null,
            weathercode: data.daily.weathercode?.[index] ?? null,
        }));

    return {
        current,
        hourlyToday,
        dailyForecast,
    };
}
