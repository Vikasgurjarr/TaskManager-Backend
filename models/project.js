const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'notStarted'], default: 'notStarted' },
  deadlineDate: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  creatorName: { type: String, required: true },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'user_collection' }] // Reference to UserSchemaModel
});

const Project = mongoose.model('Projects_collection', projectSchema); // Use 'Projects_collection' as the model name
module.exports = Project;
