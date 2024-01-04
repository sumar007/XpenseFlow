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

import CreateTask from "../TaskForm";

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { MdOutlineCancel } from "react-icons/md";
import "./index.css";
import Cookies from "js-cookie";

const columns = [
  {
    id: "taskname",
    label: "Task Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "projectid",
    label: "Project",
    minWidth: 100,
    align: "center",
  },
  {
    id: "taskdescription",
    label: "Task Description",
    minWidth: 100,
    align: "center",
  },
  {
    id: "deadline",
    label: "Deadline",
    minWidth: 100,
    align: "center",
  },
  {
    id: "createdBy",
    label: "Created By",
    minWidth: 100,
    align: "center",
  },
  {
    id: "assignedTo",
    label: "Assigned To",
    minWidth: 100,
    align: "center",
  },
  {
    id: "observers",
    label: "Observers",
    minWidth: 100,
    align: "center",
  },
  // Add more columns for other details you want to display
];

function TasksTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tasks, setTasks] = useState([]);

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function restructureTasks(tasks) {
    const restructuredTasks = tasks.reduce((acc, task) => {
      const {
        taskid,
        employeeName,
        employeeid,
        taskrole,
        taskdescription,
        taskname,
        deadline,
        projectName,
        projectid,
      } = task;

      if (!acc[taskid]) {
        acc[taskid] = {
          taskdescription,
          taskname,
          deadline,
          projectName,
          projectid,
          createdBy: [],
          assignedTo: [],
          observers: [],
        };
      }

      switch (taskrole) {
        case 1:
          acc[taskid].createdBy.push({
            employeeName,
            employeeid,
          });
          break;
        case 2:
          acc[taskid].assignedTo.push({
            employeeName,
            employeeid,
          });
          break;
        case 3:
          acc[taskid].observers.push({
            employeeName,
            employeeid,
          });
          break;
        default:
          break;
      }

      return acc;
    }, {});

    // Convert the restructuredTasks object into an array of tasks
    const tasksArray = Object.values(restructuredTasks);
    return tasksArray;
  }

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchData = async () => {
      const api = "http://localhost:3009/api/v1/getprojectlist";
      try {
        const response = await fetch(api, options);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const tasklists = restructureTasks(data.tasks);
        console.log(tasklists);
        setTasks(tasklists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <button
        className="add-project-button"
        onClick={() => setState({ isPaneOpen: true })}
      >
        Add Task
      </button>
      <SlidingPane
        style={{ zIndex: 1000, fontSize: "45px" }}
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={state.isPaneOpen}
        closeIcon={
          <MdOutlineCancel style={{ fontSize: "40px", width: "30px" }} />
        }
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setState({ isPaneOpen: false });
        }}
      >
        <CreateTask />
      </SlidingPane>
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
              {tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "deadline"
                          ? new Date(task[column.id]).toLocaleString()
                          : column.id === "createdBy" || // Update these comparisons
                            column.id === "assignedTo" || // Update these comparisons
                            column.id === "observers"
                          ? task[column.id].map((emp, i) => (
                              <div key={i}>{emp.employeeName}</div>
                            ))
                          : task[column.id]}
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
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default TasksTable;
