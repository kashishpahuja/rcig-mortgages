import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import connectMongo from '@/lib/mongodb';
import Priority from '@/models/Priority';

// GET: Fetch all Priorities for the frontend
export async function GET() {
  try {
    await connectMongo();
    // Sort by the 'number' field (01, 02, 03, etc.)
    const priorities = await Priority.find().sort({ number: 1 });
    return NextResponse.json({ success: true, data: priorities });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Create or Update Priority Text Data (JSON)
export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json(); // Read as JSON, not formData!

    // If an _id is provided, update the existing priority
    if (body._id) {
      const { _id, ...updateData } = body;
      const updatedPriority = await Priority.findByIdAndUpdate(_id, updateData, { new: true });
      return NextResponse.json({ success: true, data: updatedPriority });
    } 
    // If no _id is provided (like when seeding defaults or adding a new one), create it
    else {
      const newPriority = await Priority.create(body);
      return NextResponse.json({ success: true, data: newPriority });
    }
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Replace image for an existing priority (FormData)
export async function PUT(request) {
  try {
    await connectMongo();
    
    const formData = await request.formData();
    const file = formData.get('image');
    const id = formData.get('id');

    if (!file || !id) {
      return NextResponse.json({ success: false, error: "Missing file or ID" }, { status: 400 });
    }

    // 1. Convert file to buffer and generate filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '-' + file.name.replace(/\s+/g, '_');
    
    // 2. Define the path in the public folder
    const uploadDir = path.join(process.cwd(), 'public/uploads/priorities');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    
    // 3. Save the file locally
    await fs.writeFile(filePath, buffer);

    // 4. Create the public URL
    const imageUrl = `/uploads/priorities/${filename}`;

    // 5. Update the Priority document in MongoDB
    const updatedPriority = await Priority.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true } // Returns the updated document
    );

    return NextResponse.json({ success: true, data: updatedPriority });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Remove Priority and its image file
export async function DELETE(request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const priority = await Priority.findById(id);
    if (!priority) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    // Delete image from disk (only if it's an uploaded file, not a default image)
    if (priority.image && priority.image.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', priority.image);
      try {
        await fs.unlink(filePath);
      } catch (e) {
        console.warn("File already missing from disk");
      }
    }

    await Priority.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}