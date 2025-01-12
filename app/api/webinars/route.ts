// app/api/webinars/route.ts
import dbConnect from "@/app/lib/dbConnect";
import Categories from "@/app/models/Categories"; // Assuming this is your model name
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get current date/time
    const currentDate = new Date();

    // Fetch all upcoming webinars (where date is in the future)
    const webinars = await Categories.find({
      date: { $gte: currentDate }
    }).sort({ date: 1 }); // Sort by date ascending

    return NextResponse.json(webinars, { status: 200 });
  } catch (error) {
    console.error("Error fetching webinars:", error);
    return NextResponse.json(
      { message: "Error fetching webinars" },
      { status: 500 }
    );
  }
}