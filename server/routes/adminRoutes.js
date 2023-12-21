import express from "express";
import {
  AddEmployee,
  AddProject,
  AdminLogin,
  createUserRole,
  getEmployeesByOrganizationId,
  getUserRolesByOrganizationId,
} from "../controllers/AdminControllers.js";

import multer from "multer";
import path from "path";

import { protectAdminRoute } from "../middleware/auth.js";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "sai" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

export const adminRouter = express.Router();
adminRouter.post("/adminlogin", AdminLogin);
adminRouter.post("/addrole", protectAdminRoute, createUserRole);
adminRouter.get(
  "/getUserRole",
  protectAdminRoute,
  getUserRolesByOrganizationId
);
adminRouter.post(
  "/addemployee",
  protectAdminRoute,
  upload.single("profilePic"),
  AddEmployee
);

adminRouter.get(
  "/getemployees",
  protectAdminRoute,
  getEmployeesByOrganizationId
);


adminRouter.post("/addproject", protectAdminRoute, AddProject);

