import mongoose, {Document,Schema} from "mongoose";


export interface IUser extends Document{
    name:string;
    email:string;
    password?:string;
    id:string;
}

const UserSChema:Schema = new mongoose.Schema({
 name :{
    type:String,
    require:true
 },
 email :{
    type:String,
    require:true
 },
 password :{
    type:String,
    require:false
 },
})


const User = mongoose.models.User || mongoose.model<IUser>("User",UserSChema)

export default User;