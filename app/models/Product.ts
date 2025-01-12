import mongoose, {Document,Schema} from 'mongoose';

export interface IProduct extends Document{
    name:string;
    price:number;
    description:string;
}

const productSchema:Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:Number,
        
    }
});

const Product= mongoose.models.Product ||mongoose.model<IProduct>('Product',productSchema);

export default Product;