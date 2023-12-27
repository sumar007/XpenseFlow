import React, { useState, useEffect } from "react";
import "./superadminVerify.css";
import Toast from "../../components/utlis/toast";

import { useNavigate } from "react-router-dom";

const SuperadminVerify = () => {
  const [email, setEmail] = useState("");
  const [code, setVerifyCode] = useState("");
  const navigate = useNavigate();
  const verifyUser = async (e) => {
    e.preventDefault();
    const jsonData = {
      email: email,
      verificationCode: code,
    };

    try {
      const response = await fetch(
        "http://localhost:3009/api/v1/superadminverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData), // pass an object with properties email and verificationCode
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      if (response.status === 200) {
        console.log(response);
        const data = await response.json();
        setEmail("");
        setVerifyCode("");
        Toast.fire({
          icon: "success",
          title: data.message,
        });

        console.log("Navigating to /login");
        navigate("/superlogin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="super-admin-verify-main-container">
      <form className="super-admin-verify-form-container" onSubmit={verifyUser}>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Verify Code</h3>
        <div className="super-admin-verify-input-contaier">
          <label className="super-admin-verify-label-text">Email:</label>
          <input
            className="super-admin-verify-input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="super-admin-verify-input-contaier">
          <label className="super-admin-verify-label-text">Code:</label>
          <input
            type="text"
            className="super-admin-verify-input"
            name="code"
            value={code}
            onChange={(e) => {
              setVerifyCode(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="super-admin-verify-button">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SuperadminVerify;
