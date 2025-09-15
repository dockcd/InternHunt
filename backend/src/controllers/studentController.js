// controllers/studentController.js
const StudentDetails = require("../models/StudentDetails");
const User = require("../models/User");

const studentController = {
  // Create student details
  createStudentDetails: async (req, res) => {
    try {
      const { name, register_number, email, department, semester, class_name, guide_email } = req.body;

      // 1. Ensure the email exists in the Users table and belongs to a student
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User with this email does not exist" });
      }
      if (user.role !== "student") {
        return res.status(400).json({ message: "This email does not belong to a student" });
      }

      // 2. Insert student details
      const studentDetails = await StudentDetails.create({
        name,
        register_number,
        email,
        department,
        semester,
        class_name,
        guide_email: guide_email || null,
      });

      res.status(201).json({
        message: "Student details saved successfully",
        data: studentDetails,
      });
    } catch (err) {
      console.error("Error saving student details:", err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  },

  // Get student details (self)
  getMyDetails: async (req, res) => {
    try {
      const student = await StudentDetails.findOne({
        where: { email: req.user.email },
      });

      if (!student) {
        return res.status(404).json({ message: "Student details not found" });
      }

      res.json(student);
    } catch (err) {
      console.error("Error fetching student details:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Update student details (self)
  updateDetails: async (req, res) => {
    try {
      const { name, department, semester, class_name } = req.body;

      const student = await StudentDetails.findOne({
        where: { email: req.user.email },
      });

      if (!student) {
        return res.status(404).json({ message: "Student details not found" });
      }

      await student.update({ name, department, semester, class_name });

      res.json({ message: "Details updated successfully", student });
    } catch (err) {
      console.error("Error updating student details:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = studentController;