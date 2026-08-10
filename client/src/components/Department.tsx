import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import request from "graphql-request";
import { GET_DEPARTMENTS } from "../graphql/Query/DEPARTMENTS";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Department } from "../Types";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { ADD_DEPARTMENT } from "../graphql/mutations/ADD_DEPARTMENT";
import { DELETE_DEPARTMENT } from "../graphql/mutations/DELETE_DEPARTMENT";
import { UPDATE_DEPARTMENT } from "../graphql/mutations/UPDATE_DEPARTMENT";

export default function Departments() {
  const [department, setDepartment] = useState({ name: "", status: true });
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  async function getDepartments() {
    const response = await request(
      "http://localhost:3040/graphql",
      GET_DEPARTMENTS,
    );
    console.log(response);
    return response.getDepartment.departments;
  }
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  async function handleAddDepartment() {
    try {
      const response = await request(
        "http://localhost:3040/graphql",
        ADD_DEPARTMENT,
        { input: { name: department.name, status: department.status } },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const addDepartmentMutataion = useMutation({
    mutationFn: handleAddDepartment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
      setOpen(false);
      setDepartment({ name: "", status: true });
    },
  });

  async function deleteDepartment(id: string) {
    console.log(id);
    try {
      const response = await request(
        "http://localhost:3040/graphql",
        DELETE_DEPARTMENT,
        { input: { id: id } },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const deleteDepartmentMutataion = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });

  async function updateDepartment(row: Department) {
    return request("http://localhost:3040/graphql", UPDATE_DEPARTMENT, {
      input: {
        id: row.id,
        status: !row.status,
      },
    });
  }
  const updateDepartmentMutation = useMutation({
    mutationFn: updateDepartment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Department
      </Button>
      {open ? (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box>
            <TextField
              fullWidth
              label="Department Name"
              value={department.name}
              onChange={(e) =>
                setDepartment((prev) => ({ ...prev, name: e.target.value }))
              }
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>

              <Select
                value={department.status ? "true" : "false"}
                label="Status"
                onChange={(e) =>
                  setDepartment((prev) => ({
                    ...prev,
                    status: e.target.value === "true",
                  }))
                }
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{ mr: "30px" }}
              onClick={() => {
                addDepartmentMutataion.mutate();
              }}
            >
              Save
            </Button>

            <Button variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Paper>
      ) : null}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Departments</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments?.map((row: Department) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {/* {row.status ? "Active" : "Not Active"} */}
                  <Button onClick={() => updateDepartmentMutation.mutate(row)}>
                    {row.status ? "Activate" : "Deactivate"}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      deleteDepartmentMutataion.mutate(row.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
