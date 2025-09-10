
import React from 'react';
import type { Prediction } from '../types';
import { formDefinitions } from '../constants';

interface HistoryProps {
    history: Prediction[];
    onViewItem: (item: Prediction) => void;
    onClearHistory: () => void;
}

const getMethodDisplayName = (methodKey: string) => {
    const field = formDefinitions[methodKey]?.[0];
    if (field) {
        // A rough way to get a display name from the first field's label
        return field.label.split('(')[0].trim();
    }
    return methodKey.charAt(0).toUpperCase() + methodKey.slice(1);
};

const getItemSummary = (item: Prediction) => {
    switch (item.method) {
        case 'bazi':
        case 'ziweidoushu':
            return `Gender: ${item.formData.gender}, Birth Time: ${item.formData.birthDateTime}`;
        case 'cezi':
            return `Character: "${item.formData.character}", Question: ${item.formData.question}`;
        default:
            const firstKey = Object.keys(item.formData)[0];
            if (firstKey) {
                 return `${firstKey}: ${item.formData[firstKey]}`;
            }
            return 'Click to see details';
    }
};

export const History: React.FC<HistoryProps> = ({ history, onViewItem, onClearHistory }) => {
    return (
        <div id="history-section">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold font-serif-sc">预测历史 (Prediction History)</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">点击查看历史预测结果 (Click to view past predictions)</p>
                </div>
                {history.length > 0 && (
                     <button 
                        onClick={onClearHistory} 
                        className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                        Clear History
                    </button>
                )}
            </div>

            <div id="history-list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {history.length === 0 ? (
                    <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                        暂无预测历史记录 (No prediction history yet)
                    </div>
                ) : (
                    history.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onViewItem(item)}
                            className="py-4 px-3 rounded cursor-pointer transition-colors duration-200 hover:bg-primary/10"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-medium text-lg text-primary">{getMethodDisplayName(item.method)}</h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(item.timestamp).toLocaleString()}
                                </span>
                            </div>
                             <p className="text-gray-600 dark:text-gray-300 text-sm truncate">{getItemSummary(item)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
