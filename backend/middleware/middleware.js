import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const middleware = async (req, res, next) => {
    try {
        const token = req.headers["x-token"];
        if (!token) {
            return res.status(400).send("Token missing");
        }
        const verified = jwt.verify(token, process.env.KEY);
        req.user = verified;
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).send("Invalid or expired token");
    }
};

export default middleware;
