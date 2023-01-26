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
import { Link } from "react-router-dom";
import { AutoCompleteFields } from "../../../components/AutoCompleteFields";
import { Rating, RatingTypes } from "../../../components/Rating";
import { RatingList } from "../../../components/RatingList";
import { CastMember } from "../../../types/CastMember";
import { Category } from "../../../types/Category";
import { ListGenre } from "../../../types/Genre";
import { Video } from "../../../types/Video";

type Props = {
  video: Video;
  genres?: ListGenre[];
  categories?: Category[];
  castMembers?: CastMember[];
  isLoading: boolean;
  isDisabled: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ratingOptions: { label: string; value: RatingTypes }[] = [
  { label: "L", value: "L" },
  { label: "10", value: "10" },
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "16", value: "16" },
  { label: "18", value: "18" },
];

export const VideoForm = ({
  video,
  genres,
  categories,
  castMembers,
  isLoading = false,
  isDisabled = false,
  handleSubmit,
  handleChange,
}: Props) => {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6} sx={{ "& .MuiTextField-root": { my: 1 } }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  name="title"
                  label="Title"
                  value={video.title}
                  disabled={isDisabled}
                  onChange={handleChange}
                  inputProps={{ "data-testid": "title" }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  minRows={4}
                  name="description"
                  label="Description"
                  value={video.description}
                  disabled={isDisabled}
                  onChange={handleChange}
                  inputProps={{ "data-testid": "description" }}
                />
              </FormControl>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="year_launched"
                    label="Year Launched"
                    value={video.year_launched}
                    disabled={isDisabled}
                    onChange={handleChange}
                    inputProps={{ "data-testid": "year_launched" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="duration"
                    label="Duration"
                    value={video.duration}
                    disabled={isDisabled}
                    onChange={handleChange}
                    inputProps={{ "data-testid": "duration" }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteFields
                name="categories"
                label="Categories"
                options={categories}
                value={video.categories}
                isLoading={isLoading}
                isDisabled={isDisabled}
                handleChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteFields
                name="genres"
                label="Genres"
                options={genres}
                value={video.genres}
                isLoading={isLoading}
                isDisabled={isDisabled}
                handleChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <AutoCompleteFields
                name="castMembers"
                label="CastMembers"
                options={castMembers}
                value={video.castMembers}
                isLoading={isLoading}
                isDisabled={isDisabled}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={6} sx={{ "& .MuiTextField-root": { my: 1 } }}>
            <FormGroup>
              <FormLabel component="legend" sx={{ mb: 2 }}>
                Rating
              </FormLabel>
              <RadioGroup
                aria-labelledby="Rating"
                name="rating"
                value={video.rating}
                onChange={handleChange}
                data-testid="rating"
                row
              >
                <RatingList isDisabled={isDisabled} />
              </RadioGroup>
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" sx={{ my: 2 }} gap={2}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/videos"
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
};
