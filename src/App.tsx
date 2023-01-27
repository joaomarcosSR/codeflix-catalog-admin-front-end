import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CastMemberCreate } from "./features/castmember/CreateCastMember";
import { CastMemberEdit } from "./features/castmember/EditCastMember";
import { CastMemberList } from "./features/castmember/ListCastMember";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { CategoryList } from "./features/categories/ListCategory";
import { GenreCreate } from "./features/genres/GenreCreate";
import { GenreEdit } from "./features/genres/GenreEdit";
import { GenreList } from "./features/genres/GenreList";
import { VideoCreate } from "./features/video/VideoCreate";
import { VideoEdit } from "./features/video/VideoEdit";
import { VideoList } from "./features/video/VideoList";

const NOT_FOUND = () => (
  <Box sx={{ color: "#666" }}>
    <Typography variant="h1">404</Typography>
    <Typography variant="h2">Page not found</Typography>
  </Box>
);

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/create" element={<CategoryCreate />} />
        <Route path="categories/edit/:id" element={<CategoryEdit />} />

        <Route path="cast-members" element={<CastMemberList />} />
        <Route path="cast-members/create" element={<CastMemberCreate />} />
        <Route path="cast-members/edit/:id" element={<CastMemberEdit />} />

        <Route path="genres" element={<GenreList />} />
        <Route path="genres/create" element={<GenreCreate />} />
        <Route path="genres/edit/:id" element={<GenreEdit />} />

        <Route path="videos" element={<VideoList />} />
        <Route path="videos/create" element={<VideoCreate />} />
        <Route path="videos/edit/:id" element={<VideoEdit />} />

        <Route path="*" element={<NOT_FOUND />} />
      </Routes>
    </Layout>
  );
}
