import dbConnect from "@/lib/dbConnect";
import Preference from "@/models/Prefernces";
import { NextResponse } from "next/server";

// GET request to fetch all preferences
export async function GET() {
  await dbConnect();

  try {
    const preferences = await Preference.find({});
    return NextResponse.json({ preferences }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST request to create a new preference
export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newPreference = new Preference(body);
    await newPreference.save();
    return NextResponse.json({ preference: newPreference.toJSON() }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT request to update a preference
export async function PUT(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedPreference = await Preference.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPreference) {
      return NextResponse.json({ error: "Preference not found" }, { status: 404 });
    }
    return NextResponse.json({ preference: updatedPreference.toJSON()}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE request to delete a preference
export async function DELETE(req: Request) {
  await dbConnect();

  try {
    const { id } = await req.json();
    const deletedPreference = await Preference.findByIdAndDelete(id);
    if (!deletedPreference) {
      return NextResponse.json({ error: "Preference not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Preference deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
