import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  created_at: string;
  deleted_at: null | string;
}

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
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
