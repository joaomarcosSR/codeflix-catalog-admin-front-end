import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CastMember } from "../../types/CastMember";
import { initialState, useCreateCastMemberMutation } from "./CastMemberSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export const CastMemberCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCastMember, status] = useCreateCastMemberMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createCastMember(castMemberState);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("CastMember created successfully", {
        variant: "success",
      });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar("CastMember not created", { variant: "error" });
      setIsDisabled(false);
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create CastMember</Typography>
          </Box>
        </Box>

        <CastMemberForm
          castMember={castMemberState}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
