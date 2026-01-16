// src/components/WeatherDetailsCard.jsx

export default function WeatherDetailsCard({ weather }) {
    if (!weather) return null;

    const { main, wind, visibility, sys } = weather;

    // Formatear dirección del viento
    const getWindDirection = (deg) => {
        if (deg === undefined) return 'N/A';
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(deg / 22.5) % 16;
        return directions[index];
    };

    // Formatear horas UNIX a formato legible
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('es', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="glass-card mt-4 w-full">
            <h3 className="text-lg font-semibold mb-3 text-center neon-text">
                Detalles Técnicos
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {/* Humedad */}
                <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                    <div className="text-xl mb-1">💧</div>
                    <span className="text-cyber/80">Humedad</span>
                    <span className="font-bold">{main.humidity}%</span>
                </div>

                {/* Presión */}
                <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                    <div className="text-xl mb-1">🔽</div>
                    <span className="text-cyber/80">Presión</span>
                    <span className="font-bold">{main.pressure} hPa</span>
                </div>

                {/* Visibilidad */}
                <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                    <div className="text-xl mb-1">👁️</div>
                    <span className="text-cyber/80">Visibilidad</span>
                    <span className="font-bold">{(visibility / 1000).toFixed(1)} km</span>
                </div>

                {/* Viento */}
                <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg md:col-span-2">
                    <div className="text-xl mb-1">💨</div>
                    <span className="text-cyber/80">Viento</span>
                    <span className="font-bold">
                        {wind?.speed ? `${wind.speed} m/s` : 'N/A'} • {getWindDirection(wind?.deg)}
                    </span>
                </div>

                {/* Horas de sol */}
                <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg md:col-span-1">
                    <div className="text-xl mb-1">🌅🌇</div>
                    <span className="text-cyber/80 text-xs">Sol</span>
                    <div className="text-center">
                        <div>{formatTime(sys.sunrise)}</div>
                        <div>{formatTime(sys.sunset)}</div>
                    </div>
                </div>
            </div>

            <div className="mt-3 text-xs text-center dark:text-cyber/60 light:text-secondary/70">
                Datos meteorológicos técnicos · Actualizado en tiempo real
            </div>
        </div>
    );
}