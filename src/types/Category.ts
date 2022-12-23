import { Category } from "../features/categories/CategorySlice";

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
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
