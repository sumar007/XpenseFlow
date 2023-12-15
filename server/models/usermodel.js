import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

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
      enum: ['Admin', 'Manager', 'User'],
      default: 'User' // Example default value for the role
    },
  });
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

export default User;
