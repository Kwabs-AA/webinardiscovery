import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '../../models/User';
import dbConnect from '../../lib/dbConnect';


export async function POST(request: Request){
    const{name,email,password,confirmPassword}=await request.json();

    const isValidEmail =(email:string) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    if (!name||!email||!password||!confirmPassword){
        return NextResponse.json({message:"All fields are required"},{status:400})
    }
    if(!isValidEmail(email)){
        return NextResponse.json({message:"email is not in proper format"},{status:400})
    }
    if(password !==confirmPassword){
        return NextResponse.json({message:"Passwords do not match"},{status:400})

    }
    if (password.length>6){
        return NextResponse.json({message:"Password lenght must be greater than zero"},{status:400})
    }

    try{
        await dbConnect();
        console.log("Database connected successfully");


        const existingUser=await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"This User already exists"},{status:400})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            email,
            name,
            password:hashedPassword
        });

        await newUser.save();
        return NextResponse.json({message:"User Created"},{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Something wenwt wrong"})
    }

}


