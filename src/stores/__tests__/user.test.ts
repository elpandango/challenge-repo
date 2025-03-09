import { vi, it, describe, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "../../stores/user";
import { api } from "../../api/Api";

const TOKEN_STORAGE_KEY = "auth_token";

vi.stubGlobal("localStorage", {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

describe("User Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should initialize with token from localStorage", () => {
    localStorage.getItem.mockReturnValue("Bearer test-token");

    const store = useUserStore();
    expect(store.token).toBe("Bearer test-token");
  });

  it("should return true for isUserAuthorized if token exists", () => {
    const store = useUserStore();
    store.token = "test-token";
    expect(store.isUserAuthorized).toBe(true);
  });

  it("should return false for isUserAuthorized if token is null", () => {
    const store = useUserStore();
    store.token = null;
    expect(store.isUserAuthorized).toBe(false);
  });

  it("should set and clean token properly", () => {
    const store = useUserStore();
    store.setToken("Bearer my-token");

    expect(store.token).toBe("Bearer my-token");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      TOKEN_STORAGE_KEY,
      "Bearer my-token",
    );
  });

  it("should remove token correctly", () => {
    const store = useUserStore();
    store.setToken("test-token");
    store.removeToken();

    expect(store.token).toBe(null);
    expect(localStorage.removeItem).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
  });

  it("should fetch and set token from API", async () => {
    vi.spyOn(api, "request").mockResolvedValue({
      text: async () => "Bearer api-token",
    });

    const store = useUserStore();
    await store.fetchToken();

    expect(store.token).toBe("Bearer api-token");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      TOKEN_STORAGE_KEY,
      "Bearer api-token",
    );
  });

  it("should call fetchToken if no token in storage", async () => {
    const store = useUserStore();
    const fetchTokenSpy = vi.spyOn(store, "fetchToken");

    await store.loadTokenFromStorage();

    expect(fetchTokenSpy).toHaveBeenCalled();
  });

  it("should load token from storage without API call if exists", async () => {
    localStorage.getItem.mockReturnValue("stored-token");

    const store = useUserStore();
    const fetchTokenSpy = vi.spyOn(store, "fetchToken");

    await store.loadTokenFromStorage();

    expect(store.token).toBe("stored-token");
    expect(fetchTokenSpy).not.toHaveBeenCalled();
  });
});
