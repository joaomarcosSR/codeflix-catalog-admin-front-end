import { CastMember } from "./CastMember";
import { Category } from "./Category";
import { GenreById, ListGenre } from "./Genre";

export interface Video {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  duration: number;
  opened: boolean;
  published: boolean;
  rating: string;
  createdAt: string;
  updatedAt: string;
  video_file_url?: string;
  trailer_file_url?: string;
  banner_file_url?: string;
  thumbnail_file_url?: string;
  thumbnail_half_file_url?: string;
  categories: Category[];
  genres: ListGenre[];
  castMembers: CastMember[];
}

export interface VideoById {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  duration: number;
  opened: boolean;
  published: boolean;
  rating: string;
  createdAt: string;
  updatedAt: string;
  video?: AudioVideoMedia[];
  trailer?: AudioVideoMedia[];
  banner?: ImageMedia;
  thumbnail?: ImageMedia;
  thumbnail_half?: ImageMedia;
  categories_id: string[];
  genres_id: string[];
  castMembers_id: string[];
}

export interface AudioVideoMedia {
  id: string;
  checksum: string;
  name: string;
  location: string;
  encoded_location: string;
  status: string;
}

export interface ImageMedia {
  id: string;
  checksum: string;
  name: string;
  location: string;
}

export interface VideoParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface ListVideo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ListVideoResult {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_elements: number;
  items: ListVideo[];
}

export interface CreateVideoRequest {
  title: string;
  description: string;
  duration: string;
  year_launched: string;
  opened: string;
  published: string;
  rating: string;
  cast_members: string[];
  categories: string[];
  genres: string[];
}

export interface CreateVideoResult {
  id: string;
}

export interface UpdateVideoResult {
  id: string;
}
