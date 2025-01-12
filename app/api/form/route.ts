import { NextResponse } from "next/server";
import Categories from "../../models/Categories";
import dbConnect from "../../lib/dbConnect";

export async function POST(request:Request){
    try{
        
    const{name,description,webinarlink,date,email,link} = await request.json();

    if(description.length<=15){
        return NextResponse.json("The description must have a length of at least 15 characters",{status:403})
    }
    if(webinarlink.length<=0){
        return NextResponse.json("Invalid Link",{status:403})
    }
    if(link.length<=0){
        return NextResponse.json("Invalid Link",{status:403})
    }

    await dbConnect();
   
        const category = new Categories({
        name,
        description,
        webinarlink,
        date,
        email,
        link,
    })

    
    await category.save();
    return NextResponse.json({message:"New upload received thank you"},{status:200})
    }
    catch(err:any){
        return NextResponse.json({"error":err.message},{status:500})
    }
}


  