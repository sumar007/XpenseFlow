// Express Routes

import express from "express";
import {
  addTimeSheet,
  employeeLogin,
  getTimeSheets,
  getUserInfo,
} from "../controllers/employeeController.js"; // Import your controller function
import { isAuthenticated } from "../middleware/auth.js";

export const employeeRouter = express.Router();

// Route for employee login
employeeRouter.post("/employee/login", employeeLogin);
employeeRouter.post("/employee/addTimeSheet", addTimeSheet);
employeeRouter.get("/employee/time-sheets/:employeeId", getTimeSheets);
employeeRouter.get("/userinfo", isAuthenticated, getUserInfo);
