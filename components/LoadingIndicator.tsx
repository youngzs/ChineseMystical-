
import React from 'react';

export const LoadingIndicator: React.FC = () => {
    return (
        <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-lg font-medium">正在进行预测分析 (Analyzing prediction)...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">请稍候，这可能需要一点时间 (Please wait, this may take a moment)</p>
        </div>
    );
};
