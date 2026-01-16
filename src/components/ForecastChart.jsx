import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

// ✅ Tooltip adaptado a ambos modos
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="glass-card p-3 dark:border-cyber/40 light:border-accent/40">
                <p className="font-bold neon-text">{label}</p>
                <p>{Math.round(data.temp)}°</p>
                <p className="text-sm dark:text-cyber/80 light:text-secondary/80 capitalize">
                    {data.description}
                </p>
            </div>
        );
    }
    return null;
};

export default function ForecastChart({ forecast }) {
    const [chartWidth, setChartWidth] = useState(0);
    const chartRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            if (chartRef.current) {
                setChartWidth(chartRef.current.clientWidth - 40);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    if (forecast.length === 0 || chartWidth <= 0) {
        return (
            <div
                ref={chartRef}
                className="mt-6 glass-card w-full h-48 flex items-center justify-center"
            >
                {/* ✅ Texto adaptado al tema */}
                <div className="dark:text-cyber/70 light:text-secondary/70">
                    Cargando gráfica...
                </div>
            </div>
        );
    }

    const chartData = forecast.map(item => ({
        day: new Date(item.dt_txt).toLocaleDateString('es', { weekday: 'short' }).slice(0, 3),
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
    }));

    const chartHeight = 160;

    // ✅ Colores dinámicos para Recharts
    const getLineColor = () => {
        return document.documentElement.classList.contains('dark') ? '#00f0ff' : '#0ea5e9';
    };

    const getDotColor = () => {
        return document.documentElement.classList.contains('dark') ? '#00b894' : '#0c4a6e';
    };

    const getXAxisColor = () => {
        return document.documentElement.classList.contains('dark') ? '#0abdc6' : '#334155';
    };

    return (
        <div className="mt-6 glass-card w-full" ref={chartRef}>
            {/* ✅ Título con neón adaptado */}
            <h3 className="text-xl font-semibold mb-3 text-center neon-text">
                Tendencia de Temperatura
            </h3>

            <div className="px-6 py-3">
                <LineChart width={chartWidth} height={chartHeight} data={chartData}>
                    <XAxis
                        dataKey="day"
                        tick={{
                            fill: getXAxisColor(), // ✅ Color dinámico
                            fontSize: 10
                        }}
                        tickLine={false}
                        axisLine={false}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                    />
                    <YAxis hide domain={['dataMin - 3', 'dataMax + 3']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke={getLineColor()} // ✅ Línea dinámica
                        strokeWidth={3}
                        dot={{
                            r: 5,
                            fill: getLineColor(),
                            stroke: getDotColor(),
                            strokeWidth: 2
                        }}
                        activeDot={{
                            r: 7,
                            fill: getDotColor(),
                            stroke: getLineColor(),
                            strokeWidth: 2
                        }}
                    />
                </LineChart>
            </div>
        </div>
    );
}