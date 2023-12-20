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
      status: true,
      role: "Admin",
    });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    newOrganization.password = hashedPassword;

    const savedOrganization = await newOrganization.save();

    const subscriptionDetails = await Subscription.findById(packageId);

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(
      startDate.getDate() + subscriptionDetails.convertedValidTime
    );
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
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    // Get subscription details for the organization
    const organizationPackage = await OrganizationPackage.findOne({
      organizationId: organization._id,
    });
    // Assuming you want to include subscription details in the response
    const organizationDetails = {
      organization: organization.toObject(),
      subscriptionDetails: organizationPackage
        ? organizationPackage.toObject()
        : null,
    };
    console.log(organizationDetails);
    res.json(organizationDetails);
  } catch (error) {
    console.error("Error fetching organization details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSpecificOrganization = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      noOfUsers, // Make sure startDate and endDate are available in req.body
    } = req.body;
    // Update organization details
    const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // Update organization package details
    const updatedOrganizationPackage =
      await OrganizationPackage.findOneAndUpdate(
        { organizationId: req.params.id },
        { $set: { startDate, endDate, noOfUsers } },
        { new: true }
      );
    res.json({ updatedOrganization, updatedOrganizationPackage });
  } catch (error) {
    console.error("Error updating organization details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

};

export const updateStatusOfOrganization = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const organization = await Organization.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    return res.json(organization);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
