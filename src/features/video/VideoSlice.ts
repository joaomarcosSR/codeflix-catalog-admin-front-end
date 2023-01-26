import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { ListCastMemberResult } from "../../types/CastMember";
import { ListCategoryResult } from "../../types/Category";
import { ListGenreResult } from "../../types/Genre";
import {
  CreateVideoResult,
  ListVideoResult,
  UpdateVideoResult,
  Video,
  VideoById,
  VideoParams,
} from "../../types/Video";
import { apiSlice } from "../api/apiSlice";
import { mapVideoToRequest } from "./utils";

const endpointUrl = "/videos";

export const initialState: Video = {
  id: "",
  title: "",
  description: "",
  year_launched: 0,
  duration: 0,
  opened: false,
  published: false,
  rating: "",
  createdAt: "",
  updatedAt: "",
  video_file_url: "",
  trailer_file_url: "",
  banner_file_url: "",
  thumbnail_file_url: "",
  thumbnail_half_file_url: "",
  categories: [],
  genres: [],
  castMembers: [],
};

function parseQueryParams(params: VideoParams): string {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  return query.toString();
}

function createVideoMutation(video: Video): FetchArgs {
  return {
    url: endpointUrl,
    method: "POST",
    body: mapVideoToRequest(video),
  };
}

function getVideoById(id: string): string {
  return `${endpointUrl}/${id}`;
}

function getVideos({ page = 0, perPage = 10, search = "" }): string {
  const params = { page, perPage, search };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function updateVideoMutation(video: Video): FetchArgs {
  return {
    url: `${endpointUrl}/${video.id}`,
    method: "PUT",
    body: mapVideoToRequest(video),
  };
}

function deleteVideoMutation(videoId: string): FetchArgs {
  return {
    url: `${endpointUrl}/${videoId}`,
    method: "DELETE",
  };
}

function getAllCategories(): string {
  return "/categories?per_page=9999";
}

function getAllGenres(): string {
  return "/genres?per_page=9999";
}

function getAllCastMembers(): string {
  return "/cast_members?per_page=9999";
}

export const videosApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createVideo: mutation<CreateVideoResult, Video>({
      query: createVideoMutation,
      invalidatesTags: ["Videos"],
    }),
    getVideoById: query<VideoById, string>({
      query: getVideoById,
      providesTags: ["Videos"],
    }),
    getVideos: query<ListVideoResult, VideoParams>({
      query: getVideos,
      providesTags: ["Videos"],
    }),
    updateVideo: mutation<UpdateVideoResult, Video>({
      query: updateVideoMutation,
      invalidatesTags: ["Videos"],
    }),
    deleteVideo: mutation<void, string>({
      query: deleteVideoMutation,
      invalidatesTags: ["Videos"],
    }),
    getVideoAllCategories: query<ListCategoryResult, void>({
      query: getAllCategories,
    }),
    getVideoAllGenres: query<ListGenreResult, void>({
      query: getAllGenres,
    }),
    getVideoAllCastMembers: query<ListCastMemberResult, void>({
      query: getAllCastMembers,
    }),
  }),
});

export const {
  useCreateVideoMutation,
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoAllCategoriesQuery,
  useGetVideoAllGenresQuery,
  useGetVideoAllCastMembersQuery,
} = videosApiSlice;
