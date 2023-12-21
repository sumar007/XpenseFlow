import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: String,
  clientName: String,
  description: String,
  projectStatus: String,
  startDate: Date,
  gitLink: String,
  liveUrl: String,
  devUrl: String,
  remarks: String,
  figmaUrl: String,
  status: String,
  prerequsites: String,
  priority: String,
  projectType: String,
  endDate: Date,
  teamMembers: [String],
  managers: [String],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
