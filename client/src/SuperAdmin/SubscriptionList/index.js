import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { ToggleButton } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  GridToolbar,
  selectedGridRowsSelector,
  gridFilteredSortedRowIdsSelector,
} from "@mui/x-data-grid";
import OrganizationForm from "../OrganizationRegistration";
//import './index.css'
// import SubscriptionForm from "../SubscriptionForm";
import Modal from "@mui/material/Modal";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const getSelectedRowsToExport = ({ apiRef }) => {
  const selectedRowIds = selectedGridRowsSelector(apiRef);
  if (selectedRowIds.size > 0) {
    return Array.from(selectedRowIds.keys());
  }

  return gridFilteredSortedRowIdsSelector(apiRef);
};

const CustomCheckboxHeader = (props) => {
  return (
    <div style={{ backgroundColor: "blue", padding: "8px" }}>
      {props.indeterminate ? (
        <div style={{ backgroundColor: "inherit" }} />
      ) : null}
      <input type="checkbox" {...props} />
    </div>
  );
};

function SubscriptionList({ setSubscriptionDetail }) {
  const navigate = useNavigate(); // Move this line to the top
  const [subscriptions, setSubscriptions] = useState([]);

  // const [isModalOpen, setModalOpen] = React.useState(false);
  const [status, setSelectedRow] = React.useState(null);

  const handleEditClick = (id) => {
    setSubscriptionDetail(id);
    // setSelectedRow(row);
    // setModalOpen(true);
  };

  const getStatus = (id) => {
    const details = subscriptions.find((sub) => sub._id === id);
    return details ? details.status : null;
  };

  const handleToggle = (id) => {
    const details = subscriptions.filter((sub) => sub._id === id);
    setSelectedRow(details);
    console.log(details, "venuuuu");
    const status = details[0].status;
    handleToggleStatus(id, status);
  };

  const handleToggleStatus = async (id, currentStatus) => {
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
      const api = `http://localhost:3009/api/v1/updatestatussubscription/${id}`;
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

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = "http://localhost:3009/api/v1/subscriptionlist";
    try {
      const response = await fetch(api, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setSubscriptions(data.subscriptionList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 90,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "subscriptionType",
      headerName: "Subscription Type",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      flex: 1,
    },
    {
      field: "mrpprice",
      headerName: "MRP price",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "convertedValidTime",
      headerName: "Validity",
      type: "number",
      headerClassName: "super-app-theme--header",
      minWidth: 110,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "userCount",
      headerName: "Users",
      type: "number",
      headerClassName: "super-app-theme--header",
      minWidth: 110,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 100,
      cellClassName: "actions",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              getStatus(id) ? (
                <ToggleOnIcon style={{ color: "green", fontSize: "30px" }} />
              ) : (
                <ToggleOffIcon style={{ fontSize: "30px" }} />
              )
            }
            label="Delete"
            onClick={() => handleToggle(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const getRowId = (row) => row._id;

  const getRowClassName = (params) => {
    return params.row.id % 2 === 1 ? "even-row" : "odd-row";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "& .super-app-theme--header": {
          backgroundColor: "blue",
          color: "#fff",
        },
        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
          outline: "none !important", // Remove the focus outline
          border: "none !important", // Remove the border when the cell is focused
          boxShadow: "none !important", // Remove any box shadow
        },
        "& .even-row:hover, & .odd-row:hover": {
          backgroundColor: "grey", // Remove the background color on hover
        },
      }}
    >
      <DataGrid
        flexGrow={1}
        rows={subscriptions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {},
          },
        }}
        getRowId={getRowId}
        getRowClassName={getRowClassName}
        headerCheckboxSelectionComponent={CustomCheckboxHeader}
        pageSizeOptions={[5, 10, 15, 20, 100]}
        disableSelectionOnClick // Add this line to disable cell selection
        selectionModel={{}}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
          printOptions: {
            getRowsToExport: getSelectedRowsToExport,
            hideFooter: true,
            hideToolbar: true,
            includeCheckboxes: true,
          },
        }}
      />
    </Box>
  );
}
export default SubscriptionList;
