// src/components/SearchCity.jsx
import { useState } from 'react';

export default function SearchCity({ onSearch }) {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Buscar ciudad..."
                    className="w-full px-5 py-3 bg-white/10 text-white placeholder-cyber/50 focus:ring-2 focus:ring-cyber focus:bg-white/20 transition-all"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyber hover:bg-neon text-dark font-bold py-1 px-4 rounded-lg transition-all duration-300"
                >
                    ↵
                </button>
            </div>
        </form>
    );
}