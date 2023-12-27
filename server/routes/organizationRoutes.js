import express from "express";
import {
  addOrganization,
  getOrganizationList,
  getSpecificOrganization,
  updateSpecificOrganization,
  updateStatusOfOrganization,
} from "../controllers/organizationControllers.js";
import multer from "multer";
import path from "path";

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

const organizationRouter = express.Router();
organizationRouter.post(
  "/addorganization",
  upload.single("companyLogo"),
  addOrganization
);
organizationRouter.get("/organizationlist", getOrganizationList);
organizationRouter.get("/getorganization/:id", getSpecificOrganization);
organizationRouter.put("/updateorganization/:id", updateSpecificOrganization);
organizationRouter.put(
  "/updateorganizationStatus/:id",
  updateStatusOfOrganization
);
export default organizationRouter;
