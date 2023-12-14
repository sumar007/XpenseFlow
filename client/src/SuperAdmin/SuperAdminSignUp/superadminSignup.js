import React, { useState } from "react";
import "./superadminSignup.css";
import Toast from "../../components/utlis/toast";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";

const SuperadminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onClickButton = () => {
    navigate("/superlogin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackendError(null); // Clear any previous backend errors

    // Validate the form data
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = sessionStorage.getItem("token");
    // Construct the request object with the POST method and the request body as JSON
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify(formData),
    };
    console.log(formData);
    // Send the POST request using the fetch API
    fetch("http://localhost:3009/api/v1/superadminsignup", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            console.log(data.message);
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            navigate("/superadminverify");
          });
        } else {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
          throw new Error(`Failed with status: ${response.status}`);
        }
      })
      .then((data) => {})
      .catch(() => {
        setBackendError("");
      });
  };

  return (
    <>
      <Header />

      <div className="super-admin-signin-div-container">
        <div className="login-image-container">
          <img
            src="https://www.ascarii.com/hubfs/Optimised-customer-Service-v4.png"
            className="Login-image"
            alt=""
          />
        </div>
        <div className="super-admin-signin-form-main-container">
          <center>
            <h2 className="super-admin-signin-form-heading-container">
              SuperAdmin Signup
            </h2>
          </center>
          <form
            onSubmit={handleSubmit}
            className="super-admin-singin-form-container"
          >
            <div className="super-admin-signin-form-group-container">
              <label className="super-admin-singnin-form-lable-container">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="super-admin-signin-input-container"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="super-admin-signin-form-group-container">
              <label className="super-admin-singnin-form-lable-container">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="super-admin-signin-input-container"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="super-admin-signin-form-group-container">
              <label className="super-admin-singnin-form-lable-container">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="super-admin-signin-input-container"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            {backendError && <p className="error-message">{backendError}</p>}
            <center>
              <button
                className="super-admin-signin-form-button-container"
                type="submit"
              >
                Sign Up
              </button>
            </center>
          </form>
          <p onClick={onClickButton}>Already have an account login</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuperadminSignup;
