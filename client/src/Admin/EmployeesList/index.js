import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./index.css";
import Toast from "../../components/utlis/toast";

import "react-sliding-pane/dist/react-sliding-pane.css";
import Cookies from "js-cookie";
import { MdDelete, MdEditSquare } from "react-icons/md";

const columns = [
  {
    id: "_id",
    label: "ID",
    hide: true,
  },
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
    id: "roleName",
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
  // {
  //   id: "organizationName",
  //   label: "Organization Name",
  //   minWidth: 100,
  //   align: "center",
  // },
  {
    id: "phoneNumber",
    label: "Phone Number",
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

export default function EmployeesList({ getEmployeeId }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [role, setRole] = useState("");
  const [employees, setEmployees] = useState([]);

  const [orgId, setOrganizationId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchRoles = () => {
    const role = sessionStorage.getItem("role");
    setRole(role);
  };

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    const api =
      role === "manager"
        ? `http://localhost:3009/api/v1/employeelist/${orgId}`
        : "http://localhost:3009/api/v1/getemployees";

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(api, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const employeesData = data.employees.filter(
        (emp) => emp.roleName === "employee"
      );
      setEmployees(employeesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchOrganizationId = async () => {
      const token = sessionStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const api = "http://localhost:3009/api/v1/getorganizationId"; // Replace with your endpoint to get organization ID
      try {
        const response = await fetch(api, options);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setOrganizationId(data[0]);
          // Assuming the organization ID is in the first element of the response array
        }
      } catch (error) {
        console.error("Error fetching organization ID:", error);
      }
    };
    fetchOrganizationId();
    fetchRoles();
    fetchData();
  }, []);

  const deleteEmployeeId = async (id, active) => {
    const url = `http://localhost:3009/api/v1/deleteEmployee/${id}`;

    const token = sessionStorage.getItem("token");
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust the content type if needed
      },
      body: JSON.stringify({
        active: !active, // Toggle the status
      }),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: "Employee deleted Successfully",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  const handleToggleStatus = async (id, currentStatus) => {
    console.log(id, "toggle", currentStatus);
    try {
      const token = sessionStorage.getItem("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: !currentStatus, // Toggle the status
        }),
      };
      const api = `http://localhost:3009/api/v1/updateEmployeeStatus/${id}`;
      const response = await fetch(api, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      await response.json();
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const setEmployeeId = (id) => {
    getEmployeeId(id);
  };

  console.log(employees);
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
                          backgroundColor: "#004e89",
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
                      className="rowHover"
                    >
                      {columns.map(
                        (column) =>
                          !column.hide && (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "RoleName"
                                ? employee[column.id]
                                : column.id === "joinDate" &&
                                  employee[column.id]
                                ? new Date(employee[column.id]).toLocaleString(
                                    undefined,
                                    options
                                  )
                                : employee[column.id]}

                              {column.id === "actions" && (
                                <div>
                                  <MdEditSquare
                                    className="project-edit-icon"
                                    onClick={() => setEmployeeId(employee._id)}
                                  />
                                  {employee.status ? (
                                    <FaToggleOn
                                      className="project-edit-icon"
                                      onClick={() =>
                                        handleToggleStatus(
                                          employee._id,
                                          employee.status
                                        )
                                      }
                                    />
                                  ) : (
                                    <FaToggleOff
                                      className="project-edit-icon"
                                      onClick={() =>
                                        handleToggleStatus(
                                          employee._id,
                                          employee.status
                                        )
                                      }
                                    />
                                  )}
                                  <MdDelete
                                    className="project-edit-icon"
                                    onClick={() =>
                                      deleteEmployeeId(
                                        employee._id,
                                        employee.active
                                      )
                                    }
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
