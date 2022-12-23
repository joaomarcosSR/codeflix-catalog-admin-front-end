import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Category } from "../../types/Category";
import { defaultCategory, useCreateCategoryMutation } from "./CategorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCategory, createCategoryStatus] = useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>(
    defaultCategory()
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createCategory(categoryState);
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
    if (createCategoryStatus.isSuccess) {
      enqueueSnackbar("Category created successfully", { variant: "success" });
      setIsDisabled(true);
    }
    if (createCategoryStatus.error) {
      enqueueSnackbar("Category not created", { variant: "error" });
      setIsDisabled(false);
    }
  }, [createCategoryStatus, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
