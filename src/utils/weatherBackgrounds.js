// src/utils/weatherBackgrounds.js

export function getWeatherCategory(weatherId) {
    // Tormentas
    if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';

    // Llovizna
    if (weatherId >= 300 && weatherId < 400) return 'rain';

    // Lluvia
    if (weatherId >= 500 && weatherId < 600) return 'rain';

    // Nieve
    if (weatherId >= 600 && weatherId < 700) return 'snow';

    // Atmósfera (niebla, humo, etc.)
    if (weatherId >= 700 && weatherId < 800) return 'atmosphere';

    // Despejado
    if (weatherId === 800) return 'clear';

    // Nublado (801–804)
    if (weatherId >= 801 && weatherId <= 804) return 'clouds';

    // Por seguridad
    return 'default';
}

// Ejemplo de fondos (usa rutas locales si las imágenes externas fallan)
const WEATHER_BACKGROUNDS = {
    clear: ['/backgrounds/clear.jpg'],
    clouds: ['/backgrounds/clouds.jpg'],
    rain: ['/backgrounds/rain.jpg'],
    thunderstorm: ['/backgrounds/thunder.jpg'],
    snow: ['/backgrounds/snow.jpg'],
    atmosphere: ['/backgrounds/fog.jpg'],
    default: ['/backgrounds/default.jpg'],
};

export function getRandomBackground(weatherId) {
    const category = getWeatherCategory(weatherId);
    const images = WEATHER_BACKGROUNDS[category] || WEATHER_BACKGROUNDS.default;
    return images[0]; // usa la primera (o haz aleatorio si quieres)
}