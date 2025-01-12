import mongoose, { Schema } from "mongoose";


export interface IProduct extends Document{
    name:string,
    contact:string,
    complaint:string,
    link:string
}
const HelpSchema:Schema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
    },
    complaint:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:false
    }
})

const Help=mongoose.models.Help || mongoose.model<IProduct>('Help',HelpSchema)

export default Help;