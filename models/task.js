const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  },
  comments: [{
    type: String
  }]
});

module.exports = mongoose.model('Task', TaskSchema);