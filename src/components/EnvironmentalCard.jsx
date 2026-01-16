// src/components/EnvironmentalCard.jsx
export default function EnvironmentalCard({ airPollution, uvIndex }) {
    if (!airPollution && !uvIndex) return null;

    // Mapeo de AQI a texto y color
    const getAQILevel = (aqi) => {
        const levels = {
            1: { text: 'Bueno', color: 'text-green-400' },
            2: { text: 'Moderado', color: 'text-yellow-400' },
            3: { text: 'Insalubre para grupos sensibles', color: 'text-orange-400' },
            4: { text: 'Insalubre', color: 'text-red-400' },
            5: { text: 'Muy insalubre', color: 'text-purple-400' }
        };
        return levels[aqi] || { text: 'Desconocido', color: 'text-gray-400' };
    };

    // Mapeo de UV a riesgo
    const getUVLevel = (value) => {
        if (value <= 2) return { text: 'Bajo', color: 'text-green-400' };
        if (value <= 5) return { text: 'Moderado', color: 'text-yellow-400' };
        if (value <= 7) return { text: 'Alto', color: 'text-orange-400' };
        if (value <= 10) return { text: 'Muy alto', color: 'text-red-400' };
        return { text: 'Extremo', color: 'text-purple-400' };
    };

    return (
        <div className="glass-card mt-4 w-full">
            <h3 className="text-lg font-semibold mb-3 text-center neon-text">
                Ambiente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {airPollution && (
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl mb-1">🌬️</div>
                        <div className="font-medium">Calidad del Aire</div>
                        <div className={`text-lg font-bold ${getAQILevel(airPollution.main.aqi).color}`}>
                            {getAQILevel(airPollution.main.aqi).text}
                        </div>
                        <div className="text-sm text-cyber/70 mt-1">
                            AQI: {airPollution.main.aqi}
                        </div>
                    </div>
                )}

                {uvIndex && (
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl mb-1">☀️</div>
                        <div className="font-medium">Índice UV</div>
                        <div className={`text-lg font-bold ${getUVLevel(uvIndex.value).color}`}>
                            {getUVLevel(uvIndex.value).text}
                        </div>
                        <div className="text-sm text-cyber/70 mt-1">
                            {uvIndex.value.toFixed(1)}
                        </div>
                    </div>
                )}
            </div>

            {(airPollution || uvIndex) && (
                <div className="mt-4 text-xs text-center dark:text-cyber/60 light:text-secondary/70">
                    Datos en tiempo real · Recomendaciones de salud
                </div>
            )}
        </div>
    );
}