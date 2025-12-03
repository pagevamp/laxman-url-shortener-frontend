export enum SortableFields {
  CREATED_AT = "created_at",
  EXPIRES_AT = "expires_at",
}
export interface UrlItem {
  id: string;
  original_url: string;
  short_url: string;
  expires_at: string;
  created_at: string;
}

// export enum CreateUrl {
//   ORIGINAL_URL = "originalUrl",
//   EXPIRES_AT = "expiresAt",
// }

export enum FilterType {
  ALL = "all",
  ACTIVE = "active",
  EXPIRED = "expired",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
