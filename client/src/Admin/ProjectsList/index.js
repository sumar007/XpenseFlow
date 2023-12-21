import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

import "react-sliding-pane/dist/react-sliding-pane.css";

import "./index.css";
import Cookies from "js-cookie";

const columns = [
  {
    id: "_id",
    label: "Id",
    hide: true,
  },
  {
    id: "projectName",
    label: "Project Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "clientName",
    label: "Client Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "projectStatus",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "endDate",
    label: "Deadline",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
];

export default function ProjectsTable({ getProjectId }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [projects, setProjects] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const api = "http://localhost:3009/api/v1/getprojects";
      try {
        const response = await fetch(api, options);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        console.log(data,"projects")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const setProjectId = (id) => {
    getProjectId(id);
  };

  const options = { year: "numeric", month: "numeric", day: "numeric" };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(
                  (column) =>
                    // Check if column should be hidden
                    !column.hide && (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#0000b3",
                          color: "#fff",
                          zIndex: 0,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={project._id}
                  >
                    {columns.map(
                      (column) =>
                        // Check if column should be hidden
                        !column.hide && (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "endDate"
                              ? new Date(project[column.id]).toLocaleString(
                                  undefined,
                                  options
                                )
                              : project[column.id]}

                            {column.id === "actions" && (
                              <div>
                                <MdEditSquare
                                  className="project-edit-icon"
                                  onClick={() => setProjectId(project._id)} // Wrap in arrow function
                                />
                                <MdDelete
                                  className="project-edit-icon"
                                  onClick={() => setProjectId(project._id)}
                                />
                              </div>
                            )}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
