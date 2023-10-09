import mongoose from "mongoose";
const statusChangeSchema = new mongoose.Schema(
  {
    currentStatus: {
      type: String,
      required: true,
      enum: ['Manufactured', 'Distributed', 'Retailed', 'Sold'],
    },
    updatedTime: { type: Date, required:true},
  },
  { _id: false } 
);


const productSchema = new mongoose.Schema({

  name: { type: String, required: true, unique:true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  MFG:{type:Date,required:true},
  status: [statusChangeSchema],
  
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
    required: true,
  },
  distributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
  },
  retailer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
  },
  
  
});
    

  export default mongoose.model('productData',productSchema)