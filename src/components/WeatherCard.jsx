// src/components/WeatherCard.jsx
export default function WeatherCard({ weather }) {
    if (!weather) return null;

    const { name, main, weather: wArray, sys } = weather;
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const description = wArray[0]?.description || 'desconocido';
    const icon = wArray[0]?.icon || '01d';
    const country = sys?.country || '';

    return (
        <div className="glass-card text-center animate-fade-in">
            <h2 className="text-2xl font-semibold mb-2">{name}, {country}</h2>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                alt={description}
                className="mx-auto my-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] dark:drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] light:drop-shadow-[0_0_10px_rgba(14,165,233,0.4)]"
            />
            <div className="text-5xl font-bold neon-text my-2">{temp}°</div>
            <p className="capitalize text-cyber/90 dark:text-cyber/90 light:text-accent/90">
                {description}
            </p>
            <p className={`text-sm mt-2 ${'dark:text-cyber/70 light:text-secondary/80'
                }`}>
                Sensación: {feelsLike}°C
            </p>
        </div>
    );
}