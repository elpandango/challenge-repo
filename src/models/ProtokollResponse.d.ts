import type { Protokoll } from "@/models/Protokoll";

export type ProtokollResponse = {
  page: number;
  page_count: number;
  limit: number;
  count: number;
  items: Protokoll[];
};
