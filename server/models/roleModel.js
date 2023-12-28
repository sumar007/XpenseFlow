import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  RoleName: { type: String, required: true },
  status: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

// Define the 'UserRole' model using the userRoleSchema
const UserRole = mongoose.model("UserRole", userRoleSchema);

// Default data to be inserted
const defaultUserRoles = [
  {
    RoleName: "manager",
    status: 1,
  },
  {
    RoleName: "employee",
    status: 1,
  },
];

// Check if default data already exists
UserRole.find({
  RoleName: { $in: defaultUserRoles.map((role) => role.RoleName) },
})
  .then((existingRoles) => {
    // Insert default data only if it doesn't exist
    const rolesToInsert = defaultUserRoles.filter(
      (role) =>
        !existingRoles.some(
          (existingRole) => existingRole.RoleName === role.RoleName
        )
    );

    if (rolesToInsert.length > 0) {
      return UserRole.insertMany(rolesToInsert);
    } else {
    
      return Promise.resolve([]);
    }
  })
  .then((result) => {
    if (result.length > 0) {
     
    }
  })
  .catch((error) => {
    console.error("Error inserting default data:", error);
  });

export default UserRole;
