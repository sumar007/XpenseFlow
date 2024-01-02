// Express Routes

import express from "express";
import {
  addTimeSheet,
  employeeLogin,
  getEmployeesByManager,
  getOrganizationIds,
  getTimeSheets,
} from "../controllers/employeeController.js"; // Import your controller function
import { protectEmployeeRoute } from "../middleware/auth.js";
import { getAllProjects } from "../controllers/AdminControllers.js";

export const employeeRouter = express.Router();

// Route for employee login
employeeRouter.post("/employee/login", employeeLogin);
employeeRouter.post(
  "/employee/addTimeSheet",
  protectEmployeeRoute,
  addTimeSheet
);
employeeRouter.get(
  "/employee/time-sheets/:employeeId",
  protectEmployeeRoute,
  getTimeSheets
);
employeeRouter.get(
  "/employeelist/:organizationId",
  protectEmployeeRoute,
  getEmployeesByManager
);
employeeRouter.get("/getprojects", protectEmployeeRoute, getAllProjects);
employeeRouter.get(
  "/getorganizationId",
  protectEmployeeRoute,
  getOrganizationIds
);
