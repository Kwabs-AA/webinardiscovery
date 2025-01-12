import { NextResponse } from "next/server";
import Help from "@/app/models/Help";
import dbConnect from "@/app/lib/dbConnect";

export async function POST(req:Request){
   
    try{
    const{name,contact,complaint,link}= await req.json();

    if (isNaN(contact)){
       return NextResponse.json("The value entered is not a number",{status:403})
    }

    if(complaint.length<=3){
        return NextResponse.json("Enter a valid complaint",{status:403})
    }

    if(name.length<=5){
        return NextResponse.json("Enter a valid Name",{status:403})
    }

    await dbConnect();

    const help=new Help({
        name,
        contact,
        complaint,
        link
    })
    help.save()
    return NextResponse.json({staus:500})
    }
    catch(err:any){
        return NextResponse.json({"error":err.message},{status:500})
    }

}