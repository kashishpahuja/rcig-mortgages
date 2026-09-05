import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
candidateName: { type: String, default: "Manjit Bhondhi" },
  subtitle: { type: String, default: "Candidate for Mayor of Caledon" },
  description: { type: String, default: "Listening to residents. Supporting local businesses. Building a stronger future for Caledon." },
  contactNumber: { type: String, default: "Contact Campaign" },
}, { timestamps: true })

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);