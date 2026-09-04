// src/models/About.js
import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  slogan: { type: String, default: "Experienced Leadership for a Growing Caledon" },
  title: { type: String, default: "About" },
  candidateName: { type: String, default: "Manjit Singh Bhondhi" },
  biographyParagraphs: { type: [String], default: [] },
  visionTitle: { type: String, default: "My Vision for the Future of Caledon" },
  visionStatement: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.About || mongoose.model('About', AboutSchema);