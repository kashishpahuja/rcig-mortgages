import { NextResponse } from "next/server";
import connectMongo from "../../../lib/mongodb";
import Hero from "../../../models/Hero";

const defaultHero = {
  candidateName: "Manjit Bhondhi",
  subtitle: "Candidate for Mayor of Caledon",
  description:
    "Listening to residents. Supporting local businesses. Building a stronger future for Caledon.",
  contactNumber: "Contact Campaign", // or phone number/text
};

// GET
export async function GET() {
  try {
    await connectMongo();
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(defaultHero);
    }
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    let hero = await Hero.findOne();
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, body, { new: true });
    } else {
      hero = await Hero.create(body);
    }
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
