import { create } from "zustand";
import type { IAuthState } from "../interfaces/IAuthState";

export const useAuthStore = create<IAuthState>((set, get) => ({
  token: localStorage.getItem("FrequenC-token"),
  setToken: (token) => {
    localStorage.setItem("FrequenC-token", token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("FrequenC-token");
    set({ token: null });
  },
  isAuthenticated: () => !!get().token,
}));
