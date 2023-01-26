import { Video } from "../../types/Video";

export function mapVideoToRequest(video: Video): {
  title: string;
  description: string;
  duration: number;
  year_launched: number;
  opened: boolean;
  published: boolean;
  rating: string;
  cast_members: string[];
  categories: string[];
  genres: string[];
} {
  return {
    title: video.title,
    description: video.description,
    duration: video.duration,
    year_launched: video.year_launched,
    opened: video.opened,
    published: video.published,
    rating: video.rating,
    cast_members: (video.castMembers || []).map((it) => it.id),
    categories: (video.categories || []).map((it) => it.id),
    genres: (video.genres || []).map((it) => it.id),
  };
}
