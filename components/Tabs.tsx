
import React from 'react';

interface TabsProps {
    activeTab: 'new' | 'history';
    setActiveTab: (tab: 'new' | 'history') => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const getTabClasses = (tabName: 'new' | 'history') => {
        const baseClasses = 'py-2 px-4 font-medium transition-colors duration-200 focus:outline-none';
        if (activeTab === tabName) {
            return `${baseClasses} text-primary border-b-2 border-primary`;
        }
        return `${baseClasses} text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300`;
    };

    return (
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
                <button 
                    onClick={() => setActiveTab('new')}
                    className={getTabClasses('new')}
                >
                    新预测 (New Prediction)
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={getTabClasses('history')}
                >
                    历史记录 (History)
                </button>
            </div>
        </div>
    );
};
