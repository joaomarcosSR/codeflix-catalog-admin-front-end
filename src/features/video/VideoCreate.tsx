import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";
import { Video } from "../../types/Video";
import { VideoForm } from "./components/VideoForm";
import {
  initialState,
  useCreateVideoMutation,
  useGetVideoAllCastMembersQuery,
  useGetVideoAllCategoriesQuery,
  useGetVideoAllGenresQuery,
} from "./VideoSlice";

export const VideoCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: allCastMembers } = useGetVideoAllCastMembersQuery();
  const { data: allCategories } = useGetVideoAllCategoriesQuery();
  const { data: allGenres } = useGetVideoAllGenresQuery();
  const [createVideo, status] = useCreateVideoMutation();

  const [videoState, setVideoState] = useState<Video>(initialState);
  const [categories] = useUniqueCategories(
    videoState,
    setVideoState,
    allCategories?.items
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createVideo(videoState);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVideoState({ ...videoState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Video created successfully", {
        variant: "success",
      });
    }
    if (status.error) {
      enqueueSnackbar("Video not created", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Video</Typography>
          </Box>
        </Box>
        <VideoForm
          video={videoState}
          genres={allGenres?.items || []}
          categories={categories}
          castMembers={allCastMembers?.items || []}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
