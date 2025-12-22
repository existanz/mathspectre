import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        (set) => ({
            currentMapId: 'map1',
            unlockedMaps: ['map1'],
            levels: {},

            completeLevel: (levelId, stars) => set((state) => {
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
            }),

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
