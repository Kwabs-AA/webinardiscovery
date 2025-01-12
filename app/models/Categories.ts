import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document{
    name:string,
    description:string,
    email:string
    webinarlink:string,
    date:Date,
    link:string,
}



const CategoriesSchema:Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    webinarlink:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    link:{
        type:String,
        required:true
    }
    
})

const Categories= mongoose.models.Categories || mongoose.model<IProduct>('Categories',CategoriesSchema)

export default Categories;