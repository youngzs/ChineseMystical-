
import type { BaziInfo } from '../types';

// Type declarations for the global lunar-javascript library
declare const Solar: any;

const stemFiveElements: Record<string, string> = { "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水" };
const branchFiveElements: Record<string, string> = { "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水" };
const timePeriods = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];

const getHourIndex = (hour: number): number => {
    if (hour >= 23 || hour < 1) return 0;
    if (hour < 3) return 1; if (hour < 5) return 2; if (hour < 7) return 3;
    if (hour < 9) return 4; if (hour < 11) return 5; if (hour < 13) return 6;
    if (hour < 15) return 7; if (hour < 17) return 8; if (hour < 19) return 9;
    if (hour < 21) return 10;
    return 11;
};

const getFiveElementsFromGanZhi = (ganZhi: string): string => {
    if (!ganZhi || ganZhi.length < 2) return "";
    const stem = ganZhi.charAt(0);
    const branch = ganZhi.charAt(1);
    const stemWuXing = stemFiveElements[stem] || "";
    const branchWuXing = branchFiveElements[branch] || "";
    return `${stemWuXing}/${branchWuXing}`;
};

export const calculateBazi = (dateTimeStr: string): BaziInfo => {
    if (typeof Solar === 'undefined') {
        throw new Error('lunar-javascript library is not loaded.');
    }
    
    const dateObj = new Date(dateTimeStr);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();

    const isZiHour = hour >= 23;
    const calcDate = new Date(dateObj);
    if (isZiHour) {
        calcDate.setDate(calcDate.getDate() + 1);
    }
    
    const solar = Solar.fromYmdHms(calcDate.getFullYear(), calcDate.getMonth() + 1, calcDate.getDate(), hour, minute, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();
    
    const yearPillar = eightChar.getYear();
    const monthPillar = eightChar.getMonth();
    const dayPillar = eightChar.getDay();
    const hourPillar = eightChar.getTime();

    return {
        year: { pillar: yearPillar, wuXing: getFiveElementsFromGanZhi(yearPillar) },
        month: { pillar: monthPillar, wuXing: getFiveElementsFromGanZhi(monthPillar) },
        day: { pillar: dayPillar, wuXing: getFiveElementsFromGanZhi(dayPillar) },
        hour: { pillar: hourPillar, wuXing: getFiveElementsFromGanZhi(hourPillar) },
        timePeriod: timePeriods[getHourIndex(hour)],
        lunarDate: lunar.toString(),
        solarDate: `${year}年${month}月${day}日 ${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`,
        animal: lunar.getYearShengXiao(),
        naYin: [eightChar.getYearNaYin(), eightChar.getMonthNaYin(), eightChar.getDayNaYin(), eightChar.getTimeNaYin()],
        jieQi: lunar.getJieQi() || '无',
        isZiHour
    };
};
