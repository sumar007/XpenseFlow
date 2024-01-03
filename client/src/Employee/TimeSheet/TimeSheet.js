import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Toast from "../../components/utlis/toast";

const TimeSheet = () => {
  const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const initialStartDate = new Date(2024, 0, 1); // Year, Month (0-indexed), Day
  const [startDate, setStartDate] = useState(initialStartDate);

  const [projects, setProjects] = useState([]);
  const [timeSheets, setTimeSheets] = useState([]);
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
  const convertArrayOfObjects = (dataArray) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    console.log(dataArray);

    return dataArray.map((input) => {
      const hoursArray = Array(7).fill(0);
      input.tasks.forEach((task) => {
        daysOfWeek.forEach((day, index) => {
          if (task[day]) {
            hoursArray[index] += task[day];
          }
        });
      });

      return {
        project: input.projectName || "",
        task: input.tasks[0].taskName || "",
        hours: hoursArray,
        total: input.tasks[0].totalHours,
      };
    });
  };

  const getTimeSheeets = async () => {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = "http://localhost:3009/api/v1/employee/time-sheets";
    try {
      const response = await fetch(api, options);
      if (response.ok) {
        const data = await response.json();
        const formattedStartDate = formattedDate(startDate);
        const filteredTimeSheets = data.timeSheets.filter(
          (eachTimeSheet) =>
            formattedStartDate === eachTimeSheet.weekStartingDate
        );

        const inputDataArray = filteredTimeSheets[0].projects;
        const convertedArray = convertArrayOfObjects(inputDataArray);
        setData(convertedArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const filterTimeSheets = () => {
  //   const filterData = timeSheets.filter(
  //     (eachTimeSheet) => startDate === eachTimeSheet.weekStartingDate
  //   );
  //   console.log(filterData);
  //   // Perform operations with the filtered data here
  // };

  useEffect(() => {
    fetchProjects();
    updateWeekAfterOneWeek();
    getTimeSheeets();
  }, [startDate]);

  const handlePreviousWeek = async () => {
    const prevWeek = new Date(startDate);
    prevWeek.setDate(startDate.getDate() - 7);
    setStartDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(startDate);
    nextWeek.setDate(startDate.getDate() + 7);
    updateWeekAfterOneWeek();
    setStartDate(nextWeek);
  };
  useEffect(() => {
    getTimeSheeets(); // Call getTimeSheeets when startDate changes
  }, []);

  const handleAddRow = () => {
    setData([
      ...data,
      {
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
    return `${day}-${month}-${year}`;
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
      weekStartingDate: formattedDate(startDate),
      weekEndingDate: formattedDate(
        new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000)
      ),
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

  const tableSelect = {
    width: "95%",
  };

  return (
    <div style={{ width: "100%" }} className="time-sheet-main-container">
      <h4 style={{ textAlign: "center" }} className="time-sheet-heading">
        Add Time Sheet
      </h4>
      <div className="week-nav">
        <button onClick={handlePreviousWeek} className="nav-button ">
          &lt;
        </button>
        <div>{formattedDate(startDate)}</div>
        <button onClick={handleNextWeek} className="nav-button ">
          &gt;
        </button>
      </div>
      <div className="table-container">
        <table style={{ width: "95%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="table-select-head ">Project</th>
              <th className="table-select-head ">Task</th>
              {days.map((day, index) => (
                <th key={day} className="table-header">
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
              <th className="table-header">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={item.project}
                    className="table-select "
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
                      className="table-input"
                      onChange={(e) =>
                        handleHoursChange(index, dayIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
                <td>{item.total}</td>
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
