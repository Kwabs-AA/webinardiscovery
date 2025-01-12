import { NextResponse } from "next/server";
import Categories from "@/app/models/Categories";
import dbConnect from "@/app/lib/dbConnect";

export async function GET() {
    try {
        await dbConnect();
        
        // Get current date at the start of the day (midnight)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        // Find categories where date is greater than or equal to current date
        const categories = await Categories.find({
            date: { $gte: currentDate }
        }).sort({ date: 1 }); // Optional: sort by date ascending

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}