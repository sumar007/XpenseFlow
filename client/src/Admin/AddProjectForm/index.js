import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./index.css";
import Select from "react-dropdown-select";

function AddProjectForm() {
  const [validated, setValidated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [data, updatedData] = useState({
    projectName: "",
    clientName: "",
    description: "",
    projectStatus: "",
    startDate: "",
    gitLink: "",
    liveUrl: "",
    devUrl: "",
    remarks: "",
    figmaUrl: "",
    status: "",
    prerequsites: "",
    priority: "",
    projectType: "",
    endDate: "",
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [managers, setManagers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const api = "http://localhost:3009/api/v1/getemployees";
      try {
        const response = await fetch(api, options);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(employees);

  // const options = employees.filter((employee) => ({
  //   id: employee._id,
  //   value: employee._id,
  //   label: employee.fullName,
  // }));

  // const options1 = employees.filter((employee) => ({
  //   id: employee._id,
  //   value: employee._id,
  //   label: employee.fullName,
  // }));

  const options = employees
    .filter((employee) => employee.roleName === "employee") // Assuming email is the property you want to use
    .map((employee) => ({
      value: employee._id,
      id: employee._id,
      label: employee.fullName,
    }));

  const options1 = employees
    .filter((employee) => employee.roleName === "manager") // Assuming roleName is the property you want to use
    .map((employee) => ({
      value: employee._id,
      id: employee._id,
      label: employee.fullName,
    }));

  console.log(options, options1);
  console.log(options, options1);

  const change = (event) => {
    updatedData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    console.log(data, teamMembers, managers);
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    const apiurl = "http://localhost:3009/api/v1/addproject";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, teamMembers, managers }),
    };

    try {
      const response = await fetch(apiurl, options);
      console.log(response);
      if (response.ok === true) {
        const responseData = await response.json();
        console.log("api worked", responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (selectedOptions, type) => {
    const selectedNames = selectedOptions.map((option) => option.value);
    if (type === "teamMembers") {
      setTeamMembers(selectedNames);
    } else if (type === "managers") {
      setManagers(selectedNames);
    }
  };

  console.log(teamMembers, managers, "saicharan");

  return (
    <div className="totalContainer">
      <div className="formContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="heading mb-2">Add Project</h2>
            </div>
          </div>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <label htmlFor="validationCustom01" className="bootstraplabel">
                Project Name
              </label>
              <Form.Control
                required
                onChange={change}
                type="text"
                name="projectName"
                placeholder="Enter Your Project Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <label htmlFor="validationCustom02" className="bootstraplabel">
                Project Deadline
              </label>
              <Form.Control
                className="input"
                required
                type="date"
                name="endDate"
                onChange={change}
                placeholder="Enter Your DeadLine"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <label htmlFor="validationCustom05" className="bootstraplabel">
                Start Date
              </label>
              <Form.Control
                type="date"
                name="startDate"
                onChange={change}
                placeholder="Enter Your Start Date"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Start Date.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <label htmlFor="validationCustom03" className="bootstraplabel">
                Client Name
              </label>
              <Form.Control
                required
                type="text"
                name="clientName"
                onChange={change}
                placeholder="Enter Your Module Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <label htmlFor="validationCustom05" className="bootstraplabel">
                Project Status
              </label>
              <Form.Select
                name="projectStatus"
                required
                onChange={change}
                aria-label="Default select example"
              >
                <option>Project Status</option>
                <option value="progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="working">Working</option>
                <option value="complete">Complete</option>
                <option value="testingbyclient">Testing by Client</option>
                <option value="review">In Review</option>
                <option value="testing">In Testing</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom06">
              <label className="bootstraplabel" htmlFor="validationCustom06">
                Status
              </label>
              <Form.Select
                name="status"
                required
                onChange={change}
                aria-label="Default select example"
              >
                <option>Project Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid status.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom07">
              <label className="bootstraplabel" htmlFor="validationCustom07">
                Project Type
              </label>
              <Form.Control
                name="projectType"
                onChange={change}
                type="text"
                placeholder="Ecommerce/Application"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide type.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                Git Repository
              </label>
              <Form.Control
                type="text"
                name="gitLink"
                onChange={change}
                placeholder="Paste Your Git link"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Link.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom09">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                Live Url
              </label>
              <Form.Control
                type="text"
                name="liveUrl"
                onChange={change}
                placeholder="Paste Your Project Live url"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Link.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom10">
              <label className="bootstraplabel" htmlFor="validationCustom09">
                Completion Status in %
              </label>
              <Form.Control
                type="text"
                name="completionStatus"
                onChange={change}
                placeholder="Enter Your Completion Status"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Completion Status.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom11">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                Dev Url
              </label>
              <Form.Control
                type="text"
                name="devUrl"
                onChange={change}
                placeholder="Paste Your Deveopment url"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Link.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom12">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                Figma URL
              </label>
              <Form.Control
                type="text"
                name="figmaUrl"
                onChange={change}
                placeholder="Paste Your figma url"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Link.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom13">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                Remarks
              </label>
              <Form.Control
                type="text"
                name="remarks"
                onChange={change}
                placeholder="Type your Remark"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide remarks.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom14">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                Prerequsites/Technologies
              </label>
              <Form.Control
                type="text"
                name="prerequsites"
                onChange={change}
                placeholder="Enter Technologies"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide remarks.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom15">
              <label className="bootstraplabel" htmlFor="validationCustom04">
                Description
              </label>
              <Form.Control
                required
                type="textarea"
                name="description"
                onChange={change}
                placeholder="Enter Your Description"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom17">
              <label htmlFor="validationCustom17" className="bootstraplabel">
                Priority
              </label>
              <Form.Select
                name="priority"
                required
                onChange={change}
                aria-label="Priority select example"
              >
                <option>Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div>
            <div className="container">
              <div className="row">
                <div className="col-3 p-0">
                  <div className="add-project-container">
                    <label className="bootstraplabel">Team Members</label>
                    <div className="responsible-person-input">
                      <Select
                        multi
                        options={options}
                        onChange={(selectedOptions) =>
                          handleSelect(selectedOptions, "teamMembers")
                        }
                        placeholder="+Add"
                        addPlaceholder="+Add"
                        keepSelectedInList={true}
                        value={teamMembers}
                        dropdownHandle={true}
                        className="select-multiple-inputs"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 p-0">
                  <div className="add-project-container">
                    <label className="bootstraplabel">Project Manager</label>
                    <div className="responsible-person-input">
                      <Select
                        multi
                        options={options1}
                        onChange={(selectedOptions) =>
                          handleSelect(selectedOptions, "managers")
                        }
                        placeholder="+Add"
                        addPlaceholder="+Add"
                        keepSelectedInList={true}
                        value={managers}
                        dropdownHandle={true}
                        className="select-multiple-inputs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button type="submit" className="mt-2">
              Submit form
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddProjectForm;
