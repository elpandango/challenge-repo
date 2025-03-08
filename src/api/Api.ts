import qs from "qs";
import ApiError from "@/api/ApiError";

type METHODS = "GET" | "POST" | "PUT" | "DELETE";

class Api {
  apiDomain: string;
  defaultHeader: {
    Authorization?: string;
  };
  getParams: {
    [index: string]: any;
  };

  constructor() {
    this.defaultHeader = {};
    this.getParams = {};

    // HardCoded für Challenge
    this.apiDomain = "https://test.cura-go.de/";
  }

  setAuthToken(newToken: string | null): void {
    this.defaultHeader.Authorization = newToken ?? undefined;
  }

  async request({
    path,
    method,
    headers = {},
    getParams = {},
    body,
  }: {
    path: string;
    method: METHODS;
    headers?: object;
    getParams?: object;
    body?: object;
  }): Promise<Response> {
    const queryString = qs.stringify(
      {
        ...this.getParams,
        ...getParams,
      },
      {
        addQueryPrefix: true,
      },
    );

    const response = await fetch(`${this.apiDomain}${path}${queryString}`, {
      method,
      headers: {
        ...this.defaultHeader,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new ApiError({
        response,
      });
    }
    return response;
  }
}

export const api = new Api();
