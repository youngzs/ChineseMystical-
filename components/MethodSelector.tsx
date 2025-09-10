
import React from 'react';
import type { DivinationMethod } from '../types';

interface MethodSelectorProps {
    selectedMethod: DivinationMethod;
    onSelectMethod: (method: DivinationMethod) => void;
}

const methods: { value: DivinationMethod, label: string, subLabel: string }[] = [
    { value: 'bazi', label: '八字分析', subLabel: 'BaZi Analysis' },
    { value: 'ziweidoushu', label: '紫微斗数', subLabel: 'Purple Star' },
    { value: 'cezi', label: '测字预测', subLabel: 'Character' },
    { value: 'fengshui', label: '风水堪舆', subLabel: 'Feng Shui' },
    { value: 'liuyao', label: '六爻预测', subLabel: 'Six-line' },
    { value: 'meihua', label: '梅花易数', subLabel: 'Plum Blossom' },
    { value: 'mianxiang', label: '面相学', subLabel: 'Face Reading' },
    { value: 'qimen', label: '奇门遁甲', subLabel: 'Qi Men Dun Jia' },
];

export const MethodSelector: React.FC<MethodSelectorProps> = ({ selectedMethod, onSelectMethod }) => {
    return (
        <div className="mb-8">
            <label className="block text-sm font-medium mb-2">选择预测方法 (Select Divination Method):</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                 {methods.map(({ value, label, subLabel }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onSelectMethod(value)}
                         className={`p-3 rounded-md transition-colors flex flex-col items-center text-sm shadow-sm ${
                            selectedMethod === value 
                                ? 'bg-primary text-white' 
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-primary/80 hover:text-white'
                        }`}
                    >
                        <span className="text-base font-medium font-serif-sc">{label}</span>
                        <span className="text-xs opacity-80">{subLabel}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
