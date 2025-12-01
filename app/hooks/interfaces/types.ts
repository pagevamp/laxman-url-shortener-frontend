export type SortableFields = "created_at" | "expires_at";
export interface UrlItem {
  id: string;
  original_url: string;
  short_url: string;
  expires_at: string;
  created_at: string;
}
