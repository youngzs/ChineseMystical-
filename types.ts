
import { formDefinitions } from './constants';

export type DivinationMethod = keyof typeof formDefinitions;

export type Language = 'chinese' | 'english' | 'japanese' | 'korean' | 'french' | 'german' | 'spanish' | 'russian';

export interface BaziPillar {
    pillar: string;
    wuXing: string;
}

export interface BaziInfo {
    year: BaziPillar;
    month: BaziPillar;
    day: BaziPillar;
    hour: BaziPillar;
    timePeriod: string;
    lunarDate: string;
    solarDate: string;
    animal: string;
    naYin: string[];
    jieQi: string;
    isZiHour: boolean;
}

export interface Prediction {
    id: string;
    method: DivinationMethod;
    formData: FormValues;
    baziInfo: BaziInfo | null;
    language: Language;
    content: string;
    timestamp: string;
    isSaved?: boolean;
}

export type FormValues = Record<string, string | number>;

export interface FormFieldOption {
    value: string;
    label: string;
}

export interface FormField {
    type: 'text' | 'number' | 'textarea' | 'select' | 'datetime-local';
    id: string;
    label: string;
    required: boolean;
    placeholder?: string;
    options?: FormFieldOption[];
    min?: number;
    max?: number;
    maxlength?: number;
}
