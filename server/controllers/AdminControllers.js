import { Organization } from "../models/organization.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRole from "../models/roleModel.js";
import Employee from "../models/employeeModel.js";
import Project from "../models/projectModel.js";
import CatchAsyncError from "../middleware/catchasync.js";

// export const AdminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const companyEmail = email;
//     console.log(req.body, "saiacharan");
//     const user = await Organization.findOne({ companyEmail });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     console.log(user.password, "password");
//     // if (!user.isVerified) {
//     //   return res.status(400).json({
//     //     message: "User not verified. Check your email for verification.",
//     //   });
//     // }
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log(isMatch);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }
//     // Create a JWT token with user payload
//     const payload = {
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "72h" },
//       (err, token) => {
//         if (err) {
//           throw err;
//         }
//         res
//           .status(200)
//           .json({ message: "Login successful", token, role: "Admin" });
//       }
//     );
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const companyEmail = email;
    console.log(req.body, "saiacharan");
    let user;
    user = await Organization.findOne({ companyEmail });
    console.log(user, "user admin");
    if (user) {
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
    }
    if (!user) {
      const user1 = await Employee.findOne({ email });
      if (!user1) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(user1.password, "password");
      // if (!user.isVerified) {
      //   return res.status(400).json({
      //     message: "User not verified. Check your email for verification.",
      //   });
      // }
      const isMatch = await bcrypt.compare(password, user1.password);
      console.log(isMatch);
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
            .json({ message: "Login successful", token, role: user1.role });
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
    console.log(roleId, "roleid");
    // Assuming you have the UserRole model imported
    const role = await UserRole.findOne({ _id: roleId, organizationId });
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
      roleName: role.RoleName,
      socialMediaProfile,
      employeeID,
      address,
      phoneNumber,
      profilePic: req.file ? req.file.filename : "",
      status: true,
      active: true,
    });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    employee.password = hashedPassword;

    const savedEmployee = await employee.save();

    res
      .status(201)
      .json({ message: "Employee added successfully", savedEmployee });
  } catch (error) {
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
    console.log(id);
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
    console.log(_id, "id called");
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
    console.log("employeupdate called", req.body);
    const role = await UserRole.findOne({ _id: roleId, organizationId });
    console.log(role);
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
    console.log(updatedEmployee);
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
  console.log("update subscription called");
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
  console.log("update subscription called");
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
  console.log("add project called");
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
    console.log(savedProject);
    res.json(savedProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    console.log(projects);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getSpecificProjectDetails= async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateSpecificProject= async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
