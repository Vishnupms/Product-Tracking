import mongoose from "mongoose";



const productSchema = new mongoose.Schema({

    name: { type: String, required: true, unique:true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    MFG:{type:Date,required:true},
    currentStatus:{
      type:String,
      enum:['Manufactured', 'Distributed', 'Retailed', 'Sold'],
      default:"Manufactured",
      required:true
    },
   manufacturer:{
    name:{type:String,required:true},
    location:String,
    email:String,
    manufacturedDate: Date
   },
   distributor:{
    name:String,
    location:String,
    email:String,
    distributedDate:Date,
   },
   retailer:{
    name:String,
    location:String,
    email:String,
    retailedDate:Date,

   },
   customer:{
    name:String,
    location:String,
    email:String,
    phone:Number,
    soldDate:Date,
   }
    
    
  });

  export default mongoose.model('productData',productSchema)