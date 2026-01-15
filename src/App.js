import React from 'react';
import SearchCity from './components/SearchCity';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ForecastChart from './components/ForecastChart';
import useWeather from './hooks/useWeather';
import useTheme from './hooks/useTheme'; // ← Nuevo hook
import EnvironmentalCard from './components/EnvironmentalCard';
import WeatherDetailsCard from './components/WeatherDetailsCard';

export default function App() {
  const {
    current,
    forecast,
    airPollution, // ← destructurar
    uvIndex,      // ← destructurar
    loading,
    error,
    backgroundImage,
    fetchCurrent,
    fetchByLocation,
    retry
  } = useWeather();

  const { theme, toggleTheme } = useTheme(); // ← Usar el hook

  return (
    <div
      className="relative min-h-screen transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black/20' : 'bg-white/30'}`}>
        <div className="container mx-auto px-4 py-6">
          {/* Botón de toggle en la esquina superior derecha */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-card"
              aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          <header className="text-center mb-6 max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold neon-text">
              🌤️ Clima
            </h1>
            <p className={`${theme === 'dark' ? 'text-cyber/70' : 'text-secondary'}`}>
              Tiempo real · Diseño adaptable
            </p>
          </header>

          <main className="max-w-md mx-auto">
            <SearchCity onSearch={fetchCurrent} />

            <button
              onClick={fetchByLocation}
              className={`mt-3 w-full py-2.5 rounded-lg transition font-medium ${theme === 'dark'
                ? 'bg-cyber/30 hover:bg-cyber/50 text-white'
                : 'bg-accent/20 hover:bg-accent/40 text-primary'
                }`}
            >
              📍 Usar mi ubicación
            </button>

            {loading && (
              <div className="glass-card text-center py-8 mt-4">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyber border-t-transparent"></div>
                <p className={theme === 'dark' ? 'text-cyber' : 'text-accent'}>
                  Escaneando atmósfera...
                </p>
              </div>
            )}

            {error && (
              <div className={`glass-card text-center py-4 mt-4 ${theme === 'dark' ? 'border-red-500/30' : 'border-red-300/50'
                }`}>
                <p className={theme === 'dark' ? 'text-red-400' : 'text-red-600 mb-2'}>
                  ⚠️ {error}
                </p>
                <button
                  onClick={retry}
                  className={`px-3 py-1 rounded ${theme === 'dark'
                    ? 'bg-red-500/30 hover:bg-red-500/50 text-white'
                    : 'bg-red-200 hover:bg-red-300 text-red-800'
                    }`}
                >
                  Reintentar
                </button>
              </div>
            )}

            {current && <WeatherCard weather={current} />}
            {/* Nueva tarjeta de detalles técnicos */}
            {current && <WeatherDetailsCard weather={current} />}
            {forecast.length > 0 && <ForecastCard forecast={forecast} />}
            {forecast.length > 0 && <ForecastChart forecast={forecast} />}
            {(airPollution || uvIndex) && (
              <EnvironmentalCard airPollution={airPollution} uvIndex={uvIndex} />
            )}

            <footer className={`mt-8 text-center text-sm ${theme === 'dark' ? 'text-cyber/50' : 'text-secondary/70'
              }`}>
              Datos en tiempo real · OpenWeather API
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}