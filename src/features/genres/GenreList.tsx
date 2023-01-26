import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GenreTable } from "./components/GenreTable";
import { useDeleteGenreMutation, useGetGenresQuery } from "./GenreSlice";

export const GenreList = () => {
  const [options, setOptions] = useState({
    page: 0,
    perPage: 10,
    search: "",
    rowsPerPage: [10, 25, 50, 100],
  });

  const { data, isFetching, error } = useGetGenresQuery(options);
  const [deleteGenre, deleteGenreStatus] = useDeleteGenreMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    const search = filterModel.quickFilterValues?.length
      ? filterModel.quickFilterValues.join(" ")
      : "";
    setOptions({ ...options, search });
  }

  async function handleDeleteGenre(id: string) {
    await deleteGenre({ id });
  }

  useEffect(() => {
    if (deleteGenreStatus.isSuccess) {
      enqueueSnackbar("Genre deleted successfully", { variant: "success" });
    } else if (deleteGenreStatus.error) {
      enqueueSnackbar("Genre not deleted", { variant: "error" });
    }
  }, [deleteGenreStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching genres</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/genres/create"
          style={{ marginBottom: "1rem" }}
        >
          + New
        </Button>
      </Box>

      <GenreTable
        data={data}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        isFetching={isFetching}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDeleteGenre}
      />
    </Box>
  );
};
