const Internship = require('../models/Internship');

const internshipController = {
  // Add Internship
  addInternship: async (req, res) => {
    try {
      const { company_name, company_domain, location, work_type, role, company_address, duration, reference_contact,status, description } = req.body;
      const student_email = req.user.email;

      const internship = await Internship.create({
        student_email, company_name, company_domain, location, work_type, role, company_address, duration, reference_contact,status, description
      });

      res.status(201).json({ message: 'Internship added', internship });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to add internship", error: err.message });
    }
  },

  // Get My Internships
  getMyInternships: async (req, res) => {
    try {
      const internships = await Internship.findAll({
        where: { student_email: req.user.email }
      });
      res.json({ internships });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to fetch internships", error: err.message });
    }
  }
};

module.exports = internshipController;