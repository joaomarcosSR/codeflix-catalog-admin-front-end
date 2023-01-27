import { Category } from "./Category";

export interface Genre {
  id: string;
  name: string;
  categories: Category[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface GenreById {
  id: string;
  name: string;
  categories_id: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface ListGenre {
  id: string;
  name: string;
  is_active: boolean;
  categories_id: string[];
  created_at: string;
  deleted_at: null | string;
}

export interface ListGenreResult {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_elements: number;
  items: ListGenre[];
}

export interface CreateGenreRequest {
  name: string;
  categories_id: string[];
  is_active: boolean;
}

export interface CreateGenreResult {
  id: string;
}

export interface UpdateGenreResult {
  id: string;
}
