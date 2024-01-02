import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Toast from "../../components/utlis/toast";

const TimeSheet = () => {
  const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const initialStartDate = new Date(2024, 1, 1); // Year, Month (0-indexed), Day
  const [startDate, setStartDate] = useState(initialStartDate);

  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([
    {
      // weekStartingDate: startDate,
      // weekEndingDate: new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000),
      project: projects[0],
      task: "",
      hours: [0, 0, 0, 0, 0, 0, 0],
      total: 0,
    },
  ]);
  const [timeSheetData, setTimeSheetData] = useState({
    weekStartingDate: startDate,
    weekEndingDate: new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000), // Assuming a week duration
    projects: data.map((item) => ({
      projectName: item.project,
      tasks: [
        {
          taskName: item.task,
          Monday: item.hours[0],
          Tuesday: item.hours[1],
          Wednesday: item.hours[2],
          Thursday: item.hours[3],
          Friday: item.hours[4],
          Saturday: item.hours[5],
          Sunday: item.hours[6],
        },
      ],
    })),
  });

  const fetchProjects = async () => {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const projectApi = "http://localhost:3009/api/v1/getprojects";
    try {
      const response = await fetch(projectApi, options);
      if (response.ok) {
        const fetchdata = await response.json();
        setProjects(fetchdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateWeekAfterOneWeek = () => {
    const today = new Date(); // Get today's date
    const oneWeekLater = new Date(startDate);
    oneWeekLater.setDate(startDate.getDate() + 7); // Set date one week later

    // If today is greater than or equal to the week ending date, update the start date
    if (today >= timeSheetData.weekEndingDate) {
      setStartDate(oneWeekLater);
    }
  };

  const getTimeSheeets = async () => {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = "http://localhost:3009/api/v1/getprojects";
  };

  useEffect(() => {
    fetchProjects();
    updateWeekAfterOneWeek();
  }, []);

  const handlePreviousWeek = () => {
    const prevWeek = new Date(startDate);
    prevWeek.setDate(startDate.getDate() - 7);
    setStartDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(startDate);
    nextWeek.setDate(startDate.getDate() + 7);
    setStartDate(nextWeek);
  };

  const handleAddRow = () => {
    setData([
      ...data,
      {
        // weekStartingDate: startDate,
        // weekEndingDate: new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000),
        project: projects[0].projectName,
        task: "",
        hours: [0, 0, 0, 0, 0, 0, 0],
        total: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleHoursChange = (projectIndex, dayIndex, value) => {
    const updatedData = [...data];
    updatedData[projectIndex].hours[dayIndex] = parseInt(value) || 0;
    updatedData[projectIndex].total = updatedData[projectIndex].hours.reduce(
      (acc, cur) => acc + cur,
      0
    );
    setData(updatedData);
  };

  const formattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedDayDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  // const handleSubmit = async (index) => {
  //   const rowData = data[index];

  // };

  const handleSubmit = async () => {
    const updatedProjects = data.map((item) => ({
      projectName: item.project,
      tasks: [
        {
          taskName: item.task,
          Monday: item.hours[0],
          Tuesday: item.hours[1],
          Wednesday: item.hours[2],
          Thursday: item.hours[3],
          Friday: item.hours[4],
          Saturday: item.hours[5],
          Sunday: item.hours[6],
        },
      ],
    }));
    const newTimeSheetData = {
      weekStartingDate: startDate,
      weekEndingDate: new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000),
      projects: updatedProjects,
    };
    setTimeSheetData(newTimeSheetData);
    const token = sessionStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTimeSheetData),
    };
    const postApi = "http://localhost:3009/api/v1/employee/addTimeSheet";
    try {
      const response = await fetch(postApi, options);
      if (response.ok) {
        console.log("time sheet added");
        Toast.fire({
          icon: "success",
          title: "Time sheet added succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tableHeaderStyle = {
    fontSize: "14px",
    textAlign: "center",
    padding: "8px",
    border: "1px solid #ddd",
    width: "9%",
    backgroundColor: "#B7EFEE",
  };

  const weekNavStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const navButtonStyle = {
    fontSize: "18px",
    margin: "0 10px",
  };

  const tableContainerStyle = {
    maxWidth: "100%", // Adjust this value as needed
    margin: "0 auto", // Center the table
    overflowX: "auto", // Enable horizontal scroll if needed
  };

  const tableInput = {
    width: "50%",
  };

  const tableSelectHead = {
    width: "15%",
  };

  const tableSelect = {
    width: "95%",
  };

  return (
    <div style={{ width: "100%" }}>
      <h1>Project Simple Time Sheet</h1>
      <div style={weekNavStyle}>
        <button onClick={handlePreviousWeek} style={navButtonStyle}>
          &lt;
        </button>
        <div>{formattedDate(startDate)}</div>
        <button onClick={handleNextWeek} style={navButtonStyle}>
          &gt;
        </button>
      </div>
      <div style={tableContainerStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableSelectHead}>Project</th>
              <th style={tableSelectHead}>Task</th>
              {days.map((day, index) => (
                <th key={day} style={tableHeaderStyle}>
                  {day}
                  <br />
                  {formattedDayDate(
                    new Date(
                      startDate.getFullYear(),
                      startDate.getMonth(),
                      startDate.getDate() + index
                    )
                  )}
                </th>
              ))}
              <th style={tableHeaderStyle}>Total</th>
              <th style={tableHeaderStyle}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={item.project}
                    style={tableSelect}
                    onChange={(e) => {
                      const updatedData = [...data];
                      updatedData[index].project = e.target.value;

                      setData(updatedData);
                    }}
                  >
                    {projects.map((option, optionIndex) => (
                      <option key={optionIndex} value={option.projectName}>
                        {option.projectName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={item.task}
                    style={tableSelect}
                    onChange={(e) => {
                      const updatedData = [...data];
                      updatedData[index].task = e.target.value;
                      setData(updatedData);
                    }}
                  />
                </td>
                {item.hours.map((hour, dayIndex) => (
                  <td key={dayIndex}>
                    <input
                      type="number"
                      value={hour}
                      style={tableInput}
                      onChange={(e) =>
                        handleHoursChange(index, dayIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
                <td>{item.total}</td>
                <td>
                  <button onClick={() => handleDeleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};

export default TimeSheet;
