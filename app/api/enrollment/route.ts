import dbConnect from "@/app/lib/dbConnect";
import Enrollment from "@/app/models/Enrollment";
import Categories from "@/app/models/Categories";
import { NextRequest, NextResponse } from "next/server";

// Handle POST request for enrolling a user in a webinar
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Get data from the request body
    const { webinarId, email } = await request.json();

    // Validate input
    if (!webinarId || !email) {
      return NextResponse.json(
        { message: "Webinar ID and email are required" },
        { status: 400 }
      );
    }

    // Fetch webinar details
    const webinar = await Categories.findById(webinarId);
    if (!webinar) {
      return NextResponse.json(
        { message: "Webinar not found" },
        { status: 404 }
      );
    }

    // Check if the webinar date is valid
    const webinarDate = new Date(webinar.date);
    if (isNaN(webinarDate.getTime())) {
      return NextResponse.json({ message: "Invalid webinar date" }, { status: 400 });
    }

    // Check if the webinar is in the future
    const currentDate = new Date();
    if (webinarDate < currentDate) {
      return NextResponse.json(
        { message: "Cannot enroll in past webinars" },
        { status: 400 }
      );
    }

    // Check if the user is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      webinarId,
      email,
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "Already enrolled in this webinar" },
        { status: 409 }
      );
    }

    // Create new enrollment
    const enrollment = new Enrollment({
      webinarId,
      email,
    });

    await enrollment.save();

    return NextResponse.json(
      { message: "Successfully enrolled in webinar" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error enrolling in webinar:", error);
    return NextResponse.json(
      { message: "Error enrolling in webinar" },
      { status: 500 }
    );
  }
}

// Handle GET request to get all enrollments for a user by email
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Extract email from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Fetch enrollments for the user and populate webinar details
    const enrollments = await Enrollment.find({ email })
      .populate("webinarId") // Populate the webinar details from the Categories model
      .sort({ enrollmentDate: -1 }); // Sort by most recent enrollment

    // Check if any enrollments exist
    if (enrollments.length === 0) {
      return NextResponse.json(
        { message: "No enrollments found" },
        { status: 404 }
      );
    }

    return NextResponse.json(enrollments, { status: 200 });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { message: "Error fetching enrollments" },
      { status: 500 }
    );
  }
}
