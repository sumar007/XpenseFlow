import express from "express";
import {
  AddEmploye,
  AdminLogin,
  createUserRole,
  getEmployeesByOrganizationId,
  getUserRolesByOrganizationId,
} from "../controllers/AdminControllers.js";

import multer from "multer";
import path from "path";

import { protectAdminRoute } from "../middleware/auth.js";

import {
  subscriptionAddPlan,
  getSubscriptionList,
  SuperAdminRegistration,
  SuperAdminVerifyEmail,
  SuperAdminLogin,
  getSpecificSubscriptionDetails,
  updateSubscriptionPlan,
  requestPasswordReset,
  resetPassword,
  updateAdminProfile,
} from "../controllers/SuperAdminControllers.js";
import { protectSuperAdminRoute } from "../middleware/auth.js";

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

adminRouter.post("/superadminsignup", SuperAdminRegistration);
adminRouter.post("/superadminverify", SuperAdminVerifyEmail);
adminRouter.post("/superadminlogin", SuperAdminLogin);
adminRouter.post(
  "/subscription-plans-add",
  protectSuperAdminRoute,
  subscriptionAddPlan
);
adminRouter.get(
  "/subscriptionlist",
  protectSuperAdminRoute,
  getSubscriptionList
);
adminRouter.get(
  "/subscription-plans/:id",
  protectSuperAdminRoute,
  getSpecificSubscriptionDetails
);
adminRouter.put(
  "/subscription-plans/:id",
  protectSuperAdminRoute,
  updateSubscriptionPlan
);
adminRouter.post("/super-admin-password", requestPasswordReset);
adminRouter.post("/reset-password", resetPassword);
adminRouter.put(
  "/superadmin/profile/:id",
  protectSuperAdminRoute,
  upload.single("profilePicture"),
  updateAdminProfile
);

adminRouter.put(
  "/updatestatussubscription/:id",

  updateStatusOfSubscription
);
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
  AddEmploye
);

adminRouter.get(
  "/getemployees",
  protectAdminRoute,
  getEmployeesByOrganizationId
);
