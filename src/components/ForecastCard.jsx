export default function ForecastCard({ forecast }) {
    if (forecast.length === 0) return null;

    return (
        <div className="mt-6 glass-card w-full">
            <h3 className="text-xl font-semibold mb-3 text-center neon-text">
                Pronóstico 5 días
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {forecast.map((item, index) => {
                    const date = new Date(item.dt_txt);
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center p-3 bg-white/5 rounded-lg"
                        >
                            <div className="text-xs text-cyber/80 mb-1">
                                {date.toLocaleDateString('es', { weekday: 'short' })}
                            </div>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt={item.weather[0].description}
                                className="w-10 h-10 my-1"
                            />
                            <div className="text-lg font-bold">{Math.round(item.main.temp)}°</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}