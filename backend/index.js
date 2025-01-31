import mongoose from "mongoose";
import express from "express";  
import router from './router/router.js'
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config();
const app = express();

app.use(express.json());
const corsOption={
   origin:'*',
   methods:['GET,POST','PUT','DELETE'],
   allowedHeaders: ["Content-Type", "x-token"],

}
app.use(cors(corsOption))
mongoose
  .connect("mongodb+srv://anand:1925112816@cluster0.qm0ie67.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error", err));

app.use('/api',router)
app.get("/", async (req, res) => {
    return res.status(200).send("jai shree ram");
});

app.listen(5000, () => console.log("Server connected"));