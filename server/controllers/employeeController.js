// Employee Controller
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import Employee from "../models/employeeModel.js";
import TimeSheet from '../models/timesheetModel.js';

// Function to handle employee login
export const employeeLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const validPassword = await bcrypt.compare(password, employee.password);

        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        
        // Generate a token
        const token = jwt.sign({ employeeId: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed', error });
    }
};


export const addTimeSheet = async (req, res) => {
    try {
      // Extract data from the request body
      const {
        employeeId,
        managerId,
        weekStartingDate,
        weekEndingDate,
        projects,
      } = req.body;
  console.log(req.body);
      // Create a new time sheet document
      const newTimeSheet = new TimeSheet({
        employeeId,
        managerId,
        weekStartingDate,
        weekEndingDate,
        projects,
      });
  
      // Save the new time sheet to the database
      await newTimeSheet.save();
  
      res.status(201).json({
        success: true,
        message: 'Time sheet added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add time sheet', error: error.message });
    }
  };

  export const getTimeSheets = async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      // Fetch time sheets for the specific employee without populating managerId
    const employeeTimeSheets = await TimeSheet.find({ employeeId });

    if (!employeeTimeSheets || employeeTimeSheets.length === 0) {
      return res.status(404).json({ message: 'No time sheets found for this employee' });
    }
      // Calculate the number of projects
    const numberOfProjects = employeeTimeSheets.reduce((acc, curr) => acc + curr.projects.length, 0);

    res.json({
      timeSheets: employeeTimeSheets,
      numberOfProjects
    });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch time sheets', error: error.message });
    }
  };
  
  
