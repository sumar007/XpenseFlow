import { Organization } from "../models/organization.js";

export const addOrganization = async (req, res) => {
  try {
    const {
      organizationName,
      description,
      industry,
      address,
      city,
      state,
      country,
      postalCode,
      phone,
      companyEmail,
      password,
      website,
      responsiblePerson,
      companyRegistrationNumber,
      packageId,
    } = req.body;
    console.log(req.body);

    const companyLogo = req.file.filename
    const newOrganization = new Organization({
      organizationName,
      description,
      industry,
      address,
      city,
      state,
      country,
      postalCode,
      phone,
      companyEmail,
      password,
      website,
      responsiblePerson,
      companyRegistrationNumber,
      packageId,
      companyLogo
    });
    await newOrganization.save();
    res.status(201).json("Successfully added organization");
  } catch (error) {
    console.error("Error adding organization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrganizationList = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    console.error("Error fetching organization data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
