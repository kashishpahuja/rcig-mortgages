// src/models/Project.js
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  number: { type: String, required: true }, // e.g., "01"
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL to local file: /uploads/...
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);