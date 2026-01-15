# 🌤️ Dashboard de Clima Futurista

![Clima Futuro - Modo Oscuro](https://via.placeholder.com/800x400/0f0f1b/00f0ff?text=Modo+Oscuro+Futurista)
![Clima Futuro - Modo Claro](https://via.placeholder.com/800x400/f8fafc/0ea5e9?text=Modo+Claro+Moderno)

Un dashboard meteorológico inmersivo construido con **React y Tailwind CSS**, que combina funcionalidad avanzada con un diseño futurista y adaptable. Muestra el clima actual, pronóstico de 5 días, calidad del aire e índice UV en tiempo real.

[✨ **Ver Demo en Vivo**](https://tu-dominio.vercel.app) *(reemplaza con tu URL)*

---

## 🚀 Características Destacadas

- **Diseño Futurista**: Fondo dinámico que cambia según las condiciones climáticas (soleado, lluvioso, nublado, etc.)
- **Modo Claro/Oscuro**: Adaptación automática a las preferencias del sistema o cambio manual
- **Geolocalización**: Obtén el clima de tu ubicación actual con un solo clic
- **Pronóstico Inteligente**: 
  - Tarjetas de 5 días con íconos y temperaturas
  - Gráfica interactiva de tendencia de temperatura
- **Datos Ambientales Completos**:
  - Calidad del aire (AQI) con niveles de riesgo
  - Índice UV con recomendaciones de salud
  - Detalles técnicos: viento, humedad, presión, visibilidad
- **Experiencia de Usuario Premium**:
  - Scroll fluido y responsive total (móvil, tablet, desktop)
  - Manejo robusto de errores con reintentos
  - Persistencia de preferencias y búsquedas recientes

---

## 🛠️ Tecnologías Utilizadas

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white&style=flat)
![Recharts](https://img.shields.io/badge/Recharts-FF5733?logo=chartdotjs&logoColor=white&style=flat)
![OpenWeather API](https://img.shields.io/badge/OpenWeather-API-1E3A8A?style=flat)

- **Frontend**: React 18, Hooks personalizados, Context API
- **Estilos**: Tailwind CSS con configuración personalizada (colores neón, glassmorphism)
- **Visualización**: Recharts para gráficas interactivas
- **API**: OpenWeatherMap (Free Plan)
- **Herramientas**: ESLint, Prettier, Vite/Create React App

---

## 📦 Instalación Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/luislml/weather-dashboard-react.git
   cd weather-dashboard-react
2. Instala las dependencias:
   ```bash
   npm install
3. Configura la API Key:
   ```bash
   cp .env.example .env
   # Edita .env y agrega tu API Key de OpenWeather
   REACT_APP_OPENWEATHER_API_KEY=tu_clave_aqui
4. Inicia el servidor de desarrollo:
   ```bash
   npm start
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
