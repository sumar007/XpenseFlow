import express from "express";
import multer from 'multer';
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
    updateAdminProfile
} from "../controllers/SuperAdminControllers.js";
import {protectSuperAdminRoute} from "../middleware/auth.js";

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

const adminRouter = express.Router();



adminRouter.post("/superadminsignup", SuperAdminRegistration);
adminRouter.post("/superadminverify", SuperAdminVerifyEmail)
adminRouter.post("/superadminlogin", SuperAdminLogin)
adminRouter.post("/subscription-plans-add",protectSuperAdminRoute, subscriptionAddPlan);
adminRouter.get("/subscriptionlist",protectSuperAdminRoute, getSubscriptionList)
adminRouter.get("/subscription-plans/:id",protectSuperAdminRoute, getSpecificSubscriptionDetails)
adminRouter.put("/subscription-plans/:id", protectSuperAdminRoute,updateSubscriptionPlan)
adminRouter.post("/super-admin-password",protectSuperAdminRoute, requestPasswordReset);
adminRouter.post('/reset-password',protectSuperAdminRoute, resetPassword);
adminRouter.put('/superadmin/profile/:id',protectSuperAdminRoute, upload.single('profilePicture'), updateAdminProfile);

export default adminRouter;
