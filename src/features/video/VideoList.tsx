import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VideoTable } from "./components/VideoTable";
import { useDeleteVideoMutation, useGetVideosQuery } from "./VideoSlice";

export const VideoList = () => {
  const [options, setOptions] = useState({
    page: 0,
    perPage: 10,
    search: "",
    rowsPerPage: [10, 25, 50, 100],
  });

  const { data, isFetching, error } = useGetVideosQuery(options);
  const [deleteVideo, deleteVideoStatus] = useDeleteVideoMutation();
  const { enqueueSnackbar } = useSnackbar();

  async function handleDeleteVideo(id: string) {
    await deleteVideo(id);
  }

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

  useEffect(() => {
    if (deleteVideoStatus.isSuccess) {
      enqueueSnackbar("Video deleted successfully", { variant: "success" });
    } else if (deleteVideoStatus.error) {
      enqueueSnackbar("Video not deleted", { variant: "error" });
    }
  }, [deleteVideoStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching videos</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="h4">Videos</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/videos/create"
              style={{ marginBottom: "1rem" }}
            >
              + New
            </Button>
          </Box>
        </Grid>
      </Grid>

      <VideoTable
        data={data}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        isFetching={isFetching}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDeleteVideo}
      />
    </Box>
  );
};
