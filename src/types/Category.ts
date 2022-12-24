export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  created_at: string;
  deleted_at: null | string;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface ListCategoryResult {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_elements: number;
  items: Category[];
}

export interface CreateCategoryResult {
  id: string;
}

export interface UpdateCategoryResult {
  id: string;
}
