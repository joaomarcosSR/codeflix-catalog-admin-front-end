import { Genre } from "../../types/Genre";

export function mapGenreToRequest(genre: Genre): {
  name: string;
  categories_id: string[];
  is_active: boolean;
} {
  return {
    name: genre.name,
    categories_id: genre.categories.map((category) => category.id),
    is_active: genre.is_active,
  };
}
