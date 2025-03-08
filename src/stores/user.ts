import { defineStore } from "pinia";
import { api } from "@/api/Api";

const TOKEN_STORAGE_KEY = "auth_token";

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      token: localStorage.getItem(TOKEN_STORAGE_KEY) || null,
    }) as { token: string | null },
  getters: {
    isUserAuthorized: (state) => !!state.token,
  },
  actions: {
    async fetchToken() {
      try {
        const response = await api.request({
          path: "auth/v3/user",
          method: "GET",
          headers: {
            Authorization: "Basic dXNyLmZybnRuZDpnZWhlaW0=",
          },
        });

        const token = await response.text();
        if (token) {
          this.setToken(token);
        }
      } catch (error) {
        console.error("Token fetch failed:", error);
      }
    },
    async setToken(token: string | null) {
      if (token) {
        const cleanedToken = token.replace(/^(Bearer\s)+/, "Bearer ");
        localStorage.setItem(TOKEN_STORAGE_KEY, cleanedToken);
        api.setAuthToken(cleanedToken);
      } else {
        this.removeToken();
      }
      this.token = token;
    },
    removeToken() {
      this.token = null;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      api.setAuthToken(null);
    },
    async loadTokenFromStorage() {
      const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (savedToken) {
        await this.setToken(savedToken);
      } else {
        await this.fetchToken();
      }
    },
  },
});
