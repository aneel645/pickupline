import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
    hasCompletedOnboarding: boolean;
    setOnboardingComplete: () => void;
    resetOnboardingStatus: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            hasCompletedOnboarding: false,

            setOnboardingComplete: () => {
                set({ hasCompletedOnboarding: true });
            },

            resetOnboardingStatus: () => {
                set({ hasCompletedOnboarding: false });
            },
        }),
        {
            name: 'onboarding-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);