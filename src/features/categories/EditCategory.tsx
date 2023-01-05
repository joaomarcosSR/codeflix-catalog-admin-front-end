import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category } from "../../types/Category";
import {
  initialState,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "./CategorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
  const id = useParams().id as string;
  const { data: category, isFetching } = useGetCategoryByIdQuery(id);
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>(initialState);
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateCategory(categoryState);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
    if (status.isSuccess) {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
    }
    if (status.error) {
      enqueueSnackbar("Category not updated.", {
        variant: "error",
      });
    }
  }, [status, enqueueSnackbar]);

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
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
