
import React, { useState, useCallback, useMemo } from 'react';
import type { DivinationMethod, Language, BaziInfo, Prediction, FormValues } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { MethodSelector } from './MethodSelector';
import { DynamicForm } from './DynamicForm';
import { LoadingIndicator } from './LoadingIndicator';
import { Results } from './Results';
import { formDefinitions } from '../constants';

interface NewPredictionProps {
    isLoading: boolean;
    currentPrediction: Prediction | null;
    error: string | null;
    onGetPrediction: (method: DivinationMethod, language: Language, formData: FormValues, baziInfo: BaziInfo | null) => void;
    onSavePrediction: () => void;
    onNewPrediction: () => void;
}

export const NewPrediction: React.FC<NewPredictionProps> = ({ isLoading, currentPrediction, error, onGetPrediction, onSavePrediction, onNewPrediction }) => {
    const [selectedMethod, setSelectedMethod] = useState<DivinationMethod>('bazi');
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('chinese');
    const [formData, setFormData] = useState<FormValues>({});
    const [baziInfo, setBaziInfo] = useState<BaziInfo | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const initialFormData = useMemo(() => {
        const initialData: FormValues = {};
        const fields = formDefinitions[selectedMethod];
        if (fields) {
            fields.forEach(field => {
                if (field.type === 'datetime-local') {
                    const now = new Date();
                    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                    initialData[field.id] = now.toISOString().slice(0, 16);
                } else {
                    initialData[field.id] = '';
                }
            });
        }
        return initialData;
    }, [selectedMethod]);

    React.useEffect(() => {
        setFormData(initialFormData);
        setFormErrors({});
    }, [selectedMethod, initialFormData]);

    const validateForm = useCallback(() => {
        const errors: Record<string, string> = {};
        const fields = formDefinitions[selectedMethod];
        fields.forEach(field => {
            if (field.required && !formData[field.id]) {
                errors[field.id] = `${field.label} is required.`;
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData, selectedMethod]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onGetPrediction(selectedMethod, selectedLanguage, formData, baziInfo);
        }
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return (
            <div className="text-center py-8 bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-600 dark:text-red-400">
                <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
                <p>{error}</p>
                <button
                    onClick={onNewPrediction}
                    className="mt-4 py-2 px-4 bg-primary hover:bg-opacity-90 text-white font-medium rounded-md shadow-md transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (currentPrediction) {
        return (
            <Results
                prediction={currentPrediction}
                onSave={onSavePrediction}
                onNewPrediction={onNewPrediction}
            />
        );
    }
    
    return (
        <div id="new-prediction-section">
            <form onSubmit={handleSubmit}>
                <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
                <MethodSelector selectedMethod={selectedMethod} onSelectMethod={setSelectedMethod} />
                <DynamicForm 
                    method={selectedMethod} 
                    formData={formData}
                    onFormChange={setFormData}
                    onBaziInfoChange={setBaziInfo}
                    formErrors={formErrors}
                />
                <div className="flex justify-center mb-8">
                    <button 
                        id="submit-btn" 
                        type="submit"
                        className="py-3 px-6 bg-primary hover:bg-opacity-90 text-white font-medium rounded-md shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        获取预测 (Get Prediction)
                    </button>
                </div>
            </form>
        </div>
    );
};
