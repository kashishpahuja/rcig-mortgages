// src/app/api/marquee/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import connectMongo from '@/lib/mongodb';
import Marquee from '@/models/Marquee';

// GET: Fetch all marquee images
export async function GET() {
  try {
    await connectMongo();
    const images = await Marquee.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Upload a new image locally and save to MongoDB
export async function POST(request) {
  try {
    await connectMongo();
    const formData = await request.formData();
    const file = formData.get('image'); // 'image' is the field name from frontend

    if (!file) {
      return NextResponse.json({ success: false, error: "No image provided" }, { status: 400 });
    }

    // 1. Prepare File Data
    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename to prevent spaces/weird characters
    const filename = Date.now() + '-' + file.name.replace(/\s+/g, '_');
    
    // 2. Define upload path (public/uploads directory)
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure directory exists (creates it if it doesn't)
    await fs.mkdir(uploadDir, { recursive: true });
    
    // 3. Write file to local disk
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // 4. Save URL to MongoDB
    const imageUrl = `/uploads/${filename}`;
    const newImage = await Marquee.create({
      imageUrl,
      altText: formData.get('altText') || "Campaign visual",
      order: formData.get('order') || 0
    });

    return NextResponse.json({ success: true, data: newImage });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Remove an image
export async function DELETE(request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const image = await Marquee.findById(id);
    if (!image) return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 });

    // Remove file from local disk
    const filePath = path.join(process.cwd(), 'public', image.imageUrl);
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.warn("File already deleted or missing from disk");
    }

    // Remove from DB
    await Marquee.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}