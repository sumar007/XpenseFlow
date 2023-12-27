import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import './TimeSheetForm.css';

const TimeSheetForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    project: '',
    manager: '',
    notes: '',
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
  });

  const [projects, setProjects] = useState([]);
  const [managers, setEmployees] = useState([]);
  const [organizationId, setOrganizationId] = useState('');

  useEffect(() => {
    const fetchOrganizationId = async () => {
      const token = sessionStorage.getItem('token');
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const api = 'http://localhost:3009/api/v1/getorganizationId'; // Replace with your endpoint to get organization ID
      try {
        const response = await fetch(api, options);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setOrganizationId(data[0]); // Assuming the organization ID is in the first element of the response array
        }
      } catch (error) {
        console.error('Error fetching organization ID:', error);
      }
    };

    fetchOrganizationId();
  }, []);

  useEffect(() => {
    if (organizationId) {
      const fetchData = async () => {
        const token = sessionStorage.getItem('token');
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const employeeApi = `http://localhost:3009/api/v1/employeelist/${organizationId}`;
        const projectApi = 'http://localhost:3009/api/v1/getprojects';
        try {
          const [employeesResponse, projectsResponse] = await Promise.all([
            fetch(employeeApi, options),
            fetch(projectApi, options),
          ]);

          if (!employeesResponse.ok) {
            throw new Error(`Request failed with status: ${employeesResponse.status}`);
          }
          const employeesData = await employeesResponse.json();
          setEmployees(employeesData.employees);

          if (!projectsResponse.ok) {
            throw new Error(`Request failed with status: ${projectsResponse.status}`);
          }
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [organizationId]);

  // Rest of your component logic


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleHoursChange = (event, day) => {
    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      hours: {
        ...prevData.hours,
        [day]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3009/api/v1/employee/addTimeSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Time sheet added successfully!', data);
        // Reset the form after successful submission
        setFormData({
          date: '',
          project: '',
          manager: '',
          notes: '',
          hours: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
          },
        });
      } else {
        console.error('Failed to add time sheet', data);
        // Handle error states or display error messages
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other issues
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>
      <label>
        Project Name:
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          placeholder="Enter Project Name"
          required
        />
      </label>
      <label>
        Project:
        <select
  name="project"
  value={formData.project}
  onChange={handleChange}
  required
>
  <option value="">Select Project</option>
  {Array.isArray(projects) &&
    projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.projectName}
      </option>
    ))}
</select>

<select
  name="manager"
  value={formData.manager}
  onChange={handleChange}
  required
>
  <option value="">Select Manager</option>
  {Array.isArray(managers) &&
    managers.map((manager) => (
      <option key={manager.id} value={manager.id}>
        {manager.fullName}
      </option>
    ))}
</select>

      </label>

      <label>
        Hours Worked:
        <div>
          {Object.keys(formData.hours).map((day) => (
            <div key={day}>
              <label>
                {day.charAt(0).toUpperCase() + day.slice(1)}:
                <input
                  type="number"
                  name={day}
                  value={formData.hours[day]}
                  onChange={(e) => handleHoursChange(e, day)}
                  placeholder={`Enter hours for ${day}`}
                  required
                />
              </label>
            </div>
          ))}
        </div>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TimeSheetForm;
