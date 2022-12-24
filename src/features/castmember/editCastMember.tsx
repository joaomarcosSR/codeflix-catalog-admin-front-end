import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CastMember } from "../../types/CastMember";
import {
  initialState,
  useGetCastMemberByIdQuery,
  useUpdateCastMemberMutation,
} from "./CastMemberSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export const CastMemberEdit = () => {
  const id = useParams().id || "";
  const { data: castMember, isFetching } = useGetCastMemberByIdQuery(id);
  const [updateCastMember, status] = useUpdateCastMemberMutation();
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateCastMember(castMemberState);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember);
    }
  }, [castMember]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("CastMember updated successfully", {
        variant: "success",
      });
    }
    if (status.error) {
      enqueueSnackbar(`CastMember not updated.`, {
        variant: "error",
      });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit CastMember</Typography>
          </Box>
        </Box>

        <CastMemberForm
          castMember={castMemberState}
          isLoading={isFetching}
          isDisabled={status.isLoading || isFetching}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
