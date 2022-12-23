import { Category } from "../features/categories/CategorySlice";

export interface Result {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_elements: number;
  items: Category[];
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
