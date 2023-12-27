import React, { useState } from "react";
import "./index.css";

const UserRoleForm = () => {
  const [formData, setFormData] = useState({
    RoleName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from sessionStorage
      const token = sessionStorage.getItem("token"); // Replace with your actual token key
      console.log(token);
      const response = await fetch("http://localhost:3009/api/v1/addrole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-role-main-container">
      <form onSubmit={handleSubmit} className="add-role-form-container">
        {/* <label>
        Organization ID:
        <input type="text" name="organizationId" value={formData.organizationId} onChange={handleChange} />
      </label> */}
        <label className="add-role-label">
          Role Name:
          <input
            type="text"
            name="RoleName"
            value={formData.RoleName}
            onChange={handleChange}
            className="add-role-input"
            placeholder="Ex: manager, HR"
          />
        </label>

        {/* <label>
        Status:
        <input type="number" name="status" value={formData.status} onChange={handleChange} />
      </label> */}
        <button type="submit" className="add-role-button">
          Create User Role
        </button>
      </form>
    </div>
  );
};

export default UserRoleForm;
