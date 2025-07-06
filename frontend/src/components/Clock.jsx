import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    };

    const formatDate = (date) => {
        return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-8 py-6 rounded-2xl shadow-2xl border border-gray-700 w-fit mx-auto">
            <span className="text-lg text-gray-300 mb-2 tracking-wide">{formatDate(time)}</span>
            <span className="text-6xl font-mono text-white tracking-widest drop-shadow-lg">
                {formatTime(time)}
            </span>
        </div>
    );
};

export default Clock;
