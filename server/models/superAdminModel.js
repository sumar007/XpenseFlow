import mongoose from "mongoose";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

// User Schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    role: {
      type: String,
      enum: ['Employee', 'Manager', 'Admin'], // Example roles (modify as needed)
      default: 'Employee',
    },
  });
 
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};
 
 export const AdminModel = mongoose.model('Admin', userSchema);