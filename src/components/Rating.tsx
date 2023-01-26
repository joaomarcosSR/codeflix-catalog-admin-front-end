import { Box, Typography } from "@mui/material";

export type RatingTypes = "L" | "10" | "12" | "14" | "16" | "18";

const backgroundColors = {
  L: "#39B549",
  "10": "#20A3D4",
  "12": "#E79738",
  "14": "#E35E00",
  "16": "#d00003",
  "18": "#000000",
};

type Props = {
  rating: RatingTypes;
};

export const Rating = ({ rating }: Props) => {
  return (
    <Box
      sx={{
        // "& > :first-of-type": { mr: 0 },
        width: 40,
        height: 40,
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColors[rating],
      }}
    >
      <Typography>{rating}</Typography>
    </Box>
  );
};
