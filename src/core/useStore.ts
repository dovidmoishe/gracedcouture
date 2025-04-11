import { account } from "@/lib/appwrite";
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUserAsync: () => Promise<void>;
  logout: () => Promise<void>;
}

const useUserState = create<UserState>((set) => ({
  user: null,

  setUserAsync: async () => {
    // Ensure this runs only on the client
    if (typeof window === "undefined") return;

    try {
      const userSession = await account.getSession("current");
      console.log(userSession)
      const userData = await account.get();
      set({
        user: {
          id: userSession.$id,
          name: userData.name,
          email: userData.email,
        },
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  },

  logout: async () => {
    try {
      await account.deleteSession("current");
      set({ user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useUserState;
