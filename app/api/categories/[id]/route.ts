import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Categories from "../../../models/Categories";
import dbConnect from "../../../lib/dbConnect";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();  

    console.log("Extracted ID:", id); 

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }


    await dbConnect();

    const category = await Categories.findById(id);
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
