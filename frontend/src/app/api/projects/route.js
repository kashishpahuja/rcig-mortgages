import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import connectMongo from '@/lib/mongodb';
import Project from '@/models/Project';

// GET: Fetch all Projects
export async function GET() {
  try {
    await connectMongo();
    // Sort by the 'number' field so 01, 02, 03 are in order
    const projects = await Project.find().sort({ number: 1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Create or Update Project Text Data (JSON)
export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json(); // Read as JSON, not formData!

    // If an _id is provided, update the existing project
    if (body._id) {
      const { _id, ...updateData } = body;
      const updatedProject = await Project.findByIdAndUpdate(_id, updateData, { new: true });
      return NextResponse.json({ success: true, data: updatedProject });
    } 
    // If no _id is provided (like when seeding defaults or adding a new one), create it
    else {
      const newProject = await Project.create(body);
      return NextResponse.json({ success: true, data: newProject });
    }
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Replace image for an existing project (FormData)
export async function PUT(request) {
  try {
    await connectMongo();
    
    const formData = await request.formData();
    const file = formData.get('image');
    // FIX: Match the frontend key 'id' instead of 'projectId'
    const id = formData.get('id');

    if (!file || !id) {
      return NextResponse.json({ success: false, error: "Missing file or ID" }, { status: 400 });
    }

    // 1. Convert file to buffer and generate filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '-' + file.name.replace(/\s+/g, '_');
    
    // 2. Define the path in the public folder
    const uploadDir = path.join(process.cwd(), 'public/uploads/projects');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    
    // 3. Save the file locally
    await fs.writeFile(filePath, buffer);

    // 4. Create the public URL
    const imageUrl = `/uploads/projects/${filename}`;

    // 5. Update the Project document in MongoDB
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true } // Returns the updated document
    );

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Remove Project and its image file
export async function DELETE(request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const project = await Project.findById(id);
    if (!project) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    // Delete image from disk (only if it's an uploaded file, not a default image)
    if (project.image && project.image.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', project.image);
      try {
        await fs.unlink(filePath);
      } catch (e) {
        console.warn("File already missing from disk");
      }
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}