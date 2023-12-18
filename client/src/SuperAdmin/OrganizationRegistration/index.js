import React, { useState, useEffect } from "react";
import "./index.css";
//import SideBar from "../SideBar/index.js";
import Cookies from "js-cookie";
import { json } from "react-router-dom";

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    description: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    companyEmail: "",
    password: "",
    website: "",
    responsiblePerson: "",
    companyRegistrationNumber: "",
    packageId: "",
  });
  const [companyLogo, setCompanyLogo] = useState("");
  const [packageList, setPackageList] = useState([]);
  console.log(formData.packageId, "venu");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "http://localhost:3009/api/v1/subscriptionlist"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPackageList(data.subscriptionList);
          setFormData({ ...formData, packageId: data.subscriptionList[0]._id }); // Assuming the backend returns an array of packages
        } else {
          console.error("Error fetching packages:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "called sai");
    setFormData({ ...formData, [name]: value });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setCompanyLogo(file); // Update the state with the selected file
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("_a_p_k");
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append("companyLogo", companyLogo);
    console.log(companyLogo);
    const options = {
      method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      body: form,
    };

    try {
      console.log(formData);
      const response = await fetch(
        "http://localhost:3009/api/v1/addorganization",
        options
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);
      } else {
        console.error("Error sending data to server:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* <SideBar /> */}
      <div className="organization-form-main-container">
        <form
          className="organization-form-sub-container"
          onSubmit={handleFormSubmit}
        >
          <h1 className="organization-form-main-heading">Organization Form</h1>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Organization Name
              </label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.organizationName}
                name="organizationName"
                placeholder="Enter Your Organization Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Industry</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.industry}
                name="industry"
                placeholder="Ex:IT,Medical"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">City</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.city}
                name="city"
                placeholder="Ex: Hyderbad, Bangalore"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">State</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.state}
                name="state"
                placeholder="Ex:Telangana"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Country</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.country}
                name="country"
                placeholder="Ex:India"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Address</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.address}
                name="address"
                placeholder="Ex:2-1/720,Hyderbad"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Postal Code
              </label>
              <input
                type="number"
                className="organization-form-input-text"
                value={formData.postalCode}
                name="postalCode"
                placeholder="Ex:500000"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Phone No</label>
              <input
                type="number"
                className="organization-form-input-text"
                value={formData.phone}
                name="phone"
                placeholder="Ex:9879879870"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Company Email
              </label>
              <input
                type="Email"
                className="organization-form-input-text"
                value={formData.companyEmail}
                name="companyEmail"
                placeholder="Ex:abc@company.com"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Website</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.website}
                name="website"
                placeholder="Ex:www.abc.com"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Create Password
              </label>
              <input
                type="password"
                className="organization-form-input-text"
                value={formData.password}
                name="password"
                placeholder="Enter Password"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Subscription Plan
              </label>
              <select
                className="organization-form-input-text"
                value={formData.packageId}
                name="packageId"
                onChange={handleSelectChange}
              >
                {packageList.map((eachPackage, index) => {
                  console.log(eachPackage._id);
                  return (
                    <option key={index} value={eachPackage._id}>
                      {eachPackage.subscriptionType}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* <div className="organization-form-input-container">
            <label className="organization-form-label-name">Website</label>
            <input
              type="text"
              className="organization-form-input-text"
              value={formData.website}
              name="website"
              placeholder="Ex:www.abc.com"
              onChange={handleInputChange}
            />
          </div> */}
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Responsible Person
              </label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.responsiblePerson}
                name="responsiblePerson"
                placeholder="Ex:Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Registration Number
              </label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.companyRegistrationNumber}
                name="companyRegistrationNumber"
                placeholder="Ex:Company registration number"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Company Logo
              </label>
              <input
                type="file"
                className="organization-form-input-text"
                placeholder="Ex:Logo"
                name="companyLogo"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Description
              </label>
              <textarea
                placeholder="Enter the description about the company"
                onChange={handleInputChange}
                cols={16}
                rows={3}
                name="description"
              />
            </div>
          </div>
          <div className="organization-form-submit-button-container">
            <button type="submit" className="organization-form-submit-button">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationForm;
