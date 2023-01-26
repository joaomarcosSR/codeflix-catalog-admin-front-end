import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Category } from "../../../types/Category";
import { Genre } from "../../../types/Genre";

type Props = {
  genre: Genre;
  categories?: Category[];
  isLoading: boolean;
  isDisabled: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAutoCompleteFilterChange: (typed: string) => void;
  handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function GenreForm({
  genre,
  categories,
  isLoading = false,
  isDisabled = false,
  handleSubmit,
  handleChange,
  handleAutoCompleteFilterChange,
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
                value={genre.name}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              disablePortal
              loading={isLoading}
              options={(categories || []).concat(genre.categories || [])}
              value={genre.categories || []}
              filterSelectedOptions={true}
              disabled={isDisabled || !categories}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  data-testid="categories-input"
                />
              )}
              onChange={(_, selectedCategories: Category[]) =>
                handleChange({
                  target: {
                    name: "categories",
                    value: selectedCategories,
                  },
                } as any)
              }
              onInputChange={(_, typed: string, __) =>
                handleAutoCompleteFilterChange(typed)
              }
              isOptionEqualToValue={(option: Category, value: Category) =>
                option.id === value.id
              }
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    onChange={handleToggle}
                    checked={genre.is_active}
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
                to="/genres"
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
