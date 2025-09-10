
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-2">Powered by Google Gemini</p>
            <p>© {new Date().getFullYear()} 玄易通 - Chinese Mystical Divination</p>
        </footer>
    );
};
