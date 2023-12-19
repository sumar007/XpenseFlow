import { Organization } from "../models/organization.js";
import { OrganizationPackage } from "../models/organiztaionSubscription.js";
import { Subscription } from "../models/subscription.js";
import bcrypt from "bcrypt"; 

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

    console.log(req.body.packageId);

    let companyLogo = "";
    if (req.file) {
      companyLogo = req.file.filename;
    }

    // Step 1: Save the new organization
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
      password, // Plain password
      website,
      responsiblePerson,
      companyRegistrationNumber,
      packageId,
      companyLogo,
    });

    // Step 2: Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Step 3: Replace plain password with hashed password
    newOrganization.password = hashedPassword;

    // Step 4: Save the new organization with hashed password
    const savedOrganization = await newOrganization.save();

    // Step 5: Fetch subscription details based on packageId
    const subscriptionDetails = await Subscription.findById(packageId);

    // Step 6: Create and save the OrganizationPackage document
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + subscriptionDetails.convertedValidTime);

    const newOrganizationPackage = new OrganizationPackage({
      subscriptionId: packageId,
      organizationId: savedOrganization._id,
      startDate,
      endDate,
      status: 1,
      noOfUsers: subscriptionDetails.userCount,
    });

    await newOrganizationPackage.save();

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

export const getSpecificOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    res.json(organization);
  } catch (error) {
    console.error("Error fetching organization details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSpecificOrganization = async (req, res) => {
  console.log(req.params.id);
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrganization);
  } catch (error) {
    console.error("Error updating organization details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};