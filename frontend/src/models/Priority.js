// src/models/Priority.js
import mongoose from 'mongoose';

const PrioritySchema = new mongoose.Schema({
  number: { type: String, required: true }, // e.g., "01"
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL to local file: /uploads/...
  order: { type: Number, default: 0 } // To ensure they display in the correct sequence
}, { timestamps: true });

export default mongoose.models.Priority || mongoose.model('Priority', PrioritySchema);