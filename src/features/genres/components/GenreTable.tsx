import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ListGenreResult } from "../../../types/Genre";

type Props = {
  data: ListGenreResult | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (page: number) => void;
  handleDelete: (id: string) => void;
};

export function GenreTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

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
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  const rows = data ? mapDataToGridRows(data) : [];

  function mapDataToGridRows(data: ListGenreResult): GridRowsProp {
    const { items: genres } = data;
    return genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
      isActive: genre.is_active,
      createdAt: new Date(genre.created_at).toLocaleDateString("pt-Br"),
    }));
  }

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link style={{ textDecoration: "none" }} to={`/genres/edit/${row.id}`}>
        <Typography color="primary">{row.value}</Typography>
      </Link>
    );
  }

  function renderActionsCell(row: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(row.value)}
        aria-label="delete"
        data-testid="delete-button"
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

  const rowCount = data?.total_elements || 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination={true}
        pageSize={perPage}
        rowCount={rowCount}
        loading={isFetching}
        filterMode={"server"}
        paginationMode={"server"}
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableVirtualization={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        rowsPerPageOptions={rowsPerPage}
        componentsProps={componentsProps}
        components={{ Toolbar: GridToolbar }}
        onPageChange={handleOnPageChange}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
