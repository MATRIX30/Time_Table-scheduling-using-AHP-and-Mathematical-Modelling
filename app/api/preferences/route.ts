import dbConnect from "@/lib/dbConnect";
import Preference from "@/models/Prefernces";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const preferences = await Preference.find({});
    return NextResponse.json({ preferences }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req:Request){
  await dbConnect();

  try {
    const body = req.body
  } catch (error) {
    
  }
}