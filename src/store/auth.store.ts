import { create } from "zustand";
import { persist } from "zustand/middleware";

const CREDENTIALS: Record<string, string> = {
  Tamirlan: "admin",
  Sultan: "admin",
  Sanzhar: "admin",
};

export type AuthUser = { name: string };

interface AuthState {
  user: AuthUser | null;
  login: (login: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (login, password) => {
        const expected = CREDENTIALS[login];
        if (expected && expected === password) {
          set({ user: { name: login } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    { name: "draxler-auth" },
  ),
);
