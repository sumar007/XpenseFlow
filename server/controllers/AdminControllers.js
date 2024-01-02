import { Organization } from "../models/organization.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRole from "../models/roleModel.js";
import Employee from "../models/employeeModel.js";
import Project from "../models/projectModel.js";
import CatchAsyncError from "../middleware/catchasync.js";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const companyEmail = email;

    let user;
    user = await Organization.findOne({ companyEmail });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

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
    }
    if (!user) {
      const user1 = await Employee.findOne({ email });
      if (!user1) {
        return res.status(404).json({ message: "User not found" });
      }

      // if (!user.isVerified) {
      //   return res.status(400).json({
      //     message: "User not verified. Check your email for verification.",
      //   });
      // }
      const isMatch = await bcrypt.compare(password, user1.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      // Create a JWT token with user payload
      const payload = {
        user1: {
          id: user1.id,
          email: user1.email,
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
            .json({ message: "Login successful", token, role: user1.roleName });
        }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createUserRole = async (req, res) => {
  try {
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
    const userRoles = await UserRole.find();

    res.status(200).json({ userRoles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//   const organizationId = req.Admin._id; // Assuming organizationId is a route parameter
//   console.log(req.body, "saicharan add employee body called");
//   try {
//     const {
//       email,
//       password,
//       fullName,
//       joinDate,
//       roleId,
//       socialMediaProfile,
//       employeeID,
//       address,
//       phoneNumber,
//     } = req.body;
//     let profilePic = "";
//     if (req.file) {
//       profilePic = req.file.filename;
//     }
//     const employee = new Employee({
//       organizationId,
//       email,
//       password,
//       fullName,
//       joinDate,
//       roleId,
//       roleName,
//       socialMediaProfile,
//       employeeID,
//       address,
//       phoneNumber,
//       profilePic,
//     });

//     await employee.save();
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     employee.password = hashedPassword;

//     const savedEmployee = await employee.save();

//     res
//       .status(201)
//       .json({ message: "Employee added successfully", savedEmployee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const AddEmployee = async (req, res) => {
  const organizationId = req.Admin._id;

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

    // Assuming you have the UserRole model imported
    const role = await UserRole.findOne({ _id: roleId });

    if (!role) {
      return res.status(400).json({ message: "Invalid roleId" });
    }

    const employee = new Employee({
      organizationId,
      email,
      password,
      fullName,
      joinDate,
      roleId,
      roleName: role.RoleName, // Add roleName based on the found role
      socialMediaProfile,
      employeeID,
      address,
      phoneNumber,
      profilePic: req.file ? req.file.filename : "",
    });

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

export const getSpecificEmployeeDetails = CatchAsyncError(async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (employee) {
      res.json({ data: employee });
    } else {
      res.status(404).json({ error: "employee not found" });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const updateEmployeeDetails = CatchAsyncError(async (req, res) => {
  const organizationId = req.Admin._id;
  try {
    const _id = req.params.id;

    const {
      email,
      fullName,
      roleId,
      joinDate,
      phoneNumber,
      address,
      employeeID,
      socialMediaProfile,
    } = req.body;

    const role = await UserRole.findOne({ _id: roleId, organizationId });

    if (!role) {
      return res.status(400).json({ message: "Invalid roleId" });
    }
    let profilePicPath = "";
    if (req.file) {
      profilePicPath = req.file.path;
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      _id,
      {
        email,
        fullName,
        roleId,
        roleName: role.RoleName,
        joinDate,
        phoneNumber,
        address,
        employeeID,
        socialMediaProfile,
        profilePic: profilePicPath,
        status: true,
        active: true,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Employee details updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export const updateStatusOfEmployee = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }
    return res.json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: { active } },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }
    return res.json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//AdminLogin, createUserRole, getUserRolesByOrganizationId,AddEmployee, getEmployeesByOrganizationId, AddProject

export const AddProject = async (req, res) => {
  try {
    const {
      projectName,
      clientName,
      description,
      projectStatus,
      startDate,
      gitLink,
      liveUrl,
      devUrl,
      remarks,
      figmaUrl,
      status,
      prerequsites,
      priority,
      projectType,
      endDate,
      teamMembers,
      managers,
    } = req.body;

    const newProject = new Project({
      projectName,
      clientName,
      description,
      projectStatus,
      startDate,
      gitLink,
      liveUrl,
      devUrl,
      remarks,
      figmaUrl,
      status,
      prerequsites,
      priority,
      projectType,
      endDate,
      teamMembers,
      managers,
    });
    const savedProject = await newProject.save();

    res.json(savedProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all projects
// export const getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

export const getSpecificProjectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSpecificProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
