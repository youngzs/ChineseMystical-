
import type { DivinationMethod, Language, FormValues, BaziInfo } from '../types';

const languageInstructions: Record<Language, string> = {
    chinese: '请用简体中文回复。',
    english: 'Please respond in English.',
    japanese: '日本語で回答してください。',
    korean: '한국어로 응답해 주세요.',
    french: 'Veuillez répondre en français.',
    german: 'Bitte antworten Sie auf Deutsch.',
    spanish: 'Por favor, responda en español.',
    russian: 'Пожалуйста, ответьте на русском языке.',
};

const buildBaziPrompt = (formData: FormValues, baziInfo: BaziInfo | null): string => {
    let prompt = `Please analyze the following BaZi chart:
- Solar Birth Time: ${formData.birthDateTime}
- Gender: ${formData.gender}
- Birth Location: ${formData.birthLocation}
- Focus Area: ${formData.focus || 'Overall fortune analysis'}
`;
    if (baziInfo) {
        prompt += `
- Lunar Date: ${baziInfo.lunarDate}
- Four Pillars: 
  - Year: ${baziInfo.year.pillar} (${baziInfo.year.wuXing})
  - Month: ${baziInfo.month.pillar} (${baziInfo.month.wuXing})
  - Day: ${baziInfo.day.pillar} (${baziInfo.day.wuXing})
  - Hour: ${baziInfo.hour.pillar} (${baziInfo.hour.wuXing})
`;
    }
    return prompt;
};

const buildDefaultPrompt = (method: DivinationMethod, formData: FormValues): string => {
    let prompt = `Divination Method: ${method}\n`;
    prompt += `Please provide a prediction based on the following information:\n`;
    for (const [key, value] of Object.entries(formData)) {
        if (value) {
            prompt += `- ${key}: ${value}\n`;
        }
    }
    return prompt;
};


export const buildUserPrompt = (method: DivinationMethod, formData: FormValues, language: Language, baziInfo: BaziInfo | null): string => {
    let prompt = '';

    switch (method) {
        case 'bazi':
        case 'ziweidoushu': // Zi Wei also benefits from BaZi info
            prompt = buildBaziPrompt(formData, baziInfo);
            break;
        default:
            prompt = buildDefaultPrompt(method, formData);
            if (baziInfo && ['liuyao', 'meihua', 'qimen'].includes(method)) {
                 prompt += `
- Divination Time (Lunar): ${baziInfo.lunarDate}
- Four Pillars of the moment: ${baziInfo.year.pillar}, ${baziInfo.month.pillar}, ${baziInfo.day.pillar}, ${baziInfo.hour.pillar}
`;
            }
            break;
    }

    prompt += `\n${languageInstructions[language]}`;
    return prompt;
};
