import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import Cookies from "js-cookie";
import "./index.css";

function CreateTask() {
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    deadline: "",
    startTime: "",
    responsiblePersonIds: [],
    observersPersonIds: [],
    projectlistIds: [],
  });
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  const [projectlist, setProjectList] = useState([]);

  const [visible, setVisible] = useState(false);

  const [responsiblePersons, setResponsiblePersons] = useState([]);
  const [observersPersons, setObserversPersons] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = Cookies.get("jwtToken");
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const api = `http://localhost:3009/api/v1/employeelist`;
  //     try {
  //       const response = await fetch(api, options);

  //       if (!response.ok) {
  //         throw new Error(`Request failed with status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log(data.results);
  //       setEmployees(data.results);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   const fetchProjectdata = async () => {
  //     const token = Cookies.get("jwtToken");
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const api = `http://localhost:3009/api/v1/getprojectlist`;
  //     try {
  //       const response = await fetch(api, options);

  //       if (!response.ok) {
  //         throw new Error(`Request failed with status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log(data.results);
  //       setProjects(data.results);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  //   fetchProjectdata();
  // }, []);
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
    const fetchprojects = async () => {
      const token = sessionStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const api = "http://localhost:3009/api/v1/getprojectlist";
      try {
        const response = await fetch(api, options);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        console.log(data,"projects")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchprojects();
    fetchData();
  }, []);

  const options = employees.map((employee) => ({
    id: employee.id,
    value: employee.id, // Replace 'name' with the field name from your employees array
    label: employee.fullName, // Replace 'name' with the field name from your employees array
  }));

  const projectoptions = projects.map((employee) => ({
    id: employee.id,
    value: employee.id, // Replace 'name' with the field name from your employees array
    label: employee.projectName, // Replace 'name' with the field name from your employees array
  }));

  const currentDate = new Date().toISOString().slice(0, 16);
  const maxTime = " 7:00 PM";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleSelect = (selectedOptions, type) => {
    const selectedIds = options
      .filter((item1) =>
        selectedOptions.some((item2) => item2.value === item1.value)
      )
      .map((item) => item.id);
    if (type === "responsiblePerson") {
      setResponsiblePersons(selectedOptions.map((option) => option.value));
      setFormData((prevFormData) => ({
        ...prevFormData,
        responsiblePersonIds: selectedIds,
      }));
    } else if (type === "observersperson") {
      setObserversPersons(selectedOptions.map((option) => option.value));
      setFormData((prevFormData) => ({
        ...prevFormData,
        observersPersonIds: selectedIds,
      }));
    } else if (type === "projectlist") {
      setProjectList(selectedOptions.map((option) => option.value));
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectlistIds: selectedIds,
      }));
    }
  };

  const handleAddTask = () => {
    const formattedDescription = formData.taskDescription.replace(
      /@(\w+)/g,
      (match, p1) => formData.responsiblePersonIds + p1
    );
    const token = Cookies.get("jwtToken");

    const backendUrl = "http://localhost:3009/api/v1/addtask";

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        taskDescription: formattedDescription,
        responsiblePersons: formData.responsiblePersonIds,
        observersPersons: formData.observersPersonIds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent to backend:", data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });

    setFormData({
      taskName: "",
      taskDescription: "",
      created: false,
      deadline: "",
      participants: false,
      observers: false,
      responsiblePersonIds: [],
      observersPersonIds: [],
      projectlistIds: [],
    });
  };

  return (
    <div className="create-task-input-main-container">
      <div className="create-task-input-container">
        <input
          type="text"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          className="create-task-input"
          placeholder="Enter Task Name"
        />
        <textarea
          name="taskDescription"
          value={formData.taskDescription}
          onChange={handleChange}
          placeholder="Enter Task description"
          className="create-task-input-description"
          rows="10"
        ></textarea>
        <div className="create-task-input-select-container">
          <label>Assigned To</label>
          <div className="responsible-person-input">
            <Select
              multi
              options={options}
              onChange={(selectedOptions) =>
                handleSelect(selectedOptions, "responsiblePerson")
              }
              placeholder="+Add"
              addPlaceholder="+Add"
              keepSelectedInList={true}
              value={responsiblePersons}
              dropdownHandle={true}
              className="select-multiple-inputs"
            />
          </div>
          <label>Observers</label>
          <div className="responsible-person-input">
            <Select
              multi
              options={options}
              onChange={(selectedOptions) =>
                handleSelect(selectedOptions, "observersperson")
              }
              placeholder="+Add"
              addPlaceholder="+Add"
              keepSelectedInList={true}
              value={observersPersons}
              dropdownHandle={true}
              className="select-multiple-inputs"
            />
          </div>
          <label>Project Name</label>
          <div className="responsible-person-input">
            <Select
              options={projectoptions}
              onChange={(selectedOptions) =>
                handleSelect(selectedOptions, "projectlist")
              }
              placeholder="+Add"
              addPlaceholder="+Add"
              keepSelectedInList={true}
              value={projectlist}
              dropdownHandle={true}
              className="select-multiple-inputs"
            />
          </div>
        </div>
        {formData.created && (
          <div>
            <label className="create-task-lable-select-container">
              Created by
            </label>
            <input
              type="text"
              name="created"
              value={formData.created}
              onChange={handleChange}
              className="create-task-input-select"
            />
          </div>
        )}
        {formData.participants && (
          <div>
            <label className="create-task-lable-select-container">
              Participants{" "}
            </label>
            <input
              type="text"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className="create-task-input-select"
            />
          </div>
        )}
        {formData.observers && (
          <div>
            <label className="create-task-lable-select-container">
              Observers
            </label>
            <input
              type="text"
              name="observers"
              value={formData.observers}
              onChange={handleChange}
              className="create-task-input-select"
            />
          </div>
        )}
        <div className="create-task-input-select-container">
          <label>Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="create-task-input-select"
            min={currentDate}
            max={`${currentDate.slice(0, 11)}${maxTime}`}
          />

          <label
            className="create-task-lable-container1"
            onClick={toggleVisibility}
          >
            Time Planning
          </label>
        </div>

        {visible && (
          <div className="create-task-main-input-select-container">
            <div className="craete-task-input-select-container">
              <label className="create-task-lable-select-container">
                Start task On
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                className="create-task-input-select"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {/* <div className="craete-task-status-select-container">
          <label>Task status summary</label>
          <label>
            <input
              type="checkbox"
              name="isChecked"
              checked={isChecked}
              onChange={handleChange}
            />
            Task status is Required
          </label>
        </div>
        <div className="craete-task-status-select-container">
          <GoChevronDown />
          <label>
            More (projects, Time tracking, Remind, Repeat, Gantt, CRM, Subtask,
            Tags, Fields){" "}
          </label>
        </div> */}
        <button onClick={handleAddTask} className="adding-task-button">
          Add Task
        </button>
      </div>
    </div>
  );
}

export default CreateTask;
