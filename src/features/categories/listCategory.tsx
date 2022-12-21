import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./CategorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories);

  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString("pt-Br"),
    description: category.description,
  }));

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${row.id}`}
      >
        <Typography color="primary">{row.value}</Typography>
      </Link>
    );
  }

  function renderActionsCell(row: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => console.log(row.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary" : "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <Box sx={{ display: "flex", height: 600 }}>
        <DataGrid
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          componentsProps={componentsProps}
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableSelectionOnClick={true}
          rows={rows}
          rowsPerPageOptions={[2, 20, 50, 100]}
        />
      </Box>
    </Box>
  );
};
