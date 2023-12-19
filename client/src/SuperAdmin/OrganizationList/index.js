import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  GridToolbar,
  selectedGridRowsSelector,
  gridFilteredSortedRowIdsSelector,
} from "@mui/x-data-grid";
//import './index.css'
// import SubscriptionForm from "../SubscriptionForm";
import Modal from "@mui/material/Modal";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const handleDeleteClick = () => {};

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

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

function OrganizationList() {
  const navigate = useNavigate(); // Move this line to the top
  const [organizations, setOrganizations] = useState([]);

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleEditClick = (id) => {
    const row = rows.find((r) => r.id === id);
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log("Fetching Data...");
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const api = "http://localhost:3009/api/v1/organizationlist";
        const response = await fetch(api, options);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
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
      field: "organizationName",
      headerName: "Organization Name",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      flex: 1,
    },
    {
      field: "industry",
      headerName: "Industry",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
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
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
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
        rows={organizations}
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
export default OrganizationList;
