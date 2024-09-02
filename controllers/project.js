const Project = require('../models/project');
const UserSchemaModel = require('../models/user'); // Ensure correct import
const { validationResult } = require('express-validator');
const {sendEmail } = require('../utils/emailService');
const sendSMS = require('../utils/smsService');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add a new project
exports.addProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, status, deadlineDate, createdDate, creatorName } = req.body;

  try {
    const newProject = new Project({
      name,
      status,
      deadlineDate,
      createdDate,
      creatorName,
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update project by ID
exports.updateProjectById = async (req, res) => {
  const projectId = req.params.id;
  const { name, status, deadlineDate, createdDate, creatorName } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, status, deadlineDate, createdDate, creatorName },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete project by ID
exports.deleteProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Assign users to project
exports.assignUsersToProject = async (req, res) => {
  const projectId = req.params.id;
  const { userIds } = req.body;

  try {
    const users = await UserSchemaModel.find({ _id: { $in: userIds } });

    if (users.length !== userIds.length) {
      return res.status(400).json({ message: 'Some users not found' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { assignedTo: userIds },
      { new: true }
    ).populate('assignedTo');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Send email and SMS notifications
    users.forEach(async (user) => {
      try {
        await sendEmail(user.email, 'Project Assignment', `You have been assigned to project ${updatedProject.name}.`);
        await sendSMS(user.mobile, `You have been assigned to project ${updatedProject.name}.`);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    });

    res.json(updatedProject);
  } catch (error) {
    console.error('Error assigning users to project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};