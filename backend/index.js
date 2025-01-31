import mongoose from "mongoose";
import express from "express";  
import router from './router/router.js'
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error", err));

app.use('/api',router)
app.get("/", async (req, res) => {
    return res.status(200).send("jai shree ram");
});

app.listen(process.env.PORT, () => console.log("Server connected"));