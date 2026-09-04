// src/app/api/about/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import About from '@/models/About';

// GET: Fetch the About data
export async function GET() {
  try {
    await connectMongo();
    // Fetch the first document (we only need one config document for the homepage)
    let aboutData = await About.findOne();
    
    // If it doesn't exist yet, create a default one
    if (!aboutData) {
      aboutData = await About.create({});
    }

    return NextResponse.json({ success: true, data: aboutData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Update the About data
export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    
    // Update the existing document or create it if it doesn't exist
    const updatedAbout = await About.findOneAndUpdate(
      {}, // Empty filter matches the first document
      body,
      { new: true, upsert: true } // Upsert creates it if missing
    );

    return NextResponse.json({ success: true, data: updatedAbout });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}