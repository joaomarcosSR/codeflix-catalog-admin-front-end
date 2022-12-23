import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CategoryParams, Result } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  created_at: string;
  deleted_at: null | string;
}

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams): string {
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

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 0, perPage = 10, search = "" }): string {
  const params = { page, perPage, search, isActive: true };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Result, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

const category: Category = {
  id: "anId",
  name: "Olive",
  description: "Just to Test",
  is_active: true,
  created_at: new Date().toISOString(),
  deleted_at: null,
};

export const initialState = [
  category,
  { ...category, id: "anId2", name: "Peach" },
  { ...category, id: "anId3", name: "Apple", is_active: false },
  { ...category, id: "anId4", name: "Banana" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);
  return (
    category || {
      id: "",
      name: "",
      description: null,
      is_active: false,
      created_at: "",
      deleted_at: null,
    }
  );
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
  categoriesApiSlice;
