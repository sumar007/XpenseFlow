import express from "express";
import multer from "multer";
import path from "path";

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
  updateStatusOfSubscription,
} from "../controllers/SuperAdminControllers.js";
import { protectSuperAdminRoute } from "../middleware/auth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/adminpics");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

const superAdminRouter = express.Router();

superAdminRouter.post("/superadminsignup", SuperAdminRegistration);
superAdminRouter.post("/superadminverify", SuperAdminVerifyEmail);
superAdminRouter.post("/superadminlogin", SuperAdminLogin);
superAdminRouter.post(
  "/subscription-plans-add",
  protectSuperAdminRoute,
  subscriptionAddPlan
);
superAdminRouter.get("/subscriptionlist",protectSuperAdminRoute, getSubscriptionList);
superAdminRouter.get("/subscription-plans/:id",protectSuperAdminRoute, getSpecificSubscriptionDetails);
superAdminRouter.put(
  "/subscription-plans/:id",
  protectSuperAdminRoute,
  updateSubscriptionPlan
);
superAdminRouter.post(
  "/super-admin-password",
  protectSuperAdminRoute,
  requestPasswordReset
);
superAdminRouter.post("/reset-password", protectSuperAdminRoute, resetPassword);
superAdminRouter.put(
  "/superadmin/profile/:id",
  protectSuperAdminRoute,
  upload.single("profilePicture"),
  updateAdminProfile
);

superAdminRouter.put("/updatestatussubscription",protectSuperAdminRoute, updateStatusOfSubscription);

export default superAdminRouter;
