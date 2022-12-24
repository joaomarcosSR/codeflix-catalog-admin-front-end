import { Box, ThemeProvider } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { Routes, Route } from "react-router-dom";
import { CategoryList } from "./features/categories/listCategory";
import { CategoryCreate } from "./features/categories/createCategory";
import { CategoryEdit } from "./features/categories/editCategory";
import { Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { CastMemberList } from "./features/castmember/listCastMember";
import { CastMemberCreate } from "./features/castmember/createCastMember";
import { CastMemberEdit } from "./features/castmember/editCastMember";

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

              <Route path="*" element={<NOT_FOUND />} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
