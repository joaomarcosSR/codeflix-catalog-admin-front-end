import { Box, ThemeProvider } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { Routes, Route } from "react-router-dom";
import { CategoryList } from "./features/categories/ListCategory";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { CastMemberList } from "./features/castmember/ListCastMember";
import { CastMemberCreate } from "./features/castmember/CreateCastMember";
import { CastMemberEdit } from "./features/castmember/EditCastMember";
import { GenreCreate } from "./features/genres/GenreCreate";
import { GenreEdit } from "./features/genres/GenreEdit";
import { GenreList } from "./features/genres/GenreList";
import { VideoList } from "./features/video/VideoList";
import { VideoCreate } from "./features/video/VideoCreate";
import { VideoEdit } from "./features/video/VideoEdit";

const NOT_FOUND = () => (
  <Box sx={{ color: "white" }}>
    <Typography variant="h1">404</Typography>
    <Typography variant="h2">Page not found</Typography>
  </Box>
);

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="categories/create" element={<CategoryCreate />} />
              <Route path="categories/edit/:id" element={<CategoryEdit />} />

              <Route path="cast-members" element={<CastMemberList />} />
              <Route
                path="cast-members/create"
                element={<CastMemberCreate />}
              />
              <Route
                path="cast-members/edit/:id"
                element={<CastMemberEdit />}
              />

              <Route path="genres" element={<GenreList />} />
              <Route path="genres/create" element={<GenreCreate />} />
              <Route path="genres/edit/:id" element={<GenreEdit />} />

              <Route path="videos" element={<VideoList />} />
              <Route path="videos/create" element={<VideoCreate />} />
              <Route path="videos/edit/:id" element={<VideoEdit />} />

              <Route path="*" element={<NOT_FOUND />} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
