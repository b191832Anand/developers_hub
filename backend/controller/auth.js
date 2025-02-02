import user from '../model/model.js';
import sendmail from '../sendmail.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import review from "../model/review.js"
dotenv.config()
const sign = async (req, res) => { 
    try {
        let { name, email, password,skills } = req.body;

        const exist = await user.findOne({ email: email });
        if (exist) {
            return res.status(400).send("User already exists");
        }

        const NewUser = new user({
            name: name,
            email: email,
            password: password,
            skills:skills
        });

        await NewUser.save();
        sendmail(email, "Thank you for logging in", `Mr ${name}, thank you for logging in to my app`);
        return res.status(200).send("User registered successfully");
    } catch (e) {
        console.error(e);
        return res.status(500).send("Error occurred while registering user");
    }
};
const login=async (req,res)=>{
    try{
         let {email,password}=req.body;
         const exist=await user.findOne({email:email});
         if(!exist){
            return res.status(400).send("User not found")
         }
         if(exist.password!==password){
            return res.status(400).send("Invalid Credentials")
         }
         const token=jwt.sign({id:exist.id},"1925112816",{expiresIn:'1d'})
         return res.status(200).json({token})
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Error occurred while registering user");
    }
}
const allprofile = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const profiles = await user.find({ _id: { $ne: currentUserId } });
        return res.status(200).json({profile:profiles});
    } catch (e) {
        console.error(e);
        return res.status(500).send("Error occurred while fetching profiles");
    }
};
const profile=async (req,res)=>{
    try{
         const id=await req.user.id;
         const exist=await user.findById(id);
         if(!exist){
            return res.status(400).send("not found")
         }
         return res.status(200).json({profile:exist});
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Error occurred while fetching profiles");
    }
}
const allreview=async (req,res)=>{
    try{
         const id=await req.user.id;
         const exist=await user.findById(id);
         const {to_id,rating}=req.body;
         const val=new review({
              name:exist.name,
              to_id:to_id,
              rating:rating
         })
         val.save();
         return res.status(200).send("review add succesfully")
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Error occurred while fetching profiles");
    }
}
const myreview=async (req,res)=>{
    try{
         const id=await req.user.id
         const exist=await review.find({to_id:id})
         if(!exist)return res.status(400).send("no rating")
        const val = exist.map((i) => ({
             from: i.name,
             rating: i.rating
        }));
         return res.status(200).json(val)
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Error occurred while fetching profiles");
    }
}
const alldata=async(req,res)=>{
    try{
         const exist =await review.find();
         return res.status(200).json({data:exist})
    }
    catch(e){
        return res.status(200).send("error")
    }
}

export {sign,login,allprofile,profile,allreview,myreview,alldata};