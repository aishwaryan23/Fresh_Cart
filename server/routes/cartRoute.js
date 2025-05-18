import mongoose from "mongoose";
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartController.js";
import express from 'express';

const cartRoute = express.Router();

cartRoute.post('/update',authUser,updateCart)

export default cartRoute;