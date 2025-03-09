import { describe, it, expect, beforeEach, vi } from "vitest";
import { useProtokollStore } from "@/stores/protokoll";
import { useUserStore } from "@/stores/user";
import { setActivePinia, createPinia } from "pinia";
import { api } from "@/api/Api";

vi.mock("@/api/Api", () => ({
  api: {
    request: vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            items: [
              {
                id: 1,
                message: "Test message",
                typ: "info",
                stamp: Date.now(),
              },
            ],
            page_count: 1,
            count: 1,
          }),
      }),
    ),
  },
}));

vi.stubGlobal("localStorage", {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

describe("Protokoll Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.spyOn(api, "request").mockResolvedValue({
      json: async () => ({
        items: [
          { id: 1, message: "Test message", typ: "info", stamp: Date.now() },
        ],
        page_count: 1,
        count: 1,
      }),
    });

    //fake token
    const userStore = useUserStore();
    userStore.token = "fake-token";
  });

  it("should load data via request()", async () => {
    const protokollStore = useProtokollStore();
    await protokollStore.request();

    expect(protokollStore.lastResponse).not.toBeNull();
    expect(protokollStore.lastResponse?.items).toHaveLength(1);
  });

  it("should be initialized with the correct values", () => {
    const protokollStore = useProtokollStore();

    expect(protokollStore.lastResponse).toBeNull();
    expect(protokollStore.page).toBe(1);
    expect(protokollStore.limit).toBe(10);
  });
});
