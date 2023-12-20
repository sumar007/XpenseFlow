import { Organization } from "../models/organization.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRole from "../models/roleModel.js";
import Employee from "../models/employeeModel.js";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const companyEmail = email;
    console.log(req.body, "saiacharan");
    const user = await Organization.findOne({ companyEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.password, "password");
    // if (!user.isVerified) {
    //   return res.status(400).json({
    //     message: "User not verified. Check your email for verification.",
    //   });
    // }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // Create a JWT token with user payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "72h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res
          .status(200)
          .json({ message: "Login successful", token, role: "Admin" });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createUserRole = async (req, res) => {
  try {
    console.log(req.Admin._id, "admin called by user role");
    const { RoleName } = req.body;

    const userRole = new UserRole({
      organizationId: req.Admin._id,
      RoleName,
      status: true,
    });

    await userRole.save();

    res
      .status(201)
      .json({ message: "User role created successfully", userRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserRolesByOrganizationId = async (req, res) => {
  try {
    const organizationId = req.Admin._id; // Assuming organizationId is a route parameter
    const userRoles = await UserRole.find({ organizationId });

    res.status(200).json({ userRoles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AddEmploye = async (req, res) => {
  const organizationId = req.Admin._id; // Assuming organizationId is a route parameter
  console.log(req.body, "saicharan add employee body called");
  try {
    const {
      email,
      password,
      fullName,
      joinDate,
      roleId,
      socialMediaProfile,
      employeeID,
      address,
      phoneNumber,
    } = req.body;
    let profilePic = "";
    if (req.file) {
      profilePic = req.file.filename;
    }
    const employee = new Employee({
      organizationId,
      email,
      password,
      fullName,
      joinDate,
      roleId,
      socialMediaProfile,
      employeeID,
      address,
      phoneNumber,
      profilePic,
    });

    await employee.save();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    employee.password = hashedPassword;

    const savedEmployee = await employee.save();

    res
      .status(201)
      .json({ message: "Employee added successfully", savedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployeesByOrganizationId = async (req, res) => {
  try {
    const organizationId = req.Admin._id; // Assuming organizationId is a route parameter

    const employees = await Employee.find({ organizationId });

    res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
