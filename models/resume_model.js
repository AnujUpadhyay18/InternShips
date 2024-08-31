
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  resume: {
    data: Buffer,
    contentType: String
  }
});

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;
