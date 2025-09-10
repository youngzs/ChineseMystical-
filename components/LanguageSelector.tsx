
import React from 'react';
import type { Language } from '../types';

interface LanguageSelectorProps {
    selectedLanguage: Language;
    onSelectLanguage: (language: Language) => void;
}

const languages: { value: Language, label: string }[] = [
    { value: 'chinese', label: '中文 (Chinese)' },
    { value: 'english', label: '英文 (English)' },
    { value: 'japanese', label: '日文 (Japanese)' },
    { value: 'korean', label: '韩文 (Korean)' },
    { value: 'french', label: '法文 (French)' },
    { value: 'german', label: '德文 (German)' },
    { value: 'spanish', label: '西班牙文 (Spanish)' },
    { value: 'russian', label: '俄文 (Russian)' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium mb-2">选择语言 (Select Response Language):</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {languages.map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onSelectLanguage(value)}
                        className={`p-2 rounded-md text-sm transition-colors ${
                            selectedLanguage === value 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-200 dark:bg-gray-700 hover:bg-primary/80 hover:text-white'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};
