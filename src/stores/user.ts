import { defineStore } from "pinia";
import { api } from "@/api/Api";

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      token: null,
      // ..
    }) as { token: string | null },
  getters: {
    isUserAuthorized: (state) => !!state.token,
  },
  actions: {
    async setToken(token: string | null) {
      // ..
      if (token === null) this.removeToken();

      this.token = token;
      api.setAuthToken(token);
    },

    removeToken() {
      this.token = null;
      api.setAuthToken(null);
    },
  },
});
