export interface LevelCoordinate {
    id: number;
    x: number;
    y: number;
}

export const LEVEL_COORDINATES: LevelCoordinate[] = [
    { id: 1, x: 74, y: 85 },
    { id: 2, x: 65, y: 70 },
    { id: 3, x: 46.5, y: 62.7 },
    { id: 4, x: 30, y: 67 },
    { id: 5, x: 15.5, y: 59.5 },
    { id: 6, x: 13, y: 42 },
    { id: 7, x: 30, y: 34 },
    { id: 8, x: 49.5, y: 35 },
    { id: 9, x: 65.5, y: 23 },
    { id: 10, x: 81.5, y: 30 },
    { id: 11, x: 80, y: 46 },
    { id: 12, x: 68.5, y: 56 },
];

import { Calculator, Hash, Minus, Scale, type LucideIcon } from 'lucide-react';


export interface ProblemConfig {
    type: 'counting' | 'addition' | 'subtraction' | 'comparison';
    limit: number;
    isAdvanced?: boolean;
}

export interface MapInfo {
    id: string;
    title: string;
    icon: LucideIcon;
    iconUrl?: string;
    bgImage?: string;
    desc: string;
    problemConfig: ProblemConfig;
}

// Map Icons
import level1Icon from '../assets/images/maps/level1_icon.png';
import level2Icon from '../assets/images/maps/level2_icon.png';
import level3Icon from '../assets/images/maps/level3_icon.png';
import level4Icon from '../assets/images/maps/level4_icon.png';
import level5Icon from '../assets/images/maps/level5_icon.png';
import level6Icon from '../assets/images/maps/level6_icon.png';
import level7Icon from '../assets/images/maps/level7_icon.png';

// Map Backgrounds
import level1Map from '../assets/images/maps/level1_map.png';
import level2Map from '../assets/images/maps/level2_map.png';
import level3Map from '../assets/images/maps/level3_map.png';
import level4Map from '../assets/images/maps/level4_map.png';
import level5Map from '../assets/images/maps/level5_map.png';
import level6Map from '../assets/images/maps/level6_map.png';
import level7Map from '../assets/images/maps/level7_map.png';

export const MAPS: MapInfo[] = [
    {
        id: 'map1',
        title: 'Счет до 10',
        icon: Hash,
        iconUrl: level1Icon,
        bgImage: level1Map,
        desc: 'Учимся считать предметы',
        problemConfig: { type: 'counting', limit: 10 }
    },
    {
        id: 'map2',
        title: 'Сложение до 10',
        icon: Calculator,
        iconUrl: level2Icon,
        bgImage: level2Map,
        desc: 'Простые примеры на сложение',
        problemConfig: { type: 'addition', limit: 10 }
    },
    {
        id: 'map3',
        title: 'Вычитание до 10',
        icon: Minus,
        iconUrl: level3Icon,
        bgImage: level3Map,
        desc: 'Учимся отнимать',
        problemConfig: { type: 'subtraction', limit: 10 }
    },
    {
        id: 'map4',
        title: 'Больше / Меньше',
        icon: Scale,
        iconUrl: level4Icon,
        bgImage: level4Map,
        desc: 'Сравниваем количества',
        problemConfig: { type: 'comparison', limit: 10 }
    },
    {
        id: 'map5',
        title: 'Сложение до 20',
        icon: Calculator,
        iconUrl: level5Icon,
        bgImage: level5Map,
        desc: 'Сложные примеры',
        problemConfig: { type: 'addition', limit: 20, isAdvanced: true }
    },
    {
        id: 'map6',
        title: 'Вычитание до 20',
        icon: Minus,
        iconUrl: level6Icon,
        bgImage: level6Map,
        desc: 'Сложное вычитание',
        problemConfig: { type: 'subtraction', limit: 20, isAdvanced: true }
    },
    {
        id: 'map7',
        title: 'Сравнение до 20',
        icon: Scale,
        iconUrl: level7Icon,
        bgImage: level7Map,
        desc: 'Сравнение больших чисел',
        problemConfig: { type: 'comparison', limit: 20, isAdvanced: true }
    },
];
