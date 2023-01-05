import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../../types/Category";

type Props = {
  category: Category;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryForm({
  category,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
  handleToggle,
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
                value={category.name}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{
                  "data-testid": "textFieldName",
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="description"
                label="Description"
                value={category.description}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{
                  "data-testid": "textFieldDescription",
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    onChange={handleToggle}
                    checked={category.is_active}
                    inputProps={{ "aria-label": "controlled" }}
                    data-testid="is_active"
                    disabled={isDisabled}
                  />
                }
                label="Active"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/categories"
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
