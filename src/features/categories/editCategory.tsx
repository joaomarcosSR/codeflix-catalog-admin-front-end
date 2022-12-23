import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category } from "../../types/Category";
import {
  defaultCategory,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "./CategorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const { data: category, isFetching } = useGetCategoryByIdQuery(id);
  const [updateCategory, updateCategoryStatus] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>(
    defaultCategory()
  );
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateCategory(categoryState);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setCategoryState({ ...categoryState, [name]: value });
  };
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category);
    }
  }, [category]);

  useEffect(() => {
    if (updateCategoryStatus.isSuccess) {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
    }
    if (updateCategoryStatus.error) {
      enqueueSnackbar(
        `Category not updated. Error: ${updateCategoryStatus.error}`,
        { variant: "error" }
      );
    }
  }, [updateCategoryStatus, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isLoading={isFetching}
          isDisabled={updateCategoryStatus.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
