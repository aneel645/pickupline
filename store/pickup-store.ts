import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PickupLine } from '@/mocks/pickup-lines';

interface AIGeneratedLine {
  id: string;
  text: string;
  categoryId: string;
  tone: string;
  createdAt: string;
}

interface PickupState {
  setState(arg0: { favorites: never[]; }): unknown;
  favorites: string[];
  recentlyViewed: string[];
  userRatings: Record<string, number>;
  aiGeneratedLines: AIGeneratedLine[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearAllFavorites: () => void;
  isFavorite: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
  ratePickupLine: (id: string, rating: number) => void;
  getUserRating: (id: string) => number | undefined;
  saveAIGeneratedLine: (text: string, categoryId: string, tone: string) => string;
  removeAIGeneratedLine: (id: string) => void;
  clearAllAIGeneratedLines: () => void;
  getAIGeneratedLines: () => AIGeneratedLine[];
  getAIGeneratedLineById: (id: string) => AIGeneratedLine | undefined;
}

export const usePickupStore = create<PickupState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentlyViewed: [],
      userRatings: {},
      aiGeneratedLines: [],

      setState: (state) => set(state),

      addFavorite: (id: string) => {
        set((state) => ({
          favorites: [...state.favorites, id],
        }));
      },

      removeFavorite: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        }));
      },

      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },

      addRecentlyViewed: (id: string) => {
        set((state) => {
          // Remove if already exists to avoid duplicates
          const filtered = state.recentlyViewed.filter((viewedId) => viewedId !== id);
          // Add to the beginning and limit to 10 items
          return {
            recentlyViewed: [id, ...filtered].slice(0, 10),
          };
        });
      },

      ratePickupLine: (id: string, rating: number) => {
        set((state) => ({
          userRatings: {
            ...state.userRatings,
            [id]: rating,
          },
        }));
      },

      getUserRating: (id: string) => {
        return get().userRatings[id];
      },

      saveAIGeneratedLine: (text: string, categoryId: string, tone: string) => {
        const id = `ai-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const newLine: AIGeneratedLine = {
          id,
          text,
          categoryId,
          tone,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          aiGeneratedLines: [newLine, ...state.aiGeneratedLines]
        }));

        return id;
      },

      getAIGeneratedLines: () => {
        return get().aiGeneratedLines;
      },

      getAIGeneratedLineById: (id: string) => {
        return get().aiGeneratedLines.find(line => line.id === id);
      },

      clearAllFavorites: () => {
        set(() => ({
          favorites: []
        }));
      },

      removeAIGeneratedLine: (id: string) => {
        set((state) => ({
          aiGeneratedLines: state.aiGeneratedLines.filter(line => line.id !== id)
        }));
      },

      clearAllAIGeneratedLines: () => {
        set(() => ({
          aiGeneratedLines: []
        }));
      },
    }),
    {
      name: 'pickup-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);