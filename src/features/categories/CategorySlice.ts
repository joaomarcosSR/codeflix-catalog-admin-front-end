import {
  Category,
  CategoryParams,
  CreateCategoryResult,
  ListCategoryResult,
  UpdateCategoryResult,
} from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/categories";

export const initialState: Category = {
  id: "",
  name: "",
  description: "",
  is_active: false,
  created_at: "",
  deleted_at: null,
};

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

  return query.toString();
}

function createCategoryMutation(category: Category) {
  return { url: endpointUrl, method: "POST", body: category };
}

function getCategoryById(id: string): string {
  return `${endpointUrl}/${id}`;
}

function getCategories({ page = 0, perPage = 10, search = "" }): string {
  const params = { page, perPage, search };
  // console.log(`${endpointUrl}?${parseQueryParams(params)}`);
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createCategory: mutation<CreateCategoryResult, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    getCategoryById: query<Category, string>({
      query: getCategoryById,
      providesTags: ["Categories"],
    }),
    getCategories: query<ListCategoryResult, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    updateCategory: mutation<UpdateCategoryResult, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<void, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
