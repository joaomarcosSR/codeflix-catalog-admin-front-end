import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from "./CastMemberSlice";
import { CastMembersTable } from "./components/CastMemberTable";

export const CastMemberList = () => {
  const [options, setOptions] = useState({
    page: 0,
    perPage: 10,
    search: "",
    rowsPerPage: [10, 25, 50, 100],
  });

  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    const search = filterModel.quickFilterValues?.length
      ? filterModel.quickFilterValues.join("")
      : "";
    setOptions({ ...options, search });
  }

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("CastMember deleted successfully", {
        variant: "success",
      });
    } else if (deleteCastMemberStatus.error) {
      enqueueSnackbar("CastMember not deleted", { variant: "error" });
    }
  }, [deleteCastMemberStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching CastMembers</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          style={{ marginBottom: "1rem" }}
        >
          + New
        </Button>
      </Box>

      <CastMembersTable
        data={data}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        isFetching={isFetching}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDeleteCastMember}
      />
    </Box>
  );
};
