import { defineStore } from "pinia";
import type { ProtokollResponse } from "@/models/ProtokollResponse";

export const useProtokollStore = defineStore("protokoll", {
  state: () =>
    ({
      lastResponse: null,
    }) as { lastResponse: ProtokollResponse | null },
  getters: {
    items: (state) => state.lastResponse?.items ?? [],
  },
  actions: {
    async request() {
      // Write something here.
    },
  },
});
