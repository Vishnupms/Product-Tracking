import mongoose from "mongoose";

const connect = async() => {
   mongoose.connect('mongodb://127.0.0.1/product', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } 

export default connect