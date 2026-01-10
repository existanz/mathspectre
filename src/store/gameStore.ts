import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LEVEL_COORDINATES, MAPS } from '../data/maps';

export interface LevelProgress {
    stars: 0 | 1 | 2 | 3;
    completed: boolean;
}

interface GameState {
    currentMapId: string;
    unlockedMaps: string[];
    levels: Record<string, LevelProgress>;

    // Actions
    completeLevel: (levelId: string, stars: 0 | 1 | 2 | 3) => void;
    unlockMap: (mapId: string) => void;
    setCurrentMap: (mapId: string) => void;
    resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            currentMapId: 'map1',
            unlockedMaps: ['map1'],
            levels: {},

            completeLevel: (levelId, stars) => {
                set((state) => {
                    const currentStars = state.levels[levelId]?.stars || 0;
                    return {
                        levels: {
                            ...state.levels,
                            [levelId]: {
                                completed: true,
                                stars: Math.max(currentStars, stars) as 0 | 1 | 2 | 3,
                            },
                        },
                    };
                });

                // Check for map completion logic
                const state = get();
                const currentMapId = state.currentMapId;

                // Calculate total stars for current map
                let currentMapStars = 0;
                const maxStars = LEVEL_COORDINATES.length * 3;

                LEVEL_COORDINATES.forEach(coord => {
                    const key = `${currentMapId}_level${coord.id}`;
                    const levelData = state.levels[key];
                    if (levelData) {
                        currentMapStars += levelData.stars;
                    }
                });

                if (currentMapStars === maxStars) {
                    const currentIndex = MAPS.findIndex(m => m.id === currentMapId);
                    if (currentIndex !== -1 && currentIndex < MAPS.length - 1) {
                        const nextMap = MAPS[currentIndex + 1];
                        state.unlockMap(nextMap.id);
                    }
                }
            },

            unlockMap: (mapId) => set((state) => ({
                unlockedMaps: state.unlockedMaps.includes(mapId)
                    ? state.unlockedMaps
                    : [...state.unlockedMaps, mapId]
            })),

            setCurrentMap: (mapId) => set({ currentMapId: mapId }),

            resetProgress: () => set({
                currentMapId: 'map1',
                unlockedMaps: ['map1'],
                levels: {}
            }),
        }),
        {
            name: 'math-spectre-storage',
        }
    )
);
