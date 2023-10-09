import mongoose from "mongoose";
import 'dotenv/config.js'


const connect = async() => {
   mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } 

export default connect