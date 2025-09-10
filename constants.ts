
import type { FormField } from './types';

export const formDefinitions: Record<string, FormField[]> = {
    bazi: [
        { type: 'datetime-local', id: 'birthDateTime', label: '出生时间 (Birth Date & Time)', required: true },
        { type: 'select', id: 'gender', label: '性别 (Gender)', options: [{ value: 'male', label: '男 (Male)' }, { value: 'female', label: '女 (Female)' }], required: true },
        { type: 'text', id: 'birthLocation', label: '出生地点 (Birth Location)', required: true, placeholder: 'e.g., Beijing, New York' },
        { type: 'text', id: 'focus', label: '重点关注 (Focus Area)', required: false, placeholder: '例如：事业、婚姻、健康等 (e.g., Career, Marriage, Health)' }
    ],
    ziweidoushu: [
        { type: 'datetime-local', id: 'birthDateTime', label: '出生时间 (Birth Date & Time)', required: true },
        { type: 'select', id: 'gender', label: '性别 (Gender)', options: [{ value: 'male', label: '男 (Male)' }, { value: 'female', label: '女 (Female)' }], required: true },
        { type: 'text', id: 'birthLocation', label: '出生地点 (Birth Location)', required: true, placeholder: 'e.g., Shanghai, London' },
        { type: 'text', id: 'focus', label: '重点关注 (Focus Area)', required: false, placeholder: '例如：财运、学业、人际关系 (e.g., Wealth, Studies, Relationships)' }
    ],
    cezi: [
        { type: 'text', id: 'character', label: '测字 (Character)', placeholder: '输入一个汉字 (Enter a single Chinese character)', maxlength: 1, required: true },
        { type: 'text', id: 'question', label: '预测事项 (Question)', placeholder: '您想了解的事项 (What you want to know)', required: true },
        { type: 'text', id: 'motivation', label: '动机 (Motivation)', placeholder: '您想测字的原因 (Your reason for divination)', required: false }
    ],
    fengshui: [
        { type: 'select', id: 'direction', label: '房屋朝向 (House Direction)', options: [ { value: '东', label: '东 (East)' }, { value: '南', label: '南 (South)' }, { value: '西', label: '西 (West)' }, { value: '北', label: '北 (North)' }, { value: '东南', label: '东南 (Southeast)' }, { value: '东北', label: '东北 (Northeast)' }, { value: '西南', label: '西南 (Southwest)' }, { value: '西北', label: '西北 (Northwest)' } ], required: true },
        { type: 'textarea', id: 'layout', label: '房屋格局 (House Layout)', placeholder: '描述房屋布局、格局、特点等 (Describe the layout and features)', required: true },
        { type: 'textarea', id: 'concern', label: '主要困扰 (Main Concern)', placeholder: '您当前面临的问题或困扰 (Your current issues or concerns)', required: true }
    ],
    liuyao: [
        { type: 'datetime-local', id: 'askTime', label: '求测时间 (Divination Time)', required: true },
        { type: 'text', id: 'question', label: '求测事项 (Question)', placeholder: '您想了解的事项 (What you want to know)', required: true },
        { type: 'text', id: 'motivation', label: '动机 (Motivation)', placeholder: '您求测的原因 (Your reason for divination)', required: false }
    ],
    meihua: [
        { type: 'datetime-local', id: 'askTime', label: '求测时间 (Divination Time)', required: true },
        { type: 'text', id: 'question', label: '求测事项 (Question)', placeholder: '您想了解的事项 (What you want to know)', required: true },
        { type: 'text', id: 'numbers', label: '数字 (Numbers)', placeholder: '您选择的数字，用逗号分隔 (Your chosen numbers, comma-separated)', required: true }
    ],
    mianxiang: [
        { type: 'select', id: 'gender', label: '性别 (Gender)', options: [{ value: 'male', label: '男 (Male)' }, { value: 'female', label: '女 (Female)' }], required: true },
        { type: 'number', id: 'age', label: '年龄 (Age)', min: 1, max: 120, required: true },
        { type: 'textarea', id: 'features', label: '面部特征 (Facial Features)', placeholder: '描述面部特征，如脸型、眉眼、鼻子、嘴巴等', required: true },
        { type: 'text', id: 'focus', label: '重点关注 (Focus Area)', placeholder: '例如：事业、婚姻、健康等', required: false }
    ],
    qimen: [
        { type: 'datetime-local', id: 'askTime', label: '求测时间 (Divination Time)', required: true },
        { type: 'text', id: 'question', label: '求测事项 (Question)', placeholder: '您想了解的事项 (What you want to know)', required: true },
        { type: 'textarea', id: 'situation', label: '当前处境 (Current Situation)', placeholder: '描述您当前的情况 (Describe your current situation)', required: true }
    ],
};
