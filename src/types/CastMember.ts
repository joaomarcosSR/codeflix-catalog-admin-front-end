export interface CastMember {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface ListCastMemberResult {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_elements: number;
  items: CastMember[];
}

export interface CreateCastMemberResult {
  id: string;
}

export interface UpdateCastMemberResult {
  id: string;
}
