import { defineStore } from "pinia";
// import { getMockData } from "@/utils/getData";
import { api } from "@/api/Api";
import type { ProtokollResponse } from "@/models/ProtokollResponse";
import { useUserStore } from "@/stores/user";

export const useProtokollStore = defineStore("protokoll", {
  state: () =>
    ({
      lastResponse: null,
      page: 1,
      limit: 10,
      activeFilter: "alle",
    }) as { lastResponse: ProtokollResponse | null },
  getters: {
    items: (state) => state.lastResponse?.items ?? [],
    formattedItems: (state) =>
      (state.lastResponse?.items ?? []).map((item) => {
        const createdAt = new Date(item.stamp);
        const now = new Date();
        const diffMs = now.getTime() - createdAt.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);

        let timeAgo;
        if (diffMinutes < 60) {
          timeAgo = `vor ${diffMinutes} Minuten`;
        } else if (diffMinutes < 1440) {
          timeAgo = `vor ${Math.floor(diffMinutes / 60)} Stunden`;
        } else {
          timeAgo = `vor ${Math.floor(diffMinutes / 1440)} Tagen`;
        }

        let icon = "circle-info-solid";
        if (item.typ === "error") icon = "circle-xmark-solid";
        if (item.typ === "warning") icon = "triangle-exclamation-solid";

        return {
          id: item.id,
          icon,
          message: item.message,
          meta: `${timeAgo} von ${item.mitarbeiter_vorname}.${item.mitarbeiter_name}`,
        };
      }),
    metaData: (state) => ({
      page: state.page,
      pageCount: Math.max(state.lastResponse?.page_count ?? 1, 1),
      limit: state.limit,
      totalItems: state.lastResponse?.count ?? 0,
    }),
    currentFilter: (state) =>
      state.activeFilter !== "alle" ? state.activeFilter : undefined,
  },
  actions: {
    async request(page = 1, limit = 10) {
      const userStore = useUserStore();
      if (!userStore.token) {
        console.error("Unauthenticated.");
        return;
      }

      try {
        // const response = await getMockData();
        const response = await api.request({
          path: "web/v3/go.vital/protocol",
          method: "GET",
          getParams: {
            page,
            max: limit,
            filter:
              this.activeFilter !== "alle" ? this.activeFilter : undefined,
          },
        });

        this.lastResponse = await response.json();
      } catch (error) {
        console.log("Fetching data failed.", error);
      }
    },
    async setPage(newPage: number) {
      if (newPage < 1 || newPage > (this.lastResponse?.page_count ?? 1)) return;
      this.page = newPage;
      await this.request(newPage);
    },
    async setLimit(newLimit: number) {
      this.limit = newLimit;
      this.page = 1;
      await this.request();
    },
    async setFilter(newFilter: string) {
      this.activeFilter = newFilter.toLowerCase();
      this.page = 1;
      await this.request();
    },
  },
});
