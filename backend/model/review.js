import mongoose from "mongoose";
const review =mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    to_id:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    }
})
const Review=mongoose.model("Review",review)
export default Review