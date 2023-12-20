// Employee Controller
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import Employee from "../models/employeeModel.js";

// Function to handle employee login
export const employeeLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        if (employee.password !== password) {
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
