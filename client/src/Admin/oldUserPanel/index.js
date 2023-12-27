// import * as React from "react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// // import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from "@mui/material/ListItemText";
// // import InboxIcon from '@mui/icons-material/MoveToInbox';
// // import MailIcon from '@mui/icons-material/Mail';
// import { MdOutlineStarBorder } from "react-icons/md";
// import { FaSearch } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
// import { IoSettings } from "react-icons/io5";
// import { AiFillThunderbolt } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
// import "./index.css";
// import StickyHeadTable from "../UserPanelLists";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`, // Use backticks (`) for string interpolation
//     marginLeft: `${drawerWidth}px`, // Use backticks (`) for string interpolation
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// export default function OrganiseWise() {
//   const [date, updateDate] = useState(new Date());
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       ticking();
//     }, 1000);
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   const ticking = () => {
//     updateDate(new Date());
//   };

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="userpanel-main-container">
//       <Box sx={{ display: "flex", width: "100%" }}>
//         <CssBaseline />
//         <AppBar position="fixed" open={open}>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               edge="start"
//               sx={{ mr: 2, ...(open && { display: "none" }) }}
//             >
//               <MenuIcon />
//             </IconButton>

//             <Typography variant="h6" noWrap component="div">
//               LGS24
//             </Typography>
//             <div className="header">
//               <div
//                 className="containerIcons"
//                 style={{ borderRadius: "8px", background: "#ffffff" }}
//               >
//                 <input
//                   type="text"
//                   style={{
//                     width: "300px",
//                     padding: "8px",
//                     border: "none",
//                     outline: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <FaSearch className="searchIcon" />
//               </div>
//               <span>{date.toLocaleTimeString()}</span>
//               <h5>
//                 {" "}
//                 <CgProfile /> SAMBOJU RAVITEJA
//               </h5>
//               <button className="btn btn-warning">Upgrade</button>
//               <button className="btn btn-danger">Invite</button>
//             </div>
//           </Toolbar>
//         </AppBar>

//         <Drawer
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//               boxSizing: "border-box",
//             },
//           }}
//           variant="persistent"
//           anchor="left"
//           open={open}
//         >
//           <div style={{ color: "#ffffff" }} className="sliderbar">
//             <DrawerHeader>
//               <IconButton onClick={handleDrawerClose}>
//                 {theme.direction === "ltr" ? (
//                   <ChevronLeftIcon color="#ffffff" />
//                 ) : (
//                   <ChevronRightIcon color="#ffffff" />
//                 )}
//               </IconButton>
//             </DrawerHeader>
//             <Divider />

//             <List>
//               {[
//                 "Tasks and Projects",
//                 "Sites and Stores",
//                 "Company",
//                 "Automation",
//                 "CRM",
//                 "Inventory management",
//                 "Marketing",
//                 "Company",
//                 "Automation",
//                 "Applications",
//                 "Subscription",
//                 "More..",
//               ].map((text, index) => (
//                 <ListItem key={text} disablePadding>
//                   <ListItemButton>
//                     {/* <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon classsName="Icon"  color="#ffffff"/> : <MailIcon className="Icon" color="#ffffff"/>}
//                 </ListItemIcon> */}
//                     <ListItemText primary={text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>

//             <Divider />
//           </div>
//         </Drawer>

//         <Main open={open}>
//           <DrawerHeader />
//           <ul className="taskItems">
//             <li className="Nav-Service-container nav-menu-item">Tasks</li>
//             <li className="Nav-Service-container nav-menu-item">Projects</li>
//             <li className="Nav-Service-container nav-menu-item">Scrum</li>
//             <li className="Nav-Service-container nav-menu-item">Efficiency</li>
//             <li className="Nav-Service-container nav-menu-item ">
//               More
//               <ul className="Nav-Service-container-items">
//                 <li className="Headeroption-item">Involvements</li>
//                 <li className="Headeroption-item">Reports</li>
//                 <li className="Headeroption-item">Templates</li>
//                 <li className="Headeroption-item">RecycleBin</li>
//               </ul>
//             </li>
//           </ul>
//           <ul className="taskCreation">
//             <h6>
//               My Task <MdOutlineStarBorder />{" "}
//             </h6>
//             <Link to="/addtask">
//               <button className="btn btn-success">Create Task</button>
//             </Link>
//             <div
//               className="containerIcons"
//               style={{
//                 width: "70%",
//                 borderRadius: "8px",
//                 background: "#ffffff",
//               }}
//             >
//               <input
//                 type="search"
//                 style={{
//                   border: "none",
//                   width: "99%",
//                   borderRadius: "8px",
//                   outline: "none",
//                   padding: "5px",
//                 }}
//               />
//               <FaSearch className="searchIcon" />
//             </div>
//             <button className="btn btn-danger">
//               <IoSettings />
//             </button>
//             <button className="btn btn-warning">
//               <AiFillThunderbolt />
//             </button>
//           </ul>
//           <hr style={{ width: "100%" }} />
//           <div className="totalItems">
//             <ul className="listItems">
//               <li className="Nav-Service-container nav-menu-item">list</li>
//               <li className="Nav-Service-container nav-menu-item">Deadline</li>
//               <li className="Nav-Service-container nav-menu-item">Planner</li>
//               <li className="Nav-Service-container nav-menu-item">Calender</li>
//               <li className="Nav-Service-container nav-menu-item">Gantt</li>
//             </ul>
//             <ul className="myItems ml-2">
//               <li className="Nav-Service-container nav-menu-item">My items</li>
//               <li className="Nav-Service-container nav-menu-item">Overdue</li>
//               <li className="Nav-Service-container nav-menu-item">Comments</li>
//             </ul>

//             <button id="lockButton" className="btn btn-danger">
//               <FaLock />
//             </button>
//           </div>
//         </Main>
//       </Box>
//       <StickyHeadTable />
//     </div>
//   );
// }

import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { MdOutlineStarBorder } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./index.css";
import StickyHeadTable from "../TasksList";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% -${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function OrganiseWise() {
  const [date, updateDate] = useState(new Date());
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      ticking();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const ticking = () => {
    updateDate(new Date());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ width: "100%" }} component="div">
          <IconButton
            component="button"
            style={{ width: "5%" }}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="h1"
            style={{ width: "5%" }}
          >
            LGS24
          </Typography>
          <div className="header" style={{ width: "90%" }}>
            <div
              className="containerIcons"
              style={{ borderRadius: "8px", background: "#ffffff" }}
            >
              <input
                type="text"
                style={{
                  width: "300px",
                  padding: "8px",
                  border: "none",
                  outline: "none",
                  borderRadius: "8px",
                }}
              />
              <FaSearch className="searchIcon" />
            </div>
            <span>{date.toLocaleTimeString()}</span>
            <h5>
              {" "}
              <CgProfile /> SAMBOJU RAVITEJA
            </h5>
            <button className="btn btn-warning">Upgrade</button>
            <button className="btn btn-danger">Invite</button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div style={{ color: "#ffffff" }} className="sliderbar">
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon color="#ffffff" />
              ) : (
                <ChevronRightIcon color="#ffffff" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {[
              "Tasks and Projects",
              "Sites and Stores",
              "Company",
              "Automation",
              "CRM",
              "Inventory management",
              "Marketing",
              "Company",
              "Automation",
              "Applications",
              "Subscription",
              "More..",
            ].map((text, index) => (
              <Link className="link" key={index} to={`/${text}`}>
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>

          <Divider />
        </div>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <ul className="taskItems">
          <li className="Nav-Service-container">Tasks</li>
          <li className="Nav-Service-container">Projects</li>
          <li className="Nav-Service-container">Scrum</li>
          <li className="Nav-Service-container">Efficiency</li>
          <li className="Nav-Service-container">More</li>
        </ul>
        <ul className="taskCreation">
          <h6>
            My Task <MdOutlineStarBorder />{" "}
          </h6>
          <button className="btn btn-success">Create Task</button>
          <div
            className="containerIcons"
            style={{ width: "70%", borderRadius: "8px", background: "#ffffff" }}
          >
            <input
              type="search"
              style={{
                border: "none",
                width: "99%",
                borderRadius: "8px",
                outline: "none",
                padding: "5px",
              }}
            />
            <FaSearch className="searchIcon" />
          </div>
          <button className="btn btn-danger">
            <IoSettings />
          </button>
          <button className="btn btn-warning">
            <AiFillThunderbolt />
          </button>
        </ul>
        <hr style={{ width: "100%" }} />
        <div className="totalItems">
          <ul className="listItems">
            <li className="Nav-Service-container">list</li>
            <li className="Nav-Service-container">Deadline</li>
            <li className="Nav-Service-container">Planner</li>
            <li className="Nav-Service-container">Calender</li>
            <li className="Nav-Service-container">Gantt</li>
          </ul>
          <ul className="myItems ml-2">
            <li className="Nav-Service-container">My items</li>
            <li className="Nav-Service-container">Overdue</li>
            <li className="Nav-Service-container">Comments</li>
          </ul>

          <button id="lockButton" className="btn btn-danger">
            <FaLock />
          </button>
        </div>
        <StickyHeadTable />
      </Main>
    </Box>
  );
}
