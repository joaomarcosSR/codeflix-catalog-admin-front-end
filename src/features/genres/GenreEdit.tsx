import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uniqueValue } from "../../types/Base";
import { Genre } from "../../types/Genre";
import { GenreForm } from "./components/GenreForm";
import {
  initialState,
  useGetGenreAllCategoriesQuery,
  useGetGenreByIdQuery,
  useGetGenreCategoriesQuery,
  useUpdateGenreMutation,
} from "./GenreSlice";

export const GenreEdit = () => {
  const id = useParams().id as string;

  const [isDisabled, setIsDisabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState("");
  const { data: categoriesResult, isFetching: isFetchingCategory } =
    useGetGenreCategoriesQuery(search);
  const [updateGenre, status] = useUpdateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(initialState);
  const { data: genre } = useGetGenreByIdQuery(id);
  // DEPOIS VERICAR UMA ESTRATEGIA PARA RECUPERAR ESSE VALOR POR CATEGORIES ID, TALVEZ UTILIZAR MUTATION ao invez de query para obter por id
  const { data: allCategories } = useGetGenreAllCategoriesQuery();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateGenre(genreState);
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
    if (genre && allCategories) {
      const genreCategoriesId: uniqueValue = {};
      (genre.categories_id || []).forEach(
        (id) => (genreCategoriesId[id] = true)
      );
      const categoriesList = allCategories.items.filter(
        (category) => genreCategoriesId[category.id]
      );
      setGenreState({ ...genre, categories: categoriesList });
    }
  }, [genre, allCategories]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre updated successfully", {
        variant: "success",
      });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar("Genre not updated", { variant: "error" });
      setIsDisabled(false);
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={genreState}
          categories={categoriesResult?.items}
          isLoading={status.isLoading || isFetchingCategory || !genreState.id}
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
