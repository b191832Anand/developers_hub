import express from "express";
import { sign, login, allprofile, profile, allreview, myreview,alldata,detailsbyid} from '../controller/auth.js';
import  middleware  from '../middleware/middleware.js';
import Review from "../model/review.js";
const router = express.Router();

router.post('/sign', sign);
router.post('/login', login);
router.get('/allprofile', middleware, allprofile);
router.get('/profile', middleware, profile);
router.post('/allreview', middleware, allreview);
router.get('/myreview', middleware, myreview);
router.get('/alldata',middleware,alldata)
router.get('/detailsbyid/:id',detailsbyid);
export default router;
