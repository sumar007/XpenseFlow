import mongoose from "mongoose";

const organizationPackageSchema = new mongoose.Schema({
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription", // Assuming your Subscription model is named Subscription
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization", // Assuming your Organization model is named Organization
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  noOfUsers: {
    type: Number,
    required: true,
  },
});

export const OrganizationPackage = mongoose.model("OrganizationPackage", organizationPackageSchema);
