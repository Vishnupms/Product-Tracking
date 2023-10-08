import mongoose from "mongoose";
const statusChangeSchema = new mongoose.Schema(
  {
    currentStatus: {
      type: String,
      enum: ['Manufactured', 'Distributed', 'Retailed', 'Sold'],
      default: "Manufactured",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Specify _id: false here to disable _id generation for this subdocument
);


const productSchema = new mongoose.Schema({

    name: { type: String, required: true, unique:true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isInStock:{type:Boolean, default:true},
    status:[statusChangeSchema],
   manufacturer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userData",
    required:true 
   },
   distributor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userData",
   },
   retailer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userData",

   },
   customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userData",
   }
    
    
  });

  export default mongoose.model('productData',productSchema)