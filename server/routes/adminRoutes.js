import express from "express";
import {
    subscriptionAddPlan,
    getSubscriptionList,
    SuperAdminRegistration,
    SuperAdminVerifyEmail,
    SuperAdminLogin,
    getSpecificSubscriptionDetails,
    updateSubscriptionPlan,
    requestPasswordReset,
    resetPassword
} from "../controllers/SuperAdminControllers.js";

const adminRouter = express.Router();
adminRouter.post("/superadminsignup", SuperAdminRegistration);
adminRouter.post("/superadminverify", SuperAdminVerifyEmail)
adminRouter.post("/superadminlogin", SuperAdminLogin)
adminRouter.post("/subscription-plans-add", subscriptionAddPlan);
adminRouter.get("/subscriptionlist", getSubscriptionList)
adminRouter.get("/subscription-plans/:id", getSpecificSubscriptionDetails)
adminRouter.put("/subscription-plans/:id", updateSubscriptionPlan)
adminRouter.post("/super-admin-password", requestPasswordReset);
adminRouter.post('/reset-password', resetPassword);

export default adminRouter;
