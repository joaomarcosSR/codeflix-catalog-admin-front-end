import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import {
  CastMember,
  CastMemberParams,
  CreateCastMemberResult,
  ListCastMemberResult,
  UpdateCastMemberResult,
} from "../../types/CastMember";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: "DIRECTOR",
  created_at: "",
  updated_at: "",
};

function parseQueryParams(params: CastMemberParams): string {
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

function createCastMemberMutation(castMember: CastMember): FetchArgs {
  return { url: endpointUrl, method: "POST", body: castMember };
}

function getCastMemberById(id: string): string {
  return `${endpointUrl}/${id}`;
}

function getCastMembers({ page = 0, perPage = 10, search = "" }): string {
  const params = { page, perPage, search };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function updateCastMemberMutation(castMember: CastMember): FetchArgs {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "PUT",
    body: castMember,
  };
}

function deleteCastMemberMutation(castMember: CastMember): FetchArgs {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "DELETE",
  };
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createCastMember: mutation<CreateCastMemberResult, CastMember>({
      query: createCastMemberMutation,
      invalidatesTags: ["CastMembers"],
    }),
    getCastMemberById: query<CastMember, string>({
      query: getCastMemberById,
      providesTags: ["CastMembers"],
    }),
    getCastMembers: query<ListCastMemberResult, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    updateCastMember: mutation<UpdateCastMemberResult, CastMember>({
      query: updateCastMemberMutation,
      invalidatesTags: ["CastMembers"],
    }),
    deleteCastMember: mutation<void, { id: string }>({
      query: deleteCastMemberMutation,
      invalidatesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useCreateCastMemberMutation,
  useGetCastMembersQuery,
  useGetCastMemberByIdQuery,
  useUpdateCastMemberMutation,
  useDeleteCastMemberMutation,
} = castMembersApiSlice;
