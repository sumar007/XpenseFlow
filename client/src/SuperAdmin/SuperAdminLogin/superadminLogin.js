import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router
import "./superlogin.css";
import { IoCloseSharp } from "react-icons/io5";
import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import Toast from "../../components/utlis/toast";
import SuperadminSignup from "../SuperAdminSignUp/superadminSignup";
import Modal from "react-modal";

const SuperadminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [staff, setStaff] = useState(true);
  const [email, setEmail] = useState("");

  const [error, setError] = useState(""); // State variable for error message
  const navigate = useNavigate(); // Get access to the navigation history

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const customStyles = {
    content: {
      width: "40%",
      height: "50%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const forgotPassword = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    // Define the URL of your server's login endpoint
    const url = `http://localhost:3009/api/v1/superadminlogin`;

    // Create a JSON object with the form data
    const jsonData = {
      email: formData.email,
      password: formData.password,
    };

    // Make a POST request using the fetch API with JSON data
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify(jsonData), // Convert JSON object to string
    })
      .then((response) => {
        console.log(response.status, "status sai");
        if (response.status === 201) {
          response.json().then((data) => {
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            navigate("/superhome");

            // sessionStorage.setItem("token", data.token);
            // localStorage.setItem("role", data.role);
            // sessionStorage.setItem("role", data.role);
            // sessionStorage.setItem("sname", data.name);
            // setTimeout(() => {
            //   navigate("/customernavbar");

            //   if (data.role === "Admin") {
            //     navigate("/admin");
            //   } else if (data.role === "Label") {
            //     navigate("/labelOrders");
            //   } else if (data.role === "Dimension") {
            //     navigate("/dimensionorders");
            //   } else if (data.role === "Accountant") {
            //     navigate("/accountOrders");
            //   }
            // }, 100);
          });
        } else if (response.status === 400) {
          // Password required or incorrect
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
        } else {
          // Handle other status codes or error messages
          setError("Login failed");
        }
      })
      .catch((error) => {
        setError("Error occurred during login");
      });
  };

  const onClickStaff = () => {
    navigate("/signup");
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MTNjZjcwMTJmMmRhODY3ZDM1YjBiIiwiZW1haWwiOiJ2ZW51b2ZmY2FtcHVzQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MDI5Njk2ODUsImV4cCI6MTcwMjk3MzI4NX0.YZI__Sz2jGJMk7JyfJFSrlU_GepShZ9lirhgjj5yd_c token";

  const submitForgotEmail = async (event) => {
    event.preventDefault();
    alert("token has been sent to your email");
    try {
      // Create a request body with token and newPassword
      const requestBody = {
        email: email,
      };

      // Perform the POST request using fetch
      const response = await fetch(
        "http://localhost:3009/api/v1/super-admin-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check the response status
      if (response.ok) {
        // Handle success, maybe redirect the user to another page
        navigate("/super-forgot");
      } else {
        // Handle error cases, you can display an error message to the user
        console.error("Failed to reset password");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred:", error);
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {/* <Header /> */}
      <div className="super-admin-login-div-container">
        <div className="super-admin-login-form-main-container">
          {/* <div className="super-admin-login-staff-customer-button-container">
          <button className={activeStaffButton} onClick={onClickStaff}>Staff super-admin-login</button>
          <button className={activeCustomerButton} onClick={onClickCustomer}>
            Customer super-admin-login
          </button>
        </div> */}
          {staff ? (
            <>
              <div className="form-logo-container">
                <img
                  src="./logo xf.png"
                  alt="login-img"
                  className="super-admin-login-logo"
                />
                <h1 className="super-admin-login-first-heading">Login</h1>
              </div>

              <form
                onSubmit={handleSubmit}
                className="super-admin-login-form-container"
              >
                <div className="super-admin-login-form-group-container">
                  <label className="super-admin-login-form-label-text">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="super-admin-login-input-text"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="super-admin-login-form-group-container">
                  <label className="super-admin-login-form-label-text">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="super-admin-login-input-text"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <center>
                  <button
                    className="super-admin-login-form-button"
                    type="submit"
                  >
                    SIGN IN
                  </button>
                  {error && <p className="error-message">{error}</p>}{" "}
                  {/* Display error message */}
                </center>
              </form>
              {/* <p onClick={onClickStaff} className="super-admin-login-account">
                Don't have an account?
              </p> */}
              <p className="super-admin-login-account" onClick={forgotPassword}>
                forgot password ?
              </p>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <div className="super-forgot-modal-button-container">
                  <IoCloseSharp onClick={closeModal} className="close-button" />
                </div>
                <div className="super-forgot-modal-main-container">
                  <form
                    className="super-admin-forgot-form-container"
                    onSubmit={submitForgotEmail}
                  >
                    <div className="super-admin-login-form-group-container">
                      <label className="super-admin-login-form-label-text">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="super-admin-login-input-text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="super-forgot-button-container">
                      <button
                        className="super-admin-login-form-button"
                        type="submit"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>
            </>
          ) : (
            <SuperadminSignup />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuperadminLogin;
