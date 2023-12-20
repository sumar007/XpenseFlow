import React, { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import Toast from "../../components/utlis/toast";

function SubscriptionDetailView(props) {
  const [formData, setFormData] = useState({
    subscriptionType: "",
    originalprice: "",
    mrpprice: "",
    userCount: "",
    validTime: "",
    timeUnit: "days",
    // features: "",
  });
  const id = props.subscriptionId;

  //   const [feature, setFeature] = useState("");

  //   const handleFeature = (e) => {
  //     setFeature(e.target.value);
  //   };

  //   const AddingFeature = () => {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       features: [...prevData.features, feature],
  //     }));
  //     setFeature("");
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const id = props.subscriptionId;
    const fetchSubscriptionDetails = async () => {
      try {
        // Retrieve the token from session storage
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3009/api/v1/subscription-plans/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          // Destructure and assign form data
          const {
            subscriptionType,
            originalprice,
            mrpprice,
            userCount,
            convertedValidTime, // Assuming this is the correct property name
            // features,
          } = data;

          // Update the state with the fetched subscription details
          setFormData({
            subscriptionType,
            originalprice,
            mrpprice,
            userCount,
            validTime: convertedValidTime, // Assuming this is the correct property name
            timeUnit: "days", // You might want to update this based on your data
            // features,
          });
        } else {
          console.error("Failed to fetch subscription details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSubscriptionDetails();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3009/api/v1/subscription-plans/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        props.setUpdateSub();
      } else {
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      {/* <SideBar /> */}
      <div className="subscription-form-main-container">
        <form
          className="subscripton-form-sub-container"
          onSubmit={handleSubmit}
        >
          <h1 className="subscription-form-heading">Subscription Form</h1>
          <div className="subscription-form-input-container">
            <label className="subscription-label-name">Subscription Type</label>
            <input
              type="text"
              className="subscription-form-input"
              name="subscriptionType"
              placeholder="ex: Silver,Gold"
              value={formData.subscriptionType}
              onChange={handleChange}
            />
          </div>
          <div className="subscription-form-input-container">
            <label className="subscription-label-name">Orginal Price</label>
            <input
              className="subscription-form-input"
              type="number"
              name="originalprice"
              placeholder="Enter the Original Price"
              value={formData.originalprice}
              onChange={handleChange}
            />
          </div>
          <div className="subscription-form-input-container">
            <label className="subscription-label-name">MRP Price</label>
            <input
              className="subscription-form-input"
              type="number"
              name="mrpprice"
              placeholder="Enter the MRP Price"
              value={formData.mrpprice}
              onChange={handleChange}
            />
          </div>
          <div className="subscription-form-input-container">
            <label className="subscription-label-name">Include Users</label>
            <input
              className="subscription-form-input"
              type="number"
              name="userCount"
              placeholder="Enter the user count"
              value={formData.userCount}
              onChange={handleChange}
            />
          </div>
          <div className="subscription-form-input-container">
            <label className="subscription-label-name">Valid Time</label>
            <div className="subscription-form-flex">
              <input
                type="number"
                className="subscription-form-input"
                name="validTime"
                value={formData.validTime}
                onChange={handleChange}
              />
              <select
                className="subscription-form-input"
                name="timeUnit"
                value={formData.timeUnit}
                onChange={handleChange}
              >
                <option>days</option>
                <option>months</option>
                <option>years</option>
              </select>
            </div>
            {/* <div className="subscription-form-input-container">
              <label className="subscription-label-name">Features</label>
              <div className="subscription-form-flex">
                <input
                  type="text"
                  className="subscription-form-input"
                  value={feature}
                  onChange={handleFeature}
                  placeholder="Add Features"
                />
                <button
                  className="subscription-submit-button"
                  onClick={AddingFeature}
                >
                  Add
                </button>
              </div>
            </div> */}
          </div>
          <button type="submit" className="subscription-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionDetailView;
