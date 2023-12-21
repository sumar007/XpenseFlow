import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./index.css";
import Cookies from "js-cookie";
import Toast from "../utlis/toast";

function EmployeeDetail() {
  let id = "6582c0152a154b3bf70a912b";
  const [validated, setValidated] = useState(false);
  const [roles, setRoles] = useState([]);
  const [profilePic, setprofilePic] = useState("");
  const [data, updatedData] = useState({
    email: "",
    fullName: "",
    roleId: "",
    joinDate: "",
    phoneNumber: "",
    address: "",
    employeeID: "",
    socialMediaProfile: "",
  });

  const change = (event) => {
    updatedData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  console.log(data.roleId);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setprofilePic(file);
  };

  const getEmployeeDetails = async () => {
    const token = sessionStorage.getItem("token");
    const apiurl = `http://localhost:3009/api/v1/getemployeedetails/${id}`;

    try {
      const response = await fetch(apiurl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const employeeData = await response.json();
        console.log(employeeData.data.socialMediaProfile, "socialMediaProfile");
        const formattedJoinDate = new Date(employeeData.data.joinDate)
          .toISOString()
          .split("T")[0];

        console.log(employeeData.data);
        updatedData({
          email: employeeData.data.email,
          fullName: employeeData.data.fullName,
          roleId: employeeData.data.roleId,
          joinDate: formattedJoinDate,
          phoneNumber: employeeData.data.phoneNumber,
          address: employeeData.data.address,
          employeeID: employeeData.data.employeeID,
          socialMediaProfile: employeeData.data.socialMediaProfile,
        });
      } else {
        console.error("Failed to fetch employee details");
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

 
const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    const form = event.currentTarget;
    const formData = new FormData();
  
    // Append data fields to the FormData object
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // Append the profilePic to FormData
    formData.append("profilePic", profilePic);
  
    const apiurl = `http://localhost:3009/api/v1/updateemployeedetails/${id}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,  // Use the FormData directly as the body
    };
  
    try {
      const response = await fetch(apiurl, options);
      if (response.ok === true) {
        const responseData = await response.json();
        console.log("Employee details updated:", responseData);
        getEmployeeDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = "http://localhost:3009/api/v1/getUserRole";
        const token = sessionStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(api, options);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setRoles(data.userRoles);
        updatedData({ ...data, roleId: data.userRoles[0]._id });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    getEmployeeDetails();
  }, []);

  return (
    <div className="totalContainer">
      <div className="formContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="heading">Add employee</h2>
            </div>
          </div>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <label htmlFor="validationCustom03" className="bootstraplabel">
                email
              </label>
              <Form.Control
                required
                value={data.email}
                type="text"
                name="email"
                onChange={change}
                placeholder="Enter Your E-Mail"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom09">
              <label className="bootstraplabel" htmlFor="validationCustom09">
                fullName
              </label>
              <Form.Control
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={change}
                placeholder="Enter Your Full Name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <label htmlFor="validationCustom05" className="bootstraplabel">
                joinDate
              </label>
              <Form.Control
                type="date"
                name="joinDate"
                onChange={change}
                value={data.joinDate}
                placeholder="Enter Your Join Date"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Start Date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom07">
              <label className="bootstraplabel" htmlFor="validationCustom07">
                Role
              </label>
              <Form.Select name="roleId" value={data.roleId}  onChange={change} required>
                {roles.map((each, index) => (
                  <option value={each._id}>{each.RoleName}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide type.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                socialMediaProfile
              </label>
              <Form.Control
                type="text"
                value={data.socialMediaProfile}
                name="socialMediaProfile"
                onChange={change}
                placeholder="Paste Your Linkdin link"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Link.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                employeeID
              </label>
              <Form.Control
                type="text"
                name="employeeID"
                value={data.employeeID}
                onChange={change}
                placeholder="Enter Your Employee Id"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Id
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                address
              </label>
              <Form.Control
                type="text"
                name="address"
                value={data.address}
                onChange={change}
                placeholder="Enter Your Address"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Data.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                phoneNumber
              </label>
              <Form.Control
                type="number"
                value={data.phoneNumber}
                name="phoneNumber"
                onChange={change}
                placeholder="Paste Your figma url"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                profilePic
              </label>
              <Form.Control
                type="file"
                name="profilePic"
                onChange={handleProfilePicChange}
                // Remove the 'value' prop
                // value={profilePic}  // This line should be removed
                placeholder="Type your Remark"
                required
              />

              <Form.Control.Feedback type="invalid">
                Please provide Your Image.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EmployeeDetail;
