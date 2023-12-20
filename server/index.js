import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const port = process.env.PORT || 3009;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

import userRouter from "./controllers/usercontroller.js";
import organizationRouter from "./routes/organizationRoutes.js";
import superAdminRouter from "./routes/superAdminRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";

app.use(
  "/api/v1",
  userRouter,
  superAdminRouter,
  organizationRouter,
  adminRouter
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
