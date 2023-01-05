import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ListCastMemberResult } from "../../../types/CastMember";

type Props = {
  data: ListCastMemberResult | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (page: number) => void;
  handleDelete: (id: string) => void;
};

export function CastMembersTable({
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
      field: "type",
      headerName: "Type",
      flex: 1,
      type: "string",
      renderCell: renderTypeCell,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  const rows = data ? mapDataToGridRows(data) : [];

  function mapDataToGridRows(data: ListCastMemberResult): GridRowsProp {
    const { items: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
    }));
  }

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/cast-members/edit/${row.id}`}
      >
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

  function renderTypeCell(row: GridRenderCellParams) {
    const type = row.value === "DIRECTOR" ? "Diretor" : "Actor";
    return <Typography color={"primary"}>{type}</Typography>;
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
