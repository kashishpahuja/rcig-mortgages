// src/app/api/projects/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import connectMongo from '@/lib/mongodb';
import Project from '@/models/Project';

// GET: Fetch all Projects
export async function GET() {
  try {
    await connectMongo();
    const projects = await Project.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Create a new Project with Image Upload
export async function POST(request) {
  try {
    await connectMongo();
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ success: false, error: "Image is required" }, { status: 400 });
    }

    // 1. Save Image Locally
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '-' + file.name.replace(/\s+/g, '_');
    const uploadDir = path.join(process.cwd(), 'public/uploads/projects');
    
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // 2. Save Document to MongoDB
    const imageUrl = `/uploads/projects/${filename}`;
    const newProject = await Project.create({
      number: formData.get('number'),
      category: formData.get('category'),
      name: formData.get('name'),
      description: formData.get('description'),
      image: imageUrl,
      order: parseInt(formData.get('order') || '0', 10),
    });

    return NextResponse.json({ success: true, data: newProject });
  } catch (error) {
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

    const filePath = path.join(process.cwd(), 'public', project.image);
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.warn("File already missing from disk");
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}