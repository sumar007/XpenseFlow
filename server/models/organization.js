import mongoose from "mongoose";
const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  industry: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  responsiblePerson: {
    type: String,
  },
  companyRegistrationNumber: {
    type: String,
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  companyLogo: {
    type: String,
  },
  status:{
    type: Boolean,
  }
});

export const Organization = mongoose.model("Organization", organizationSchema);

