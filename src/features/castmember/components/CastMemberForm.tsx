import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CastMember } from "../../../types/CastMember";

type Props = {
  castMember: CastMember;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CastMemberForm({
  castMember,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={castMember.name}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormGroup>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                aria-labelledby="type of cast member"
                defaultValue="Diretor"
                name="type"
                onChange={handleChange}
                value={castMember.type}
                data-testid="type"
              >
                <FormControlLabel
                  value={"DIRECTOR"}
                  control={<Radio />}
                  label="Diretor"
                />
                <FormControlLabel
                  value={"ACTOR"}
                  control={<Radio />}
                  label="Actor"
                />
              </RadioGroup>
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/cast-members"
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isLoading || isDisabled}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
