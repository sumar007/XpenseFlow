import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AdminModel } from "../models/superAdminModel.js";
import { Organization } from "../models/organization.js";
import Employee from "../models/employeeModel.js";

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

export const protectEmployeeRoute = async (req, res, next) => {
  try {
    let token;
    console.log("Employee/Manager route called");
    
    // Check if the authorization header contains a token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Extract token from the header
    }
    
    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded payload contains the necessary user details
    if (!decoded || !decoded.user1 || !decoded.user1.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Attach the user object to the request for further use in protected routes
    req.user = decoded.user1;

    next(); // Move to the protected route if authentication is successful
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};
