// Express Routes

import express from 'express';
import { employeeLogin } from '../controllers/employeeController.js'; // Import your controller function

export const employeeRouter = express.Router();

// Route for employee login
employeeRouter.post('/employee/login', employeeLogin);


