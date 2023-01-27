import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUniqueCategories } from "../../hooks/useUniqueCategories";
import { uniqueValue } from "../../types/Base";
import { Video } from "../../types/Video";
import { VideoForm } from "./components/VideoForm";
import {
  initialState,
  useGetVideoAllCastMembersQuery,
  useGetVideoAllCategoriesQuery,
  useGetVideoAllGenresQuery,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
} from "./VideoSlice";

export const VideoEdit = () => {
  const id = useParams<{ id: string }>().id as string;

  const { enqueueSnackbar } = useSnackbar();
  const { data: video, isFetching } = useGetVideoByIdQuery(id);
  const { data: allCastMembers } = useGetVideoAllCastMembersQuery();
  const { data: allCategories } = useGetVideoAllCategoriesQuery();
  const { data: allGenres } = useGetVideoAllGenresQuery();
  const [updateVideo, status] = useUpdateVideoMutation();

  const [videoState, setVideoState] = useState<Video>(initialState);
  const [categories, setCategories] = useUniqueCategories(
    videoState,
    setVideoState,
    allCategories?.items
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateVideo(videoState);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVideoState({ ...videoState, [name]: value });
  };

  useEffect(() => {
    if (video && allCastMembers && allCategories && allGenres) {
      const castMemberList = getFilteredList(
        allCastMembers.items,
        video.castMembers_id
      );
      const categoryList = getFilteredList(
        allCategories.items,
        video.categories_id
      );

      const genreList = getFilteredList(allGenres.items, video.genres_id);

      setVideoState({
        ...video,
        categories: categoryList,
        genres: genreList,
        castMembers: castMemberList,
      });
      setCategories(categoryList);
    }
  }, [video, allCastMembers, allCategories, allGenres, setCategories]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Video updated successfully", {
        variant: "success",
      });
    }
    if (status.error) {
      enqueueSnackbar("Video not updated", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>
        <VideoForm
          video={videoState}
          genres={allGenres?.items || []}
          categories={categories}
          castMembers={allCastMembers?.items || []}
          isLoading={status.isLoading || !videoState.id}
          isDisabled={isFetching}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};

function getFilteredList<T extends { id: string }>(
  data: T[],
  filter: string[]
): T[] {
  if (!filter) return [];

  const filterValues: uniqueValue = {};
  filter.forEach((value) => (filterValues[value] = true));

  return (data || []).filter((item) => filterValues[item.id]);
}
