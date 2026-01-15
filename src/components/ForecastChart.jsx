import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="glass-card p-3 border-cyber/40">
                <p className="font-bold text-neon">{label}</p>
                <p>{Math.round(data.temp)}°</p>
                <p className="text-sm text-cyber/80 capitalize">{data.description}</p>
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
                setChartWidth(chartRef.current.clientWidth - 40); // Más margen
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
                <div className="text-cyber/70">Cargando gráfica...</div>
            </div>
        );
    }

    const chartData = forecast.map(item => ({
        day: new Date(item.dt_txt).toLocaleDateString('es', { weekday: 'short' }).slice(0, 3), // Solo 3 letras: "vie", "sáb"
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
    }));

    const chartHeight = 160;

    return (
        <div className="mt-6 glass-card w-full" ref={chartRef}>
            <h3 className="text-xl font-semibold mb-3 text-center neon-text">
                Tendencia de Temperatura
            </h3>

            {/* Contenedor con más padding */}
            <div className="px-6 py-3">
                <LineChart width={chartWidth} height={chartHeight} data={chartData}>
                    <XAxis
                        dataKey="day"
                        tick={{ fill: '#0abdc6', fontSize: 10 }} // Texto más pequeño
                        tickLine={false}
                        axisLine={false}
                        interval={0} // Mostrar todos los días
                        angle={-45} // Inclinar las etiquetas para ahorrar espacio
                        textAnchor="end" // Alinear al final para evitar corte
                    />
                    <YAxis
                        hide
                        domain={['dataMin - 3', 'dataMax + 3']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#00f0ff"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                            fill: '#00f0ff',
                            stroke: '#00b894',
                            strokeWidth: 2
                        }}
                        activeDot={{
                            r: 7,
                            fill: '#00b894',
                            stroke: '#00f0ff',
                            strokeWidth: 2
                        }}
                    />
                </LineChart>
            </div>
        </div>
    );
}