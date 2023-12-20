import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  organizationId: { type: String, required: true },
  RoleName: { type: String, required: true },
  status: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

// Define the 'UserRole' model using the userRoleSchema
const UserRole = mongoose.model("UserRole", userRoleSchema);

export default UserRole;
