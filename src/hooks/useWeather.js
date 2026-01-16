import { useState, useEffect, useCallback } from 'react';
import { getRandomBackground } from '../utils/weatherBackgrounds';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// === Funciones para endpoints adicionales ===
const fetchAirPollution = async (lat, lon) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error('Error al cargar calidad del aire');
    const data = await res.json();
    return data.list[0]; // Solo el registro actual
};

const fetchUVIndex = async (lat, lon) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error('Error al cargar índice UV');
    return await res.json();
};

const fetchForecast = async (city) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error('Error al cargar pronóstico');
    const data = await res.json();

    const dailyMap = new Map();
    data.list.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString('es-CO');
        if (!dailyMap.has(date)) {
            dailyMap.set(date, item);
        }
    });

    return Array.from(dailyMap.values()).slice(0, 5);
};

// === Hook principal ===
export default function useWeather() {
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [airPollution, setAirPollution] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80'
    );
    const [lastSearched, setLastSearched] = useState(null);

    // Cargar datos secundarios (aire + UV)
    const loadAdditionalData = async (lat, lon) => {
        try {
            const [airData, uvData] = await Promise.all([
                fetchAirPollution(lat, lon),
                fetchUVIndex(lat, lon)
            ]);
            setAirPollution(airData);
            setUvIndex(uvData);
        } catch (err) {
            console.warn("No se pudieron cargar datos ambientales:", err.message);
            // No detenemos la app si fallan estos datos opcionales
        }
    };

    // Buscar por nombre de ciudad
    const fetchCurrent = useCallback(async (city) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
            );
            if (!res.ok) {
                if (res.status === 404) throw new Error('Ciudad no encontrada');
                throw new Error('Error en el servicio climático');
            }
            const data = await res.json();

            setCurrent(data);
            setBackgroundImage(getRandomBackground(data.weather[0].id));
            setLastSearched(city);

            const forecastData = await fetchForecast(city);
            setForecast(forecastData);

            loadAdditionalData(data.coord.lat, data.coord.lon);
        } catch (err) {
            setError(err.message);
            setCurrent(null);
            setForecast([]);
            setAirPollution(null);
            setUvIndex(null);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencias internas que cambien


    // Buscar por ubicación actual
    const fetchByLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocalización no soportada en este navegador");
            return;
        }

        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
                    );
                    if (!res.ok) throw new Error('No se pudo obtener el clima de tu ubicación');
                    const data = await res.json();

                    setCurrent(data);
                    setBackgroundImage(getRandomBackground(data.weather[0].id));
                    setLastSearched(`${data.name}, ${data.sys.country}`);

                    const forecastData = await fetchForecast(`${data.name},${data.sys.country}`);
                    setForecast(forecastData);

                    loadAdditionalData(latitude, longitude);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setLoading(false);
                setError("Permiso de ubicación denegado");
            }
        );
    };

    // Inicializar con Bogotá
    useEffect(() => {
        fetchCurrent('Bogotá');
    }, [fetchCurrent]);

    // Función para reintentar última búsqueda
    const retry = () => {
        if (lastSearched) fetchCurrent(lastSearched);
    };

    return {
        current,
        forecast,
        airPollution,
        uvIndex,
        loading,
        error,
        backgroundImage,
        lastSearched,
        fetchCurrent,
        fetchByLocation,
        retry
    };
}