
import React, { useState, useEffect } from 'react';
import type { BaziInfo } from '../types';
import { calculateBazi } from '../utils/baziUtils';

interface BaziDisplayProps {
    dateTimeString: string;
}

export const BaziDisplay: React.FC<BaziDisplayProps> = ({ dateTimeString }) => {
    const [baziInfo, setBaziInfo] = useState<BaziInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (dateTimeString) {
            try {
                const info = calculateBazi(dateTimeString);
                setBaziInfo(info);
                setError(null);
            } catch (err) {
                setError('Invalid date/time for BaZi calculation.');
                setBaziInfo(null);
            }
        } else {
            setBaziInfo(null);
            setError(null);
        }
    }, [dateTimeString]);

    if (!baziInfo && !error) {
        return null; 
    }

    return (
        <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
            <h3 className="text-lg font-medium font-serif-sc mb-2">四柱信息 (BaZi Info)</h3>
            {error && <p className="text-red-500">{error}</p>}
            {baziInfo && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                        <div><strong>阳历 (Solar):</strong> {baziInfo.solarDate}</div>
                        <div><strong>农历 (Lunar):</strong> {baziInfo.lunarDate}</div>
                        <div><strong>时辰 (Time Period):</strong> {baziInfo.timePeriod}</div>
                        <div><strong>生肖 (Animal):</strong> {baziInfo.animal}</div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-3">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                            <div className="font-medium mb-1">年柱 (Year)</div>
                            <div className="text-lg font-serif-sc">{baziInfo.year.pillar}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{baziInfo.year.wuXing}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                            <div className="font-medium mb-1">月柱 (Month)</div>
                            <div className="text-lg font-serif-sc">{baziInfo.month.pillar}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{baziInfo.month.wuXing}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                            <div className="font-medium mb-1">日柱 (Day)</div>
                            <div className="text-lg font-serif-sc">{baziInfo.day.pillar}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{baziInfo.day.wuXing}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                            <div className="font-medium mb-1">时柱 (Hour)</div>
                            <div className="text-lg font-serif-sc">{baziInfo.hour.pillar}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{baziInfo.hour.wuXing}</div>
                        </div>
                    </div>
                    {baziInfo.isZiHour && <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Note: 23:00-00:59 belongs to Zi hour, using the next day's date for calculation.</p>}
                </>
            )}
        </div>
    );
};
