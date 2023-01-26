import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { ListCategoryResult } from "../../types/Category";
import {
  CreateGenreRequest,
  CreateGenreResult,
  Genre,
  GenreById,
  GenreParams,
  ListGenreResult,
  UpdateGenreResult,
} from "../../types/Genre";
import { apiSlice } from "../api/apiSlice";
import { mapGenreToRequest } from "./utils";

const endpointUrl = "/genres";

export const initialState: Genre = {
  id: "",
  name: "",
  categories: [],
  is_active: false,
  created_at: "",
  updated_at: "",
  deleted_at: "",
};

function parseQueryParams(params: GenreParams): string {
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

function createGenreMutation(genre: Genre): FetchArgs {
  return {
    url: endpointUrl,
    method: "POST",
    body: mapGenreToRequest(genre),
  };
}

function getGenreById(id: string): string {
  return `${endpointUrl}/${id}`;
}

function getGenres({ page = 0, perPage = 10, search = "" }): string {
  const params = { page, perPage, search };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function updateGenreMutation(genre: Genre): FetchArgs {
  return {
    url: `${endpointUrl}/${genre.id}`,
    method: "PUT",
    body: mapGenreToRequest(genre),
  };
}

function deleteGenreMutation(genre: Genre): FetchArgs {
  return {
    url: `${endpointUrl}/${genre.id}`,
    method: "DELETE",
  };
}

function getCategories(search: string): string {
  const searchQuery = search ? "?search=" + search : "";
  return `/categories${searchQuery}`;
}

function getAllCategories(): string {
  return "/categories?per_page=9999";
}

export const genresApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createGenre: mutation<CreateGenreResult, Genre>({
      query: createGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    getGenreById: query<GenreById, string>({
      query: getGenreById,
      providesTags: ["Genres"],
    }),
    getGenres: query<ListGenreResult, GenreParams>({
      query: getGenres,
      providesTags: ["Genres"],
    }),
    updateGenre: mutation<UpdateGenreResult, Genre>({
      query: updateGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    deleteGenre: mutation<void, { id: string }>({
      query: deleteGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    getGenreCategories: query<ListCategoryResult, string>({
      query: getCategories,
    }),
    getGenreAllCategories: query<ListCategoryResult, void>({
      query: getAllCategories,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useGetGenresQuery,
  useGetGenreByIdQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGetGenreCategoriesQuery,
  useGetGenreAllCategoriesQuery,
} = genresApiSlice;
