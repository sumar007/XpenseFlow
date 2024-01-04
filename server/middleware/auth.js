import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AdminModel } from "../models/superAdminModel.js";
import { Organization } from "../models/organization.js";
import Employee from "../models/employeeModel.js";
import CatchAsyncError from "./catchasync.js";
import ErrorHandler from "../utils/errorhandler.js";

dotenv.config();

export const protectSuperAdminRoute = async (req, res, next) => {
  try {
    let token;

    // Check if the authorization header contains a token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log(req.headers);
      token = req.headers.authorization.split(" ")[1]; // Extract token from the header
    }
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find Super Admin by ID from the decoded token
    const superAdmin = await AdminModel.findById(decoded.user.id);
    console.log(superAdmin);
    if (!superAdmin || superAdmin.role !== "superAdmin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Attach the Super Admin object to the request for further use in protected routes
    req.superAdmin = superAdmin;

    next(); // Move to the protected route if authentication is successful
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const protectAdminRoute = async (req, res, next) => {
  try {
    let token;
    console.log("admin  route called");
    // Check if the authorization header contains a token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log(req.headers);
      token = req.headers.authorization.split(" ")[1]; // Extract token from the header
    }
    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find Super Admin by ID from the decoded token
    const Admin = await Organization.findById(decoded.user.id);
    if (!Admin || Admin.role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    // Attach the Super Admin object to the request for further use in protected routes
    req.Admin = Admin;

    next(); // Move to the protected route if authentication is successful
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(new ErrorHandler("Please provide an access token", 400));
  }
  const access_token = authorizationHeader.split(" ")[1];
  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 400));
  }
  console.log(access_token, "token");
  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }
        // Query the user data from MongoDB
    const user = await Employee.findOne({ email: decoded.user1.email }).lean();
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Error while verifying access token", 400));
  }
});
