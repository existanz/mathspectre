export interface LevelCoordinate {
    id: number;
    x: number;
    y: number;
}

export const LEVEL_COORDINATES: LevelCoordinate[] = [
    { id: 1, x: 75.7, y: 85 },
    { id: 2, x: 65.7, y: 70 },
    { id: 3, x: 45.7, y: 62 },
    { id: 4, x: 28, y: 67 },
    { id: 5, x: 12.5, y: 59.5 },
    { id: 6, x: 9.8, y: 42 },
    { id: 7, x: 27.8, y: 34 },
    { id: 8, x: 49, y: 35 },
    { id: 9, x: 66.3, y: 23 },
    { id: 10, x: 83.5, y: 30 },
    { id: 11, x: 83, y: 46 },
    { id: 12, x: 70, y: 56 },
];

import { Calculator, Hash, Minus, Scale, type LucideIcon } from 'lucide-react';

export interface MapInfo {
    id: string;
    title: string;
    icon: LucideIcon;
    iconUrl?: string;
    desc: string;
}

export const MAPS: MapInfo[] = [
    { id: 'map1', title: 'Счет до 10', icon: Hash, iconUrl: '/images/maps/level1_icon.png', desc: 'Учимся считать предметы' },
    { id: 'map2', title: 'Сложение до 10', icon: Calculator, iconUrl: '/images/maps/level2_icon.png', desc: 'Простые примеры на сложение' },
    { id: 'map3', title: 'Вычитание до 10', icon: Minus, iconUrl: '/images/maps/level3_icon.png', desc: 'Учимся отнимать' },
    { id: 'map4', title: 'Больше / Меньше', icon: Scale, iconUrl: '/images/maps/level4_icon.png', desc: 'Сравниваем количества' },
    { id: 'map5', title: 'Сложение до 20', icon: Calculator, iconUrl: '/images/maps/level5_icon.png', desc: 'Сложные примеры' },
    { id: 'map6', title: 'Вычитание до 20', icon: Minus, iconUrl: '/images/maps/level6_icon.png', desc: 'Сложное вычитание' },
    { id: 'map7', title: 'Сравнение до 20', icon: Scale, iconUrl: '/images/maps/level7_icon.png', desc: 'Сравнение больших чисел' },
];
