import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import dbConnect from "@/app/lib/dbConnect";

export async function POST(request: Request) {
    try {
        const { name, email, password, confirmPassword } = await request.json();

        // Helper function for email validation
        const isValidEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Check for missing fields
        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { message: "Email is not in proper format" },
                { status: 400 }
            );
        }

        // Validate name
        if (name.trim().length < 2) {
            return NextResponse.json(
                { message: "Name must be at least 2 characters long" },
                { status: 400 }
            );
        }

        // Validate passwords
        if (password !== confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password length must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Connect to the database
        await dbConnect();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "This user already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Server error, please try again later" },
            { status: 500 }
        );
    }
}
