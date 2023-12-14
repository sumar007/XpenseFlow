import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriptionType: {
      type: String,
      required: true,
      unique: true,
    },
    originalprice: {
      type: Number,
      required: true,
    },
    mrpprice: {
      type: Number,
      required: true,
    },
    userCount: {
      type: Number,
      required: true,
    },
    convertedValidTime: {
      type: Number,
      required: true,
    },
    features: {
      type: [String], // Array of features
      default: [],
    },
  });
  
  export const Subscription = mongoose.model("Subscription", subscriptionSchema);
  