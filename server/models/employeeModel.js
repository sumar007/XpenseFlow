// Create a file named employeeModel.js (or any other name you prefer) to define the MongoDB schema

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  organizationId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  joinDate: { type: Date, required: true },
  roleId: { type: String, required: true },
  socialMediaProfile: { type: String, required: true },
  employeeID: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profilePic: { type: String },
});

// Define the 'Employee' model using the employeeSchema
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
