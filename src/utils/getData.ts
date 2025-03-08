import { mockData } from "@/utils/mockData";

export const getMockData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 300);
  });
};
