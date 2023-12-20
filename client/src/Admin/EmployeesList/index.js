import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

import "react-sliding-pane/dist/react-sliding-pane.css";
import Cookies from "js-cookie";

const columns = [
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
  },
  {
    id: "RoleName",
    label: "Role Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "joinDate",
    label: "Join Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "organizationName",
    label: "Organization Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minWidth: 100,
    align: "center",
  },
];

export default function EmployeesList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [employees, setEmployees] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log("Fetching Data...");
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const api = "http://localhost:3009/api/v1/getemployees";
      try {
        const response = await fetch(api, options);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(employees);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees &&
                employees.length > 0 &&
                employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((employee) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={employee.id}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "RoleName"
                            ? employee[column.id]
                            : column.id === "joinDate" && employee[column.id]
                            ? new Date(employee[column.id]).toLocaleString()
                            : employee[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
