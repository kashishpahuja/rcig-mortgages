// src/models/Marquee.js
import mongoose from 'mongoose';

const MarqueeSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // e.g., "/uploads/image.webp"
  altText: { type: String, default: "Campaign visual" },
  order: { type: Number, default: 0 } // Useful if you want to sort them later
}, { timestamps: true });

export default mongoose.models.Marquee || mongoose.model('Marquee', MarqueeSchema);