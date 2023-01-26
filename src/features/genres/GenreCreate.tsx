import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Genre } from "../../types/Genre";
import { GenreForm } from "./components/GenreForm";
import {
  initialState,
  useCreateGenreMutation,
  useGetGenreCategoriesQuery,
} from "./GenreSlice";

export const GenreCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState("");
  const { data: categoriesResult } = useGetGenreCategoriesQuery(search);
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createGenre(genreState);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGenreState({ ...genreState, [name]: value });
  };

  function handleFilterChange(typed: string): void {
    setSearch(typed || "");
  }

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setGenreState({ ...genreState, [name]: checked });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre created successfully", {
        variant: "success",
      });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar("Genre not created", { variant: "error" });
      setIsDisabled(false);
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={genreState}
          categories={categoriesResult?.items}
          isLoading={status.isLoading}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleAutoCompleteFilterChange={handleFilterChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
