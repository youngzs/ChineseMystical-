import React, { useEffect, useRef } from 'react';
// FIX: Import BaziPillar to use for type casting below.
import type { Prediction, BaziPillar } from '../types';

interface ResultsProps {
    prediction: Prediction;
    onSave: () => void;
    onNewPrediction: () => void;
}

export const Results: React.FC<ResultsProps> = ({ prediction, onSave, onNewPrediction }) => {
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resultsRef.current && (window as any).marked) {
            resultsRef.current.innerHTML = (window as any).marked.parse(prediction.content);
        }
    }, [prediction.content]);

    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold font-serif-sc">预测结果 (Prediction Results)</h2>
                <div className="flex items-center gap-2">
                    {!prediction.isSaved && (
                         <button 
                            onClick={onSave} 
                            className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-opacity-90 transition-colors">
                            保存结果 (Save Result)
                        </button>
                    )}
                    <button 
                        onClick={onNewPrediction}
                        className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        新的预测 (New Prediction)
                    </button>
                </div>
            </div>
            <div className="p-4 space-y-4">
                {prediction.baziInfo && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                        <h3 className="text-lg font-medium mb-2 font-serif-sc">命盘信息 (Chart Information)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                            <div><strong>阳历 (Solar):</strong> {prediction.baziInfo.solarDate}</div>
                            <div><strong>农历 (Lunar):</strong> {prediction.baziInfo.lunarDate}</div>
                            <div><strong>时辰 (Time Period):</strong> {prediction.baziInfo.timePeriod}</div>
                            <div><strong>生肖 (Animal):</strong> {prediction.baziInfo.animal}</div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-3">
                            {Object.entries(prediction.baziInfo).filter(([key]) => ['year', 'month', 'day', 'hour'].includes(key)).map(([key, value]) => (
                                <div key={key} className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                                    <div className="font-medium mb-1 capitalize">{key} Pillar</div>
                                    {/* FIX: Cast `value` to BaziPillar because Object.entries types it as `unknown`. */}
                                    <div className="text-lg font-serif-sc">{(value as BaziPillar).pillar}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{(value as BaziPillar).wuXing}</div>
                                </div>
                            ))}
                        </div>
                         {prediction.baziInfo.isZiHour && <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Note: 23:00-00:59 belongs to Zi hour, using the next day's date for calculation.</p>}
                    </div>
                )}
                <div ref={resultsRef} className="prose dark:prose-invert max-w-none"></div>
            </div>
        </div>
    );
};