
import React, { useEffect, useCallback } from 'react';
import type { DivinationMethod, BaziInfo, FormValues } from '../types';
import { formDefinitions } from '../constants';
import { calculateBazi } from '../utils/baziUtils';
import { BaziDisplay } from './BaziDisplay';

interface DynamicFormProps {
    method: DivinationMethod;
    formData: FormValues;
    formErrors: Record<string, string>;
    onFormChange: (formData: FormValues) => void;
    onBaziInfoChange: (baziInfo: BaziInfo | null) => void;
}

const DATE_FIELD_IDS = ['birthDateTime', 'askTime', 'birthTime'];

export const DynamicForm: React.FC<DynamicFormProps> = ({ method, formData, formErrors, onFormChange, onBaziInfoChange }) => {
    const fields = formDefinitions[method] || [];
    
    const dateField = fields.find(f => f.type === 'datetime-local' && DATE_FIELD_IDS.includes(f.id));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        onFormChange({ ...formData, [id]: value });
    };

    const updateBazi = useCallback(() => {
        if (dateField && formData[dateField.id]) {
            try {
                const baziData = calculateBazi(formData[dateField.id] as string);
                onBaziInfoChange(baziData);
            } catch (error) {
                console.error("BaZi calculation error:", error);
                onBaziInfoChange(null);
            }
        } else {
            onBaziInfoChange(null);
        }
    }, [dateField, formData, onBaziInfoChange]);

    useEffect(() => {
        updateBazi();
    }, [formData, method, updateBazi]);

    return (
        <div className="mb-8 space-y-6">
            {fields.map(field => (
                <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium mb-2">{field.label}</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.id}
                            value={formData[field.id] as string || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            placeholder={field.placeholder}
                            rows={3}
                            className="w-full p-3 text-base border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    ) : field.type === 'select' ? (
                        <select
                            id={field.id}
                            value={formData[field.id] as string || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            className="w-full p-3 text-base border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="" disabled>Select an option</option>
                            {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            value={formData[field.id] as string || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            placeholder={field.placeholder}
                            min={field.min}
                            max={field.max}
                            maxLength={field.maxlength}
                             className="w-full p-3 text-base border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    )}
                    {formErrors[field.id] && <p className="text-red-500 text-xs mt-1">{formErrors[field.id]}</p>}
                </div>
            ))}
             {dateField && <BaziDisplay dateTimeString={formData[dateField.id] as string} />}
        </div>
    );
};
