import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "light",
      toggleTheme: () => {
        const newMode = get().mode === "light" ? "dark" : "light";
        set({ mode: newMode });
      },
    }),
    { name: "theme-storage" } // Stores theme in localStorage
  )
);

export { useThemeStore };
