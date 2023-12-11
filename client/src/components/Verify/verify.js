import React, { useState, useEffect } from "react";
import "./verify.css";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [code, setVerifyCode] = useState("");

  const verifyUser = async () => {
    try {
      const response = await fetch("http://localhost:3009/api/v1/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email, code),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setEmail("");
      setVerifyCode("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="verify-main-container">
      <form className="verify-form-container" onSubmit={verifyUser}>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="code">Enter Verification code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">verify</button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
