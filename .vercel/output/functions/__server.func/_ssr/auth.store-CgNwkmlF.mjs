import { c as create, p as persist } from "../_libs/zustand.mjs";
const CREDENTIALS = {
  Tamirlan: "admin",
  Sultan: "admin"
};
const useAuth = create()(
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
      logout: () => set({ user: null })
    }),
    { name: "draxler-auth" }
  )
);
export {
  useAuth as u
};
