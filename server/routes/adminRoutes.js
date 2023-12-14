import express from "express";
import {subscriptionAddPlan, getSubscriptionList, SuperAdminRegistration, SuperAdminVerifyEmail, SuperAdminLogin} from "../controllers/SuperAdminControllers.js";

const adminRouter = express.Router();
adminRouter.post("/superadminregister", SuperAdminRegistration);
adminRouter.post("/superadminverify", SuperAdminVerifyEmail)
adminRouter.post("/superadminlogin", SuperAdminLogin)
adminRouter.post("/subscription-plans-add", subscriptionAddPlan);
adminRouter.get("/subscriptionlist", getSubscriptionList)

export default adminRouter
