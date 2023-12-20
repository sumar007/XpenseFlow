import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuperForgotPassword.css";

const SuperForgotPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const stoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MTNjZjcwMTJmMmRhODY3ZDM1YjBiIiwiZW1haWwiOiJ2ZW51b2ZmY2FtcHVzQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MDI5Njk2ODUsImV4cCI6MTcwMjk3MzI4NX0.YZI__Sz2jGJMk7JyfJFSrlU_GepShZ9lirhgjj5yd_c token";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create a request body with token and newPassword

      const requestBody = {
        token: token,
        newPassword: newPassword,
      };

      // Perform the POST request using fetch
      const response = await fetch(
        "http://localhost:3009/api/v1/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${stoken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check the response status
      if (response.ok) {
        // Handle success, maybe redirect the user to another page
        navigate("/superlogin");
      } else {
        // Handle error cases, you can display an error message to the user
        console.error("Failed to reset password");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="super-forgot-main-container">
      <form
        onSubmit={handleSubmit}
        className="super-admin-forgot-password-form-container"
      >
        <div className="super-admin-login-form-group-container">
          <label className="super-admin-login-form-label-text">Token:</label>
          <input
            type="text"
            className="super-admin-login-input-text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div className="super-admin-login-form-group-container">
          <label className="super-admin-login-form-label-text">
            New Password:
          </label>
          <input
            type="password"
            name="password"
            className="super-admin-login-input-text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <center>
          <button className="super-admin-login-form-button" type="submit">
            SUBMIT
          </button>
        </center>
      </form>
    </div>
  );
};

export default SuperForgotPassword;
